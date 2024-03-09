let img;
let treshold = 20

class Slider {
    constructor(x, y, initialValue) {
        this.slider = createSlider(0, 255, initialValue);
        this.slider.position(x, y);
        this.value = initialValue;
    }

    getValue() {
        return this.slider.value();
    }
}

class ImageProcessor {
    constructor(image, x, y, func, slider) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.func = func
        this.slider = slider;
    }

    processImage() {
        // Call the processing function and store the processed image
        this.image = this.func(this.image, this.slider.getValue());
    }

    drawSlider() {
        // Draw the slider
        this.slider.slider.position(this.x, this.y + this.image.height);
    }

    draw() {
        // Draw the processed image
        image(this.image, this.x, this.y);
    }
}

function preload() {
    img = loadImage('image.png');
}

function setup() {
    createCanvas(1000, 120 * 5);
    pixelDensity(1);
    // Create sliders for each image
    slider1 = new Slider(20, 20, 20);
    slider2 = new Slider(20, 120, 20);
    slider3 = new Slider(20, 220, 20);

    noStroke();
}



// Convert image to grayscale and increase brightness by 20%
function grayscale(){
    let image = createImage(img.width, img.height);
    image.copy(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height);
    image.loadPixels();
    
    for (let i = 0; i < image.pixels.length; i += 4) {
        let r = image.pixels[i];
        let g = image.pixels[i + 1];
        let b = image.pixels[i + 2];

        let gray = (r + g + b) / 3;
        // this limits the brightness to 255 (point 5 in the assignment)
        let brightenedGray = min(gray * 1.2, 255);

        image.pixels[i] = brightenedGray;
        image.pixels[i + 1] = brightenedGray;
        image.pixels[i + 2] = brightenedGray;
    }
    image.updatePixels();
    return image;
}

function redPixelsOnly(){
    let image = createImage(img.width, img.height);
    image.copy(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height);
    image.loadPixels();

    for (let i = 0; i < image.pixels.length; i += 4) {
        let r = image.pixels[i];
        let g = image.pixels[i + 1];
        let b = image.pixels[i + 2];

        image.pixels[i] = r;
        image.pixels[i + 1] = 0;
        image.pixels[i + 2] = 0;
    }
    image.updatePixels();
    return image;
}

function bluePixelsOnly(){
    let image = createImage(img.width, img.height);
    image.copy(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height);
    image.loadPixels();

    for (let i = 0; i < image.pixels.length; i += 4) {
        let r = image.pixels[i];
        let g = image.pixels[i + 1];
        let b = image.pixels[i + 2];

        image.pixels[i] = 0;
        image.pixels[i + 1] = 0;
        image.pixels[i + 2] = b;
    }
    image.updatePixels();
    return image;
}

function greenPixelsOnly(){
    let image = createImage(img.width, img.height);
    image.copy(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height);
    image.loadPixels();

    for (let i = 0; i < image.pixels.length; i += 4) {
        let r = image.pixels[i];
        let g = image.pixels[i + 1];
        let b = image.pixels[i + 2];

        image.pixels[i] = 0;
        image.pixels[i + 1] = g;
        image.pixels[i + 2] = 0;
    }
    image.updatePixels();
    return image;
}

function redTreshold(image, treshold){
    let processedImage = createImage(image.width, image.height);
    processedImage.copy(image, 0, 0, image.width, image.height, 0, 0, image.width, image.height);
    processedImage.loadPixels();



    for (let i = 0; i < processedImage.pixels.length; i += 4) {
        let r = processedImage.pixels[i];
        let g = processedImage.pixels[i + 1];
        let b = processedImage.pixels[i + 2];

        processedImage.pixels[i] = r;
        processedImage.pixels[i + 1] = treshold;
        processedImage.pixels[i + 2] = b;
    }
    processedImage.updatePixels();
    return processedImage;
}


function blueTreshold(image, treshold){
    let processedImage = createImage(image.width, image.height);
    processedImage.copy(image, 0, 0, image.width, image.height, 0, 0, image.width, image.height);
    processedImage.loadPixels();

    for (let i = 0; i < processedImage.pixels.length; i += 4) {
        let r = processedImage.pixels[i];
        let g = processedImage.pixels[i + 1];
        let b = processedImage.pixels[i + 2];

        processedImage.pixels[i] = r;
        processedImage.pixels[i + 1] = g;
        processedImage.pixels[i + 2] = treshold;
    }
    processedImage.updatePixels();
    return processedImage;
}



function draw() {
    background(0);
    image(img, 0, 0);

    // Create instances of ImageProcessor
    const imageProcessor = new ImageProcessor(img, 0, 0, redTreshold, slider1);
    const blueProcessor = new ImageProcessor(img, 200, 200, blueTreshold, slider2);
    

    // Process the images
    imageProcessor.processImage();
    blueProcessor.processImage();


    // Draw the processed images
    imageProcessor.draw();
    blueProcessor.draw();


}
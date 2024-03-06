let img;

function preload() {
    img = loadImage('image.png');
}

function setup() {
    createCanvas(1000, 120 * 5);
    pixelDensity(1);
    
    noStroke();
}

class ImageProcessor {
    constructor(image, x, y, func) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.func = func;
    }

    processImage() {
        // Call the processing function and store the processed image
        this.image = this.func();
    }

    draw() {
        // Draw the processed image
        image(this.image, this.x, this.y);
    }
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

function draw() {
    background(0);
    image(img, 0, 0);

    // Create instances of ImageProcessor
    const imageProcessor = new ImageProcessor(img, 0, 0, grayscale);
    const imageRed = new ImageProcessor(img, 200, 200, redPixelsOnly);

    // Process the images
    imageProcessor.processImage();
    imageRed.processImage();

    // Draw the processed images
    imageProcessor.draw();
    imageRed.draw();
}

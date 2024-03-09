let img;
let treshold = 20
let faceapi;
let detections;
let faceDetection;

// by default all options are set to true
const detectionOptions = {
    withLandmarks: true,
    withDescriptors: false,
};

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
    constructor(image, x, y, func) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.func = func;
    }

    processImage() {
        let processedImage = createImage(this.image.width, this.image.height);
        processedImage.copy(this.image, 0, 0, this.image.width, this.image.height, 0, 0, this.image.width, this.image.height);
        processedImage.loadPixels();
        
        for (let i = 0; i < processedImage.pixels.length; i += 4) {
            let r = processedImage.pixels[i];
            let g = processedImage.pixels[i + 1];
            let b = processedImage.pixels[i + 2];

            let channels = this.func(r, g, b);

            processedImage.pixels[i] = channels[0];
            processedImage.pixels[i + 1] = channels[1];
            processedImage.pixels[i + 2] = channels[2];
        }
        processedImage.updatePixels();
        return processedImage;
    }

    draw() {
        // Draw the processed image
        image(this.image, this.x, this.y);
    }
}

class FaceDetection {
    constructor() {
        this.faceapi = ml5.faceApi(detectionOptions, this.modelReady.bind(this));
    }

    setup() {
        createCanvas(600, 800);
        background(220);
        textAlign(RIGHT);
    }

    modelReady() {
        console.log("ready!");
        console.log(this.faceapi);
        this.faceapi.detectSingle(img, this.gotResults.bind(this));
    }

    gotResults(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        // console.log(result)
        this.detections = result;

        // background(220);
        background(255);
        image(img, 0, 0, img.width, img.height);
        if (this.detections) {
            // console.log(detections)
            this.drawBox(this.detections);
            this.drawLandmarks(this.detections);
        }
    }

    drawBox(detections) {
        const alignedRect = detections.alignedRect;
        const { _x, _y, _width, _height } = alignedRect._box;
        noFill();
        stroke(161, 95, 251);
        strokeWeight(2);
        rect(_x, _y, _width, _height);
    }

    drawLandmarks(detections) {
        noFill();
        stroke(161, 95, 251);
        strokeWeight(2);

        const landmarks = detections.landmarks._positions;

        for (let i = 0; i < landmarks.length; i++) {
            point(landmarks[i]._x, landmarks[i]._y);
        }
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
    // slider2 = new Slider(20, 120, 20);
    // slider3 = new Slider(20, 220, 20);
    faceDetection = new FaceDetection();
    noStroke();
}


// Convert image to grayscale and increase brightness by 20%
function grayscale(r, g, b){
        let gray = (r + g + b) / 3;
        // this limits the brightness to 255 (point 5 in the assignment)
        let brightenedGray = min(gray * 1.2, 255);
        let red = brightenedGray;
        let green = brightenedGray;
        let blue = brightenedGray;
        return [red, green, blue];
}

function redPixelsOnly(r, g, b){
    let red = r;
    let green = 0;
    let blue = 0;
    return [red, green, blue];
}

function greenPixelsOnly(){
    let red = 0;
    let green = g;
    let blue = 0;
    return [red, green, blue];
}

function bluePixelsOnly(r, g, b){
    let red = 0;
    let green = 0;
    let blue = b;
    return [red, green, blue];
}

function redTreshold(g, b, treshold){
    treshold = slider1.getValue();
    let red = treshold;
    let green = g;
    let blue = b;
    return [red, green, blue];
}

function greenTreshold(r, g, b, treshold){
    treshold = slider1.getValue();
    let red = r;
    let green = treshold;
    let blue = b;
    return [red, green, blue];
}   

function blueTreshold(r, g, b, treshold){
    treshold = slider1.getValue();
    let red = r;
    let green = g;
    let blue = treshold;
    return [red, green, blue];
}

function rgbToYCbCr(r, g, b) {
    let y = 0.299 * r + 0.587 * g + 0.114 * b;
    let cb = 128 - 0.168736 * r - 0.331264 * g + 0.5 * b;
    let cr = 128 + 0.5 * r - 0.418688 * g - 0.081312 * b;
    return [y, cb, cr];
}

// Function to convert RGB to HSV
function rgbToHsv(r, g, b) {
    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let delta = max - min;
    
    let h = 0;
    let s = (max === 0) ? 0 : (delta / max);
    let v = max;
    
    if (delta !== 0) {
        if (max === r) {
            h = (g - b) / delta;
        } else if (max === g) {
            h = 2 + (b - r) / delta;
        } else {
            h = 4 + (r - g) / delta;
        }
        h *= 60;
        if (h < 0) {
            h += 360;
        }
    }

    hConverted = h / 360 * 255;
    sConverted = s * 255;
    vConverted = v * 255;
    return [hConverted, sConverted, vConverted];
}

function draw() {
    background(0);
    image(img, 0, 0);

    // Create instances of ImageProcessor
    const imageProcessor = new ImageProcessor(img, 0, 0, faceDetection.setup);
    // const blueProcessor = new ImageProcessor(img, 200, 200, blueTreshold, slider2);
    

    // Process the images
    // imageProcessor.processImage();
    // blueProcessor.processImage();


    // Draw the processed images
    imageProcessor.draw();
    // blueProcessor.draw();

}
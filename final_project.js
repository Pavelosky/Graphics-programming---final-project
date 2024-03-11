


// initialize the video and the variables to control the mode of the application
let video;

// Variables to control the mode of the application
let snapshotMode = false;
let showCamera = true;

// Treshold for the red, green and blue channels
let treshold = 20

// Variables for the face detection
let faceapi;
let detections;
let faceDetection;

// Buffer image to store the snapshot
let bufferImage

// Sliders to manipulate the image
let sliderRed;
let sliderGreen;
let sliderBlue;
let sliderYCbCr;
let sliderHSV;

// Array of functions to process the images
let imageLabels = [
    original,
    grayscale,
    black,
    redPixelsOnly,
    greenPixelsOnly,
    bluePixelsOnly,
    redTreshold,
    greenTreshold,
    blueTreshold,
    original,
    rgbToYCbCr,
    rgbToHsv
];

let processedImages  = []

// by default all options are set to true
const detectionOptions = {
    withDescriptors: false,
};

// Slider class to create the sliders
class Slider {
    constructor(x, y, initialValue) {
        this.slider = createSlider(0, 255, initialValue);
        this.slider.position(x, y);
        this.value = initialValue;
    }

    getValue() {
        return this.slider.value();
    }
};

// ImageProcessor class to process the images
class ImageProcessor {
    constructor(image, x, y, func) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.func = func;
    }
    // Process the image by passing each pixel to the function
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
        image(this.processImage(), this.x, this.y);
    }
}

// FaceDetection class to detect the face in the image - this class is based on the example provided by ml5.js with some modifications needed to fit the project
class FaceDetection {
    constructor(bufferImage, x, y) {
        this.x = x;
        this.y = y;
        this.bufferImage = bufferImage;
        this.faceapi = ml5.faceApi(detectionOptions, this.modelReady.bind(this));
    }

    modelReady() {
        console.log("ready!");
        console.log(this.faceapi);
        this.faceapi.detectSingle(this.bufferImage, this.gotResults.bind(this));
    }

    gotResults(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        // console.log(result)
        this.detections = result;

        image(this.bufferImage, this.x, this.y, this.bufferImage.width, this.bufferImage.height);
        if (this.detections) {
            // console.log(detections)
            this.drawBox(this.detections);
        }
    }

    drawBox(detections) {
        const alignedRect = detections.alignedRect;
        const { _x, _y, _width, _height } = alignedRect._box;
        
        // Center of the face detected in the new image position
        const centerX = this.x + _x + _width / 2;
        const centerY = this.y + _y + _height / 2;  

        // Calculate the width and height of the box based on the detected face
        const boxWidth = _width * 1.2; // Adjusting the width of the box
        const boxHeight = _height * 1.2; // Adjusting the height of the box

        noFill();
        stroke(161, 95, 251);
        strokeWeight(2);
        rectMode(CENTER)
        rect(centerX, centerY, boxWidth, boxHeight);
    }
}

// Original image - it returns the original values of the pixels
function original(r, g, b) {
    return [r, g, b];
}

// Convert image to grayscale and increase brightness by 20%
function grayscale(r, g, b) {
    // calculate the average of the three channels
    let gray = (r + g + b) / 3;

    // limit the brightness to 255 (point 5 in the assignment)
    let brightenedGray = min(gray * 1.2, 255);

    let red = brightenedGray;
    let green = brightenedGray;
    let blue = brightenedGray;
    return [red, green, blue];
}

// Produce black image
function black(r, g, b) {
    let red = 0;
    let green = 0;
    let blue = 0;
    return [red, green, blue];
}

// Show only red pixels
function redPixelsOnly(r, g, b) {
    let red = r;
    let green = 0;
    let blue = 0;
    return [red, green, blue];
}

// Show only green pixels
function greenPixelsOnly(r, g, b) {
    let red = 0;
    let green = g;
    let blue = 0;
    return [red, green, blue];
}

// Show only blue pixels
function bluePixelsOnly(r, g, b) {
    let red = 0;
    let green = 0;
    let blue = b;
    return [red, green, blue];
}

// Tresholding for the channels. - Originally I thought that this should be something else, only the last minute 
// I realized that I should apply the tresholding to the channels as shown in the week 15-16 lecture.
// This effect is quite interesting, but I think it's not as intuitive as the other effects. I also played around with 
// different variations of the channels where for example I would set one channel to its original value and the other to be 
// the tresholded value. I think that is a bit more interesting to watch, but I decided to stick with the original assignment.
function redTreshold(r, g, b) {
    treshold = sliderRed.getValue();

    // Apply thresholding to the red channel only
    if (r > treshold){
        r = 255;
    } else {
        r = 0;
    }

    let red = r;
    let green = 0;
    let blue = 0;
    return [red, green, blue];
}

// Manipulate the green channel
function greenTreshold(r, g, b) {
    treshold = sliderGreen.getValue();

    // Apply thresholding to the green channel only
    if (g > treshold){
        g = 255;
    } else {
        g = 0;
    }

    let red = 0;
    let green = g;
    let blue = 0;
    return [red, green, blue];
}

// Manipulate the blue channel
function blueTreshold(r, g, b) {
    treshold = sliderBlue.getValue();

    // Apply thresholding to the blue channel only
    if (b > treshold){
        b = 255;
    } else {
        b = 0;
    }

    let red = 0;
    let green = 0;
    let blue = b;
    return [red, green, blue];
}

// Make the colorspace conversion to YCbCr. This one I find the most fascinating and I can't quite figure it out.
// I was able to apply the math to the pixels and get the results, but it's hard for me to grasp the way the colors change in the image.
// As you move the slider, the image changes in a very unexpected way. On right end it resembles the image where blue pixels are removed, 
// but as you move the slider to the left, the image becomes to look unnatural. I think it's because the YCbCr color space is not as intuitive as RGB.
function rgbToYCbCr(r, g, b) {
    let y = 0.299 * r + 0.587 * g + 0.114 * b * sliderYCbCr.getValue() / 100;
    let cb = 128 - 0.168736 * r - 0.331264 * g + 0.5 * b * sliderYCbCr.getValue() / 100;
    let cr = 128 + 0.5 * r - 0.418688 * g - 0.081312 * b * sliderYCbCr.getValue() / 100;
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

    hConverted = h / 360 * 255 * sliderHSV.getValue() / 255;
    sConverted = s * 255 * sliderHSV.getValue() / 255;
    vConverted = v * 255 * sliderHSV.getValue() / 255;
    return [hConverted, sConverted, vConverted];
}

function setup() {
    createCanvas(160 * 3, 120 * 5);
    pixelDensity(1)

    // Create a video element
    video = createCapture(VIDEO);;
    video.hide()
    noStroke()
}

function draw() {
    background(0);
    // Mode to show the camera and take a snapshot
    if (showCamera) {
        image(video, 0, 0, video.width * 2/3, video.height * 2/3);
        textAlign(CENTER);
        fill(255)
        text("Click your mouse to take a snapshot", width/2, height/2, 100, 100)
    }
    // Mode to show the snapshot and the processed images
    if (snapshotMode) {
        bufferImage.resize(160, 120)

        for (let i = 0; i < processedImages.length; i++) {
            processedImages[i].draw();
        }

        faceDetection.gotResults(null, faceDetection.detections);
    }
}

// function to take a snapshot of the video
function mouseClicked() {
    if(!snapshotMode){
        // Take a snapshot of the video
        bufferImage = createImage(video.width, video.height);
        bufferImage.copy(video, 0, 0, video.width, video.height, 0, 0, video.width, video.height);

        // Change the mode to show the snapshot and the processed images
        showCamera = false;
        snapshotMode = true;

        // Create the processed images
        for (let i = 0; i < imageLabels.length; i++) {
            let x = 160 * (i % 3);
            let y = 120 * int(i / 3);

            // Create the image processor object
            const imageProcessor = new ImageProcessor(bufferImage, x, y, imageLabels[i]);
            processedImages.push(imageProcessor);
        }

        // Create the face detection object
        faceDetection = new FaceDetection(bufferImage, 0, 480);

        // Create the sliders
        sliderRed = new Slider(20, 330, 20);
        sliderGreen = new Slider(180, 330, 20);
        sliderBlue = new Slider(340, 330, 20);
        sliderYCbCr = new Slider(180, 450, 20);
        sliderHSV = new Slider(340, 450, 20);
    }
}
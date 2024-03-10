let video;

let snapshotMode = false;
let showCamera = true;
let snapshotTaken = false;

let treshold = 20
let faceapi;
let detections;
let faceDetection;
let bufferImage

let sliderRed;
let sliderGreen;
let sliderBlue;
let sliderYCbCr;
let sliderHSV;

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

let processedImages = []

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
        image(this.processImage(), this.x, this.y);
    }
}

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


// Convert image to grayscale and increase brightness by 20%
function original(r, g, b) {

    return [r, g, b];
}

function grayscale(r, g, b) {
    let gray = (r + g + b) / 3;
    // this limits the brightness to 255 (point 5 in the assignment)
    let brightenedGray = min(gray * 1.2, 255);
    let red = brightenedGray;
    let green = brightenedGray;
    let blue = brightenedGray;
    return [red, green, blue];
}

function black(r, g, b) {
    let red = 0;
    let green = 0;
    let blue = 0;
    return [red, green, blue];
}

function redPixelsOnly(r, g, b) {
    let red = r;
    let green = 0;
    let blue = 0;
    return [red, green, blue];
}

function greenPixelsOnly(r, g, b) {
    let red = 0;
    let green = g;
    let blue = 0;
    return [red, green, blue];
}

function bluePixelsOnly(r, g, b) {
    let red = 0;
    let green = 0;
    let blue = b;
    return [red, green, blue];
}

function redTreshold(r, g, b) {
    treshold = sliderRed.getValue();
    let red = treshold;
    let green = g;
    let blue = b;
    return [red, green, blue];
}

function greenTreshold(r, g, b) {
    treshold = sliderGreen.getValue();
    let red = r;
    let green = treshold;
    let blue = b;
    return [red, green, blue];
}

function blueTreshold(r, g, b) {
    treshold = sliderBlue.getValue();
    let red = r;
    let green = g;
    let blue = treshold;
    return [red, green, blue];
}

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
    createCanvas(640, 120 * 5);
    pixelDensity(1)
    video = createCapture(VIDEO);;
    video.hide()
    noStroke()

}

function draw() {
    background(0);

    if (showCamera) {
        image(video, 0, 0)
        textAlign(CENTER);
        fill(255)
        text("Click your mouse to take a snapshot", width / 2, height / 2, 100, 100)
    }

    if (snapshotMode) {
        bufferImage.resize(160, 120)

        for (let i = 0; i < processedImages.length; i++) {
            processedImages[i].draw();
        }

        faceDetection.gotResults(null, faceDetection.detections);
    }

}

function mouseClicked() {
    if (!snapshotTaken) {
        // Take a snapshot of the video
        bufferImage = createImage(video.width, video.height);
        bufferImage.copy(video, 0, 0, video.width, video.height, 0, 0, video.width, video.height);

        showCamera = false;
        snapshotMode = true;
        snapshotTaken = true;

        for (let i = 0; i < imageLabels.length; i++) {
            let x = 160 * (i % 3);
            let y = 120 * int(i / 3);

            const imageProcessor = new ImageProcessor(bufferImage, x, y, imageLabels[i]);
            processedImages.push(imageProcessor);
        }

        faceDetection = new FaceDetection(bufferImage, 0, 480);
        sliderRed = new Slider(20, 330, 20);
        sliderGreen = new Slider(180, 330, 20);
        sliderBlue = new Slider(340, 330, 20);
        sliderYCbCr = new Slider(180, 450, 20);
        sliderHSV = new Slider(340, 450, 20);

    }

}
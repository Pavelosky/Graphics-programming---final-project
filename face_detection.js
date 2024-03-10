let faceapi;
let img;
let dupa
let detections;
let faceDetection;
let pixelate = false; // Variable to track pixelation state

// by default all options are set to true
const detectionOptions = {
    withLandmarks: true,
    withDescriptors: false,
};

function preload() {
    img = loadImage('image.png');
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

        // background(220);
        background(255);
        image(this.bufferImage, this.x, this.y, this.bufferImage.width, this.bufferImage.height);
        if (this.detections) {
            // console.log(detections)
            this.drawBox(this.detections);
        }
    }

    drawBox(detections) {
        const alignedRect = detections.alignedRect;
        const { _x, _y, _width, _height } = alignedRect._box;
        
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

        if (pixelate) {
            this.pixelateBox(centerX - boxWidth / 2, centerY - boxHeight / 2, boxWidth, boxHeight);
        }
    }

    pixelateBox(x, y, w, h) {
        let imgSubset = this.bufferImage.get(x, y, w, h);
        imgSubset.resize(w / 10, h / 10);
        imgSubset.resize(w, h);
        image(imgSubset, x, y, w, h);
    }

}

function setup() {
    createCanvas(600, 800);
    background(220);
    img.resize(160, 120);
    image(img, 300, 300, img.width, img.height);
    faceDetection = new FaceDetection(img, 300, 300); 
}

function keyPressed() {
    if (key === ' ') {
        // Toggle the pixelation state when space key is pressed
        pixelate = !pixelate;
        // Redraw to apply changes
        faceDetection.pixelateBox();
    }
}

function draw() {

}
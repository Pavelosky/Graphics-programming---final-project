let faceapi;
let img;
let detections;
let faceDetection;

// by default all options are set to true
const detectionOptions = {
    withLandmarks: true,
    withDescriptors: false,
};

function preload() {
    img = loadImage('image.png');
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



function setup() {
    createCanvas(600, 800);
    background(220);
    faceDetection = new FaceDetection();
    faceDetection.setup();
}

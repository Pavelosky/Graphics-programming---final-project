let faceapi;
let img;
let detections;

// by default all options are set to true
const detectionOptions = {
    withLandmarks: true,
    withDescriptors: false,
};

function preload() {
    img = loadImage('image.png');
}

function setup() {
    createCanvas(600, 800);
    background(220);

    faceapi = ml5.faceApi(detectionOptions, modelReady);
    textAlign(RIGHT);
}

function modelReady() {
    console.log("ready!");
    console.log(faceapi);
    faceapi.detectSingle(img, gotResults);
}

function gotResults(err, result) {
    if (err) {
        console.log(err);
        return;
    }
    // console.log(result)
    detections = result;

    // background(220);
    background(255);
    image(img, 0, 0, img.width, img.height);
    if (detections) {
        // console.log(detections)
        drawBox(detections);
        drawLandmarks(detections);
    }
}

function drawBox(detections) {
    const alignedRect = detections.alignedRect;
    const { _x, _y, _width, _height } = alignedRect._box;
    noFill();
    stroke(161, 95, 251);
    strokeWeight(2);
    rect(_x, _y, _width, _height);
}

function drawLandmarks(detections) {
    noFill();
    stroke(161, 95, 251);
    strokeWeight(2);

    const landmarks = detections.landmarks._positions;

    for (let i = 0; i < landmarks.length; i++) {
        point(landmarks[i]._x, landmarks[i]._y);
    }
}

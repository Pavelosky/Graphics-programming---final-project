let video;
let snapshotMode = false;
let showCamera = true;


function setup() {
    createCanvas(640, 480);
    pixelDensity(1)
    video = createCapture(VIDEO);;
    video.hide()
    noStroke()
    

}

function draw() {
    background(0);
    

    if (showCamera){
        image(video, 0, 0)
    }

    if (snapshotMode) {
        bufferImage.loadPixels();
        image(bufferImage, 0, 0, 160, 120); // Set the size to 160 x 120
        bufferImage.updatePixels();
    }

}

function mouseClicked() {
    // Take a snapshot of the video
    bufferImage = createImage(video.width, video.height);
    bufferImage.copy(video, 0, 0, video.width, video.height, 0, 0, video.width, video.height);

    
    snapshotMode = true;
    showCamera = false;
    
    // Save the image to a .png file
    // bufferImage.save("image.png");
}
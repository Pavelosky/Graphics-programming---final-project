let video;
let snapshotMode = false;
let showCamera = true;

let imageLabels = [
    'Webcam image',
    'Grayscale and brightness +20%',
    'Red channel',
    'Green channel',
    'Blue channel',
    'Threshold image',
    'Threshold image',
    'Threshold image',
    'Webcam image (repeat)',
    'Color space 1',
    'Color space 2',
    'Threshold image from color space 1',
    'Threshold image from color space 2',
    'Face detection and replaced face images'
];



function setup() {
    createCanvas(640, 120 * 5);
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
        

        for(let i = 0; i < imageLabels.length; i++){
            let x = 160 * (i % 3);
            let y = 120 * int(i / 3) ;
            let h = 120;

            bufferImage.loadPixels();
            image(bufferImage, x, y, 160, 120); // Set the size to 160 x 120
            bufferImage.updatePixels();
            
            let label = imageLabels[i];
            fill(255);
            text(label, x, y + h + 10)

            
        }
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
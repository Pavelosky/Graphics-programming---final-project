let video;
let treshold = 20;
let tresholdSlider;
let redTarget, greenTarget, blueTarget;
let button;
let debug = false;
let freeze = false;

function setup() {
    createCanvas(640, 480);
    pixelDensity(1)
    video = createCapture(VIDEO);;
    video.hide()
    noStroke()

    tresholdSlider = createSlider(0, 255, 20);
    tresholdSlider.position(20, 20);



    redTarget = 255;
    greenTarget = 0
    blueTarget = 0
}

function draw() {
    background(0);
    image(video, 0, 0)

    if (!freeze) {
        treshold = tresholdSlider.value();
        video.loadPixels();
    }
    else{
        bufferImage.loadPixels()
        image(bufferImage, 0, 0)
        bufferImage.updatePixels()
    }
    
    let recordX = 0;
    let recordY = 0;
    let avgX = 0;
    let avgY = 0;
    let count = 0;

    for (let x = 0; x < video.height; x++) {
        for (let y = 0; y < video.width; y++) {
            let index = (x + y * video.width) * 4;
            let r = video.pixels[index + 0];
            let g = video.pixels[index + 1];
            let b = video.pixels[index + 2];
            let a = video.pixels[index + 3];

            let d = dist(r, g, b, redTarget, greenTarget, blueTarget);

            if (d < treshold) {
                recordX += x;
                recordY += y;
                count++;

                if (debug) {
                    video.pixels[index + 0] = 255;
                    video.pixels[index + 1] = 0;
                    video.pixels[index + 2] = 255;
                }
            }
        }
    }

    if (count > 0) {
        avgX = recordX / count;
        avgY = recordY / count;
    }

    if (debug) {
        video.updatePixels();
    }

    fill(200, 50, 50, 0);

    strokeWeight(3)
    stroke(200, 50, 50,)
    ellipse(avgX, avgY, 16, 16);
}

function keyPressed() {
    let c = video.get(mouseX, mouseY);
    redTarget = red(c)
    greenTarget = green(c);
    blueTarget = blue(c);
}

function toggleDebug() {
    debug = !debug;
    if (debug) {
        button.html('normal mode');
    } else {
        button.html('debug mode');
    }
}

let bufferImage;

function mouseClicked() {
    // Take a snapshot of the video
    bufferImage = createImage(video.width, video.height);
    bufferImage.copy(video, 0, 0, video.width, video.height, 0, 0, video.width, video.height);
    freeze = true;

    // Save the image to a .png file
    bufferImage.save("image.png");
}
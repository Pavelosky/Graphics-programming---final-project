let img

function preload() {
    img = loadImage('image.png');
}

function setup() {
    createCanvas(640, 120 * 5);
    pixelDensity(1);
    
    noStroke();
}

function draw() {
    background(0);
    image(img, 0, 0);

    // Convert image to grayscale and increase brightness by 20%
    loadPixels();
    for (let i = 0; i < pixels.length; i += 4) {
        let r = pixels[i];
        let g = pixels[i + 1];
        let b = pixels[i + 2];

        // change this to view the different channels
        pixels[i] = r
        pixels[i + 1] = 0
        pixels[i + 2] = 0
    }
    updatePixels();
    noStroke();
}

    



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

        let gray = (r + g + b) / 3;
        // this limits the brightness to 255 (point 5 in the assignment)
        let brightenedGray = min(gray * 1.2, 255);

        pixels[i] = brightenedGray;
        pixels[i + 1] = brightenedGray;
        pixels[i + 2] = brightenedGray;
    }
    updatePixels();
    noStroke();
}

    



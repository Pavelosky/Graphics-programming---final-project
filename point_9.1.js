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

    // Convert to YCbCr
    loadPixels();
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let index = (x + y * width) * 4;
            let r = pixels[index];
            let g = pixels[index + 1];
            let b = pixels[index + 2];

            // Convert RGB to YCbCr
            let yCbCr = rgbToYCbCr(r, g, b);

            // Set the pixel values to YCbCr
            pixels[index] = yCbCr[0];
            pixels[index + 1] = yCbCr[1];
            pixels[index + 2] = yCbCr[2];
        }
    }
    updatePixels();
    noStroke();
}

// Function to convert RGB to YCbCr
function rgbToYCbCr(r, g, b) {
    let y = 0.299 * r + 0.587 * g + 0.114 * b;
    let cb = 128 - 0.168736 * r - 0.331264 * g + 0.5 * b;
    let cr = 128 + 0.5 * r - 0.418688 * g - 0.081312 * b;
    return [y, cb, cr];
}
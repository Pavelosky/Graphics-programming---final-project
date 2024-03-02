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

            // Convert RGB to HSV
            let hsv = rgbToHsv(r, g, b);

            // Scale values to 0-255 range
            let h = hsv[0] * 255;
            let s = hsv[1] * 255;
            let v = hsv[2] * 255;

            // Set the pixel values to HSV
            pixels[index] = h;
            pixels[index + 1] = s;
            pixels[index + 2] = v;
        }
    }
    updatePixels();
    noStroke();
    noLoop()
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
    
    return [h / 360, s, v];
}
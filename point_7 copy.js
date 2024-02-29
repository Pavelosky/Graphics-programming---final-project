let img
let treshold = 20

function preload() {
    img = loadImage('image.png');
}

function setup() {
    createCanvas(640, 120 * 5);
    pixelDensity(1);

    tresholdSlider = createSlider(0, 255, 20);
    tresholdSlider.position(20, 20);
    
    noStroke();
}

function draw() {
    background(0);
    image(img, 0, 0);

    treshold = tresholdSlider.value();

    loadPixels();
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let index = (x + y * width) * 4;
            let r = pixels[index];
            let g = pixels[index + 1];
            let b = pixels[index + 2];

            // Set the pixel values to YCbCr
            pixels[index] = treshold * r /10
            pixels[index + 1] = g
            pixels[index + 2] = b
        }
    }

        // The result is different from the original image, 
        // I really expercted to see the original image colors at some point when sliding the treshold slider
    
    updatePixels();
    noStroke();

    console.log(treshold)
    }
    
    



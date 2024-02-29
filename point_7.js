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
    for (let i = 0; i < pixels.length; i += 4) {
        let r = pixels[i];
        let g = pixels[i + 1];
        let b = pixels[i + 2];

        // change this to view the different channels
        pixels[i] = r
        pixels[i + 1] = treshold
        pixels[i + 2] = b

        // The result is different from the original image, 
        // I really expercted to see the original image colors at some point when sliding the treshold slider
    }
    updatePixels();
    noStroke();

    console.log(treshold)
}

    



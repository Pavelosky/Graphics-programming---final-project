class webcam_Image {
  constructor(imagePath, scale, positions) {
    this.imagePath = imagePath;
    this.scale = scale;
    this.positions = positions;
  }

  draw() {
    for (let i = 0; i < this.positions.length; i++) {
      const { x, y } = this.positions[i];
      const img = new Image();
      img.src = this.imagePath;
      img.onload = () => {
        const scaledWidth = img.width * this.scale;
        const scaledHeight = img.height * this.scale;
        context.drawImage(img, x, y, scaledWidth, scaledHeight);
      };
    }
  }
}

// Usage example:
const imagePath = "image.png";
const scale = 0.5;
const positions = [
  { x: 100, y: 100 },
  { x: 200, y: 200 },
  { x: 300, y: 300 },
];

const webcamImage = new webcam_Image(imagePath, scale, positions);
webcamImage.draw();

let offCanvas;
const pD = 2; // Handle double sizing for pixel density

// Create offscreen canvas for performance issues
function createOffscreenCanvas() {
  // Set size of offscreen canvas
  const w = (bubbleSize * (intervals.length + 1)) * pD; // WIDTH = NUMBER OF UNIQUE BUBBLES PER KEY
  const h = (bubbleSize * rootTones.length) * pD; // BECAUSE THIS IS THE LARGER OF THE TWO OBJECTS

  // Create the canvas
  offCanvas = createGraphics(w, h);
  drawOffscreenShapes(offCanvas);
}

function drawOffscreenShapes(c) {
  const b = bubbleSize * pD;
  const f = bubbleFillSize * pD;

  // Render objects
  for (let i=0; i<rootTones.length; i++) {
    for (let j=0; j<=intervals.length; j++) {
  
      if (j >= intervals.length) {
        c.fill(bubbleColorDefault[0]);
        c.stroke(bubbleColorDefault[1]);
      } else {
        c.fill(bubbleColors[j][0]);
        c.stroke(bubbleColors[j][1]);
      }

      c.strokeWeight(bubbleStrokeSize * 2);

      // Set x and y positions
      let x = (b/2) + j * b;
      let y = (b/2) + i * b;

      // Draw a shape for each key
      if (i === 0) {
        // Circle
        c.ellipseMode(CENTER);
        c.ellipse(x, y, f);
      } else if (i === 1) {
        // Rectangle
        c.rectMode(CENTER);
        c.rect(x, y, f, f, 6);
      } else if (i === 2) {
        // Diamond
        c.beginShape();
        c.vertex(x, y-f/2);
        c.vertex(x+f/2, y);
        c.vertex(x, y+f/2);
        c.vertex(x-f/2, y);
        c.endShape(CLOSE);
      } else {
        // Triangle
        c.triangle(x, y-f/2, x+f/2, y+f/2, x-f/2, y+f/2);
      }
    }
  }
}
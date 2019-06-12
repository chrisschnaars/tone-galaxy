// OFFSCREEN CANVAS
let offCanvas;
let n = 9;

// CREATE OFFSCREEN CANVAS
// DOUBLE SIZE OF BUBBLE FOR PIXEL DENSITY ISSUES
function createOffscreenCanvas() {
  // SET SIZE OF OFFSCREEN CANVAS
  let w = n * bubbleSize * 2;
  let h = bubbleSize * 2; // BECAUSE THIS IS THE LARGER OF THE TWO OBJECTS

  // CREATE CANVAS
  offCanvas = createGraphics(w, h);

  // DRAW BUBBLES & ROADBLOCKS
  drawOffscreenBubbles(offCanvas);
}

// DRAW BUBBLES TO OFFSCREEN CANVAS
function drawOffscreenBubbles(c) {
  let b = bubbleSize * 2;

  for (let i=0; i<n; i++) {
    // SET COLOR
    if (i >= 8) {
      c.fill(bubbleColorDefault[0]);
      c.stroke(bubbleColorDefault[1]);
    } else {
      c.fill(bubbleColors[i][0]);
      c.stroke(bubbleColors[i][1]);
    }

    c.strokeWeight(bubbleStrokeSize * 2);
    // SET X AND Y POSITION
    let x = b/2 + (i * b);
    let y = b/2;
    // DRAW BUBBLE
    c.ellipseMode(CENTER);
    c.ellipse(x, y, bubbleFillSize*2);
  }
}

// OFFSCREEN CANVAS
let offCanvas;
let pD = 2;

// CREATE OFFSCREEN CANVAS
// DOUBLE SIZE OF BUBBLE FOR PIXEL DENSITY ISSUES
function createOffscreenCanvas() {
  // SET SIZE OF OFFSCREEN CANVAS
  let w = (bubbleSize * (intervals.length + 1)) * pD; // WIDTH = NUMBER OF UNIQUE BUBBLES PER KEY
  let h = (bubbleSize * rootTones.length) * pD; // BECAUSE THIS IS THE LARGER OF THE TWO OBJECTS

  // CREATE CANVAS
  offCanvas = createGraphics(w, h);

  // DRAW BUBBLES & ROADBLOCKS
  drawOffscreenBubbles(offCanvas);
}

// DRAW BUBBLES TO OFFSCREEN CANVAS
function drawOffscreenBubbles(c) {
  // DOUBLE BUBBLE SIZE FOR PIXEL DENSITY
  let b = bubbleSize * pD;
  let f = bubbleFillSize * pD;

  // DRAW OBJECTS
  for (let i=0; i<rootTones.length; i++) {
    for (let j=0; j<=intervals.length; j++) {
      // SET COLOR
      if (j >= intervals.length) {
        c.fill(bubbleColorDefault[0]);
        c.stroke(bubbleColorDefault[1]);
      } else {
        c.fill(bubbleColors[j][0]);
        c.stroke(bubbleColors[j][1]);
      }
      // SET STROKE WEIGHT
      c.strokeWeight(bubbleStrokeSize * 2);
      // SET X AND Y POSITION
      let x = (b/2) + j * b;
      let y = (b/2) + i * b;

      // DRAW ELLIPSES
      if (i === 0 || i === 2) {
        // DRAW BUBBLE
        c.ellipseMode(CENTER);
        c.ellipse(x, y, f);
      } else if (i === 1) {
        // DRAW RECTANGLE
        c.rectMode(CENTER);
        c.rect(x, y, f, f);
      } else if (i === 3) {
        // DRAW RECTANGLE
        c.triangle(x, y-f/2, x+f/2, y+f/2, x-f/2, y+f/2);
      }

    }



  }
}

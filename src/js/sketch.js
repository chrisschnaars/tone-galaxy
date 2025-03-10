let cw, ch; // Canvas size
let bgCanvas; // Canvas background

let desiredSeparation;
let toneSeparation;

// Set canvas size
function setCanvasSize() {
  cw = window.innerWidth;
  ch = window.innerHeight;
}

function setup() {
  setCanvasSize();
  setSizes();

  canvas = createCanvas(cw, ch);
  canvas.parent("main-container");
  canvas.id("canvas");

  // Create bg canvas
  bgCanvas = createGraphics(cw, ch);
  bgCanvas.background(color('#0E0F11'));

  angleMode(DEGREES);
}

// Main animation loop
function draw() {
  // Draw bg
  image(bgCanvas, 0, 0);

  // Display and update buttbles
  for (let i=0; i<bubbles.length; i++) {
    for (let j=0; j<bubbles.length; j++) {
      if (i != j) {
        // APPLY SEPARATION BEHAVIOR TO BUBBLE
        bubbles[i].applyBehaviors(bubbles[j]);

        // GET DISTANCE
        const d = getBubbleDist(bubbles[i].pos, bubbles[j].pos);

        // TOGGLE TONE IF TOO CLOSE
        if (d < toneSeparation) {
          bubbles[i].toggle();
          bubbles[i].play();
          bubbles[i].connectBubbles(bubbles[j]);
        }
      }
    }

    // DRAW BUBBLES
    bubbles[i].render();
  }
} 

// Handle resizing of window
function windowResized() {
  // reload canvas when window is resized
  location.reload();

  setCanvasSize();
  resizeCanvas(cw, ch);
}
/************************************************
CANVAS SETUP
************************************************/

// CANVAS SIZE VARIABLES
let cw, ch;
let bgCanvas;

let desiredSeparation;
let toneSeparation;


// SET CANVAS SIZE
function setCanvasSize() {
  // GET CONTROL BAR HEIGHT
  const controlBar = document.querySelector('#control-bar');
  let cbHeight = controlBar.clientHeight + 2; // height plus border

  // SET CANVAS SIZE
  cw = window.innerWidth;
  ch = window.innerHeight - cbHeight;
}

// CANVAS SETUP
function setup() {
  // GET CANVAS SIZE
  setCanvasSize();
  setSizes();

  // CREATE CANVAS
  canvas = createCanvas(cw, ch);
  canvas.parent("main-container");
  canvas.id("canvas");

  // CREATE OFFSCREEN BG CANVAS
  bgCanvas = createGraphics(cw, ch);
  bgCanvas.background(color('#F8F9FC'));

  // SET GLOBAL DRAWING SETTINGS
  angleMode(DEGREES);
}


// ANIMATION
function draw() {
  // DISPLAY BACKGROUND
  image(bgCanvas, 0, 0);

  // DISPLAY AND UPDATE BUBBLES
  for (let i=0; i<bubbles.length; i++) {
    for (let j=0; j<bubbles.length; j++) {
      if (i != j) {

        // APPLY SEPARATION BEHAVIOR TO BUBBLE
        bubbles[i].applyBehaviors(bubbles[j]);

        // GET DISTANCE
        let d = getBubbleDist(bubbles[i].pos, bubbles[j].pos);

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

// RESET CANVAS WHEN WINDOW IS RESIZED
function windowResized() {
  // reload canvas when window is resized
  location.reload();

  // GET NEW SIZE AND RESET CANVAS
  setCanvasSize();
  resizeCanvas(cw, ch);
}

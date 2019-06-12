/************************************************
BUBBLE CREATION
************************************************/

// BUBBLE ARRAY
let bubbles = [];

// GLOBAL BUBBLE SETTINGS
let bubbleFillSize;
const bubbleStrokeSize = 2;
let bubbleSize;	// PX DIAMETER OF BUBBLE
const bubbleMass = 5;	// USED FOR ACCELERATION
let bubbleTempo = 2; // GLOBAL SPEED OF BUBBLES

// FORCE VARIABLES
let diffRepulsion, keyRepulsion, noteRepulsion;

// BUBBLE COLOR SETTINGS
// INDEX 0 IS FILL
// INDEX 1 IS STROKE
const bubbleColorDefault = ['#E3E6F2', '#BDC2CB'];
const bubbleColors = [
  [ '#EC88C0', '#D96EB2'],
  [ '#48CFAE', '#37BB9B'],
  [ '#FFCF55', '#F6BB43'],
  [ '#4FC0E8', '#3CAEDA'],
  [ '#AC91EE', '#967BDC'],
  [ '#ED5564', '#DA4553'],
  [ '#5D83ED', '#4A71DE'],
  [ '#A0D368', '#8CC051']
];


// CREATE OBJECTS
function createBubbles() {
  // SET BUBBLE SIZE AND POSITIONING VARIABLES
  setSizes();

  // INITIALIZE BUBBLES
  initializeBubbles();

  // SET INITIAL FORCE COEFFICIENTS
  updateAttractForces("note");
}

// INITIALIZE ARRAY OF BUBBLE OBJECTS
function initializeBubbles() {

  // DECREASE BUBBLE COUNT ON SMALLEST SCREENS
  let num = rootTones.length;
  if (cw < 400 || ch < 400) {
    num = rootTones.length - 1;
  }

  // UNIQUE BUBBLE ID
  let index = 0;

  // CREATE BUBBLE OBJECTS
  for (let i=0; i<num; i++){
    for (let j=0; j<intervals.length; j++) {

      // SET RANDOM STARTING POSITION
      // CHECK TO SEE IF ITS TOO CLOSE
      let x, y;
      do {
        x = Math.round(getRandomNumber(0, cw));
        y = Math.round(getRandomNumber(0, ch));
      } while (checkBubblePositions(x, y) === false );

      // SET MASS BASED ON FREQUENCY
      let massMin = 0.5;
      let massMax = 2.5;
      let m1 = remapNumber(i, rootTones.length-1, 0, massMin, massMax);
      let m2 = remapNumber(j, intervals.length-1, 0, massMin, massMax);
      let m = m1 + m2;

      // SET KEY AND TONE IDS
      let k = i;
      let n = j;

      // SET WAVE
      let wave = bassWave;
      if (i % 2 === 1) {
        wave = celesteWave;
      }

      // CREATE BUBBLE
      let b = new Bubble(x, y, m, k, n, wave, index);
      bubbles.push(b);

      // INCREAE UNIQUE ID
      index++;
    }
  }
}

// CHECK TO SEE IF INITIAL BUBBLE POS IS TOO CLOSE
function checkBubblePositions(x, y) {
  if (bubbles.length < 2) {
    return true;
  } else {

    for (let i=0; i<bubbles.length; i++) {
      let v = createVector(x, y);
      let d = getBubbleDist(v, bubbles[i].pos);

      // RETURN FALSE IF BUBBLES ARE TOO CLOSE
      if (d <= toneSeparation) {
        return false;
      }
    }

    // RETURN TRUE WHEN THROUGH THE LOOP
    return true;
  }
}

// GET DISTANCE BETWEEN TWO BUBBLES
function getBubbleDist(b1, b2) {
  return p5.Vector.dist(b1, b2);
}

function updateAttractForces(mode) {
  const repulsionValue = 1.35;
  const attractionValue = 0.25;

  // SET ALL COEFFICIENTS TO REPULSION VALUE
  diffRepulsion = keyRepulsion = noteRepulsion = repulsionValue;

  // SET FORCE VALUES
  if (mode === "note") {
    noteRepulsion = attractionValue;
  } else if (mode === "key") {
    keyRepulsion = attractionValue;
  } else if (mode === "unlike") {
    diffRepulsion = attractionValue;
  }
}

/************************************************
BUBBLE OBJECT
************************************************/

function Bubble(x, y, m, k, n, wave, id) {
	this.pos = createVector(x, y);
	this.vel = createVector(1, 1);
	this.acc = createVector(0, 0);
	this.m = m;	// mass of the bubble
	this.d = bubbleSize;	// diameter of the bubble
  this.maxForce = 0.5; // max force appliced
	this.maxVelocity = 3;	// max speed of bubble
  // TONE ID
  this.keyId = k;
  this.noteId = n;
  this.wave = wave;
	this.id = id; 	// id aligns to color/tone
  // ACTIVE FLAG
  this.active = false;
  this.activeTimer = 0;
  // OFF CANVAS POSITION
	this.offX = this.noteId * (this.d*2);	// x position of offscreen canvas image
	this.offY = 0; // y position of offscreen canvas image
}

// DISPLAY, MOVE, AND BOUNCE THE BALL
Bubble.prototype.render = function() {
	this.update();
	this.display();
	this.checkEdges();
};

Bubble.prototype.toggle = function() {
  this.active = true;
  this.activeTimer = 12;
}

// DISPLAY BUBBLE FROM OFFSCREEN CANVAS
Bubble.prototype.display = function() {
  if (this.activeTimer > 0) {
    image(offCanvas, this.pos.x - this.d/2, this.pos.y - this.d/2, this.d, this.d, this.offX, this.offY, this.d*2, this.d*2);
    this.activeTimer--;
  } else {
    image(offCanvas, this.pos.x - this.d/2, this.pos.y - this.d/2, this.d, this.d, this.d*8*2, this.offY, this.d*2, this.d*2);
    this.active = false;
  }
};

// UPDATE BUBBLE POSITION
Bubble.prototype.update = function() {
	this.vel.add(this.acc);
	this.pos.add(this.vel);
	this.acc.mult(0);	// don't let acceleration accumulate
	this.vel.limit(this.maxVelocity);	// limit the velocity
};

// APPLY SEEK AND SEPARATION BEHAVIORS
Bubble.prototype.applyBehaviors = function(b) {

  // DETERMINE FORCE COEFFICIENTS
  // DEFAULT IF REPULSION
  let c = diffRepulsion;
  if (this.keyId === b.keyId) {
    c = keyRepulsion;
  }
  if (this.noteId === b.noteId) {
    c = noteRepulsion;
  }

  // CALCULATE AND APPLY SEPARATE FORCE
  if (b != null) {
    let sepForce = this.separate(b);
    let seekForce = this.seek();
    if (sepForce != null) {
      sepForce.mult(c);
      this.applyForce(sepForce);
      this.applyForce(seekForce);
    }
  }
};

// APPLY FORCES TO BUBBLE
Bubble.prototype.applyForce = function(force) {
  let f = force.copy(); // make a copy of the gravity variable so you don't alter the original gravity copy
  f.div(this.m);
  this.acc.add(f);  // use add to accumulate multiple forces
}

// CALCULATE SEPARATION FORCE
Bubble.prototype.separate = function(b) {
  // SET DESIRED SEPARATION
  let d = getBubbleDist(this.pos, b.pos);
  // SEPARATE IF TOO CLOSE
  if (d > 0 && d < desiredSeparation) {
    let v = p5.Vector.sub(this.pos, b.pos);
    v.normalize();
    v.mult(this.maxVelocity);

    // IMPLEMENT REYNOLDS STEERING = DESIRED - VELOCITY
    let steer = p5.Vector.sub(v, this.vel);

    // steer.limit(this.maxForce);
    steer.mult(1);
    // this.applyForce(steer);
    return steer;
  }
};

// SEEK FORCE
Bubble.prototype.seek = function() {

  // CALCULATE DESIRED VECTOR
  let b = createVector(cw/2,ch/2);
  let desired = p5.Vector.sub(b, this.pos);
  desired.normalize();
  desired.mult(this.maxVelocity);

  // STEERING FORMULA
  let steer = p5.Vector.sub(desired, this.vel);
  steer.limit(this.maxForce);

  // APPLY STEERING FORCE
  steer.mult(0.25);
  return steer;
  // this.applyForce(steer);

}

// DRAW CONNECTION LINE BETWEEN CLOSE BUBBLES
Bubble.prototype.connectBubbles = function(b) {
  stroke(bubbleColors[this.noteId][1]);
  strokeWeight(2);
  line(this.pos.x, this.pos.y, b.pos.x, b.pos.y);
}

// PLAY BUBBLE'S TONE
Bubble.prototype.play = function() {
  playTone(this);
}

// WRAP BUBBLES AROUND EDGES
Bubble.prototype.checkEdges = function() {
  if (this.pos.y < 0) { this.pos.y = ch; }
  if (this.pos.x > cw) { this.pos.x = 0; }
  if (this.pos.y > ch) { this.pos.y = 0; }
  if (this.pos.x < 0) { this.pos.x = cw; }
};

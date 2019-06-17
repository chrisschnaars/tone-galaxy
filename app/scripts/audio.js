/************************************************
TONE SETUP
************************************************/

// KEY AND SCALE SETUP
let rootTones;
const intervals = [ 1, 5/4, 4/3, 3/2, 2 ];

// SET THE VARIATIONS OF THE MAIN KEY
function setKey(key = 65) {
  // EMPTY ROOTTONES ARRAY
  rootTones = [];

  // VARATIONS OF KEY
  const keyStates = [ 1, 3/2, 2, 8/4];

  // CREATE ROOT TONES ARRAY
  for (let i=0; i<keyStates.length; i++) {
    let k = key * keyStates[i];
    rootTones.push(k);
  }
}


/************************************************
OSCILLATOR SETUP
************************************************/

// AUDIO CONTEXT
let audioCtx;

// GAIN
let masterGainNode;

// TONE SETTINGS
const toneLength = 1;
const fadeInTime = 0.025;
const fadeOutTime = 0.015;
const gainValue = 0.65;

// SETUP AUDIO
function setupAudioPlayback() {
  // SET KEY
  setKey();
  // CREATE AUDIO CONTEXT
  createAudioContext();
  // SET GAIN & PAN
  setupMasterGain();
}

// CREATE AUDIO CONTEXT WHEN USER CLICKS TO BEGIN
function createAudioContext() {
  // CREATE AUDIO CONTEXT
  let AudioContext = window.AudioContext || window.webkitAudioContext;

  // FEATURE DETECTION
  if (AudioContext) {
    audioCtx = new AudioContext();
  } else {
    alert("Sorry, but the Web Audio API is not supported by your browser. Please, consider upgrading to the latest version or downloading Google Chrome or Mozilla Firefox");
  }
}

// MASTER GAIN
function setupMasterGain() {
  // Master Gain
  masterGainNode = audioCtx.createGain();
  masterGainNode.connect(audioCtx.destination);
  masterGainNode.gain.value = gainValue;
}


// PLAY TONE
function playTone(b) {

  // SET CURRENT TIME
  let time = audioCtx.currentTime;

  // SET PERIODIC WAVE FORM
  let wave = b.wave;
  let w = audioCtx.createPeriodicWave(wave.real, wave.imag);

  // SETUP OSCILLATOR
  let osc = audioCtx.createOscillator();
  osc.setPeriodicWave(w);

  // CREATE GAIN NODE
  let gain = audioCtx.createGain();

  // CONNECT OSCILLATOR, GAIN, AND PAN
  osc.connect(gain);

  // PAN
  if (audioCtx.createStereoPanner) {
    let panNode = audioCtx.createStereoPanner();
    gain.connect(panNode);
    panNode.connect(masterGainNode);
    let panValue = remapNumber(b.pos.x, 0, cw, -1, 1);
    panNode.pan.setValueAtTime(panValue, time);
  } else {
    gain.connect(masterGainNode);
  }

  // CONFIGURE OSC
  osc.frequency.value = rootTones[b.keyId] * intervals[b.noteId];
  gain.gain.linearRampToValueAtTime(0, time);
  gain.gain.linearRampToValueAtTime(gainValue, time + fadeInTime);

  // PLAY
  osc.start(time);

  // STOP
  gain.gain.linearRampToValueAtTime(0, time + fadeInTime + toneLength + fadeOutTime);
  osc.stop(time + toneLength);
}

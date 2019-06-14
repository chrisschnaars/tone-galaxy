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
const fadeInTime = 0.035;
const fadeOutTime = 0.045;
const gainValue = 0.75;

// SETUP AUDIO
function setupAudioPlayback() {
  // SET KEY
  setKey();
  // CREATE AUDIO CONTEXT
  createAudioContext();
  // SET GAIN
  setupMasterGain();
}

// CREATE AUDIO CONTEXT WHEN USER CLICKS TO BEGIN
function createAudioContext() {
  // Create Audio Context
  let AudioContext = window.AudioContext || window.webkitAudioContext;
  audioCtx = new AudioContext();
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
  // SET PERIODIC WAVE FORM
  let wave = b.wave;
  let w = audioCtx.createPeriodicWave(wave.real, wave.imag);

  // SETUP OSCILLATOR
  let osc = audioCtx.createOscillator();
  osc.setPeriodicWave(w);

  // CREATE GAIN NODE AND CONNECT OSCILLATOR
  let gain = audioCtx.createGain();
  let panNode = audioCtx.createStereoPanner();

  // CONNECT OSCILLATOR, GAIN, AND PAN
  osc.connect(gain);
  gain.connect(panNode);
  panNode.connect(masterGainNode);

  // CONFIGURE OSC
  let time = audioCtx.currentTime;
  let panValue = remapNumber(b.pos.x, 0, cw, -1, 1);
  osc.frequency.value = rootTones[b.keyId] * intervals[b.noteId];
  gain.gain.linearRampToValueAtTime(0, time);
  panNode.pan.setValueAtTime(panValue, time);
  gain.gain.linearRampToValueAtTime(gainValue, time + fadeInTime);

  // PLAY
  osc.start(time);

  // STOP
  gain.gain.linearRampToValueAtTime(0, time + toneLength + fadeOutTime);
  osc.stop(time + toneLength);
}

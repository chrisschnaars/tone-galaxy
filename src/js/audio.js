/*
  TONE SETUP
*/

// Key and scale setup  
let rootTones;
const intervals = [ 1, 5/4, 4/3, 3/2, 9/5, 2 ]; // this will determine the notes that are played within each shape/key

// Set the variations of the key
function setKey(key = 65) {
  rootTones = [];

  // Key variations - each shape has it's own key
  const keyStates = [ 1, 3/2, 2, 8/4];

  // Create an array of the root tone for each key
  for (let i=0; i<keyStates.length; i++) {
    let k = key * keyStates[i];
    rootTones.push(k);
  }
}


/*
  OSCILLATOR SETUP
*/

// Audtio context
let audioCtx;

// Gain
let masterGainNode;

// Tone settings
const toneLength = 1;
const fadeInTime = 0.025;
const fadeOutTime = 0.015;
const gainValue = 0.65;

function setupAudioPlayback() {
  setKey();
  createAudioContext();
  setupMasterGain();
}

function createAudioContext() {
  let AudioContext = window.AudioContext || window.webkitAudioContext;

  if (AudioContext) {
    audioCtx = new AudioContext();
  } else {
    alert("Sorry, but the Web Audio API is not supported by your browser. Please, consider upgrading to the latest version or downloading Google Chrome or Mozilla Firefox");
  }
}

function setupMasterGain() {
  masterGainNode = audioCtx.createGain();
  masterGainNode.connect(audioCtx.destination);
  masterGainNode.gain.value = gainValue;
}

// Main play function
function playTone(b) {

  // Set current clock time
  const time = audioCtx.currentTime;

  // Set wave
  const wave = b.wave;
  const w = audioCtx.createPeriodicWave(wave.real, wave.imag);

  // Set oscillators
  const osc = audioCtx.createOscillator();
  osc.setPeriodicWave(w);

  // Create gain node
  const gain = audioCtx.createGain();

  // Connect oscillator to gain
  osc.connect(gain);

  // Handle panning
  if (audioCtx.createStereoPanner) {
    const panNode = audioCtx.createStereoPanner();
    gain.connect(panNode);
    panNode.connect(masterGainNode);
    let panValue = remapNumber(b.pos.x, 0, cw, -1, 1);
    panNode.pan.setValueAtTime(panValue, time);
  } else {
    gain.connect(masterGainNode);
  }

  // Configure oscilalator
  osc.frequency.value = rootTones[b.keyId] * intervals[b.noteId];
  gain.gain.linearRampToValueAtTime(0, time);
  gain.gain.linearRampToValueAtTime(gainValue, time + fadeInTime);

  // Play
  osc.start(time);

  // Stop
  gain.gain.linearRampToValueAtTime(0, time + fadeInTime + toneLength + fadeOutTime);
  osc.stop(time + toneLength);
}
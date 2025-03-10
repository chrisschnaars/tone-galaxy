// End onboarding and remove element
function endOnboarding() {
  // remove onboarding modal
  const el = document.querySelector('.js-onboarding');
  if (el) {
    el.remove();
  }

  // show control bar
  const controlBar = document.querySelector('.control-bar-wrapper');
  controlBar.classList.remove('control-bar-wrapper-onboarding');
}
  
// Set the size of shapes based on screen size
function setSizes() {
  const w = window.innerWidth;
  const h = window.innerHeight;

  // Set bubble fill size
  if (w > 1800 && h > 800) {
    bubbleFillSize = 40;
  } else if (w > 900 && h > 600) {
    bubbleFillSize = 28;
  } else {
    bubbleFillSize = 20;
  }

  bubbleSize = bubbleFillSize + bubbleStrokeSize;

  // SET DESIRED SEPARATION
  const sepCoefficient = 0.11; // Can't remember where this number came from!
  if (w < h) {
    desiredSeparation = h * sepCoefficient;
  } else {
    desiredSeparation = w * sepCoefficient;
  }

  // SET TONE SEPARATION
  toneSeparation = desiredSeparation * 0.99;
}
  
// GENERATE A RANDOM NUMBER
function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
  
// REMAP A NUMBER TO NEW RANGE
function remapNumber(oldValue, oldMin, oldMax, newMin, newMax) {
  let oldRange = oldMax - oldMin;
  let newRange = newMax - newMin;
  let newValue = (((oldValue - oldMin) * newRange) / oldRange) + newMin;

  return newValue;
}
  
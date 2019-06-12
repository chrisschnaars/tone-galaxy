// END ONBOARDING
function endOnboarding() {
  // ONBOARDING CONTAINER
  let ob = document.querySelector('.onboarding-container');
  // ADD HIDDEN CLASS
  ob.classList.add('onboarding-container-hidden');
  // TOGGLE ONBOARDING FLAG
  onboarding = false;
}

// SET SIZE AND QUANTITY OF BUBBLES GIVEN SCREEN SIZE
function setSizes() {
  // BROWSWER SIZE
  let w = window.innerWidth;
  let h = window.innerHeight;

  // SET BUBBLE FILL SIZE
  if (w > 1800 && h > 800) {
    bubbleFillSize = 32;
  } else if (w > 900 && h > 600) {
    bubbleFillSize = 24
  } else {
    bubbleFillSize = 16;
  }

  // SET BUBBLE SIZE
  bubbleSize = bubbleFillSize + bubbleStrokeSize;

  // SET DESIRED SEPARATION
  if (w < h) {
    desiredSeparation = h * 0.10;
  } else {
    desiredSeparation = w * 0.10;
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

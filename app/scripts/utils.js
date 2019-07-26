// END ONBOARDING
function endOnboarding() {
  // ONBOARDING CONTAINER
  let ob = document.querySelector('.onboarding');
  // ADD HIDDEN CLASS
  ob.classList.add('onboarding--hidden');
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
    bubbleFillSize = 28;
  } else {
    bubbleFillSize = 16;
  }

  // SET BUBBLE SIZE
  bubbleSize = bubbleFillSize + bubbleStrokeSize;

  // SET DESIRED SEPARATION
  const sepCoefficient = 0.11;
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

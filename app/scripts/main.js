/************************************************
GLOBAL VARIABLES
************************************************/

// OPERATING FLAGS
let onboarding = true;
let looping = true;

/************************************************
MAIN FUNCTIONALITY
************************************************/

// SETUP
window.onload = function() {
  // SETUP INTERACTIVITY
  setupInteraction();

  // EVENT LISTENER FOR ONBOARDING CTA
  document.addEventListener('click', function(e) {
    if (onboarding) {
      startBubbleTones();
    }
  });

  // startBubbleTones();
};

function startBubbleTones() {
  // END ONBOARDING
  endOnboarding();

  // SETUP AUDIO
  setupAudioPlayback();

  // CREATE OFFSCREEN CANVAS ELEMENTS
  createOffscreenCanvas();

  // CREATE BUBBLE OBJECTS
  createBubbles();
}

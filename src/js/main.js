// OPERATING FLAGS
let onboarding = true;
let looping = true;

/************************************************
MAIN FUNCTIONALITY
************************************************/

// Setup
window.onload = function() {
  setupInteraction();

  // Start audio context
  document.querySelector('.js-onboarding-cta').addEventListener('click', function(e) {
    startGalaxy();
  });
};

function startGalaxy() {
  endOnboarding();
  setupAudioPlayback();

  // Create offscreen canvas elements
  createOffscreenCanvas();

  // Render shapes
  createShapes();
}
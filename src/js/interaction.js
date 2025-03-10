function setupInteraction() {
  // Play/pause toggle
  const playToggle = document.querySelector('.js-play-toggle');
  playToggle.addEventListener("click", function(e) {
    e.target.blur();
    togglePlaying();
    e.preventDefault();
  },false);
  

  playToggle.addEventListener("touchend", function(e) {
    e.target.blur();
    togglePlaying();
    e.preventDefault();
  },false);

  // Tone slider
  const toneControl = document.querySelector(".js-tone-control");
  toneControl.addEventListener("input", function(e) {
    // Adjust root frequency
    const v = Number(this.value);
    setKey(v);

    toneControl.setAttribute('aria-valuenow', this.value);
  }, false);

  // Attraction selector
  document.querySelector('.js-attraction-selector').addEventListener('click', function(e){
    e.target.blur();
    const id = Number(e.target.value);
    updateAttractForces(id);
    updateAttractionToggleStatus(id);
    updateAttractionButtoneStatus(id);
  }, false);
  
  // Mobile attraction selector
  document.querySelector(".js-attraction-selector-mini").addEventListener('click', function(e){
    const id = Number(e.target.value) + 1;
    updateAttractForces(id);
    updateAttractionToggleStatus(id);
    updateAttractionButtoneStatus(id);  
    e.target.blur();
  }, false);

  // Info button
  document.querySelector(".js-about-open-btn").addEventListener("click", function() {
    toggleInfoPanel();
  }, false);

  // Keyboard events
  document.addEventListener('keydown', function(e) {
    if (e.key == " " || e.key == "Spacebar") {
      togglePlaying();
    }
  
    // Tab
    if (e.key === 'Tab') { // the "I am a keyboard user" key
      document.body.classList.add('user-is-tabbing');
    }
  }); 
}

function toggleInfoPanel() {
  const panel = document.querySelector(".js-about-panel");
  panel.classList.toggle('hidden');
}

function togglePlaying() {
  const playToggle = document.querySelector('.js-play-toggle');
  const playIcon = document.querySelector('.js-play-icon');
  const pauseIcon = document.querySelector('.js-pause-icon');

  if (looping) {
    noLoop();
    playIcon.classList.remove("hidden");
    pauseIcon.classList.add("hidden");
    looping = false;
  } else {
    loop();
    playIcon.classList.add("hidden");
    pauseIcon.classList.remove("hidden");
    looping = true;
  }
}
  
// Update attrtaction toggle
function updateAttractionToggleStatus(id) {
  const toggleButtons = document.querySelectorAll('.js-attraction-toggle');
  for (var i=0; i<toggleButtons.length; i++) {
    toggleButtons[i].classList.remove('btn-selected');
  }

  // Add selected class to current button
  if (id >= toggleButtons.length) {
    id = 0;
  }
  toggleButtons[id].classList.add('btn-selected');
}
  
// Update mini attractor button
function updateAttractionButtoneStatus(id) {
  const attractionModes = [ 'color', 'shape', 'unlike', 'none' ];

  if (id >= attractionModes.length) {
    id = 0;
  }

  const toggleButtonMini = document.querySelector('.js-attraction-selector-mini');
  toggleButtonMini.value = id;
  const l = attractionModes[id].charAt(0).toUpperCase() + attractionModes[id].slice(1);
  toggleButtonMini.innerHTML = l;
}
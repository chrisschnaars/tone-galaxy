/************************************************
INTERACTIVITY
************************************************/

// SETUP EVENT LISTENERS
function setupInteraction() {

  // PLAY/PAUSE BUTTON
  let playToggle = document.querySelector('#play-toggle');
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

  // TONE SLIDER
  let toneControl = document.querySelector("#tone");
  toneControl.addEventListener("input", function(e) {
    // ADJUST ROOT FREQUENCY
    let v = Number(this.value);
    setKey(v);
    // UPDATE ARIA ATTRIBUTE
    toneControl.setAttribute('aria-valuenow', this.value);
  }, false);

  // ATTRACTION SELECTOR
  document.querySelector('.attraction-selector').addEventListener('click', function(e){
    let id = Number(e.target.value);
    updateAttractForces(id);
    updateAttractionToggleStatus(id);
    updateAttractionButtoneStatus(id);
  }, false);

  // MOBILE ATTRACTION SELECTOR
  document.querySelector(".attraction-selector-mini").addEventListener('click', function(e){
    let id = Number(e.target.value) + 1;
    updateAttractForces(id);
    updateAttractionToggleStatus(id);
    updateAttractionButtoneStatus(id);
    console.log(id);
    e.target.blur();
  }, false);

  // ABOUT BUTTON - SHOW ABOUT MODAL
  document.querySelector("#about-modal-open").addEventListener("click", function(e) {
    document.querySelector("#about-modal").classList.add("visible");
    e.target.blur();
  }, false);

  // CLOSE ABOUT MODAL BUTTON
  document.querySelector("#about-modal-close").addEventListener("click", function(e) {
    document.querySelector("#about-modal").classList.remove("visible");
    e.target.blur();
  }, false);
}

// KEYBOARD EVENTS
document.addEventListener('keydown', function(e) {
  if (e.key == " " || e.key == "Spacebar") {
    togglePlaying();
  }

  // TABBING
  if (e.key === 'Tab') { // the "I am a keyboard user" key
      document.body.classList.add('user-is-tabbing');
      // window.removeEventListener('keydown', handleFirstTab);
  }
});

/************************************************
ACTIVITY UPDATES
************************************************/

// TOGGLE PLAYING
function togglePlaying() {
  // DOM ELEMENTS
  const playToggle = document.querySelector('#play-toggle');

  // TOGGLE PLAYING
  if (looping) {
    // STOP PLAYING
    noLoop();
    // TOGGLE BUTTON CLASS
    playToggle.classList.remove("pause-btn");
    playToggle.classList.add("play-btn");
    looping = false;
  } else {
    loop();
    playToggle.classList.remove("play-btn");
    playToggle.classList.add("pause-btn");
    looping = true;
  }
}

// UPDATE TOGGLE BUTTON GROUP FOR ACTIVE SELECTION
function updateAttractionToggleStatus(id) {
  // REMOVE SELECTED CLASS FROM ALL TOGGLES
  let toggleButtons = document.querySelectorAll('.toggle');
  for (var i=0; i<toggleButtons.length; i++) {
    toggleButtons[i].classList.remove('selected');
  }

  // ADD SELECTED CLASS TO SELECTED
  if (id >= toggleButtons.length) {
    id = 0;
  }
  toggleButtons[id].classList.add( "selected" );
}

// UPDATE MINI ATTRACTION BUTTON
function updateAttractionButtoneStatus(id) {
  // ARRAY OF ALL ATTRACTION MODES
  const attractionModes = [ 'color', 'shape', 'unlike', 'none' ];

  if (id >= attractionModes.length) {
    id = 0;
  }

  // UDPATE BUTTON VALUE
  const toggleButtonMini = document.querySelector('.attraction-selector-mini');
  toggleButtonMini.value = id;

  // UPDATE BUTTON COPY
  const toggleButtonLabel = document.querySelector('.attraction-mini-label');
  toggleButtonLabel.innerHTML = attractionModes[id];

}

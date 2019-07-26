/************************************************
INTERACTIVITY
************************************************/

// SETUP EVENT LISTENERS
function setupInteraction() {

  // PLAY/PAUSE BUTTON
  let playToggle = document.querySelector('.js-play-toggle');
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
  let toneControl = document.querySelector(".js-tone-control");
  toneControl.addEventListener("input", function(e) {
    // ADJUST ROOT FREQUENCY
    let v = Number(this.value);
    setKey(v);
    // UPDATE ARIA ATTRIBUTE
    toneControl.setAttribute('aria-valuenow', this.value);
  }, false);

  // ATTRACTION SELECTOR
  document.querySelector('.js-attraction-selector').addEventListener('click', function(e){
    e.target.blur();
    let id = Number(e.target.value);
    updateAttractForces(id);
    updateAttractionToggleStatus(id);
    updateAttractionButtoneStatus(id);
  }, false);

  // MOBILE ATTRACTION SELECTOR
  document.querySelector(".js-attraction-selector-mini").addEventListener('click', function(e){
    let id = Number(e.target.value) + 1;
    updateAttractForces(id);
    updateAttractionToggleStatus(id);
    updateAttractionButtoneStatus(id);
    console.log(id);
    e.target.blur();
  }, false);

  // ABOUT BUTTON - SHOW ABOUT MODAL
  document.querySelector(".js-about-open-btn").addEventListener("click", function() {
    document.querySelector(".about").classList.add("about--visible");
  }, false);

  // CLOSE ABOUT TOGGLEL
  document.querySelector(".js-about-close-btn").addEventListener("click", function() {
    document.querySelector(".about").classList.remove("about--visible");
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
  const playToggle = document.querySelector('.js-play-toggle');

  // TOGGLE PLAYING
  if (looping) {
    // STOP PLAYING
    noLoop();
    // TOGGLE BUTTON CLASS
    playToggle.classList.remove("btn--pause");
    playToggle.classList.add("btn--play");
    looping = false;
  } else {
    loop();
    playToggle.classList.remove("btn--play");
    playToggle.classList.add("btn--pause");
    looping = true;
  }
}

// UPDATE TOGGLE BUTTON GROUP FOR ACTIVE SELECTION
function updateAttractionToggleStatus(id) {
  console.log(id);

  // REMOVE SELECTED CLASS FROM ALL TOGGLES
  let toggleButtons = document.querySelectorAll('.btn--toggle');

  for (var i=0; i<toggleButtons.length; i++) {
    toggleButtons[i].classList.remove('btn--toggle-selected');
  }

  // ADD SELECTED CLASS TO SELECTED
  if (id >= toggleButtons.length) {
    id = 0;
  }
  toggleButtons[id].classList.add('btn--toggle-selected');
}

// UPDATE MINI ATTRACTION BUTTON
function updateAttractionButtoneStatus(id) {
  // ARRAY OF ALL ATTRACTION MODES
  const attractionModes = [ 'color', 'shape', 'unlike', 'none' ];

  if (id >= attractionModes.length) {
    id = 0;
  }

  // UDPATE BUTTON VALUE & LABEL
  const toggleButtonMini = document.querySelector('.js-attraction-selector-mini');
  toggleButtonMini.value = id;
  let l = attractionModes[id].charAt(0).toUpperCase() + attractionModes[id].slice(1);
  toggleButtonMini.innerHTML = l;

}

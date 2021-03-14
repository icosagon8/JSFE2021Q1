'use strict';

function playNote(src) {
  const audio = new Audio(src);
  audio.currentTime = 0;
  audio.play();
}

function playNoteKey(evt) {
  const key = evt.code.replace('Key', '');
  const pianoKey = document.querySelector(`.piano-key[data-letter='${key}'`);

  if (!pianoKey || evt.repeat) {
    return;
  }

  const src = `/assets/audio/${pianoKey.dataset.note}.mp3`;

  pianoKey.classList.add('piano-key-active');
  playNote(src);
}

function removeTransitionKey(evt) {
  const key = evt.code.replace('Key', '');
  const pianoKey = document.querySelector(`.piano-key[data-letter='${key}'`);

  if (!pianoKey) {
    return;
  }

  pianoKey.classList.remove('piano-key-active');
}

window.addEventListener('keydown', playNoteKey);
window.addEventListener('keyup', removeTransitionKey);


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

function playNoteMouse(evt) {
  if (evt.button === 0) {
    if (evt.target.classList.contains('piano-key')) {
      const src = `/assets/audio/${evt.target.dataset.note}.mp3`;
      evt.target.classList.add('piano-key-active', 'piano-key-active-pseudo');
      playNote(src);
    }
  }
}

function removeTransitionMouse(evt) {
  evt.target.classList.remove('piano-key-active', 'piano-key-active-pseudo');
}

function mouseOver(evt) {
  if (evt.target.classList.contains('piano-key')) {
    const src = `/assets/audio/${evt.target.dataset.note}.mp3`;
    evt.target.classList.add('piano-key-active', 'piano-key-active-pseudo');
    playNote(src);
  }
}

function mouseOut(evt) {
  evt.target.classList.remove('piano-key-active', 'piano-key-active-pseudo');
}

window.addEventListener('keydown', playNoteKey);
window.addEventListener('keyup', removeTransitionKey);

const piano = document.querySelector('.piano');

piano.addEventListener('mousedown', playNoteMouse);
piano.addEventListener('mouseup', removeTransitionMouse);

piano.addEventListener('mousedown', () => {
  piano.addEventListener('mouseover', mouseOver);
  piano.addEventListener('mouseout', mouseOut);
})

document.addEventListener('mouseup', () => {
  piano.removeEventListener('mouseover', mouseOver);
  piano.removeEventListener('mouseout', mouseOut);
})

const btnNotes = document.querySelector('.btn-notes');
const btnLetters = document.querySelector('.btn-letters');
const pianoКeys = document.querySelectorAll('.piano-key[data-letter]');

btnLetters.addEventListener('click', () => {
  btnNotes.classList.remove('btn-active');
  btnLetters.classList.add('btn-active');
  pianoКeys.forEach(pianoКey => pianoКey.classList.add('piano-key-letter'));
});

btnNotes.addEventListener('click', () => {
  btnLetters.classList.remove('btn-active');
  btnNotes.classList.add('btn-active');
  pianoКeys.forEach(pianoКey => pianoКey.classList.remove('piano-key-letter'));
});
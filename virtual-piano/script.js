'use strict';

function playNote(src) {
  const audio = new Audio(src);
  audio.currentTime = 0;
  audio.play();
}

function onKeydown(evt) {
  const key = evt.code.replace('Key', '');
  const pianoKey = document.querySelector(`.piano-key[data-letter='${key}'`);

  if (!pianoKey || evt.repeat) {
    return;
  }

  const src = `/assets/audio/${pianoKey.dataset.note}.mp3`;

  pianoKey.classList.add('piano-key-active');
  playNote(src);
}

function onKeyup(evt) {
  const key = evt.code.replace('Key', '');
  const pianoKey = document.querySelector(`.piano-key[data-letter='${key}'`);

  if (!pianoKey) {
    return;
  }

  pianoKey.classList.remove('piano-key-active');
}

function onPianoMousedown(evt) {
  if (evt.button === 0) {
    if (evt.target.classList.contains('piano-key')) {
      const src = `/assets/audio/${evt.target.dataset.note}.mp3`;
      evt.target.classList.add('piano-key-active', 'piano-key-active-pseudo');
      playNote(src);
    }
  }
}

function onPianoMouseup(evt) {
  evt.target.classList.remove('piano-key-active', 'piano-key-active-pseudo');
}

function onPianoMouseover(evt) {
  if (evt.target.classList.contains('piano-key')) {
    const src = `/assets/audio/${evt.target.dataset.note}.mp3`;
    evt.target.classList.add('piano-key-active', 'piano-key-active-pseudo');
    playNote(src);
  }
}

function onPianoMouseout(evt) {
  evt.target.classList.remove('piano-key-active', 'piano-key-active-pseudo');
}

function onFullscreenButtonClick() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

window.addEventListener('keydown', onKeydown);
window.addEventListener('keyup', onKeyup);

const piano = document.querySelector('.piano');

piano.addEventListener('mousedown', onPianoMousedown);
piano.addEventListener('mouseup', onPianoMouseup);

piano.addEventListener('mousedown', () => {
  piano.addEventListener('mouseover', onPianoMouseover);
  piano.addEventListener('mouseout', onPianoMouseout);
})

document.addEventListener('mouseup', () => {
  piano.removeEventListener('mouseover', onPianoMouseover);
  piano.removeEventListener('mouseout', onPianoMouseout);
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

const btnFullScreen = document.querySelector('.fullscreen');
btnFullScreen.addEventListener('click', onFullscreenButtonClick);

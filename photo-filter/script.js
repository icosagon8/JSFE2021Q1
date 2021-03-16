'use strict';

function onFiltersInput(evt) {
  const suffix = evt.target.dataset.sizing;
  document.documentElement.style.setProperty(`--${evt.target.name}`, evt.target.value + suffix);

  if (evt.target.nextElementSibling.matches('output[name=result]')) {
    evt.target.nextElementSibling.value = evt.target.value;
  }
}

function onResetClick() {
  document.documentElement.removeAttribute('style');

  inputs.forEach(input => {
    input.value = input.defaultValue;
  })

  outputs.forEach(output => {
    output.value = output.defaultValue;
  })
}

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

const filters = document.querySelector('.filters');
filters.addEventListener('input', onFiltersInput);

const btnReset = document.querySelector('.btn-reset');
const inputs = document.querySelectorAll('.filters input');
const outputs = document.querySelectorAll('.filters output');
btnReset.addEventListener('click', onResetClick);

const btnFullScreen = document.querySelector('.fullscreen');
btnFullScreen.addEventListener('click', toggleFullScreen);

const fileInput = document.querySelector('input[type="file"]');
const image = document.querySelector('.editor img');

fileInput.addEventListener('change', function (evt) {
  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.addEventListener('load', () => {
    image.src = reader.result;
  })

  reader.readAsDataURL(file);
});
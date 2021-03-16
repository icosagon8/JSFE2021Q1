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

const filters = document.querySelector('.filters');
filters.addEventListener('input', onFiltersInput);

const btnReset = document.querySelector('.btn-reset');
const inputs = document.querySelectorAll('.filters input');
const outputs = document.querySelectorAll('.filters output');
btnReset.addEventListener('click', onResetClick);
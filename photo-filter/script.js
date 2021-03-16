'use strict';

function onFiltersInput(evt) {
  const suffix = evt.target.dataset.sizing;
  document.documentElement.style.setProperty(`--${evt.target.name}`, evt.target.value + suffix);

  if (evt.target.nextElementSibling.matches('output[name=result]')) {
    evt.target.nextElementSibling.value = evt.target.value;
  }
}

const filters = document.querySelector('.filters');
filters.addEventListener('input', onFiltersInput);

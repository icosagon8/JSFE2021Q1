'use strict';

function onFiltersInput(evt) {
  const suffix = evt.target.dataset.sizing;
  document.documentElement.style.setProperty(`--${evt.target.name}`, evt.target.value + suffix);
}

const filters = document.querySelector('.filters');
filters.addEventListener('input', onFiltersInput);

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

function onFullscreenButtonClick() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

function onLoadButtonChange() {
  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.addEventListener('load', () => {
    image.src = reader.result;
  })

  reader.readAsDataURL(file);
}

function getPartOfDay() {
  const date = new Date();
  const hours = date.getHours();

  if (hours >= 6 && hours < 12) {
    return 'morning';
  }

  if (hours >= 12 && hours < 18) {
    return 'day';
  }

  if (hours >= 18 && hours < 24) {
    return 'evening';
  }

  if (hours >= 0 && hours < 6) {
    return 'night';
  }
}

function makeGetImage() {
  const BASE = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/';
  const IMAGES = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
  const partOfDay = getPartOfDay();
  let count = 0;

  return () => {
    const imageIndex = count % IMAGES.length;
    const imageUrl = `${BASE}${partOfDay}/${IMAGES[imageIndex]}`;
    viewImage(imageUrl);
    count++;
    btnNext.disabled = true;
    setTimeout(() => {
      btnNext.disabled = false;
    }, 1000);
  }
}

function viewImage(src) {
  const img = new Image();
  img.src = src;
  img.addEventListener('load', () => {
    image.src = src;
  })
}

function onSaveButtonClick() {
  const canvas = document.createElement('canvas');
  const img = new Image();
  img.src = image.src;
  img.setAttribute('crossOrigin', 'anonymous');
  img.addEventListener('load', () => {
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.filter = getComputedStyle(image).getPropertyValue('filter');
    ctx.drawImage(img, 0, 0);
    const dataUrl = canvas.toDataURL('image/jpeg');
    saveImage(dataUrl);
  });
}

function saveImage(url) {
  const link = document.createElement('a');
  link.download = 'download.jpg';
  link.href = url;
  link.click();
  link.delete;
}

const filters = document.querySelector('.filters');
filters.addEventListener('input', onFiltersInput);

const btnReset = document.querySelector('.btn-reset');
const inputs = document.querySelectorAll('.filters input');
const outputs = document.querySelectorAll('.filters output');
btnReset.addEventListener('click', onResetClick);

const btnFullScreen = document.querySelector('.fullscreen');
btnFullScreen.addEventListener('click', onFullscreenButtonClick);

const fileInput = document.querySelector('input[type="file"]');
const image = document.querySelector('.editor img');
fileInput.addEventListener('change', onLoadButtonChange);

const btnNext = document.querySelector('.btn-next');
const onNextClick = makeGetImage();
btnNext.addEventListener('click', onNextClick);

const btnSave = document.querySelector('.btn-save');
btnSave.addEventListener('click', onSaveButtonClick);

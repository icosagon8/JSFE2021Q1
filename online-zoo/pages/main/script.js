'use strict';

function onSwitchButtonChange() {
  if (this.checked) {
    document.documentElement.dataset.theme = 'dark';
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.dataset.theme = 'light';
    localStorage.setItem('theme', 'light');
  }
}

const toggleSwitch = document.querySelector('.switch__field');
toggleSwitch.addEventListener('change', onSwitchButtonChange);

const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
  document.documentElement.dataset.theme = currentTheme;

  if (currentTheme === 'dark') {
    toggleSwitch.checked = true;
  }
}

const slidesContainer = document.querySelector('.pets__list');
const slides = document.querySelectorAll('.pets__item');
const btnLeft = document.querySelector('.pets__btn--left');
const btnRight = document.querySelector('.pets__btn--right');
const petsRange = document.querySelector('.pets__range');
const petsOutput = document.querySelector('.pets__output-number');
const slidesNumber = slides.length;
const SLIDES_VISIBLE = 4;
let currentPosition = 0;
let value = +petsRange.min;

function setPosition(position, flag) {
  if (!flag && value === 1) {
    currentPosition = -(slidesNumber % SLIDES_VISIBLE + SLIDES_VISIBLE) * 100;
    slides.forEach(slide => {
      slide.style.transform = `translateX(${currentPosition}%)`;
    })
    return false;
  }

  if (!flag && (value > 5 || !currentPosition)) {
    return false;
  }

  if (flag && value === 8) {
    currentPosition = 0;
    slides.forEach(slide => {
      slide.style.transform = `translateX(0%)`;
    })
    return false;
  }

  if (flag && (value < 4 || currentPosition < -300)) {
    return false;
  }
  currentPosition = position;

  slides.forEach(slide => {
    slide.style.transform = `translateX(${position}%)`;
  })
}

function setRangeValues(flag) {
  if (value <= petsRange.min) {
    if (flag) {
      value += +petsRange.step;
      petsRange.value = value;
    } else {
      value = +petsRange.max;
      petsRange.value = petsRange.max;
    }
  } else if (value >= petsRange.max) {
    if (flag) {
      value = +petsRange.min;
      petsRange.value = petsRange.min;
    } else {
      value -= +petsRange.step;
      petsRange.value = value;
    }
  } else {
    flag ? value += +petsRange.step : value -= +petsRange.step;
    petsRange.value = value;
  }

  petsOutput.textContent = `0${value}`;
}

function toggleActive() {
  slides.forEach((item) => {
    item.classList.remove('pets__item--active');
  });

  slides[value - 1].classList.add('pets__item--active');
}

function onBtnRightClick() {
  setPosition(currentPosition - 100, true);
  setRangeValues(true);
  toggleActive();
}

function onBtnLeftClick() {
  setPosition(currentPosition + 100, false);
  setRangeValues(false);
  toggleActive();
}

btnRight.addEventListener('click', onBtnRightClick);
btnLeft.addEventListener('click', onBtnLeftClick);

function onPetsRangeInput(evt) {
  if (evt.target.value > value) {
    setPosition(currentPosition - 100, true);
  } else {
    setPosition(currentPosition + 100, false);
  }

  setRangeValues(evt.target.value > value);
  toggleActive();
}

petsRange.addEventListener('input', onPetsRangeInput);

const firstScreenRange = document.querySelector('.first-screen__range');
const firstScreenOutput = document.querySelector('.first-screen__output-number');
const firstScreenList = document.querySelector('.first-screen__list');
const firstScreenItems = document.querySelectorAll('.first-screen__item');
let firstScreenItem = document.querySelector('.first-screen__item:not(.first-screen__item--active)');
let firstScreenItemWidth = firstScreenItem.offsetWidth;
let firstScreenGap = parseInt(getComputedStyle(firstScreenList).gap);

window.addEventListener('resize', () => {
  firstScreenItem = document.querySelector('.first-screen__item:not(.first-screen__item--active)');
  firstScreenItemWidth = firstScreenItem.offsetWidth;
  firstScreenGap = parseInt(getComputedStyle(firstScreenList).gap);
  firstScreenList.style.transform = `translateX(${-(firstScreenItemWidth + firstScreenGap)*(rangeValue - 2)}px)`;
});

let rangeValue = firstScreenRange.value;

function setFirstScreenSliderPosition() {
  firstScreenList.style.transform = `translateX(${-(firstScreenItemWidth + firstScreenGap)*(rangeValue - 2)}px)`;

  firstScreenItems.forEach((item) => {
    item.classList.remove('first-screen__item--active');
  });

  firstScreenItems[rangeValue - 1].classList.add('first-screen__item--active');
}

function onfirstScreenRangeInput() {
  rangeValue = firstScreenRange.value;
  firstScreenOutput.textContent = `0${rangeValue}`;
  setFirstScreenSliderPosition();
}

firstScreenRange.addEventListener('input', onfirstScreenRangeInput);

firstScreenItems.forEach((item) => {
  item.addEventListener('click', (evt) => {
    const node = evt.target.parentElement;
    rangeValue = [...node.children].indexOf(evt.target) + 1;
    firstScreenOutput.textContent = `0${rangeValue}`;
    firstScreenRange.value = rangeValue;
    setFirstScreenSliderPosition();
  })
})

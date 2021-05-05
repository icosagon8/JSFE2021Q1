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

const animalPreviewImages = document.querySelectorAll('.animal__preview-image');
const animalVideo = document.querySelector('.animal__video');
animalVideo.setAttribute('crossOrigin', 'anonymous');

function onAnimalPreviewImageClick(evt) {
  let src = evt.target.src.slice(-25, -14);
  let videoSrc = animalVideo.src.slice(-11);
  animalVideo.src = `https://www.youtube.com/embed/${src}`;
  evt.target.src = `https://img.youtube.com/vi/${videoSrc}/mqdefault.jpg`;
}

animalPreviewImages.forEach(animalPreviewImage => {
  animalPreviewImage.addEventListener('click', onAnimalPreviewImageClick);
})

const animalCarousel = document.querySelector('.animal__preview-wrapper');
const animalPreviewContainer = document.querySelector('.animal__preview');
const animalPreview = document.querySelectorAll('.animal__preview-item');
const animalDotsContainer = document.querySelector('.animal__dots');

let carouselWidth = animalPreviewContainer.offsetWidth;
let imageWidth = animalPreview[0].offsetWidth;
let gap = (carouselWidth * parseFloat(getComputedStyle(animalPreviewContainer).gap)) / 100;

window.addEventListener('resize', () => {
  carouselWidth = animalPreviewContainer.offsetWidth;
  imageWidth = animalPreview[0].offsetWidth;
  gap = (carouselWidth * parseFloat(getComputedStyle(animalPreviewContainer).gap)) / 100;
  animalCarousel.scrollTo((imageWidth + gap) * slideIndex, 0);
});

let slidesVisible = Math.floor(carouselWidth / imageWidth);
let dotsNumber = Math.ceil(animalPreview.length / slidesVisible);
let slideIndex = 0;
let value = 1;

function onAnimalDotsClick(evt) {
  if (evt.target.dataset.value > value) {
    slideIndex += slidesVisible * (evt.target.dataset.value - value);
    animalCarousel.scrollTo((imageWidth + gap) * slideIndex, 0);
    value += evt.target.dataset.value - value;
  } else {
    slideIndex -= slidesVisible * (value - evt.target.dataset.value);
    animalCarousel.scrollTo((imageWidth + gap) * slideIndex, 0);
    value -= value - evt.target.dataset.value;
  }

  if (!evt.target.classList.contains('animal__dots-item--active')) {
    animalDots.forEach(dot => {
      dot.classList.remove('animal__dots-item--active');
    })

    evt.target.classList.add('animal__dots-item--active');
  }
}

function createDots(dots) {
  let fragment = new DocumentFragment();

  for (let i = 1; i <= dots; i++) {
    let li = document.createElement('li');
    li.className = 'animal__dots-item';
    fragment.append(li);

    if (i === 1) {
      li.classList.add('animal__dots-item--active');
    }
  }

  return fragment;
}

animalDotsContainer.append(createDots(dotsNumber));
const animalDots = document.querySelectorAll('.animal__dots-item');

animalDots.forEach((dot, index) => {
  dot.dataset.value = index + 1;
  dot.addEventListener('click', onAnimalDotsClick);
})

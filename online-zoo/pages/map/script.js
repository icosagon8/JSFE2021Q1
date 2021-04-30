'use strict';
const switchButton = document.querySelector('.switch__field');

function onSwitchButtonChange () {
  if (this.checked) {
    document.documentElement.dataset.theme = 'dark';
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.dataset.theme = 'light';
    localStorage.setItem('theme', 'light');
  }
}

const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

if (currentTheme) {
    document.documentElement.dataset.theme = currentTheme;

    if (currentTheme === 'dark') {
      switchButton.checked = true;
    }
}

switchButton.addEventListener('change', onSwitchButtonChange);

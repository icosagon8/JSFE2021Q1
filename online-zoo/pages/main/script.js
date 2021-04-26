'use strict';

function onSwitchButtonChange () {
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

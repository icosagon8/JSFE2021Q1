import './assets/styles/styles.scss';
import { App } from './app';

const rootNode = document.body;
window.onload = () => {
  window.location.hash = '#/';
  (() => new App(rootNode))();
};

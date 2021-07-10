import './assets/styles/styles.scss';
import { App } from './app';

const rootNode = document.body;
window.location.hash = '#/';
(() => new App(rootNode))();

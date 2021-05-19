import './styles.scss';
import { App } from './app';

const rootNode = document.body;

if (!rootNode) {
  throw new Error('Root element not found');
}

new App(rootNode).start();

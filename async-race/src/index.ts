import './assets/styles/styles.scss';
import { Page } from './pages/page';

const rootNode = document.body;
(() => new Page(rootNode))();

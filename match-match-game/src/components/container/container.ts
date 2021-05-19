import './container.scss';
import { BaseComponent } from '../base-component';

export class Container extends BaseComponent {
  constructor() {
    super('div', ['container']);
  }
}

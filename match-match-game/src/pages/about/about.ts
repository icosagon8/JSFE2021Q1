import { BaseComponent } from '../../components/base-component';

export class About extends BaseComponent {
  constructor() {
    super('main', ['page']);
    this.element.textContent = 'About Page Placeholder';
  }
}

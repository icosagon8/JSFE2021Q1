import { BaseComponent } from '../../components/base-component';

export class Settings extends BaseComponent {
  constructor() {
    super('main', ['page']);
    this.element.textContent = 'Settings Page Placeholder';
  }
}

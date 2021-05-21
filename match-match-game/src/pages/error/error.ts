import { BaseComponent } from '../../components/base-component';

export class ErrorPage extends BaseComponent {
  constructor() {
    super('main', ['page']);
    this.element.textContent = '404';
  }
}

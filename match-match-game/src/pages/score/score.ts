import { BaseComponent } from '../../components/base-component';

export class Score extends BaseComponent {
  constructor() {
    super('main', ['page']);
    this.element.textContent = 'Score Page Placeholder';
  }
}

import './avatar.scss';
import { BaseComponent } from '../base-component';
import avatar from '../../assets/images/avatar.jpg';

export class Avatar extends BaseComponent {
  constructor() {
    super('div', ['avatar']);
    this.element.innerHTML = `
      <img class='avatar__img' src='${avatar}'>
    `;
  }
}

import './logo.scss';
import { BaseComponent } from '../base-component';
import image from '../../assets/images/logo.svg';

export class Logo extends BaseComponent {
  constructor() {
    super('img', ['logo']);
    this.element.setAttribute('src', image);
  }
}

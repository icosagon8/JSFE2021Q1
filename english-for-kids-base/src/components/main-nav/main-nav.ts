import './main-nav.scss';
import { Component } from '../component';
import { RootElement } from '../../models/root-element-model';

export class MainNav extends Component {
  toggle: Component;

  lines: Component;

  constructor(parentNode: RootElement) {
    super(parentNode, 'nav', ['main-nav']);
    this.toggle = new Component(this.element, 'button', ['main-nav__toggle'], '', [['type', 'button']]);
    this.lines = new Component(this.toggle.element, 'span', ['main-nav__lines']);
    this.setEventHandlers();
  }

  private setEventHandlers(): void {
    this.toggle.element.addEventListener('click', () => this.toggleClickHandler());
  }

  private toggleClickHandler(): void {
    this.transformLines();
  }

  private transformLines(): void {
    this.toggle.element.classList.toggle('main-nav__toggle--open');
  }
}

import './main-nav.scss';
import { BaseComponent } from '../base-component';

export class MainNav extends BaseComponent {
  constructor() {
    super('nav', ['main-nav']);
    this.element.innerHTML = `
      <ul class='main-nav__list'>
        <li>
          <a class='main-nav__link main-nav__link--about' href='#'>About Game</a>
        </li>
        <li>
          <a class='main-nav__link main-nav__link--score' href='#/score'>Best Score</a>
        </li>
        <li>
          <a class='main-nav__link main-nav__link--settings' href='#/settings'>Game Settings</a>
        </li>
      </ul>
      `;
  }
}

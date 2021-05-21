import './about.scss';
import { BaseComponent } from '../../components/base-component';
import registr from '../../assets/images/registr-new-player.png';
import settings from '../../assets/images/game-settings.png';
import cardField from '../../assets/images/card-field.jpg';

export class About extends BaseComponent {
  constructor() {
    super('main', ['about']);
    this.element.innerHTML = `
      <h1 class='about__title'>How to play?</h1>
      <ul class='about__list'>
        <li class='about__item'>
          <div class='about__desc'>
            <p class='about__text'>Register new player in game</p>
          </div>
          <div>
            <img src='${registr}' width='302' height='218' alt='Registration'>
          </div>
        </li>
        <li class='about__item'>
          <div class='about__desc'>
            <p class='about__text'>Configure your game settings</p>
          </div>
          <div>
            <img src='${settings}' width='116' height='73' alt='Game settings'>
          </div>
        </li>
        <li class='about__item'>
          <div class='about__desc'>
            <p class='about__text'>Start you new game! Remember card positions and match it before times up.</p>
          </div>
          <div>
            <img src='${cardField}' width='330' height='240' alt='Card field'>
          </div>
        </li>
      </ul>
    `;
  }
}

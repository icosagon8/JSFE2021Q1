import './page.scss';
import { Component } from '../components/component';
import { RootElement } from '../models/root-element-model';
import { updateWinnersState } from '../store';
import { Garage } from './garage/garage';
import { Winners } from './winners/winners';

export class Page extends Component {
  garage: Garage;

  garageBtn: Component;

  winnersBtn: Component;

  winners: Winners;

  nav: Component;

  constructor(parentNode: RootElement) {
    super(parentNode, 'div', ['page']);
    this.nav = new Component(this.element, 'div', ['page__nav']);
    this.garageBtn = new Component(this.nav.element, 'button', ['btn', 'garage-btn'], 'Garage', [['disabled', '']]);
    this.winnersBtn = new Component(this.nav.element, 'button', ['btn', 'winners-btn'], 'Winners');
    this.garage = new Garage(this.element);
    this.winners = new Winners(this.element);
    this.winners.element.style.display = 'none';
    this.garageBtn.element.addEventListener('click', () => this.onGarageBtnClick());
    this.winnersBtn.element.addEventListener('click', () => this.onWinnersBtnClick());
  }

  onGarageBtnClick(): void {
    this.garage.element.style.display = 'block';
    this.winners.element.style.display = 'none';
    this.winnersBtn.element.removeAttribute('disabled');
    this.garageBtn.element.setAttribute('disabled', '');
  }

  async onWinnersBtnClick(): Promise<void> {
    this.winners.element.style.display = 'block';
    this.garage.element.style.display = 'none';
    this.winners.element.remove();
    await updateWinnersState();
    this.winners = new Winners(this.element);
    this.garageBtn.element.removeAttribute('disabled');
    this.winnersBtn.element.setAttribute('disabled', '');
  }
}

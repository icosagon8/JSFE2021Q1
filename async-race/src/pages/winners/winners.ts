import './winners.scss';
import { CarImage } from '../../components/car-image/car-image';
import { Component } from '../../components/component';
import { RootElement } from '../../models/root-element-model';
import { store, updateWinnersState } from '../../store';
import { controlSortTriangle, sortTable } from '../../utils/utils';

const WINNERS_PAGE_LIMIT = 10;

export class Winners extends Component {
  title: Component;

  pageCount: Component;

  table: Component;

  tableHead: Component;

  numberTh: Component;

  carTh: Component;

  nameTh: Component;

  winsTh: Component;

  timeTh: Component;

  tableBody: Component;

  row?: Component;

  number?: Component;

  carImage?: Component;

  name?: Component;

  wins?: Component;

  bestTime?: Component;

  car?: Component;

  pageControls: Component;

  prevBtn: Component;

  nextBtn: Component;

  constructor(parentNode: RootElement) {
    super(parentNode, 'div', ['winners']);
    this.title = new Component(this.element, 'h1', ['winners__title'], `Winners (${store.winnersNumber})`);
    this.pageControls = new Component(this.element, 'div', ['winners__page-controls']);
    this.pageCount = new Component(
      this.pageControls.element,
      'p',
      ['winners__page-count'],
      `Page №${store.winnersPage}`
    );
    this.prevBtn = new Component(this.pageControls.element, 'button', ['btn', 'winners__prev-btn'], 'Prev', [
      ['type', 'button'],
    ]);
    this.nextBtn = new Component(this.pageControls.element, 'button', ['btn', 'winners__next-btn'], 'Next', [
      ['type', 'button'],
    ]);
    this.table = new Component(this.element, 'table', ['winners__table']);
    this.tableHead = new Component(this.table.element, 'thead');
    this.numberTh = new Component(this.tableHead.element, 'th', [], 'Number');
    this.carTh = new Component(this.tableHead.element, 'th', [], 'Car');
    this.nameTh = new Component(this.tableHead.element, 'th', [], 'Name');
    this.winsTh = new Component(this.tableHead.element, 'th', ['winners__wins'], 'Wins');
    this.timeTh = new Component(this.tableHead.element, 'th', ['winners__time'], 'Best time (s)');
    this.tableBody = new Component(this.table.element, 'tbody');
    this.addWinners();
    this.prevBtn.element.addEventListener('click', () => this.onPrevBtnClick());
    this.nextBtn.element.addEventListener('click', () => this.onNextBtnClick());
    this.winsTh.element.addEventListener('click', () => this.onWinsThClick());
    this.timeTh.element.addEventListener('click', () => this.onTimeThClick());
    this.controlPaginationButtons();
  }

  addWinners(): void {
    const { winners } = store;
    winners.forEach((winner, index) => {
      this.row = new Component(this.tableBody.element, 'tr');
      this.number = new Component(
        this.row.element,
        'td',
        [],
        `${(store.winnersPage - 1) * WINNERS_PAGE_LIMIT + (index + 1)}`
      );
      this.car = new Component(this.row.element, 'td');
      this.carImage = new CarImage(this.car.element, `${winner.color}`, ['winners__image']);
      this.name = new Component(this.row.element, 'td', [], `${winner.name}`);
      this.wins = new Component(this.row.element, 'td', [], `${winner.wins}`);
      this.bestTime = new Component(this.row.element, 'td', [], `${winner.time}`);
    });
  }

  async onNextBtnClick(): Promise<void> {
    store.winnersPage += 1;
    await updateWinnersState();
    this.pageCount.element.textContent = `Page №${store.winnersPage}`;
    this.tableBody.element.innerHTML = '';
    this.addWinners();
    this.controlPaginationButtons();
  }

  async onPrevBtnClick(): Promise<void> {
    store.winnersPage -= 1;
    await updateWinnersState();
    this.pageCount.element.textContent = `Page №${store.winnersPage}`;
    this.tableBody.element.innerHTML = '';
    this.addWinners();
    this.controlPaginationButtons();
  }

  controlPaginationButtons(): void {
    if (store.winnersPage * WINNERS_PAGE_LIMIT >= store.winnersNumber) {
      this.nextBtn.element.setAttribute('disabled', '');
    } else {
      this.nextBtn.element.removeAttribute('disabled');
    }

    if (store.winnersPage === 1) {
      this.prevBtn.element.setAttribute('disabled', '');
    } else {
      this.prevBtn.element.removeAttribute('disabled');
    }
  }

  async onWinsThClick(): Promise<void> {
    await sortTable('wins');
    controlSortTriangle(this.winsTh.element);
    this.tableBody.element.innerHTML = '';
    this.addWinners();
  }

  async onTimeThClick(): Promise<void> {
    await sortTable('time');
    controlSortTriangle(this.timeTh.element);
    this.tableBody.element.innerHTML = '';
    this.addWinners();
  }
}

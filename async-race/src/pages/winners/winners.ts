import { CarImage } from '../../components/car-image/car-image';
import { Component } from '../../components/component';
import { RootElement } from '../../models/root-element-model';
import { store } from '../../store';

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

  constructor(parentNode: RootElement) {
    super(parentNode, 'div', ['page', 'winners']);
    this.title = new Component(this.element, 'h1', ['garage__title'], `Winners (${store.winnersNumber})`);
    this.pageCount = new Component(this.element, 'p', ['garage__page-count'], `Page №${store.winnersPage}`);
    this.table = new Component(this.element, 'table', ['winners__table']);
    this.tableHead = new Component(this.table.element, 'thead');
    this.numberTh = new Component(this.tableHead.element, 'th', [], 'Number');
    this.carTh = new Component(this.tableHead.element, 'th', [], 'Car');
    this.nameTh = new Component(this.tableHead.element, 'th', [], 'Name');
    this.winsTh = new Component(this.tableHead.element, 'th', [], 'Wins');
    this.timeTh = new Component(this.tableHead.element, 'th', [], 'Best time (seconds)');
    this.tableBody = new Component(this.table.element, 'tbody');
    this.addWinners();
  }

  addWinners(): void {
    const { winners } = store;
    winners.forEach((winner, index) => {
      this.row = new Component(this.tableBody.element, 'tr');
      this.number = new Component(this.row.element, 'td', [], `${index + 1}`);
      this.car = new Component(this.row.element, 'td');
      this.carImage = new CarImage(this.car.element, `${winner.color}`, ['winners__image']);
      this.name = new Component(this.row.element, 'td', [], `${winner.name}`);
      this.wins = new Component(this.row.element, 'td', [], `${winner.wins}`);
      this.bestTime = new Component(this.row.element, 'td', [], `${winner.time}`);
    });
  }
}

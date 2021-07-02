import './statistics.scss';
import { Component } from '../../components/component';
import { RootElement } from '../../models/root-element-model';
import { StatisticsModel } from '../../models/statistics-model';

export class Statistics extends Component {
  container: Component;

  table: Component;

  tableHead: Component;

  categoryTh: Component;

  wordTh: Component;

  translationTh: Component;

  tableBody: Component;

  constructor(parentNode: RootElement) {
    super(parentNode, 'main', ['container', 'main']);
    this.container = new Component(this.element, 'div', ['statistics__table-container']);
    this.table = new Component(this.container.element, 'table', ['statistics__table']);
    this.tableHead = new Component(this.table.element, 'thead');
    this.categoryTh = new Component(this.tableHead.element, 'th', [], 'Category');
    this.wordTh = new Component(this.tableHead.element, 'th', [], 'Word');
    this.translationTh = new Component(this.tableHead.element, 'th', [], 'Translation');
    this.tableBody = new Component(this.table.element, 'tbody');
    this.addWords();
  }

  addWords(): void {
    const statisticsData = localStorage.getItem('statistics');

    if (statisticsData) {
      const statistics: StatisticsModel[] = JSON.parse(statisticsData);

      statistics.forEach((item) => {
        const row = new Component(this.tableBody.element, 'tr');
        (() => new Component(row.element, 'td', [], item.category))();
        (() => new Component(row.element, 'td', [], item.word))();
        (() => new Component(row.element, 'td', [], item.translation))();
      });
    }
  }
}

import './statistics.scss';
import { Component } from '../../components/component';
import { RootElement } from '../../models/root-element-model';
import { StatisticsModel } from '../../models/statistics-model';
import { initLocalStorage } from '../../local-storage/local-storage';

export class Statistics extends Component {
  container: Component;

  table: Component;

  tableHead: Component;

  categoryTh: Component;

  wordTh: Component;

  translationTh: Component;

  tableBody: Component;

  clickTh: Component;

  hitTh: Component;

  missTh: Component;

  percentTh: Component;

  sortDirections: string[];

  tableHeaders: Element[];

  resetBtn: Component;

  repeatBtn: Component;

  buttonsContainer: Component;

  constructor(parentNode: RootElement) {
    super(parentNode, 'main', ['container', 'main']);
    this.buttonsContainer = new Component(this.element, 'div', ['statistics__btn-container']);
    this.repeatBtn = new Component(
      this.buttonsContainer.element,
      'button',
      ['statistics__btn', 'statistics__btn--repeat'],
      'Repeat difficult words'
    );
    this.resetBtn = new Component(
      this.buttonsContainer.element,
      'button',
      ['statistics__btn', 'statistics__btn--reset'],
      'Reset'
    );
    this.container = new Component(this.element, 'div', ['statistics__table-container']);
    this.table = new Component(this.container.element, 'table', ['statistics__table']);
    this.tableHead = new Component(this.table.element, 'thead');
    this.categoryTh = new Component(this.tableHead.element, 'th', [], 'Category');
    this.wordTh = new Component(this.tableHead.element, 'th', [], 'Word');
    this.translationTh = new Component(this.tableHead.element, 'th', [], 'Translation');
    this.tableBody = new Component(this.table.element, 'tbody');
    this.clickTh = new Component(this.tableHead.element, 'th', [], 'Clicks');
    this.hitTh = new Component(this.tableHead.element, 'th', [], 'Hits');
    this.missTh = new Component(this.tableHead.element, 'th', [], 'Misses');
    this.percentTh = new Component(this.tableHead.element, 'th', [], '%');
    this.tableHeaders = [...(<HTMLCollection>(<HTMLTableElement>this.table.element).tHead?.children)];
    this.repeatBtn.element.addEventListener('click', this.repeatBtnClickHandler);
    this.resetBtn.element.addEventListener('click', this.resetBtnClickHandler);
    this.tableHeaders.forEach((tableHeader, index) =>
      tableHeader.addEventListener('click', () => this.sortRows(index, tableHeader))
    );
    this.sortDirections = this.tableHeaders.map(() => '');
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
        (() => new Component(row.element, 'td', [], `${item.click}`))();
        (() => new Component(row.element, 'td', [], `${item.hit}`))();
        (() => new Component(row.element, 'td', [], `${item.miss}`))();
        (() => new Component(row.element, 'td', [], `${item.percent}`))();
      });
    }
  }

  sortRows(index: number, tableHeader: Element): void {
    const sortedRows = [...(<HTMLTableElement>this.table.element).rows];
    const sortDirection = this.sortDirections[index] || 'asc';
    const multiplier = sortDirection === 'asc' ? 1 : -1;

    this.controlSortTriangle(sortDirection, tableHeader);

    sortedRows.sort((rowA, rowB) => {
      const cellAcontent = <string>rowA.cells[index].textContent;
      const cellBContent = <string>rowB.cells[index].textContent;

      const transformCellAcontent = this.transformCellContent(cellAcontent);
      const transformCellBcontent = this.transformCellContent(cellBContent);

      if (transformCellAcontent > transformCellBcontent) {
        return 1 * multiplier;
      }

      if (transformCellAcontent < transformCellBcontent) {
        return -1 * multiplier;
      }

      return 0;
    });

    this.sortDirections[index] = sortDirection === 'asc' ? 'desc' : 'asc';
    (<HTMLTableElement>this.table.element).tBodies[0].append(...sortedRows);
  }

  transformCellContent = (content: string): string | number => {
    return Number.isNaN(Number(content)) ? content : Number(content);
  };

  controlSortTriangle = (sortDirection: string, tableHeader: Element): void => {
    if (sortDirection === 'asc') {
      tableHeader.classList.add('sorted');
      tableHeader.classList.remove('sorted-reverse');
    } else {
      tableHeader.classList.add('sorted-reverse');
      tableHeader.classList.remove('sorted');
    }
  };

  resetBtnClickHandler = async (): Promise<void> => {
    localStorage.clear();
    await initLocalStorage();
    this.clearTable();
    this.addWords();
  };

  repeatBtnClickHandler = (): void => {
    window.location.hash = '#/difficult-words';
  };

  clearTable = (): void => {
    this.tableBody.element.innerHTML = '';
  };
}

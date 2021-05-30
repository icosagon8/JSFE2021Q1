import './score.scss';
import { Component } from '../../components/component';
import { RootElement } from '../../components/cards-field/cards-field';
import avatar from '../../assets/images/avatar.jpg';
import { iDB } from '../../components/indexed-db/indexed-db';
import { User } from '../../models/user-model';

export class Score extends Component {
  title: Component;

  table: Component;

  tableRow?: Component;

  avatarCell?: Component;

  avatar?: Component;

  avatarImage?: Component;

  userCell?: Component;

  userName?: Component;

  userEmail?: Component;

  scoreCell?: Component;

  points?: Component;

  label?: Component;

  constructor(parentNode: RootElement) {
    super(parentNode, 'main', ['score']);
    this.title = new Component(this.element, 'h1', ['score__title'], 'Best players');
    this.table = new Component(this.element, 'table', ['score__table']);
    iDB.readSorted<User>('users', 10).then((arr) => this.addRows(arr));
  }

  addRows(users: User[]): void {
    users.forEach((user) => {
      this.tableRow = new Component(this.table.element, 'tr', ['score__table-row']);
      this.avatarCell = new Component(this.tableRow.element, 'td', ['score__table-cell']);
      this.avatar = new Component(this.avatarCell.element, 'div', ['score__avatar']);
      this.avatarImage = new Component(this.avatar.element, 'img', ['score__img'], '', [['src', avatar]]);
      this.userCell = new Component(this.tableRow.element, 'td', ['score__table-cell', 'score__table-cell--grow']);
      this.userName = new Component(this.userCell.element, 'span', ['score__user'], `${user.name} ${user.surname}`);
      this.userEmail = new Component(this.userCell.element, 'span', ['score__email'], user.email);
      this.scoreCell = new Component(this.tableRow.element, 'td', ['score__table-cell']);
      this.points = new Component(this.scoreCell.element, 'div', ['score__points']);
      this.label = new Component(this.points.element, 'span', ['score__label'], 'Score:');
      this.label = new Component(this.points.element, 'span', ['score__count'], `${user.score}`);
    });
  }
}

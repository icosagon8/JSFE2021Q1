import { CardsField } from '../components/cards-field/cards-field';
import { Component } from '../components/component';
import { RootElement } from '../models/root-element-model';

export class Category extends Component {
  cardsField: CardsField;

  constructor(parentNode: RootElement) {
    super(parentNode, 'main', ['container', 'main']);
    this.cardsField = new CardsField(this.element, 'words');
  }
}

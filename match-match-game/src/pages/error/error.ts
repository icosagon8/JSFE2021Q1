import { Component } from '../../components/component';
import { RootElement } from '../../components/cards-field/cards-field';

export class ErrorPage extends Component {
  constructor(parentNode: RootElement) {
    super(parentNode, 'main', ['page'], '404');
  }
}

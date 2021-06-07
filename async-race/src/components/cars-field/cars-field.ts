import './cars-field.scss';
import { Component } from '../component';
import { RootElement } from '../../models/root-element-model';

export class CarsField extends Component {
  constructor(parentNode: RootElement) {
    super(parentNode, 'ul', ['garage__cars', 'cars']);
  }
}

import './cars-field.scss';
import { Component } from '../component';
import { RootElement } from '../../models/root-element-model';
import { store } from '../../store';
import { CarModel } from '../../models/car-model';
import { Car } from '../car/car';

export class CarsField extends Component {
  constructor(parentNode: RootElement) {
    super(parentNode, 'ul', ['garage__cars', 'cars']);
    this.addCars();
  }

  addCars(): void {
    store.cars.forEach((car: CarModel) => {
      const newcar = new Car(car);
      this.element.appendChild(newcar.element);
    });
  }
}

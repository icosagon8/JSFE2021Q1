import './car.scss';
import { Component } from '../component';
import { CarImage } from '../car-image/car-image';
import { CarModel } from '../../models/car-model';
import { getCar } from '../../api';
import { store } from '../../store';

export class Car extends Component {
  optionsWrapper: Component;

  selectBtn: Component;

  removeBtn: Component;

  carName: Component;

  roadWrapper: Component;

  engineControls: Component;

  startBtn: Component;

  stopBtn: Component;

  road: Component;

  carImage?: CarImage;

  constructor(car: CarModel) {
    super(null, 'li', ['cars__item']);
    this.optionsWrapper = new Component(this.element, 'div', ['cars__options-wrapper']);
    this.selectBtn = new Component(this.optionsWrapper.element, 'button', ['btn', 'cars__select-btn'], 'Select', [
      ['type', 'button'],
    ]);
    this.selectBtn.element.dataset.carId = `${car.id}`;
    this.removeBtn = new Component(this.optionsWrapper.element, 'button', ['btn', 'cars__remove-btn'], 'Remove', [
      ['type', 'button'],
    ]);
    this.carName = new Component(this.optionsWrapper.element, 'span', ['cars__car-name'], `${car.name}`);
    this.roadWrapper = new Component(this.element, 'div', ['cars__road-wrapper']);
    this.engineControls = new Component(this.roadWrapper.element, 'div', ['cars__engine-controls']);
    this.startBtn = new Component(this.engineControls.element, 'button', ['btn', 'cars__start-btn'], 'A', [
      ['type', 'button'],
    ]);
    this.stopBtn = new Component(this.engineControls.element, 'button', ['btn', 'cars__stop-btn'], 'B', [
      ['type', 'button'],
    ]);
    this.road = new Component(this.roadWrapper.element, 'div', ['cars__road']);
    this.addCarImage(car.color);
    this.selectBtn.element.addEventListener('click', () => this.onSelectBtnClick());
  }

  addCarImage(color: string): void {
    this.carImage = new CarImage(this.road.element, color);
  }

  async onSelectBtnClick(): Promise<void> {
    const id = Number(this.selectBtn.element.dataset.carId);
    const car = await getCar(id);
    store.selectedCar = car;
    const updateNameInput = document.querySelector('#update-name');
    const updateColorInput = document.querySelector('#update-color');
    const updateBtn = document.querySelector('#update-btn');
    (updateNameInput as HTMLInputElement).value = car.name;
    (updateColorInput as HTMLInputElement).value = car.color;
    updateBtn?.removeAttribute('disabled');
  }
}

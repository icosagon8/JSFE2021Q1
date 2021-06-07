import './garage.scss';
import { Component } from '../../components/component';
import { RootElement } from '../../models/root-element-model';
import { store } from '../../store';
import { createCar, getCars } from '../../api';
import { CarsField } from '../../components/cars-field/cars-field';

export class Garage extends Component {
  title: Component;

  pageCount: Component;

  Controls: Component;

  carCreateControls: Component;

  carNameCreateInput: Component;

  carColorCreateInput: Component;

  carCreateBtn: Component;

  carUpdateControls: Component;

  carNameUpdateInput: Component;

  carColorUpdateInput: Component;

  carUpdateButton: Component;

  raceControls: Component;

  raceBtn: Component;

  resetBtn: Component;

  generateBtn: Component;

  carsField: CarsField;

  constructor(parentNode: RootElement) {
    super(parentNode, 'div', ['page', 'garage']);
    this.title = new Component(this.element, 'h1', ['garage__title'], `Garage (${store.carsNumber})`);
    this.pageCount = new Component(this.element, 'p', ['garage__page-count'], `Page №${store.page}`);
    this.Controls = new Component(this.element, 'div', ['garage__controls']);
    this.carCreateControls = new Component(this.Controls.element, 'div', ['garage__group']);
    this.carNameCreateInput = new Component(this.carCreateControls.element, 'input', ['garage__name-input'], '', [
      ['type', 'text'],
      ['name', 'name'],
      ['autocomplete', 'off'],
    ]);
    this.carColorCreateInput = new Component(this.carCreateControls.element, 'input', ['garage__color-input'], '', [
      ['type', 'color'],
      ['name', 'color'],
      ['autocomplete', 'off'],
    ]);
    this.carCreateBtn = new Component(this.carCreateControls.element, 'button', ['btn', 'garage__btn'], 'Create', [
      ['disabled', ''],
    ]);
    this.carUpdateControls = new Component(this.Controls.element, 'div', ['garage__group']);
    this.carNameUpdateInput = new Component(this.carUpdateControls.element, 'input', ['garage__name-input'], '', [
      ['type', 'text'],
      ['name', 'name'],
      ['autocomplete', 'off'],
    ]);
    this.carColorUpdateInput = new Component(this.carUpdateControls.element, 'input', ['garage__color-input'], '', [
      ['type', 'color'],
      ['name', 'color'],
      ['autocomplete', 'off'],
    ]);
    this.carUpdateButton = new Component(this.carUpdateControls.element, 'button', ['btn', 'garage__btn'], 'Update');
    this.raceControls = new Component(this.Controls.element, 'div', ['garage__group']);
    this.raceBtn = new Component(this.raceControls.element, 'button', ['btn', 'garage__btn'], 'Race');
    this.resetBtn = new Component(this.raceControls.element, 'button', ['btn', 'garage__btn'], 'Reset');
    this.generateBtn = new Component(
      this.raceControls.element,
      'button',
      ['btn', 'garage__btn', 'garage__btn--generate'],
      'Generate cars'
    );
    this.carsField = new CarsField(this.element);
    this.carNameCreateInput.element.addEventListener('change', () => this.onCarNameCreateInputChange());
    this.carCreateBtn.element.addEventListener('click', () => this.onCarCreateBtnClick());
  }

  onCarNameCreateInputChange(): void {
    this.carCreateBtn.element.removeAttribute('disabled');
  }

  async onCarCreateBtnClick(): Promise<void> {
    const name = (this.carNameCreateInput.element as HTMLInputElement).value;
    const color = (this.carColorCreateInput.element as HTMLInputElement).value;
    await createCar({ name, color });
    (this.carNameCreateInput.element as HTMLInputElement).value = '';
    this.carCreateBtn.element.setAttribute('disabled', '');
    await Garage.updateGarageState();
    this.title.element.textContent = `Garage (${store.carsNumber})`;
    this.carsField.element.remove();
    this.carsField = new CarsField(this.element);
  }

  static async updateGarageState(): Promise<void> {
    const { cars, count: carsNumber } = await getCars(store.page);
    store.cars = cars;
    store.carsNumber = carsNumber;
  }
}

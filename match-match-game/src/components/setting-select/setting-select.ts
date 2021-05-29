import { Component } from '../component';
import { RootElement } from '../cards-field/cards-field';

export class SettingSelect extends Component {
  label: Component;

  selectContainer: Component;

  select: Component;

  placeholder: Component;

  constructor(parentNode: RootElement, label: string, selectPlaceholder: string, options: Array<Array<string>>) {
    super(parentNode, 'div', ['settings__select-group']);
    this.label = new Component(this.element, 'label', ['settings__label'], label);
    this.selectContainer = new Component(this.element, 'div', ['settings__select-container']);
    this.select = new Component(this.selectContainer.element, 'select', ['settings__select']);
    this.placeholder = new Component(this.select.element, 'option', [], selectPlaceholder, [
      ['disabled', ''],
      ['selected', ''],
    ]);
    this.addOptions(options);
  }

  addOptions(options: Array<Array<string>>): void {
    options.forEach(([value, text]) => {
      const opt = new Component(null, 'option', [], text, [['value', value]]);
      this.select.element.appendChild(opt.element);
    });
  }
}

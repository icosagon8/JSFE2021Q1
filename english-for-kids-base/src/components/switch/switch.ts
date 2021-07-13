import './switch.scss';
import { Component } from '../component';
import { RootElement } from '../../models/root-element-model';
import { store } from '../../store/store';
import { setPlayMode } from '../../store/play-mode/actions';

export class Switch extends Component {
  field: Component;

  label: Component;

  text: Component;

  slider: Component;

  constructor(parentNode: RootElement) {
    super(parentNode, 'div', ['switch']);
    this.field = new Component(this.element, 'input', ['switch__field'], '', [
      ['id', 'switch-label'],
      ['type', 'checkbox'],
    ]);
    this.label = new Component(this.element, 'label', ['switch__label'], '', [['for', 'switch-label']]);
    this.text = new Component(this.label.element, 'span', ['switch__text']);
    this.slider = new Component(this.label.element, 'span', ['switch__slider']);
    this.field.element.addEventListener('change', this.changePlayMode);
    this.setGameMode();
  }

  setGameMode(): void {
    const { isPlayMode } = store.getState().mode;
    if (isPlayMode) (<HTMLInputElement>this.field.element).checked = true;
  }

  changePlayMode = (): void => {
    store.dispatch(setPlayMode());
  };
}

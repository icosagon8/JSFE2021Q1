import { RootElement } from '../models/root-element-model';

export class Component {
  readonly element: HTMLElement;

  constructor(
    parentNode: RootElement = null,
    tagName: keyof HTMLElementTagNameMap = 'div',
    classNames: string[] = [],
    content = '',
    attributes: Array<Array<string>> = []
  ) {
    this.element = document.createElement(tagName);
    if (classNames.length) this.element.classList.add(...classNames);
    if (parentNode) parentNode.append(this.element);
    this.element.textContent = content;
    if (attributes.length) this.setAttributes(attributes);
  }

  private setAttributes(attrs: Array<Array<string>>): void {
    attrs.forEach((attr) => {
      const [name, value] = attr;
      this.element.setAttribute(name, value);
    });
  }
}

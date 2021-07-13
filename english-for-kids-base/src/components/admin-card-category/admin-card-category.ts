import './admin-card-category.scss';
import { Component } from '../component';
import { RootElement } from '../../models/root-element-model';
import { CategoryDataModel } from '../../models/category-data-model';
import { deleteCategory, updateCategory } from '../../services/api';

export class AdminCategoryCard extends Component {
  title: Component;

  body: Component;

  wordsCount: Component;

  footer: Component;

  updateBtn: Component;

  addBtn: Component;

  deleteBtn: Component;

  categoryId: string;

  cardInfo: Component;

  cardUpdate: Component;

  updateGroup: Component;

  label: Component;

  field: Component;

  footerUpdate: Component;

  cancelBtn: Component;

  createBtn: Component;

  constructor(parentNode: RootElement, private readonly categoryData: CategoryDataModel, categoryWordsCount: number) {
    super(parentNode, 'div', ['admin__card']);
    this.cardInfo = new Component(this.element, 'div', ['admin__card-info']);
    this.title = new Component(this.cardInfo.element, 'h2', ['admin__card-title'], categoryData.category);
    this.body = new Component(this.cardInfo.element, 'p', ['admin__card-body'], 'Words: ');
    this.wordsCount = new Component(this.body.element, 'span', ['admin__card-count'], `${categoryWordsCount}`);
    this.footer = new Component(this.cardInfo.element, 'div', ['admin__card-footer']);
    this.updateBtn = new Component(this.footer.element, 'button', ['admin__btn', 'admin__update-btn'], 'Update');
    this.addBtn = new Component(this.footer.element, 'button', ['admin__btn', 'admin__add-btn'], 'Add word');
    this.deleteBtn = new Component(this.element, 'button', ['admin__delete-btn']);
    this.cardUpdate = new Component(this.element, 'div', ['admin__card-update', 'hidden']);
    this.updateGroup = new Component(this.cardUpdate.element, 'div', ['admin__field-group']);
    this.label = new Component(this.updateGroup.element, 'label', ['admin__label'], 'Category Name:');
    this.field = new Component(this.updateGroup.element, 'input', ['admin__field'], '', [
      ['value', `${categoryData.category}`],
    ]);
    this.footerUpdate = new Component(this.cardUpdate.element, 'div', ['admin__card-footer']);
    this.cancelBtn = new Component(this.footerUpdate.element, 'button', ['admin__btn', 'admin__cancel-btn'], 'Cancel');
    this.createBtn = new Component(this.footerUpdate.element, 'button', ['admin__btn', 'admin__create-btn'], 'Create');
    this.categoryId = categoryData.id;
    this.deleteBtn.element.addEventListener('click', this.deleteBtnClickHandler);
    this.updateBtn.element.addEventListener('click', this.updateBtnClickHandler);
    this.cancelBtn.element.addEventListener('click', this.cancelBtnClickHandler);
    this.createBtn.element.addEventListener('click', this.createBtnClickHandler);
  }

  deleteBtnClickHandler = async (): Promise<void> => {
    await deleteCategory(this.categoryId);
    this.deleteCategoryCard();
  };

  deleteCategoryCard(): void {
    this.element.remove();
  }

  updateTitleText(): void {
    this.title.element.textContent = `${(<HTMLInputElement>this.field.element).value}`;
  }

  updateBtnClickHandler = (): void => {
    this.toggleElement(this.cardInfo.element);
    this.toggleElement(this.cardUpdate.element);
    this.categoryData.category = (<HTMLInputElement>this.field.element).value;
  };

  cancelBtnClickHandler = (): void => {
    this.toggleElement(this.cardInfo.element);
    this.toggleElement(this.cardUpdate.element);
    (<HTMLInputElement>this.field.element).value = this.categoryData.category;
  };

  createBtnClickHandler = async (): Promise<void> => {
    this.toggleElement(this.cardInfo.element);
    this.toggleElement(this.cardUpdate.element);
    this.updateTitleText();
    await updateCategory(this.categoryData.id, { category: (<HTMLInputElement>this.field.element).value });
  };

  toggleElement = (elem: HTMLElement): void => {
    elem.classList.toggle('hidden');
  };
}

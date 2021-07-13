import './admin.scss';
import { Component } from '../../components/component';
import { RootElement } from '../../models/root-element-model';
import { AdminCategoryCard } from '../../components/admin-card-category/admin-card-category';
import { createCategory, getCategoriesData, getWordsData } from '../../services/api';

const adminRoutes = [
  { name: 'Categories', path: 'admin' },
  { name: 'Words', path: 'words' },
];

export class Admin extends Component {
  header: Component;

  main: Component;

  menu: Component;

  menuItems: HTMLElement[];

  wrapper: Component;

  logoutBtn: Component;

  container: Component;

  addCategoryCard?: Component;

  addCategoryBtn?: Component;

  constructor(parentNode: RootElement) {
    super(null, 'div', ['main']);
    this.header = new Component(parentNode, 'header', ['header', 'admin__header']);
    this.wrapper = new Component(this.header.element, 'div', ['container', 'admin__header-wrapper']);
    this.main = new Component(parentNode, 'main', ['container', 'admin__main']);
    this.container = new Component(this.main.element, 'div', ['admin__cards-field']);
    this.menu = new Component(this.wrapper.element, 'ul', ['admin__nav-list']);
    this.logoutBtn = new Component(this.wrapper.element, 'button', ['admin__btn-logout'], 'Log out');
    this.menuItems = [];
    this.addMenuItems();
    this.logoutBtn.element.addEventListener('click', this.logoutBtnClickHandler);
    this.addCategoryCards();
  }

  private addMenuItems(): void {
    adminRoutes.forEach((route) => this.createMenuItem(route.name, route.path));
  }

  private createMenuItem(name: string, path: string) {
    const li = new Component(this.menu.element, 'li', ['admin__nav-item']);
    const a = new Component(li.element, 'a', ['admin__nav-link'], `${name}`, [['href', `#/${path}`]]);
    this.menuItems.push(li.element);

    return a;
  }

  private createAddCategoryCard() {
    this.addCategoryCard = new Component(this.container.element, 'div', ['admin__card']);
    (() => new Component(this.addCategoryCard.element, 'h2', ['admin__card-title'], 'Create new Category'))();
    this.addCategoryBtn = new Component(this.addCategoryCard.element, 'button', ['admin__add-category-btn']);
    this.addCategoryBtn.element.addEventListener('click', this.createCat);
  }

  createCat = async (): Promise<void> => {
    const category = await createCategory({
      category: 'New category',
      image: 'images/default.png',
    });

    const newCard = new AdminCategoryCard(null, category, 0);
    newCard.toggleElement(newCard.cardInfo.element);
    newCard.toggleElement(newCard.cardUpdate.element);
    this.addCategoryCard?.element.before(newCard.element);
  };

  logoutBtnClickHandler = (): void => {
    window.location.hash = '#/';
  };

  async addCategoryCards(): Promise<void> {
    const categoriesData = await getCategoriesData();
    const categoryWordsData = await getWordsData();

    categoriesData.forEach(async (categoryData) => {
      const categoryWordsCount = categoryWordsData.filter(
        (categoryWordData) => categoryWordData.categoryId === categoryData.id
      ).length;
      (() => new AdminCategoryCard(this.container.element, categoryData, categoryWordsCount))();
    });

    this.createAddCategoryCard();
  }
}

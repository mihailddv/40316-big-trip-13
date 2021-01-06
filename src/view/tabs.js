import AbstractView from "./abstract.js";
import {MenuItem} from "../const.js";

const createTabsTemplate = () => {
  return /* html */ `<nav class="trip-controls__trip-tabs trip-tabs">
    <button
      class="trip-tabs__btn"
      href="#"
      data-menu-item="${MenuItem.TASKS}"
    >
      Table
    </button>
    <button
      class="trip-tabs__btn"
      href="#"
      data-menu-item="${MenuItem.STATISTICS}"
    >
      Stats
    </button>
  </nav>`;
};

export default class Tabs extends AbstractView {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createTabsTemplate();
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.dataset.menuItem);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`click`, this._menuClickHandler);
  }

  setMenuItem(menuItem) {
    const item = this.getElement().querySelector(`[data-menu-item=${menuItem}]`);
    const menuItems = this.getElement().querySelectorAll(`[data-menu-item]`);
    const activeClass = `trip-tabs__btn--active`;

    menuItems.forEach((element) => {
      element.disabled = false;
      element.classList.remove(activeClass);
    });

    item.classList.add(activeClass);
  }
}

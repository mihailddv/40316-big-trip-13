import AbstractView from "./abstract.js";
import {MenuItem} from "../const.js";

const createTabsTemplate = () => {
  return /* html */ `<nav class="trip-controls__trip-tabs trip-tabs">
    <a
      class="trip-tabs__btn"
      href="#"
      data-menu-item="${MenuItem.TASKS}"
    >
      Table
    </a>
    <a
      class="trip-tabs__btn"
      href="#"
      data-menu-item="${MenuItem.STATISTICS}"
    >
      Stats
    </a>
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
    console.log(`_menuClickHandler`, evt.target.dataset.menuItem);
    evt.preventDefault();
    this._callback.menuClick(evt.target.dataset.menuItem);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`click`, this._menuClickHandler);
  }

  setMenuItem(menuItem) {
    console.log(`setMenuItem`);
    const item = this.getElement().querySelector(`[data-menu-item=${menuItem}]`);

    debugger;
    console.log(`item`, item);

    if (item !== null) {
      item.checked = true;
    }
  }
}

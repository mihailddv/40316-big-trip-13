import AbstractView from "./abstract.js";
import {MenuItem} from "../const.js";

const createTabsTemplate = () => {
  return /* html */ `<nav class="trip-controls__trip-tabs trip-tabs">
    <a
      class="trip-tabs__btn"
      href="#"
      value="${MenuItem.TASKS}"
    >
      Table
    </a>
    <a
      class="trip-tabs__btn trip-tabs__btn--active"
      href="#"
      value="${MenuItem.STATISTICS}"
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
    evt.preventDefault();
    this._callback.menuClick(evt.target.value);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`change`, this._menuClickHandler);
  }

  setMenuItem(menuItem) {
    const item = this.getElement().querySelector(`[value=${menuItem}]`);

    if (item !== null) {
      item.checked = true;
    }
  }
}

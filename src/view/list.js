import {createElement} from "../utils.js";

const createList = () => {
  return /* html */ `<ul class="trip-events__list"></ul>`;
};
export default class List {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createList();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

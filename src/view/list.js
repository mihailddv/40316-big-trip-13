import AbstractView from "./abstract.js";

const createList = () => {
  return /* html */ `<ul class="trip-events__list"></ul>`;
};
export default class List extends AbstractView {
  getTemplate() {
    return createList();
  }
}

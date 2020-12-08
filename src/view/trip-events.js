import AbstractView from "./abstract.js";

const createPageTemplate = () => {
  return /* html */ `<section class="trip-events"></section>`;
};

export default class Board extends AbstractView {
  getTemplate() {
    return createPageTemplate();
  }
}

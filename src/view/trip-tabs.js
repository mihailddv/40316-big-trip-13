import AbstractView from "./abstract.js";

const createTripTabsTemplate = () => {
  return /* html */ `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn" href="#">Table</a>
    <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Stats</a>
  </nav>`;
};

export default class TripInfo extends AbstractView {
  getTemplate() {
    return createTripTabsTemplate();
  }
}

import AbstractView from "./abstract.js";

const createFilterTemplate = (filter, currentFilterType) => {
  const {type} = filter;
  // const type = `all`;

  console.log(`type`, type);
  console.log(`currentFilterType`, currentFilterType);

  return /* html */ `<form class="trip-filters" action="#" method="get">
    <div class="trip-filters__filter">
      <input
        id="filter-everything"
        class="trip-filters__filter-input visually-hidden"
        type="radio"
        name="trip-filter"
        value="everything"
        ${type === `all` ? `checked` : ``}
      >
      <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
    </div>

    <div class="trip-filters__filter">
      <input
        id="filter-future"
        class="trip-filters__filter-input visually-hidden"
        type="radio"
        name="trip-filter"
        value="future"
        ${type === currentFilterType ? `checked` : ``}
      >
      <label class="trip-filters__filter-label" for="filter-future">Future</label>
    </div>

    <div class="trip-filters__filter">
      <input
        id="filter-past"
        class="trip-filters__filter-input visually-hidden"
        type="radio"
        name="trip-filter"
        value="past"
        ${type === currentFilterType ? `checked` : ``}
      >
      <label class="trip-filters__filter-label" for="filter-past">Past</label>
    </div>

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
};

export default class TripFilter extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    console.log(`getTemplate`);
    return createFilterTemplate(this._filters, this._currentFilter);
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`change`, this._filterTypeChangeHandler);
  }
}

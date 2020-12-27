import FilterView from "../view/filter.js";
import {render, RenderPosition, replace, remove} from "../utils/render.js";
import {filter} from "../utils/filter.js";
import {FilterType, UpdateType} from "../const.js";

export default class Filter {
  constructor(filterContainer, filterModel, eventsModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._eventsModel = eventsModel;
    this._currentFilter = null;

    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._eventsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentFilter = this._filterModel.getFilter();

    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterView(filters, this._currentFilter);
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _getFilters() {
    console.log('_getFilters');
    const events = this._eventsModel.getEvents();

    return [
      {
        type: FilterType.ALL,
        name: `All`,
        count: filter[FilterType.ALL](events).length
      },
      // {
      //   type: FilterType.OVERDUE,
      //   name: `Overdue`,
      //   count: filter[FilterType.OVERDUE](events).length
      // },
      // {
      //   type: FilterType.TODAY,
      //   name: `Today`,
      //   count: filter[FilterType.TODAY](events).length
      // },
      // {
      //   type: FilterType.FAVORITES,
      //   name: `Favorites`,
      //   count: filter[FilterType.FAVORITES](events).length
      // },
      // {
      //   type: FilterType.REPEATING,
      //   name: `Repeating`,
      //   count: filter[FilterType.REPEATING](events).length
      // },
      // {
      //   type: FilterType.ARCHIVE,
      //   name: `Archive`,
      //   count: filter[FilterType.ARCHIVE](events).length
      // }
    ];
  }
}

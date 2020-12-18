import {
  render,
  RenderPosition,
} from "../utils/render.js";
import {updateItem} from "../utils/common.js";
import {sortDate, sortPrice, sortTime} from "../utils/point.js";
import {SortType} from "../const.js";

import EventPresenter from './event';
import ListView from '../view/list';
import ListEmptyView from '../view/list-empty';
import TripSortView from '../view/trip-sort';

export default class Page {
  constructor(pageContainer, eventsModel) {
    this._eventsModel = eventsModel;
    this._pageContainer = pageContainer;
    this._eventPresenter = {};
    this._currentSortType = SortType.DATE_DEFAULT;

    this._pageComponent = new ListView();
    this._sortComponent = new TripSortView();
    this._eventsListComponent = new ListView();
    this._noEventsComponent = new ListEmptyView();

    this._handleEventChange = this._handleEventChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handlerSortTypeChange = this._handlerSortTypeChange.bind(this);
  }

  init() {
    render(this._pageContainer, this._pageComponent, RenderPosition.BEFOREEND);
    render(this._pageComponent, this._eventsListComponent, RenderPosition.BEFOREEND);

    this._sortEvents(sortDate);
    this._renderPage();
  }

  _getEvents() {
    switch (this._currentSortType) {
      case SortType.TIME:
        return this._eventsModel.getTasks().slice().sort(sortTime);
      case SortType.PRICE:
        return this._eventsModel.getTasks().slice().sort(sortPrice);
      case SortType.DATE:
        return this._eventsModel.getTasks().slice().sort(sortDate);
    }

    return this._eventsModel.getEvents();
  }

  _handlerSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._sortEvents(sortType);

    this._clearEventList();
    this._renderEventList();
  }

  _renderSort() {
    render(this._pageComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handlerSortTypeChange);
  }

  _renderEvents(events) {
    events.forEach((event) => this._renderEvent(event));
  }

  _renderNoEvents() {
    render(this._pageComponent, this._noEventsComponent, RenderPosition.AFTERBEGIN);
  }

  _renderEventList() {
    this._renderEvents(0, Math.min(this._pageEvents.length));
  }

  _clearEventList() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};
  }

  _handleEventChange(updatedEvent) {
    // this._pageEvents = updateItem(this._pageEvents, updatedEvent);
    this._eventPresenter[updatedEvent.id].init(updatedEvent);
  }

  _handleModeChange() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _renderEvent(event) {
    const eventPresenter = new EventPresenter(this._eventsListComponent, this._handleEventChange, this._handleModeChange);
    eventPresenter.init(event);
    this._eventPresenter[event.id] = eventPresenter;
  }

  _renderPage() {
    if (!this._getEvents()) {
      this._renderNoEvents();
      return;
    }

    this._renderSort();
    this._renderEventList();
  }
}

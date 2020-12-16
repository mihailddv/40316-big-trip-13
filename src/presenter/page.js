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
  constructor(pageContainer) {
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

  init(pageEvents) {
    this._pageEvents = pageEvents.slice();
    this._sourcedBoardTasks = pageEvents.slice();

    render(this._pageContainer, this._pageComponent, RenderPosition.BEFOREEND);
    render(this._pageComponent, this._eventsListComponent, RenderPosition.BEFOREEND);

    this._sortEvents(sortDate);
    this._renderPage();
  }

  _sortEvents(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this._pageEvents.sort(sortTime);
        break;
      case SortType.PRICE:
        this._pageEvents.sort(sortPrice);
        break;
      default:
        this._pageEvents.sort(sortDate);
    }

    this._currentSortType = sortType;
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

  _renderEvents() {
    this._pageEvents
      .forEach((pageEvent) => this._renderEvent(pageEvent));
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
    this._pageEvents = updateItem(this._pageEvents, updatedEvent);
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
    if (!this._pageEvents) {
      this._renderNoEvents();
      return;
    }

    this._renderSort();
    this._renderEventList();
  }
}

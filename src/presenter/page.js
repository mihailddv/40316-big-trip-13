import {
  render,
  RenderPosition,
  remove,
} from "../utils/render.js";
// import {updateItem} from "../utils/common.js";
import {sortDate, sortPrice, sortTime} from "../utils/point.js";
// import {SortType} from "../const.js";
import {SortType, UpdateType, UserAction} from "../const.js";

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

    this._sortComponent = null;

    this._pageComponent = new ListView();
    // this._sortComponent = new TripSortView();
    this._eventsListComponent = new ListView();
    this._noEventsComponent = new ListEmptyView();

    // this._handleEventChange = this._handleEventChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handlerSortTypeChange = this._handlerSortTypeChange.bind(this);

    this._eventsModel.addObserver(this._handleModelEvent);
  }

  init() {
    render(this._pageContainer, this._pageComponent, RenderPosition.BEFOREEND);
    render(this._pageComponent, this._eventsListComponent, RenderPosition.BEFOREEND);

    // this._sortEvents(sortDate);
    this._renderPage();
  }

  _getEvents() {
    switch (this._currentSortType) {
      case SortType.TIME:
        return this._eventsModel.getEvents().slice().sort(sortTime);
      case SortType.PRICE:
        return this._eventsModel.getEvents().slice().sort(sortPrice);
      case SortType.DATE:
        return this._eventsModel.getEvents().slice().sort(sortDate);
    }

    return this._eventsModel.getEvents();
  }

  _handlerSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._sortEvents(sortType);

    // this._clearEventList();
    // this._renderEventList();
    this._clearEventList();
    this._renderEventList();
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new TripSortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handlerSortTypeChange);
    render(this._pageComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
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

  _clearEventList({resetSortType = false} = {}) {
    // const taskCount = this._getEvents().length;

    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};


    remove(this._sortComponent);
    // remove(this._noTaskComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  // _handleEventChange(updatedEvent) {
  //   // this._pageEvents = updateItem(this._pageEvents, updatedEvent);
  //   this._eventPresenter[updatedEvent.id].init(updatedEvent);
  // }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this._eventsModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this._eventsModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this._eventsModel.deleteEvent(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._eventPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearPage();
        this._renderPage();
        break;
      case UpdateType.MAJOR:
        this._clearPage({resetSortType: true});
        this._renderPage();
        break;
    }
  }

  _handleModeChange() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _renderEvent(event) {
    const eventPresenter = new EventPresenter(this._eventsListComponent, this._handleViewAction, this._handleModeChange);
    eventPresenter.init(event);
    this._eventPresenter[event.id] = eventPresenter;
  }

  _renderPage() {
    const events = this._getEvents();
    const eventCount = events.length;

    if (!events) {
      this._renderNoEvents();
      return;
    }

    this._renderSort();
    // this._renderEventList();
    this._renderEvents(events.slice(0, Math.min(eventCount, this._renderedEventCount)));
  }
}

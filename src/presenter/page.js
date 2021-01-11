import {
  render,
  RenderPosition,
  remove,
} from "../utils/render.js";
import {updateItem} from "../utils/common.js";
import {sortDate, sortPrice, sortTime} from "../utils/point.js";
import {SortType, UpdateType, UserAction, FilterType} from "../const.js";
import {filter} from "../utils/filter.js";

import EventPresenter from './event';
import EventNewPresenter from "./event-new.js";
import ListView from '../view/list';
import ListEmptyView from '../view/list-empty';
import SortView from '../view/trip-sort';

export default class Page {
  constructor(pageContainer, eventsModel, filterModel, buttonNewEvent) {
    this._eventsModel = eventsModel;
    this._filterModel = filterModel;
    this._pageContainer = pageContainer;
    this._eventPresenter = {};
    this._currentSortType = SortType.DATE;
    this._buttonNewEvent = buttonNewEvent;

    this._sortComponent = null;

    this._pageComponent = new ListView();
    this._eventsListComponent = new ListView();
    this._noEventsComponent = new ListEmptyView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleEventChange = this._handleEventChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._eventsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._eventNewPresenter = new EventNewPresenter(this._eventsListComponent, this._handleViewAction);
  }

  init() {
    render(this._pageContainer, this._pageComponent, RenderPosition.BEFOREEND);
    render(this._pageComponent, this._eventsListComponent, RenderPosition.BEFOREEND);


    this._eventsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._renderPage();
  }

  destroy() {
    this._clearPage({resetSortType: true});

    remove(this._eventsListComponent);
    remove(this._pageComponent);

    this._eventsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

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
        this._clearPage({resetRenderedEventCount: true, resetSortType: true});
        this._renderPage();
        break;
    }
  }

  createEvent() {
    this._currentSortType = SortType.DEFAULT;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.ALL);
    this._eventNewPresenter.init(this._buttonNewEvent);
  }

  _getEvents() {
    const filterType = this._filterModel.getFilter();
    const events = this._eventsModel.getEvents();
    const filteredEvents = filter[filterType](events);

    switch (this._currentSortType) {
      case SortType.DATE:
        return filteredEvents.sort(sortDate);
      case SortType.TIME:
        return filteredEvents.sort(sortTime);
      case SortType.PRICE:
        return filteredEvents.sort(sortPrice);
    }

    return filteredEvents;
  }

  _renderEvents(events) {
    events.forEach((event) => this._renderEvent(event));
  }

  _sortEvents(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this._pageEvents.sort(sortTime);
        break;
      case SortType.PRICE:
        this._pageEvents.sort(sortPrice);
        break;
      case SortType.DATE:
        this._pageEvents.sort(sortDate);
        break;
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;

    this._clearPage();
    this._renderPage();
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._pageComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _clearPage({resetSortType = false} = {}) {
    const eventCount = this._getEvents().length;

    this._eventNewPresenter.destroy();

    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};

    remove(this._sortComponent);
    remove(this._noEventsComponent);

    this._renderedEventCount = Math.min(eventCount, this._renderedEventCount);

    if (resetSortType) {
      this._currentSortType = SortType.DATE;
    }
  }

  _renderEvent(event) {
    const eventPresenter = new EventPresenter(this._eventsListComponent, this._handleViewAction, this._handleModeChange);
    eventPresenter.init(event);
    this._eventPresenter[event.id] = eventPresenter;
  }

  _renderNoEvents() {
    render(this._pageComponent, this._noEventsComponent, RenderPosition.AFTERBEGIN);
  }

  _renderEventList() {
    const eventCount = this._getEvents().length;
    const events = this._getEvents().slice(0, Math.min(eventCount));

    this._renderEvents(events);
    this._renderEvents(0, Math.min(this._eventsModel.length));
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
    this._eventNewPresenter.destroy();
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _renderPage() {
    const events = this._getEvents();
    const eventCount = events.length;

    if (eventCount === 0) {
      this._renderNoEvents();
      return;
    }

    this._renderSort();
    this._renderEvents(events.slice(0, eventCount));
  }
}

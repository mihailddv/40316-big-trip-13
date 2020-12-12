import {
  render,
  RenderPosition,
} from "../utils/render.js";
import {updateItem} from "../utils/common.js";

import EventPresenter from './event';
import ListView from '../view/list';
import ListEmptyView from '../view/list-empty';
import TripSortView from '../view/trip-sort';

export default class Page {
  constructor(pageContainer) {
    this._pageContainer = pageContainer;
    this._eventPresenter = {};

    this._pageComponent = new ListView();
    this._sortComponent = new TripSortView();
    this._eventsListComponent = new ListView();
    this._noEventsComponent = new ListEmptyView();

    this._handleEventChange = this._handleEventChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(pageEvents) {
    this._pageEvents = pageEvents.slice();

    render(this._pageContainer, this._pageComponent, RenderPosition.BEFOREEND);
    render(this._pageComponent, this._eventsListComponent, RenderPosition.BEFOREEND);

    this._renderPage();
  }

  _handleSortTypeChange(sortType) {
    // - Сортируем задачи
    // - Очищаем список
    // - Рендерим список заново
  }

  _renderSort() {
    render(this._pageComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
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

    this._renderEventList();
  }
}

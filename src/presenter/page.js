import {
  render,
  RenderPosition,
  replace,
} from "./utils/render.js";

import PageView from '../view/trip-events';
import TripInfoView from './view/trip-info';
import TripTabsView from './view/trip-tabs';
import TripFilterView from './view/trip-filter';
import ListView from './view/list';
import ListEmptyView from './view/list-empty';
import TripSortView from './view/trip-sort';
import PointEditView from './view/edit-point';
import PointView from './view/point';

export default class Page {
  constructor(pageContainer) {
    this._pageContainer = pageContainer;

    this._pageComponent = new PageView();
    this._sortComponent = new TripSortView();
    this._eventsListComponent = new ListView();
    this._noEventsComponent = new ListEmptyView();
  }

  init(pageEvents) {
    this._pageEvents = pageEvents.slice();

    render(this._pageContainer, this._pageComponent, RenderPosition.BEFOREEND);
    render(this._pageComponent, this._taskListComponent, RenderPosition.BEFOREEND);

    this._renderPage();
  }

  _renderTask(event) {
    // Метод, куда уйдёт логика созданию и рендерингу компонетов задачи,
    // текущая функция renderTask в main.js
  }

  _renderSort() {
    // Метод для рендеринга сортировки
    render(this._pageComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderEvents(from, to) {
    this._pageEvents
      .slice(from, to)
      .forEach((pageEvent) => this._renderEvent(pageEvent));
  }

  _renderNoEvents() {
    render(this._pageComponent, this._noEventsComponent, RenderPosition.AFTERBEGIN);
  }

  _renderPage() {
    if (!this._eventsTasks) {
      this._renderNoEvents();
      return;
    }

    this._renderEvents(0, Math.min(this._pageEvents.length));
  }
}

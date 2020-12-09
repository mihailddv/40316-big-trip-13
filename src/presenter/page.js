import {
  render,
  RenderPosition,
  replace,
} from "../utils/render.js";

import PageView from '../view/trip-events';
import ListView from '../view/list';
import ListEmptyView from '../view/list-empty';
import TripSortView from '../view/trip-sort';
import PointEditView from '../view/edit-point';
import PointView from '../view/point';

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
    render(this._pageComponent, this._eventsListComponent, RenderPosition.BEFOREEND);

    this._renderPage();
  }

  _renderEvent(event) {
    const eventComponent = new PointView(event);
    const eventEditComponent = new PointEditView(event);

    const replaceCardToForm = () => {
      replace(eventEditComponent, eventComponent);
    };

    const replaceFormToCard = () => {
      replace(eventComponent, eventEditComponent);
    };

    eventComponent.setEditClickHandler(() => {
      replaceCardToForm();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    const closeCard = () => {
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    eventEditComponent.setFormSubmitHandler(() => {
      closeCard();
    });

    eventEditComponent.setCardArrowHandler(() => {
      closeCard();
    });

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    render(this._eventsListComponent, eventComponent, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    render(this._pageComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
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

  _renderPage() {
    if (!this._pageEvents) {
      this._renderNoEvents();
      return;
    }

    this._renderEventList();
  }
}

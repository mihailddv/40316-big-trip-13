import {
  render,
  RenderPosition,
  replace,
} from "./utils/render.js";

import {
  calculateTotal,
} from './utils/common';

import {generateEvent} from '../mock/event';

import TripInfoView from './view/trip-info';
import TripTabsView from './view/trip-tabs';
import TripFilterView from './view/trip-filter';
import ListView from './view/list';
import ListEmptyView from './view/list-empty';
import TripSortView from './view/trip-sort';
import PointEditView from './view/edit-point';
import PointView from './view/point';

const EVENT_COUNT = 20;
const events = new Array(EVENT_COUNT).fill().map(generateEvent);

const siteMainElement = document.querySelector(`.page-body`);
const siteTripMainElement = siteMainElement.querySelector(`.trip-main`);
const siteTripControlsElement = siteTripMainElement.querySelector(`.trip-controls`);
const siteTripEventsElement = siteMainElement.querySelector(`.trip-events`);
const eventListComponent = new ListView();

const renderEvent = (eventListElement, event) => {
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

  render(eventListElement, eventComponent, RenderPosition.BEFOREEND);
};

const renderPage = () => {
  render(siteTripMainElement, new TripInfoView(), RenderPosition.AFTERBEGIN);
  render(siteTripControlsElement, new TripTabsView(), RenderPosition.AFTERBEGIN);
  render(siteTripControlsElement, new TripFilterView(), RenderPosition.BEFOREEND);
  render(siteTripEventsElement, new TripSortView(), RenderPosition.AFTERBEGIN);
  render(siteTripEventsElement, eventListComponent, RenderPosition.BEFOREEND);

  if (events.length) {
    events.forEach((event) => {
      renderEvent(eventListComponent, event);
    });
  } else {
    render(siteTripEventsElement, new ListEmptyView(), RenderPosition.BEFOREEND);
  }

  calculateTotal();
};

renderPage();


import {
  calculateTotal,
  render,
  RenderPosition
} from './utils';

import TripInfoView from './view/trip-info';
import TripTabsView from './view/trip-tabs';
import TripFilterView from './view/trip-filter';
import ListView from './view/list';
import ListEmptyView from './view/list-empty';
import TripSortView from './view/trip-sort';
import PointEditView from './view/edit-point';
import PointView from './view/point';
import {generateEvent} from '../mock/event';
// import {createLoading} from './view/loading';
// import {generateFilter} from '../mock/filter';

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
    eventListElement.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const replaceFormToCard = () => {
    eventListElement.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  eventComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceCardToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.getElement().querySelector(`.event--edit`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  render(eventListElement, eventComponent.getElement(), RenderPosition.BEFOREEND);
};

render(siteTripMainElement, new TripInfoView().getElement(), RenderPosition.AFTERBEGIN);
render(siteTripControlsElement, new TripTabsView().getElement(), RenderPosition.AFTERBEGIN);
render(siteTripControlsElement, new TripFilterView().getElement(), RenderPosition.BEFOREEND);
render(siteTripEventsElement, new TripSortView().getElement(), RenderPosition.AFTERBEGIN);
render(siteTripEventsElement, eventListComponent.getElement(), RenderPosition.BEFOREEND);

if (events.length) {
  for (let i = 0; i < EVENT_COUNT; i++) {
    renderEvent(eventListComponent.getElement(), events[i]);
  }
} else {
  render(siteTripEventsElement, new ListEmptyView().getElement(), RenderPosition.BEFOREEND);
}

// render(siteTripEventsListElement, createLoading(), `beforeend`);

calculateTotal();

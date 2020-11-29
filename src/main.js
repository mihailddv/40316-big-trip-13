import {
  calculateTotal,
  render,
  RenderPosition
} from './utils';

import TripInfoView from './view/trip-info';
import TripTabsView from './view/trip-tabs';
import TripFilterView from './view/trip-filter';
import ListView from './view/list';
import TripSortView from './view/trip-sort';
import PointEditView from './view/edit-point';
import PointView from './view/point';
import {generateEvent} from '../mock/event';
// import {createListEmpty} from './view/list-empty';
// import {createLoading} from './view/loading';
// import {generateFilter} from '../mock/filter';

const EVENT_COUNT = 20;

const events = new Array(EVENT_COUNT).fill().map(generateEvent);

const siteMainElement = document.querySelector(`.page-body`);
const siteTripMainElement = siteMainElement.querySelector(`.trip-main`);
const siteTripControlsElement = siteTripMainElement.querySelector(`.trip-controls`);
const siteTripEventsElement = siteMainElement.querySelector(`.trip-events`);
const eventListComponent = new ListView();

render(siteTripMainElement, new TripInfoView().getElement(), RenderPosition.AFTERBEGIN);
render(siteTripControlsElement, new TripTabsView().getElement(), RenderPosition.AFTERBEGIN);
render(siteTripControlsElement, new TripFilterView().getElement(), RenderPosition.BEFOREEND);
render(siteTripEventsElement, new TripSortView().getElement(), RenderPosition.AFTERBEGIN);
render(siteTripEventsElement, eventListComponent.getElement(), RenderPosition.BEFOREEND);
render(eventListComponent.getElement(), new PointEditView(events[0]).getElement(), RenderPosition.BEFOREEND);

for (let i = 1; i < EVENT_COUNT; i++) {
  render(eventListComponent.getElement(), new PointView(events[i]).getElement(), RenderPosition.BEFOREEND);
}

// render(siteTripEventsListElement, createListEmpty(), `beforeend`);
// render(siteTripEventsListElement, createLoading(), `beforeend`);

calculateTotal();

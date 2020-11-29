import TripInfoView from './view/trip-info';
import TripTabsView from './view/trip-tabs';
import TripFilterView from './view/trip-filter';
// import {createLoading} from './view/loading';
import {createList} from './view/list';
// import {createListEmpty} from './view/list-empty';
import {createTripSort} from './view/trip-sort';
// import {createNewPoint} from './view/new-point';
import {createEditPoint} from './view/edit-point';
import {createPoint} from './view/point';
import {generateEvent} from '../mock/event';
import {renderTemplate, calculateTotal, renderElement, RenderPosition} from './utils';
// import {generateFilter} from '../mock/filter';

const EVENT_COUNT = 20;

const events = new Array(EVENT_COUNT).fill().map(generateEvent);

const siteMainElement = document.querySelector(`.page-body`);
const siteTripMainElement = siteMainElement.querySelector(`.trip-main`);
const siteTripControlsElement = siteTripMainElement.querySelector(`.trip-controls`);
const siteTripEventsElement = siteMainElement.querySelector(`.trip-events`);

// renderTemplate(siteTripMainElement, createTripInfo(), `afterbegin`);
renderElement(siteTripMainElement, new TripInfoView().getElement(), RenderPosition.AFTERBEGIN);
renderElement(siteTripControlsElement, new TripTabsView().getElement(), RenderPosition.AFTERBEGIN);
// renderTemplate(siteTripControlsElement, createTripTabs(), `afterbegin`);
renderElement(siteTripControlsElement, new TripFilterView().getElement(), RenderPosition.BEFOREEND);
// renderTemplate(siteTripControlsElement, createTripFilter(), `beforeend`);
renderTemplate(siteTripEventsElement, createTripSort(), `afterbegin`);
renderTemplate(siteTripEventsElement, createList(), `beforeend`);

const siteTripEventsListElement = siteTripEventsElement.querySelector(`.trip-events__list`);

renderTemplate(siteTripEventsListElement, createEditPoint(events[0]), `afterbegin`);
// render(siteTripEventsListElement, createNewPoint(), `beforeend`);

for (let i = 1; i < EVENT_COUNT; i++) {
  renderTemplate(siteTripEventsListElement, createPoint(events[i]), `beforeend`);
}

// render(siteTripEventsListElement, createListEmpty(), `beforeend`);
// render(siteTripEventsListElement, createLoading(), `beforeend`);

calculateTotal();

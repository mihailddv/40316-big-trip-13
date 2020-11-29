import {createTripInfo} from './view/trip-info';
import {createTripTabs} from './view/trip-tabs';
import {createTripFilter} from './view/trip-filter';
// import {createLoading} from './view/loading';
import {createList} from './view/list';
// import {createListEmpty} from './view/list-empty';
import {createTripSort} from './view/trip-sort';
// import {createNewPoint} from './view/new-point';
import {createEditPoint} from './view/edit-point';
import {createPoint} from './view/point';
import {generateEvent} from '../mock/event';
import {calculateTotal} from './utils';
// import {generateFilter} from '../mock/filter';

const EVENT_COUNT = 20;

const events = new Array(EVENT_COUNT).fill().map(generateEvent);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// const filters = generateFilter(events);

const siteMainElement = document.querySelector(`.page-body`);
const siteTripMainElement = siteMainElement.querySelector(`.trip-main`);
const siteTripControlsElement = siteTripMainElement.querySelector(`.trip-controls`);
const siteTripEventsElement = siteMainElement.querySelector(`.trip-events`);

render(siteTripMainElement, createTripInfo(), `afterbegin`);
render(siteTripControlsElement, createTripTabs(), `afterbegin`);
render(siteTripControlsElement, createTripFilter(), `beforeend`);
render(siteTripEventsElement, createTripSort(), `afterbegin`);
render(siteTripEventsElement, createList(), `beforeend`);

const siteTripEventsListElement = siteTripEventsElement.querySelector(`.trip-events__list`);

render(siteTripEventsListElement, createEditPoint(events[0]), `afterbegin`);
// render(siteTripEventsListElement, createNewPoint(), `beforeend`);

for (let i = 1; i < EVENT_COUNT; i++) {
  render(siteTripEventsListElement, createPoint(events[i]), `beforeend`);
}

// render(siteTripEventsListElement, createListEmpty(), `beforeend`);
// render(siteTripEventsListElement, createLoading(), `beforeend`);

calculateTotal();

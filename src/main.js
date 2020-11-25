import {createTripInfo} from './view/trip-info';
import {createTripTabs} from './view/trip-tabs';
import {createTripFilter} from './view/trip-filter';
import {createLoading} from './view/loading';
import {createList} from './view/list';
import {createListEmpty} from './view/list-empty';
import {createTripSort} from './view/trip-sort';
import {createNewPoint} from './view/new-point';
import {createEditPoint} from './view/edit-point';
import {createPoint} from './view/point';
import {generateEvent} from '../mock/event';

const EVENT_COUNT = 20;

const tasks = new Array(EVENT_COUNT).fill().map(generateEvent);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

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

render(siteTripEventsListElement, createEditPoint(), `afterbegin`);
render(siteTripEventsListElement, createNewPoint(), `beforeend`);

for (let i = 0; i < EVENT_COUNT; i++) {
  render(siteTripEventsListElement, createPoint(tasks[i]), `beforeend`);
}

render(siteTripEventsListElement, createListEmpty(), `beforeend`);
render(siteTripEventsListElement, createLoading(), `beforeend`);

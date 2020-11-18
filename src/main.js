import {createTripInfo} from "./view/trip-info";
import {createTripTabs} from "./view/trip-tabs";
import {createTripFilter} from "./view/trip-filter";
import {createLoading} from "./view/loading";
import {createList} from "./view/list";
import {createListEmpty} from "./view/list-empty";
import {createListFilter} from "./view/list-filter";
import {createListSort} from "./view/list-sort";
import {createTripSort} from "./view/trip-sort";
import {createAddNewPoint} from './view/add-new-point';
import {createAddNewPointWithoutOffers} from './view/add-new-point-without-offers';
import {createAddNewPointWithoutDesctination} from './view/add-new-point-without-destination';
import {createEditPoint} from './view/edit-point';

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
render(siteTripEventsElement, createAddNewPoint(), `beforeend`);
render(siteTripEventsElement, createAddNewPointWithoutOffers(), `beforeend`);
render(siteTripEventsElement, createAddNewPointWithoutDesctination(), `beforeend`);
render(siteTripEventsElement, createEditPoint(), `beforeend`);
render(siteTripEventsElement, createList(), `beforeend`);
render(siteTripEventsElement, createListFilter(), `beforeend`);
render(siteTripEventsElement, createListSort(), `beforeend`);
render(siteTripEventsElement, createListEmpty(), `beforeend`);
render(siteTripEventsElement, createLoading(), `beforeend`);

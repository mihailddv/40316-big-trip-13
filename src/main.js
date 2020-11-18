import {createTripInfo} from "./view/trip-info";
import {createTripTabs} from "./view/trip-tabs";
import {createTripFilter} from "./view/trip-filter";
import {createLoading} from "./view/loading";
import {createList} from "./view/list";
import {createListEmpty} from "./view/list-empty";
import {createListFilter} from "./view/list-filter";
import {createListSort} from "./view/list-sort";

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
render(siteTripEventsElement, createList(), `afterbegin`);
render(siteTripEventsElement, createListFilter(), `beforeend`);
render(siteTripEventsElement, createListSort(), `beforeend`);
render(siteTripEventsElement, createListEmpty(), `beforeend`);
render(siteTripEventsElement, createLoading(), `beforeend`);

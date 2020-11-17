import {createTripInfo} from "./view/trip-info";
import {createTripTabs} from "./view/trip-tabs";
import {createTripFilter} from "./view/trip-filter";
import {createLoading} from "./view/loading";
import {createPointsList} from "./view/route-points";

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
render(siteTripEventsElement, createLoading(), `afterbegin`);
render(siteTripEventsElement, createPointsList(), `afterbegin`);

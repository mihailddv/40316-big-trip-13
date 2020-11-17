import {createTripInfo} from "./view/trip-info";

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.page-body`);
const siteTripMainElement = siteMainElement.querySelector(`.trip-main`);

render(siteTripMainElement, createTripInfo(), `afterbegin`);

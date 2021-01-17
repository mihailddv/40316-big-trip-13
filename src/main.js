import {
  render,
  RenderPosition,
  remove,
} from "./utils/render.js";

import {
  calculateTotal,
} from './utils/common';

import EventsModel from "./model/events.js";
import FilterModel from "./model/filter.js";
import DestinationsModel from "./model/destinations";
import OffersModel from "./model/offers";

import PagePresenter from "./presenter/page.js";
import FilterPresenter from "./presenter/filter.js";

import {UpdateType} from "./const.js";
import Api from "./api.js";
import {MenuItem} from "./const.js";
import StatisticsView from "./view/statistics.js";

const AUTHORIZATION = `Basic i85i3nhSXuR5XW8uyh`;
const END_POINT = `https://13.ecmascript.pages.academy/big-trip`;

import TripInfoView from './view/trip-info';
import TabsView from './view/tabs';

const api = new Api(END_POINT, AUTHORIZATION);

const eventsModel = new EventsModel();
const filterModel = new FilterModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();

const siteMainElement = document.querySelector(`.page-body`);
const siteTripMainElement = siteMainElement.querySelector(`.trip-main`);
const siteTripControlsElement = siteTripMainElement.querySelector(`.trip-controls`);
const siteTripEventsElement = siteMainElement.querySelector(`.trip-events`);
const buttonNewEvent = siteMainElement.querySelector(`.trip-main__event-add-btn`);
const siteMenuComponent = new TabsView();

render(siteTripControlsElement, siteMenuComponent, RenderPosition.AFTERBEGIN);

const pagePresenter = new PagePresenter(siteTripEventsElement, eventsModel, filterModel, destinationsModel, offersModel, buttonNewEvent, api);
const filterPresenter = new FilterPresenter(siteTripControlsElement, filterModel, eventsModel);

let statisticsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.POINTS:
      pagePresenter.destroy();
      pagePresenter.init();
      remove(statisticsComponent);
      siteMenuComponent.setMenuItem(`POINTS`);
      break;
    case MenuItem.STATISTICS:
      pagePresenter.destroy();
      siteMenuComponent.setMenuItem(`STATISTICS`);
      statisticsComponent = new StatisticsView(eventsModel.getEvents());
      render(siteTripEventsElement, statisticsComponent, RenderPosition.BEFOREEND);
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

filterPresenter.init();
pagePresenter.init();
handleSiteMenuClick(`POINTS`);

buttonNewEvent.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  handleSiteMenuClick(`POINTS`);
  pagePresenter.createEvent();
});

api.getPoints()
  .then((points) => {
    eventsModel.setEvents(UpdateType.MINOR, points);
    render(siteTripMainElement, new TripInfoView(), RenderPosition.AFTERBEGIN);
    calculateTotal();
  })
  .catch(() => {
    eventsModel.setEvents(UpdateType.MINOR, []);
    render(siteTripMainElement, new TripInfoView(), RenderPosition.AFTERBEGIN);
  });

api.getDestinations()
  .then((response) => {
    return response.json();
  })
  .then((destinations) => {
    destinationsModel.setDestinations(UpdateType.MINOR, destinations);
  })
  .catch(() => {
    destinationsModel.setDestination(UpdateType.MINOR, {});
  });

api.getOffers()
  .then((response) => {
    return response.json();
  })
  .then((offers) => {
    offersModel.setOffers(UpdateType.MINOR, offers);
  })
  .catch(() => {
    offersModel.setOffers(UpdateType.MINOR, {});
  });

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`);
});

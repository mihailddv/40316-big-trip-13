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

import PagePresenter from "./presenter/page.js";
import FilterPresenter from "./presenter/filter.js";

import {UpdateType} from "./const.js";
import Api from "./api.js";
import {MenuItem} from "./const.js";
import StatisticsView from "./view/statistics.js";

const AUTHORIZATION = `Basic i85i3nhSXuR5XW8u`;
// const END_POINT = `https://13.ecmascript.pages.academy/task-manager`;
const END_POINT = `https://13.ecmascript.pages.academy/big-trip`;

// import {generateEvent} from '../mock/event';

import TripInfoView from './view/trip-info';
import TabsView from './view/tabs';

let serverDest = [];

// const EVENT_COUNT = 20;
// const events = new Array(EVENT_COUNT).fill().map(generateEvent);

// const siteMainElement = document.querySelector(`.main`);
// const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const api = new Api(END_POINT, AUTHORIZATION);

const eventsModel = new EventsModel();
const filterModel = new FilterModel();
const destinationsModel = new DestinationsModel();

const siteMainElement = document.querySelector(`.page-body`);
const siteTripMainElement = siteMainElement.querySelector(`.trip-main`);
const siteTripControlsElement = siteTripMainElement.querySelector(`.trip-controls`);
const siteTripEventsElement = siteMainElement.querySelector(`.trip-events`);
const buttonNewEvent = siteMainElement.querySelector(`.trip-main__event-add-btn`);
const siteMenuComponent = new TabsView();

// render(siteTripControlsElement, new TripFilterView(filters, `all`), RenderPosition.BEFOREEND);
// render(siteTripMainElement, new TripInfoView(), RenderPosition.AFTERBEGIN);
render(siteTripControlsElement, siteMenuComponent, RenderPosition.AFTERBEGIN);

const pagePresenter = new PagePresenter(siteTripEventsElement, eventsModel, filterModel, destinationsModel, buttonNewEvent, api);
const filterPresenter = new FilterPresenter(siteTripControlsElement, filterModel, eventsModel);
// render(siteTripMainElement, new TripInfoView(), RenderPosition.AFTERBEGIN);
// render(siteTripControlsElement, new TripTabsView(), RenderPosition.AFTERBEGIN);

let statisticsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.POINTS:
      pagePresenter.destroy();
      pagePresenter.init();
      remove(statisticsComponent);
      siteMenuComponent.setMenuItem(`POINTS`);
      // filterPresenter.init();
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

api.getTasks()
  .then((tasks) => {
    // console.log(`tasks`, tasks);
    eventsModel.setEvents(UpdateType.INIT, tasks);
    render(siteTripMainElement, new TripInfoView(), RenderPosition.AFTERBEGIN);
    // render(siteTripControlsElement, new TabsView(), RenderPosition.AFTERBEGIN);
  })
  .catch(() => {
    eventsModel.setEvents(UpdateType.INIT, []);
    render(siteTripMainElement, new TripInfoView(), RenderPosition.AFTERBEGIN);
    // render(siteTripControlsElement, new TabsView(), RenderPosition.AFTERBEGIN);
  });

api.getDestinations()
  .then((response) => {
    return response.json();
  })
  .then((destinations) => {
    console.log(`destinations`, destinations);
    // serverDest = destinations;
    // console.log(`serverDest`, serverDest);
    destinationsModel.setDestinations(UpdateType.MINOR, destinations);
    // destinationsModel.setDestination(UpdateType.INIT, destinations);
  })
  .catch(() => {
    // destinationsModel.setDestination(UpdateType.INIT, {});
  });

api.getOffers()
  .then((response) => {
    return response.json();
  })
  .then((offers) => {
    // console.log(`offers`, offers);
    // destinationsModel.setDestination(UpdateType.INIT, destinations);
  })
  .catch(() => {
    // destinationsModel.setDestination(UpdateType.INIT, {});
  });

calculateTotal();

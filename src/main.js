import {
  render,
  RenderPosition,
  remove,
} from "./utils/render.js";

import {isOnline} from './utils/common';
import {toast} from "./utils/toast/toast.js";

import EventsModel from "./model/events.js";
import FilterModel from "./model/filter.js";
import DestinationsModel from "./model/destinations";
import OffersModel from "./model/offers";

import PagePresenter from "./presenter/page.js";
import FilterPresenter from "./presenter/filter.js";

import {UpdateType} from "./const.js";
import Api from "./api/api.js";
import {MenuItem} from "./const.js";
import StatisticsView from "./view/statistics.js";
import TabsView from './view/tabs';
import Store from "./api/store.js";
import Provider from "./api/provider.js";

const AUTHORIZATION = `Basic i85i3nhSXuR5XW8ui`;
const END_POINT = `https://13.ecmascript.pages.academy/big-trip`;
const STORE_PREFIX = `trip-localstorage`;
const STORE_VER = `v1`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

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

const pagePresenter = new PagePresenter(siteTripEventsElement, siteTripMainElement, eventsModel, filterModel, destinationsModel, offersModel, buttonNewEvent, apiWithProvider);
const filterPresenter = new FilterPresenter(siteTripControlsElement, filterModel, eventsModel);

let statisticsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.POINTS:
      pagePresenter.destroy();
      pagePresenter.init();
      remove(statisticsComponent);
      if (!isOnline()) {
        toast(`You can't create new point offline`);
        siteMenuComponent.setMenuItem(MenuItem.POINTS);
        break;
      }
      siteMenuComponent.setMenuItem(MenuItem.POINTS);
      break;
    case MenuItem.STATISTICS:
      pagePresenter.destroy();
      siteMenuComponent.setMenuItem(MenuItem.STATISTICS);
      statisticsComponent = new StatisticsView(eventsModel.getEvents());
      render(siteTripEventsElement, statisticsComponent, RenderPosition.BEFOREEND);
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

filterPresenter.init();
pagePresenter.init();
handleSiteMenuClick(MenuItem.POINTS);

buttonNewEvent.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  handleSiteMenuClick(MenuItem.POINTS);
  if (isOnline()) {
    pagePresenter.createEvent();
  }
});

apiWithProvider.getPoints()
  .then((points) => {
    eventsModel.setEvents(UpdateType.MINOR, points);
  })
  .catch(() => {
    eventsModel.setEvents(UpdateType.MINOR, []);
  });

api.getDestinations()
  .then((response) => {
    return response.json();
  })
  .then((destinations) => {
    destinationsModel.setDestinations(UpdateType.MINOR, destinations);
  })
  .catch(() => {
    destinationsModel.setDestinations(UpdateType.MINOR, {});
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

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});

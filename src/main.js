import {
  render,
  RenderPosition,
} from "./utils/render.js";

import {
  calculateTotal,
} from './utils/common';

import PagePresenter from "./presenter/page.js";
import FilterPresenter from "./presenter/filter.js";
import EventsModel from "./model/events.js";
import FilterModel from "./model/filter.js";
import {UpdateType} from "./const.js";
import Api from "./api.js";

const AUTHORIZATION = `Basic i85i3nhSXuR5XW8u`;
// const END_POINT = `https://13.ecmascript.pages.academy/task-manager`;
const END_POINT = `https://13.ecmascript.pages.academy/big-trip`;

// import {generateEvent} from '../mock/event';

import TripInfoView from './view/trip-info';
import TripTabsView from './view/trip-tabs';

// const EVENT_COUNT = 20;
// const events = new Array(EVENT_COUNT).fill().map(generateEvent);

// const siteMainElement = document.querySelector(`.main`);
// const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const api = new Api(END_POINT, AUTHORIZATION);

const eventsModel = new EventsModel();
// eventsModel.setEvents(UpdateType.INIT, events);

const filterModel = new FilterModel();

const siteMainElement = document.querySelector(`.page-body`);
const siteTripMainElement = siteMainElement.querySelector(`.trip-main`);
const siteTripControlsElement = siteTripMainElement.querySelector(`.trip-controls`);
const siteTripEventsElement = siteMainElement.querySelector(`.trip-events`);
const buttonNewEvent = siteMainElement.querySelector(`.trip-main__event-add-btn`);

// render(siteTripControlsElement, new TripFilterView(filters, `all`), RenderPosition.BEFOREEND);

const pagePresenter = new PagePresenter(siteTripEventsElement, eventsModel, filterModel, buttonNewEvent, api);
const filterPresenter = new FilterPresenter(siteTripControlsElement, filterModel, eventsModel);
// render(siteTripMainElement, new TripInfoView(), RenderPosition.AFTERBEGIN);
// render(siteTripControlsElement, new TripTabsView(), RenderPosition.AFTERBEGIN);

filterPresenter.init();
pagePresenter.init();

calculateTotal();

buttonNewEvent.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  pagePresenter.createEvent();
});

api.getTasks()
  .then((tasks) => {
    console.log(`tasks`, tasks);
    eventsModel.setEvents(UpdateType.INIT, tasks);
    render(siteTripMainElement, new TripInfoView(), RenderPosition.AFTERBEGIN);
    render(siteTripControlsElement, new TripTabsView(), RenderPosition.AFTERBEGIN);
  })
  .catch(() => {
    eventsModel.setEvents(UpdateType.INIT, []);
    render(siteTripMainElement, new TripInfoView(), RenderPosition.AFTERBEGIN);
    render(siteTripControlsElement, new TripTabsView(), RenderPosition.AFTERBEGIN);
  });

calculateTotal();

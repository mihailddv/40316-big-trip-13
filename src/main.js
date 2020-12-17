import {
  render,
  RenderPosition,
} from "./utils/render.js";

import {
  calculateTotal,
} from './utils/common';

import PagePresenter from "./presenter/page.js";
import EventsModel from "./model/events.js";

import {generateEvent} from '../mock/event';

import TripInfoView from './view/trip-info';
import TripTabsView from './view/trip-tabs';
import TripFilterView from './view/trip-filter';
import TripSortView from './view/trip-sort';

const EVENT_COUNT = 20;
const events = new Array(EVENT_COUNT).fill().map(generateEvent);

const eventsModel = new EventsModel();
eventsModel.setEvents(events);

const siteMainElement = document.querySelector(`.page-body`);
const siteTripMainElement = siteMainElement.querySelector(`.trip-main`);
const siteTripControlsElement = siteTripMainElement.querySelector(`.trip-controls`);
const siteTripEventsElement = siteMainElement.querySelector(`.trip-events`);

render(siteTripMainElement, new TripInfoView(), RenderPosition.AFTERBEGIN);
render(siteTripControlsElement, new TripTabsView(), RenderPosition.AFTERBEGIN);
render(siteTripControlsElement, new TripFilterView(), RenderPosition.BEFOREEND);
render(siteTripEventsElement, new TripSortView(), RenderPosition.AFTERBEGIN);

const pagePresenter = new PagePresenter(siteTripEventsElement, eventsModel);

pagePresenter.init(events);

calculateTotal();

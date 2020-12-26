import {
  render,
  RenderPosition,
} from "./utils/render.js";

import {
  calculateTotal,
} from './utils/common';

import PagePresenter from "./presenter/page.js";
import FilterPresenter from "./presenter/filter.js";
import TasksModel from "./model/events.js";
import FilterModel from "./model/filter.js";

import {generateEvent} from '../mock/event';

import TripInfoView from './view/trip-info';
import TripTabsView from './view/trip-tabs';

const EVENT_COUNT = 20;
const events = new Array(EVENT_COUNT).fill().map(generateEvent);
const tasksModel = new TasksModel();
tasksModel.setTasks(events);

const filterModel = new FilterModel();

const siteMainElement = document.querySelector(`.page-body`);
const siteTripMainElement = siteMainElement.querySelector(`.trip-main`);
const siteTripControlsElement = siteTripMainElement.querySelector(`.trip-controls`);
const siteTripEventsElement = siteMainElement.querySelector(`.trip-events`);

render(siteTripMainElement, new TripInfoView(), RenderPosition.AFTERBEGIN);
render(siteTripControlsElement, new TripTabsView(), RenderPosition.AFTERBEGIN);
// render(siteTripControlsElement, new TripFilterView(filters, `all`), RenderPosition.BEFOREEND);


const pagePresenter = new PagePresenter(siteTripEventsElement, tasksModel, filterModel);
const filterPresenter = new FilterPresenter(siteTripControlsElement, filterModel, tasksModel);

filterPresenter.init();
pagePresenter.init();

calculateTotal();

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  pagePresenter.createTask();
});

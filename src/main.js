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
import Api from "./api.js";

const AUTHORIZATION = `Basic i85i3nhSXuR5XW8u`;
// const END_POINT = `https://13.ecmascript.pages.academy/task-manager`;
const END_POINT = `https://13.ecmascript.pages.academy/big-trip`;

import {generateEvent} from '../mock/event';

import TripInfoView from './view/trip-info';
import TripTabsView from './view/trip-tabs';

const EVENT_COUNT = 20;
const events = new Array(EVENT_COUNT).fill().map(generateEvent);

const api = new Api(END_POINT, AUTHORIZATION);

api.getTasks().then((points) => {
  console.log(points);
  // Есть проблема: cтруктура объекта похожа, но некоторые ключи называются иначе,
  // а ещё на сервере используется snake_case, а у нас camelCase.
  // Можно, конечно, переписать часть нашего клиентского приложения, но зачем?
  // Есть вариант получше - паттерн "Адаптер"
});

const eventsModel = new EventsModel();
eventsModel.setEvents(events);

const filterModel = new FilterModel();

const siteMainElement = document.querySelector(`.page-body`);
const siteTripMainElement = siteMainElement.querySelector(`.trip-main`);
const siteTripControlsElement = siteTripMainElement.querySelector(`.trip-controls`);
const siteTripEventsElement = siteMainElement.querySelector(`.trip-events`);

render(siteTripMainElement, new TripInfoView(), RenderPosition.AFTERBEGIN);
render(siteTripControlsElement, new TripTabsView(), RenderPosition.AFTERBEGIN);
// render(siteTripControlsElement, new TripFilterView(filters, `all`), RenderPosition.BEFOREEND);


const pagePresenter = new PagePresenter(siteTripEventsElement, eventsModel, filterModel);
const filterPresenter = new FilterPresenter(siteTripControlsElement, filterModel, eventsModel);

filterPresenter.init();
pagePresenter.init();

calculateTotal();

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  pagePresenter.createEvent();
});

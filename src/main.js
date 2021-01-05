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
import {MenuItem} from "./const.js";

import {generateEvent} from '../mock/event';

import TripInfoView from './view/trip-info';
import TabsView from './view/tabs';

const EVENT_COUNT = 20;
const events = new Array(EVENT_COUNT).fill().map(generateEvent);
const eventsModel = new EventsModel();
eventsModel.setEvents(events);

const filterModel = new FilterModel();

const siteMainElement = document.querySelector(`.page-body`);
const siteTripMainElement = siteMainElement.querySelector(`.trip-main`);
const siteTripControlsElement = siteTripMainElement.querySelector(`.trip-controls`);
const siteTripEventsElement = siteMainElement.querySelector(`.trip-events`);
const buttonNewEvent = siteMainElement.querySelector(`.trip-main__event-add-btn`);
const siteMenuComponent = new TabsView();

render(siteTripMainElement, new TripInfoView(), RenderPosition.AFTERBEGIN);
render(siteTripControlsElement, siteMenuComponent, RenderPosition.AFTERBEGIN);

const pagePresenter = new PagePresenter(siteTripEventsElement, eventsModel, filterModel);
const filterPresenter = new FilterPresenter(siteTripControlsElement, filterModel, eventsModel);

const handleSiteMenuClick = (menuItem) => {
  console.log(1);
  switch (menuItem) {
    case MenuItem.ADD_NEW_TASK:
      // Скрыть статистику
      // Показать доску
      // Показать форму добавления новой задачи
      // Убрать выделение с ADD NEW TASK после сохранения
      break;
    case MenuItem.TASKS:
      // Показать доску
      // Скрыть статистику
      // pagePresenter.destroy();
      console.log(`TASKS`);
      break;
    case MenuItem.STATISTICS:
      // Скрыть доску
      // Показать статистику
      console.log(`STATISTICS`);
      // pagePresenter.destroy();
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

filterPresenter.init();
pagePresenter.init();

calculateTotal();

buttonNewEvent.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  pagePresenter.createEvent();
});


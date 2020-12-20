import {
  render,
  RenderPosition,
  remove,
} from "../utils/render.js";
import {updateItem} from "../utils/common.js";
import {sortDate, sortPrice, sortTime} from "../utils/point.js";
import {SortType, UpdateType, UserAction} from "../const.js";
import {filter} from "../utils/filter.js";

import EventPresenter from './event';
import ListView from '../view/list';
import ListEmptyView from '../view/list-empty';
import SortView from '../view/trip-sort';

export default class Page {
  constructor(pageContainer, tasksModel, filterModel) {
    this._tasksModel = tasksModel;
    this._filterModel = filterModel;
    this._pageContainer = pageContainer;
    this._eventPresenter = {};
    this._currentSortType = SortType.DATE_DEFAULT;

    this._sortComponent = null;

    this._pageComponent = new ListView();
    // this._sortComponent = new TripSortView();
    this._eventsListComponent = new ListView();
    this._noEventsComponent = new ListEmptyView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleEventChange = this._handleEventChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handlerSortTypeChange = this._handlerSortTypeChange.bind(this);

    this._tasksModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    // this._pageEvents = pageEvents.slice();

    render(this._pageContainer, this._pageComponent, RenderPosition.BEFOREEND);
    render(this._pageComponent, this._eventsListComponent, RenderPosition.BEFOREEND);

    // this._sortEvents(sortDate);
    // this._renderPage();
    this._renderBoard();
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_TASK:
        this._tasksModel.updateTask(updateType, update);
        break;
      case UserAction.ADD_TASK:
        this._tasksModel.addTask(updateType, update);
        break;
      case UserAction.DELETE_TASK:
        this._tasksModel.deleteTask(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this._eventPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearBoard();
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        this._clearBoard({resetRenderedTaskCount: true, resetSortType: true});
        this._renderBoard();
        break;
    }
  }

  _getTasks() {
    const filterType = this._filterModel.getFilter();
    const tasks = this._tasksModel.getTasks();
    const filtredTasks = filter[filterType](tasks);

    switch (this._currentSortType) {
      case SortType.DATE_UP:
        // return this._tasksModel.getTasks().slice().sort(sortTaskUp);
        return filtredTasks.sort(sortDate);
      case SortType.DATE_DOWN:
        // return this._tasksModel.getTasks().slice().sort(sortTaskDown);
        return filtredTasks.sort(sortDate);
    }

    // return this._tasksModel.getTasks();
    return filtredTasks;
  }

  _renderTasks(tasks) {
    console.log('_renderTasks', tasks);
    tasks.forEach((task) => this._renderEvent(task));
  }

  // _sortEvents(sortType) {
  //   switch (sortType) {
  //     case SortType.TIME:
  //       this._pageEvents.sort(sortTime);
  //       break;
  //     case SortType.PRICE:
  //       this._pageEvents.sort(sortPrice);
  //       break;
  //     default:
  //       this._pageEvents.sort(sortDate);
  //   }

  //   this._currentSortType = sortType;
  // }

  _handlerSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    // this._sortEvents(sortType);
    this._currentSortType = sortType;

    // this._clearEventList();
    // this._renderEventList();
    this._clearBoard({resetRenderedTaskCount: true});
    this._renderBoard();
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._pageComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _clearBoard({resetRenderedTaskCount = false, resetSortType = false} = {}) {
    const taskCount = this._getTasks().length;

    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};

    remove(this._sortComponent);
    remove(this._noTaskComponent);
    remove(this._loadMoreButtonComponent);

    if (resetRenderedTaskCount) {
      this._renderedTaskCount = TASK_COUNT_PER_STEP;
    } else {
      // На случай, если перерисовка доски вызвана
      // уменьшением количества задач (например, удаление или перенос в архив)
      // нужно скорректировать число показанных задач
      this._renderedTaskCount = Math.min(taskCount, this._renderedTaskCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderEvents() {
    this._pageEvents
      .forEach((pageEvent) => this._renderEvent(pageEvent));
  }

  _renderEvent(event) {
    // const eventPresenter = new EventPresenter(this._eventsListComponent, this._handleEventChange, this._handleModeChange);
    const eventPresenter = new EventPresenter(this._eventsListComponent, this._handleViewAction, this._handleModeChange);
    eventPresenter.init(event);
    this._eventPresenter[event.id] = eventPresenter;
  }

  _renderNoEvents() {
    render(this._pageComponent, this._noEventsComponent, RenderPosition.AFTERBEGIN);
  }

  // _renderEventList() {
  //   const taskCount = this._getTasks().length;
  //   const tasks = this._getTasks().slice(0, Math.min(taskCount));

  //   this._renderTasks(tasks);
  //   this._renderEvents(0, Math.min(this._tasksModel.length));
  // }

  // _clearEventList() {
  //   Object
  //     .values(this._eventPresenter)
  //     .forEach((presenter) => presenter.destroy());
  //   this._eventPresenter = {};
  // }

  _handleEventChange(updatedEvent) {
    this._pageEvents = updateItem(this._pageEvents, updatedEvent);
    this._eventPresenter[updatedEvent.id].init(updatedEvent);
  }

  _handleModeChange() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  // _renderPage() {
  //   if (!this._getTasks()) {
  //     this._renderNoEvents();
  //     return;
  //   }

  //   this._renderSort();
  //   this._renderEventList();
  // }

  _renderBoard() {
    const tasks = this._getTasks();
    const taskCount = tasks.length;

    if (taskCount === 0) {
      this._renderNoTasks();
      return;
    }

    this._renderSort();
    this._renderTasks(tasks.slice(0, taskCount));
  }
}

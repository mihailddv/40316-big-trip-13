import EventsModel from "../model/events.js";
import {isOnline} from "../utils/common.js";

const getSyncedTasks = (items) => {
  return items.filter(({success}) => success)
    .map(({payload}) => payload.task);
};

const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
};

const createDestinationsStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.name]: current,
    });
  }, {});
};

const createOffersStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.type]: current,
    });
  }, {});
};
export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getPoints() {
    if (isOnline()) {
      return this._api.getPoints()
        .then((tasks) => {
          const items = createStoreStructure(tasks.map(EventsModel.adaptToServer));
          this._store.setItems(items);
          return tasks;
        });
    }

    const storeTasks = Object.values(this._store.getItems());

    return Promise.resolve(storeTasks.map(EventsModel.adaptToClient));
  }

  getDestinations() {
    if (isOnline()) {
      return this._api.getDestinations()
        .then((destinations) => {
          const items = createDestinationsStoreStructure(destinations);
          this._destinationsStore.setItems(items);
          return destinations;
        });
    }
    const storeDestinations = Object.values(this._destinationsStore.getItems());

    return Promise.resolve(storeDestinations);
  }

  getOffers() {
    if (isOnline()) {
      return this._api.getOffers()
        .then((offers) => {
          const items = createOffersStoreStructure(offers);
          this._offersStore.setItems(items);
          return offers;
        });
    }
    const storeOffers = Object.values(this._offersStore.getItems());
    return Promise.resolve(storeOffers);
  }

  updateEvent(task) {
    if (isOnline()) {
      return this._api.updateEvent(task)
        .then((updatedTask) => {
          this._store.setItem(updatedTask.id, EventsModel.adaptToServer(updatedTask));
          return updatedTask;
        });
    }

    this._store.setItem(task.id, EventsModel.adaptToServer(Object.assign({}, task)));

    return Promise.resolve(task);
  }

  addEvent(task) {
    if (isOnline()) {
      return this._api.addEvent(task)
        .then((newTask) => {
          this._store.setItem(newTask.id, EventsModel.adaptToServer(newTask));
          return newTask;
        });
    }

    return Promise.reject(new Error(`Add task failed`));
  }

  deleteEvent(task) {
    if (isOnline()) {
      return this._api.deleteEvent(task)
        .then(() => this._store.removeItem(task.id));
    }

    return Promise.reject(new Error(`Delete task failed`));
  }

  sync() {
    if (isOnline()) {
      const storeTasks = Object.values(this._store.getItems());

      return this._api.sync(storeTasks)
        .then((response) => {
          // Забираем из ответа синхронизированные задачи
          const createdTasks = getSyncedTasks(response.created);
          const updatedTasks = getSyncedTasks(response.updated);

          // Добавляем синхронизированные задачи в хранилище.
          // Хранилище должно быть актуальным в любой момент.
          const items = createStoreStructure([...createdTasks, ...updatedTasks]);

          this._store.setItems(items);
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }
}

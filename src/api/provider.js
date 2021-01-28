import EventsModel from "../model/events.js";
import {isOnline} from "../utils/common.js";

const getSyncedPoints = (items) => {
  return items.filter(({success}) => success)
    .map(({payload}) => payload.point);
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
        .then((points) => {
          const items = createStoreStructure(points.map(EventsModel.adaptToServer));
          this._store.setItems(items);
          return points;
        });
    }

    const storePoints = Object.values(this._store.getItems());

    return Promise.resolve(storePoints.map(EventsModel.adaptToClient));
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
    console.log(`getOffers`);
    if (isOnline()) {
      return this._api.getOffers()
        .then((offers) => {
          console.log(`getOffers offers`, offers);
          const items = createOffersStoreStructure(offers);
          this._offersStore.setItems(items);
          return offers;
        });
    }
    const storeOffers = Object.values(this._offersStore.getItems());

    return Promise.resolve(storeOffers);
  }

  updateEvent(point) {
    if (isOnline()) {
      return this._api.updateEvent(point)
        .then((updatedPoint) => {
          this._store.setItem(updatedPoint.id, EventsModel.adaptToServer(updatedPoint));
          return updatedPoint;
        });
    }

    this._store.setItem(point.id, EventsModel.adaptToServer(Object.assign({}, point)));

    return Promise.resolve(point);
  }

  addEvent(point) {
    if (isOnline()) {
      return this._api.addEvent(point)
        .then((newPoint) => {
          this._store.setItem(newPoint.id, EventsModel.adaptToServer(newPoint));
          return newPoint;
        });
    }

    return Promise.reject(new Error(`Add point failed`));
  }

  deleteEvent(point) {
    if (isOnline()) {
      return this._api.deleteEvent(point)
        .then(() => this._store.removeItem(point.id));
    }

    return Promise.reject(new Error(`Delete point failed`));
  }

  sync() {
    if (isOnline()) {
      const storePoints = Object.values(this._store.getItems());

      return this._api.sync(storePoints)
        .then((response) => {
          const createdPoints = getSyncedPoints(response.created);
          const updatedPoints = getSyncedPoints(response.updated);

          const items = createStoreStructure([...createdPoints, ...updatedPoints]);

          this._store.setItems(items);
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }
}

import Observer from "../utils/observer.js";

export default class DestinationsModel extends Observer {
  constructor() {
    super();
    this._destinations = {};
  }

  setDestinations(updateType, destinations) {
    console.log(`setDestinations destinations`, destinations);
    this._destinations = destinations;

    this._notify(updateType);
  }

  getDestinations() {
    return this._destinations;
  }

  // static adaptToClient(destinations) {
  //   const adaptedDestination = destinations.reduce((acc, item) => {
  //     acc[item.name] = item;
  //     return acc;
  //   }, {});

  //   return adaptedDestination;
  // }
}

import Observer from "../utils/observer.js";

export default class Events extends Observer {
  constructor() {
    super();
    this._events = [];
  }

  setEvents(updateType, events) {
    this._events = events.slice();

    this._notify(updateType);
  }

  setPoints(updateType, points) {
    this._tasks = points.slice();

    this._notify(updateType);
  }

  getEvents() {
    return this._events;
  }

  updateEvent(updateType, update) {
    const index = this._events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting event`);
    }

    this._events = [
      ...this._events.slice(0, index),
      update,
      ...this._events.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addEvent(updateType, update) {
    this._events = [
      update,
      ...this._events
    ];

    this._notify(updateType, update);
  }

  deleteEvent(updateType, update) {
    const index = this._events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting event`);
    }

    this._events = [
      ...this._events.slice(0, index),
      ...this._events.slice(index + 1)
    ];

    this._notify(updateType);
  }

  static adaptToClient(point) {
    const adaptedPoint = Object.assign(
        {},
        point,
        {
          price: point.base_price,
          dateStart: point.date_from !== null ? new Date(point.date_from) : point.date_from, // На клиенте дата хранится как экземпляр Date
          dateEnd: point.date_to !== null ? new Date(point.date_to) : point.date_to,
          isFavorite: point.is_favorite,
          city: {
            name: point.destination.name,
            text: point.destination.description,
            photos: point.destination.pictures,
          },
          eventType: {
            type: point.type,
            offers: point.offers,
          },
        }
    );

    delete adaptedPoint.base_price;
    delete adaptedPoint.date_from;
    delete adaptedPoint.date_to;
    delete adaptedPoint.is_favorite;
    delete adaptedPoint.destination;

    return adaptedPoint;
  }

  static adaptToServer(point) {
    const adaptedPoint = Object.assign(
        {},
        point,
        {
          "base_price": Number(point.price),
          "date_from": point.dateStart instanceof Date ? point.dateStart.toISOString() : null, // На сервере дата хранится в ISO формате
          "date_to": point.dateEnd instanceof Date ? point.dateEnd.toISOString() : null, // На сервере дата хранится в ISO формате
          "type": point.eventType.type.toLowerCase(),
          "offers": point.eventType.offers,
          "is_favorite": point.isFavorite,
          "destination": {
            name: point.city.name,
            description: point.city.text,
            pictures: point.city.photos,
          },
        }
    );

    // Ненужные ключи мы удаляем
    delete adaptedPoint.dateStart;
    delete adaptedPoint.dateEnd;
    delete adaptedPoint.city;
    delete adaptedPoint.eventType;
    delete adaptedPoint.price;
    delete adaptedPoint.isFavorite;

    return adaptedPoint;
  }
}

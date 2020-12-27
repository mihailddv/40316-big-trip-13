import Observer from "../utils/observer.js";

export default class Events extends Observer {
  constructor() {
    super();
    this._events = [];
  }

  setEvents(updateType, events) {
    // console.log(`setEvents events`, events);
    this._events = events.slice();
    console.log(`this._events`, this._events);

    this._notify(updateType);
  }

  setTasks(updateType, tasks) {
    console.log(`setTasks`);
    this._tasks = tasks.slice();
    console.log(`this._tasks`, this._tasks);

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

  static adaptToClient(task) {
    const adaptedTask = Object.assign(
        {},
        task,
        {
          price: task.base_price,
          dateStart: task.date_from !== null ? new Date(task.date_from) : task.date_from, // На клиенте дата хранится как экземпляр Date
          dateEnd: task.date_to !== null ? new Date(task.date_to) : task.date_to,
          isFavorite: task.is_favorite,
          city: {
            name: task.destination.name,
            text: task.destination.description,
            photos: task.destination.pictures,
          },
          eventType: `test`,
          orders: `ff`,
        }
    );

    // Ненужные ключи мы удаляем
    delete adaptedTask.base_price;
    delete adaptedTask.date_from;
    delete adaptedTask.date_to;
    delete adaptedTask.is_favorite;
    delete adaptedTask.destination;

    return adaptedTask;
  }

  // TODO: сделать при отправке на сервер

  // static adaptToServer(task) {
  //   const adaptedTask = Object.assign(
  //       {},
  //       task,
  //       {
  //         "due_date": task.dueDate instanceof Date ? task.dueDate.toISOString() : null, // На сервере дата хранится в ISO формате
  //         "is_archived": task.isArchive,
  //         "is_favorite": task.isFavorite,
  //         "repeating_days": task.repeating
  //       }
  //   );

  //   // Ненужные ключи мы удаляем
  //   delete adaptedTask.dueDate;
  //   delete adaptedTask.isArchive;
  //   delete adaptedTask.isFavorite;
  //   delete adaptedTask.repeating;

  //   return adaptedTask;
  // }
}

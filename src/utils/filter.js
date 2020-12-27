import {FilterType} from "../const";
// import {isEventExpired, isEventExpiringToday, isEventRepeating} from "./event";

export const filter = {
  [FilterType.ALL]: (events) => events.filter((event) => event),
  // [FilterType.OVERDUE]: (events) => events.filter((event) => isEventExpired(event.dueDate)),
  // [FilterType.TODAY]: (events) => events.filter((event) => isEventExpiringToday(event.dueDate)),
  // [FilterType.FAVORITES]: (events) => events.filter((event) => event.isFavorite),
  // [FilterType.REPEATING]: (events) => events.filter((event) => isEventRepeating(event.repeating)),
  // [FilterType.ARCHIVE]: (events) => events.filter((event) => event.isArchive)
};

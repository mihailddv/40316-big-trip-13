import {FilterType} from "../const";
import {isFutureDate, isPastDate} from "./point";

export const filter = {
  [FilterType.ALL]: (events) => events.filter((event) => event),
  [FilterType.FUTURE]: (events) => events.filter((event) => isFutureDate(event.dateStart)),
  [FilterType.PAST]: (events) => events.filter((event) => isPastDate(event.dateEnd))
};

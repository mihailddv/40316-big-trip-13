export const INFO_CITIES = 2;

export const SortType = {
  DATE: `date`,
  TIME: `time`,
  PRICE: `price`
};

export const UserAction = {
  UPDATE_EVENT: `UPDATE_EVENT`,
  ADD_EVENT: `ADD_EVENT`,
  DELETE_EVENT: `DELETE_EVENT`
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
  INIT: `INIT`,
};

export const FilterType = {
  ALL: `all`,
  FUTURE: `future`,
  PAST: `past`,
};

export const MenuItem = {
  POINTS: `POINTS`,
  STATISTICS: `STATISTICS`
};

export const BLANK_EVENT = {
  city: {
    name: ``,
    text: ``,
    photos: ``,
  },
  eventType: {
    type: ``,
  },
  dateStart: new Date(),
  dateEnd: new Date(),
  price: 0,
  isFavorite: false,
  offers: [
    {
      title: ``,
      price: ``,
    }
  ],
};

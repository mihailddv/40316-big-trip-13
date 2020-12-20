export const EVENT_TYPE = [
  {
    id: 1,
    type: `taxi`,
    name: `Taxi`,
    image: `taxi`,
  },
  {
    id: 2,
    type: `bus`,
    name: `Bus`,
    image: `bus`,
  },
  {
    id: 3,
    type: `train`,
    name: `Train`,
    image: `train`,
  },
  {
    id: 4,
    type: `ship`,
    name: `Ship`,
    image: `ship`,
  },
  {
    id: 5,
    type: `transport`,
    name: `Transport`,
    image: `transport`,
  },
  {
    id: 6,
    type: `drive`,
    name: `Drive`,
    image: `drive`,
  },
  {
    id: 7,
    type: `flight`,
    name: `Flight`,
    image: `flight`,
  },
  {
    id: 8,
    type: `checkin`,
    name: `CheckIn`,
    image: `check-in`,
  },
  {
    id: 9,
    type: `sightseeing`,
    name: `Sightseeing`,
    image: `sightseeing`,
  },
  {
    id: 10,
    type: `restaurant`,
    name: `Restaurant`,
    image: `restaurant`,
  },
];

export const SortType = {
  DATE_DEFAULT: `date`,
  TIME: `time`,
  PRICE: `price`
};

export const UserAction = {
  UPDATE_TASK: `UPDATE_TASK`,
  ADD_TASK: `ADD_TASK`,
  DELETE_TASK: `DELETE_TASK`
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`
};

export const FilterType = {
  ALL: `all`,
  // OVERDUE: `overdue`,
  // TODAY: `today`,
  FAVORITES: `favorites`,
  // REPEATING: `repeating`,
  ARCHIVE: `archive`
};

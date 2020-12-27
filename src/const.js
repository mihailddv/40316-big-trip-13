export const EVENT_TYPE = [
  {
    name: `Taxi`,
    type: `Taxi`,
    image: `taxi`,
    offers: [
      {
        title: `taxi12`,
        offerPrice: 10,
      },
      {
        title: `taxi2`,
        offerPrice: 20,
      },
      {
        title: `taxi3`,
        offerPrice: 20,
      },
    ]
  },
  {
    name: `Bus`,
    type: `Bus`,
    image: `bus`,
    offers: [
      {
        title: `bus1`,
        offerPrice: 10,
      },
      {
        title: `bus2`,
        offerPrice: 20,
      },
    ]
  },
  {
    name: `Train`,
    type: `Train`,
    image: `train`,
    offers: [
      {
        title: `train1`,
        offerPrice: 10,
      },
      {
        title: `train2`,
        offerPrice: 20,
      },
    ]
  },
  {
    name: `Ship`,
    type: `Ship`,
    image: `bus`,
    offers: [
      {
        title: `ship1`,
        offerPrice: 10,
      },
      {
        title: `ship2`,
        offerPrice: 20,
      },
    ]
  },
  {
    name: `Transport`,
    type: `Transport`,
    image: `transport`,
    offers: [
      {
        title: `transport1`,
        offerPrice: 10,
      },
      {
        title: `transport2`,
        offerPrice: 20,
      },
    ]
  },
  {
    name: `Drive`,
    type: `Drive`,
    image: `drive`,
    offers: [
      {
        title: `drive1`,
        offerPrice: 10,
      },
      {
        title: `drive2`,
        offerPrice: 20,
      },
    ]
  },
  {
    name: `Flight`,
    type: `Flight`,
    image: `flight`,
    offers: [
      {
        title: `flight1`,
        offerPrice: 10,
      },
      {
        title: `flight2`,
        offerPrice: 20,
      },
    ]
  },
  {
    name: `CheckIn`,
    type: `CheckIn`,
    image: `check-in`,
    offers: [
      {
        title: `check-in1`,
        offerPrice: 10,
      },
      {
        title: `check-in2`,
        offerPrice: 20,
      },
    ]
  },
  {
    name: `Sightseeing`,
    type: `Sightseeing`,
    image: `sightseeing`,
    offers: [
      {
        title: `sightseeing1`,
        offerPrice: 10,
      },
      {
        title: `sightseeing2`,
        offerPrice: 20,
      },
    ]
  },
  {
    name: `Restaurant`,
    type: `Restaurant`,
    image: `restaurant`,
    offers: [
      {
        title: `restaurant1`,
        offerPrice: 10,
      },
      {
        title: `restaurant2`,
        offerPrice: 20,
      },
    ]
  },
];

export const CITIES = [
  {
    name: `Geneva`,
    text: `Geneva text`,
    photos: [
      {
        src: `http://picsum.photos/248/152?r=${Math.random()}`,
      },
      {
        src: `http://picsum.photos/248/152?r=${Math.random()}`,
      },
    ]
  },
  {
    name: `Chamonix`,
    text: `Chamonix text`,
    photos: [
      {
        src: `http://picsum.photos/248/152?r=${Math.random()}`,
      },
      {
        src: `http://picsum.photos/248/152?r=${Math.random()}`,
      },
    ]
  },
  {
    name: `Amsterdam`,
    text: `Amsterdam text`,
    photos: [
      {
        src: `http://picsum.photos/248/152?r=${Math.random()}`,
      },
      {
        src: `http://picsum.photos/248/152?r=${Math.random()}`,
      },
    ]
  },
  {
    name: `Moscow`,
    text: `Moscow text`,
    photos: [
      {
        src: `http://picsum.photos/248/152?r=${Math.random()}`,
      },
      {
        src: `http://picsum.photos/248/152?r=${Math.random()}`,
      },
    ]
  },
];

export const SortType = {
  DATE_DEFAULT: `date`,
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

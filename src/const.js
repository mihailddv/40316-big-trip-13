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
  }
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

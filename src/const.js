export const EVENT_TYPE = [
  {
    type: `taxi`,
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
    type: `bus`,
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
    photo: `http://picsum.photos/248/152?r=${Math.random()}`,
  },
  {
    name: `Chamonix`,
    text: `Chamonix text`,
    photo: `http://picsum.photos/248/152?r=${Math.random()}`,
  },
  {
    name: `Amsterdam`,
    text: `Amsterdam text`,
    photo: `http://picsum.photos/248/152?r=${Math.random()}`,
  }
];

export const SortType = {
  DATE_DEFAULT: `date`,
  TIME: `time`,
  PRICE: `price`
};

import dayjs from "dayjs";

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateCities = () => {
  const cities = [
    `Geneva`,
    `Chamonix`,
    `Amsterdam`
  ];

  const randomIndex = getRandomInteger(0, cities.length - 1);

  return cities[randomIndex];
};

const generateDate = () => {
  const isDate = Boolean(getRandomInteger(0, 1));

  if (!isDate) {
    return null;
  }

  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);

  return dayjs().add(daysGap, `day`).toDate();
};

const generatePoint = () => {
  return {
    taxi: false,
    bus: false,
    train: false,
    ship: false,
    transport: false,
    drive: false,
    flight: false,
    checkIn: false,
    sightseeing: false,
    restaurant: false,
  };
};

export const generateEvent = () => {
  const date = generateDate();
  const point = generatePoint();

  return {
    cities: generateCities(),
    date,
    point,
    price: Math.floor(Math.random() * 1001),
    fullPrice: `300`,
    time: {
      start: `13:00`,
      end: `16:00`
    },
    travelTime: `3H`,
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};

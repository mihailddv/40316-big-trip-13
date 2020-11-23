const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateDescription = () => {
  const cities = [
    `Geneva`,
    `Chamonix`,
    `Amsterdam`
  ];

  const randomIndex = getRandomInteger(0, cities.length - 1);

  return cities[randomIndex];
};

export const generateEvent = () => {
  return {
    description: generateDescription(),
    dueDate: null,
    point: {
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
    },
    price: Math.floor(Math.random() * 1001),
    time: {
      start: `13:00`,
      end: `16:00`
    },
    travelTime: `3H`
  };
};

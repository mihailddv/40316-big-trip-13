import {getRandomInteger} from '../src/utils/common';
import {EVENT_TYPE, CITIES} from '../src/const';
const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const generateCities = () => {
  const randomIndex = getRandomInteger(0, CITIES.length - 1);

  return CITIES[randomIndex];
};

const generateStartDate = () => {
  const randomDate = new Date(+(new Date()) + Math.floor(Math.random() * 1000000000));

  return randomDate;
};

const generateEndDate = (dateStart) => {
  const randomDate = new Date(+(dateStart) + Math.floor(Math.random() * 100000000));

  return randomDate;
};

const generateEventType = () => {
  const randomIndex = getRandomInteger(0, EVENT_TYPE.length - 1);

  return EVENT_TYPE[randomIndex];
};

const generateOrdersList = () => {
  const orders = [
    {
      name: `Add luggage`,
      price: 10,
    },
    {
      name: `Book tickets`,
      price: 20,
    },
    {
      name: `Lunch in city`,
      price: 30,
    },
    {
      name: `Rent a car`,
      price: 50,
    },
    {
      name: `Order Uber`,
      price: 40,
    },
  ];

  const randomIndex = getRandomInteger(0, orders.length - 1);

  return orders[randomIndex];
};

export const generateEvent = () => {
  const id = generateId();
  const dateStart = generateStartDate();
  const dateEnd = generateEndDate(dateStart);
  const travelTime = dateEnd - dateStart;
  const travelHours = Math.floor(travelTime / 3600 / 1000);
  const city = generateCities();
  const eventType = generateEventType();
  const price = Math.floor(Math.random() * 1001);
  const isFavorite = Boolean(getRandomInteger(0, 1));
  const orders = generateOrdersList();

  return {
    id,
    dateStart,
    dateEnd,
    travelHours,
    city,
    eventType,
    price,
    isFavorite,
    orders,
  };
};

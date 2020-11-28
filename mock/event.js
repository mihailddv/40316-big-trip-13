import {getRandomInteger} from '../src/utils';
import {EVENT_TYPE} from '../src/const';

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
  const randomDate = new Date(+(new Date()) + Math.floor(Math.random() * 1000000000));

  return randomDate;
};

const generateEventType = () => {
  const randomIndex = getRandomInteger(0, EVENT_TYPE.length - 1);

  return EVENT_TYPE[randomIndex];
};

const generateDestination = () => {
  const text = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`,
  ];

  const randomIndex = getRandomInteger(0, text.length - 1);

  return text[randomIndex];
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

const generatePhotos = () => {
  const photos = [];
  const randomIndex = getRandomInteger(0, 5);

  for (let i = 0; i < randomIndex; i++) {
    photos.unshift({photoPath: `http://picsum.photos/248/152?r=${Math.random()}`});
  }

  return photos;
};

const generateOffers = () => {
  const offers = [
    {
      id: 1,
      name: `Add luggage`,
      offerPrice: `80`,
      isChecked: true,
    },
    {
      id: 2,
      name: `Switch to comfort`,
      offerPrice: `15`,
      isChecked: true,
    },
    {
      id: 3,
      name: `Add meal`,
      offerPrice: `5`,
      isChecked: false,
    },
    {
      id: 4,
      name: `Choose seats`,
      offerPrice: `40`,
      isChecked: false,
    },
    {
      id: 5,
      name: `Travel by train`,
      offerPrice: `45`,
      isChecked: false,
    },
  ];

  return offers;
};

export const generateEvent = () => {
  return {
    date: generateDate(),
    cities: generateCities(),
    eventType: generateEventType(),
    price: Math.floor(Math.random() * 1001),
    time: {
      start: `13:00`,
      end: `16:00`
    },
    travelTime: `3H`,
    isFavorite: Boolean(getRandomInteger(0, 1)),
    destination: generateDestination(),
    photos: generatePhotos(),
    orders: generateOrdersList(),
    offers: generateOffers(),
  };
};

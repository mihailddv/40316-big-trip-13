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

// const generatePhotos = () => {
//   const photos = [];
//   const randomIndex = getRandomInteger(0, 5);

//   for (let i = 0; i < randomIndex; i++) {
//     photos.unshift({photoPath: `http://picsum.photos/248/152?r=${Math.random()}`});
//   }

//   return photos;
// };

const generateTypes = () => {
  const types = [
    {
      type: `taxi`,
      image: `taxi`,
      offers: [
        {
          title: `taxi1`,
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
    },
  ];

  const randomIndex = getRandomInteger(0, types.length - 1);

  return types[randomIndex];
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
  const id = generateId();
  const dateStart = generateStartDate();
  const dateEnd = generateEndDate(dateStart);
  const travelTime = dateEnd - dateStart;
  const travelHours = Math.floor(travelTime / 3600 / 1000);
  const city = generateCities();
  // const eventType = generateEventType();
  const eventType = generateTypes();
  const price = Math.floor(Math.random() * 1001);
  const isFavorite = Boolean(getRandomInteger(0, 1));
  const destination = generateDestination();
  // const photos = generatePhotos();
  const orders = generateOrdersList();
  const offers = generateOffers();

  return {
    id,
    dateStart,
    dateEnd,
    travelHours,
    city,
    eventType,
    price,
    isFavorite,
    destination,
    // photos,
    orders,
    offers,
  };
};

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};

export const calculateTotal = () => {
  const page = document.querySelector(`.page-body`);
  const eventPrice = page.querySelectorAll(`.event__price-value`);
  const offerPrice = page.querySelectorAll(`.event__selected-offers .event__offer-price`);
  const fullPrice = page.querySelector(`.trip-info__cost-value`);

  const priceList = [];
  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  const calculateType = (type) => {
    type.forEach((item) => {
      const value = Number(item.innerHTML);
      priceList.unshift(value);
    });
  };

  calculateType(eventPrice);
  calculateType(offerPrice);

  if (priceList.length) {
    fullPrice.textContent = priceList.reduce(reducer);
  }
};

// export const calculateDate = () => {
//   const page = document.querySelector(`.page-body`);
//   const dates = page.querySelector(`.trip-info__dates`);
//   const eventFirst = page.querySelector(`.trip-events__item:first-child .event__date`).textContent;
//   const eventLast = page.querySelector(`.trip-events__item:last-child .event__date`).textContent;

//   dates.textContent = `${eventFirst} - ${eventLast}`;
// };

export const sortByDate = (a, b) => {
  return new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime();
};

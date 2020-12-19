export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const calculateTotal = () => {
  const page = document.querySelector(`.page-body`);
  const eventPrice = page.querySelectorAll(`.event__price-value`);
  const offerPrice = page.querySelectorAll(`.event__offer-price`);
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

import dayjs from "dayjs";

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const humanizePointDate = (dueDate) => {
  return dayjs(dueDate).format(`D MMM`);
};

export const humanizeEventTime = (dueDate) => {
  return dayjs(dueDate).format(`HH:mm`);
};

export const humanizeEditPointTime = (dueDate) => {
  return dayjs(dueDate).format(`DD/MM/YY HH:mm`);
};

export const calculateTotal = () => {
  const page = document.querySelector(`.page-body`);
  const eventPrice = page.querySelectorAll(`.event__price-value`);
  const offerPrice = page.querySelectorAll(`.event__offer-price`);
  const fullPrice = page.querySelector(`.trip-info__cost-value`);
  const list = [];
  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  function calculateType(type) {
    type.forEach((item) => {
      const value = Number(item.innerHTML);
      list.unshift(value);
    });
  }

  calculateType(eventPrice);
  calculateType(offerPrice);
  fullPrice.innerHTML = list.reduce(reducer);
};

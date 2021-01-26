import dayjs from "dayjs";

export const humanizePointDate = (dueDate) => {
  return dayjs(dueDate).format(`MMM D`);
};

export const humanizeEventTime = (dueDate) => {
  return dayjs(dueDate).format(`HH:mm`);
};

export const humanizeEditPointTime = (dueDate) => {
  return dayjs(dueDate).format(`DD/MM/YYYY HH:mm`);
};

export const sortDate = (eventA, eventB) => {
  return eventA.dateStart - eventB.dateStart;
};

export const sortPrice = (eventA, eventB) => {
  return eventB.price - eventA.price;
};

export const sortTime = (eventA, eventB) => {
  const eventADate = new Date(eventA.dateEnd) - new Date(eventA.dateStart);
  const eventBDate = new Date(eventB.dateEnd) - new Date(eventB.dateStart);

  return eventBDate - eventADate;
};

export const isPastDate = (date) => {
  return date === null ? false : dayjs().isAfter(date);
};

export const isFutureDate = (date) => {
  return date === null ? false : dayjs().isBefore(date, `day`) || dayjs().isSame(date, `day`);
};


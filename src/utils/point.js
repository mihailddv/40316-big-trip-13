import dayjs from "dayjs";

export const humanizePointDate = (dueDate) => {
  return dayjs(dueDate).format(`D MMM`);
};

export const humanizeEventTime = (dueDate) => {
  return dayjs(dueDate).format(`HH:mm`);
};

export const humanizeEditPointTime = (dueDate) => {
  return dayjs(dueDate).format(`DD/MM/YY HH:mm`);
};

export const sortDate = (eventA, eventB) => {
  return eventA.dateStart - eventB.dateStart;
};

export const sortPrice = (eventA, eventB) => {
  return eventB.price - eventA.price;
};

export const sortTime = (eventA, eventB) => {
  return eventB.travelHours - eventA.travelHours;
};

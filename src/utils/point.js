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

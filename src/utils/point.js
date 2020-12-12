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

export const sortTaskUp = (taskA, taskB) => {
  return dayjs(taskA.dueDate).diff(dayjs(taskB.dueDate));
};

export const sortTaskDown = (taskA, taskB) => {
  return dayjs(taskB.dueDate).diff(dayjs(taskA.dueDate));
};

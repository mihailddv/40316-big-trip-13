import {POINT_TYPES} from "../const.js";

export const getTypes = (points) => {
  let lookup = {};
  let items = points;
  let result = [];

  // eslint-disable-next-line no-cond-assign
  for (let item, i = 0; item = items[i++];) {
    let type = item.eventType.type;

    if (!(type in lookup)) {
      lookup[type] = 1;
      result.push(type);
    }
  }

  return result.sort();
};

export const calculateCost = (points) => {
  const labels = getTypes(points);
  const costs = new Map();
  labels.forEach((type) => {
    costs.set(type, 0);
  });
  points.forEach((point) => {
    costs.set(point.eventType.type, costs.get(point.eventType.type) + point.price);
  });
  return costs;
};

export const calculateUniqType = (points) => {
  const labels = getTypes(points);
  const uniqType = new Map();
  labels.forEach((type) => {
    uniqType.set(type, 0);
  });
  points.forEach((point) => {
    uniqType.set(point.eventType.type, uniqType.get(point.eventType.type) + 1);
  });
  return uniqType;
};

export const calculateTimeByPointType = (points) => {
  let times = new Map();
  POINT_TYPES.forEach((type) => times.set(type, 0));
  points.forEach((point) => {
    // console.log(`point`, point);
    // const durationInMinutes = point.dateEnd.diff(point.dateStart, `minute`);
    // times.set(point.type, times.get(point.type) + durationInMinutes);
  });
  return times;
};

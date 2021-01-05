import {POINT_TYPES, EVENT_TYPE} from "../const.js";

export const getTypes = (points) => {
  let lookup = {};
  let items = points;
  let result = [];

  for (let item, i = 0; item = items[i++];) {
    let type = item.eventType.type;

    if (!(type in lookup)) {
      lookup[type] = 1;
      result.push(type);
    }
  }

  return result.sort();
};

// const getChartLabels = (points) => {
//   const counts = calculateCountByPointType(points);
//   let labels = [];
//   counts.forEach((value, key) => {
//     if (value > 0) {
//       labels.push(key);
//     }
//   });
//   console.log(`labels`, labels);
//   return labels.sort();
// };

const calculateCostByPointType = (points) => {
  let costs = new Map();
  POINT_TYPES.forEach((pointType) => costs.set(pointType, 0));
  points.forEach((point) => {
    costs.set(point.type, costs.get(point.type) + point.price);
  });
  return costs;
};

const calculateCountByPointType = (points) => {
  let counts = new Map();
  POINT_TYPES.forEach((pointType) => counts.set(pointType, 0));
  points.forEach((point) => {
    counts.set(point.type, counts.get(point.type) + 1);
  });
  console.log(`counts`, counts);
  return counts;
};

const calculateTimeByPointType = (points) => {
  let times = new Map();
  POINT_TYPES.forEach((pointType) => times.set(pointType, 0));
  points.forEach((point) => {
    // console.log(`point`, point);
    // const durationInMinutes = point.dateEnd.diff(point.dateStart, `minute`);
    // times.set(point.type, times.get(point.type) + durationInMinutes);
  });
  return times;
};

export {calculateCostByPointType, calculateCountByPointType, calculateTimeByPointType};

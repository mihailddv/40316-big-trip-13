export const getTypes = (points) => {
  const lookup = {};
  const items = points;
  const result = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const type = item.eventType.type;

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

export const calculateTime = (points) => {
  const labels = getTypes(points);
  const times = new Map();
  labels.forEach((type) => {
    times.set(type, 0);
  });
  points.forEach((point) => {
    const travelHours = Math.floor((point.dateEnd - point.dateStart) / 3600000 / 24);
    times.set(point.eventType.type, times.get(point.eventType.type) + travelHours);
  });
  return times;
};

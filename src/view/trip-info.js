import dayjs from "dayjs";
import AbstractView from "./abstract.js";
import {sortByDate} from '../utils/common';

const createTripInfoTemplate = (points) => {
  // console.log(`points`, points);
  // console.log(`point`, points[0].city.name);s

  let sortedDate = [];
  let dates = ``;

  sortedDate.push(points.sort(sortByDate));

  const pointFirst = sortedDate[0][0];
  const pointLast = sortedDate[0][sortedDate[0].length - 1];
  const pointFirstCity = pointFirst.city.name;
  const pointLastCity = pointLast.city.name;
  const pointFirstDate = dayjs(pointFirst.dateStart).format(`MMM D`);
  const pointLastDate = dayjs(pointFirst.dateEnd).format(`MMM D`);

  let titleText = ``;

  if (points.length < 3) {
    titleText = `${pointFirstCity} &mdash; ${pointLastCity}`;
  } else {
    titleText = `${pointFirstCity} &mdash; ... &mdash; ${pointLastCity}`;
  }

  if (pointFirstDate && pointLastDate) {
    dates = `${pointFirstDate} &mdash; ${pointLastDate}`;
  } else {
    dates = ``;
  }

  // dates = `${dayjs(points[0].dateStart).format(`MMM D`)}&nbsp;&mdash;&nbsp;${dayjs(points[points.length - 1].dateEnd).format(`MMM D`)}`;

  // console.log(`dates`, `${dayjs(sortedDate[0][0].dateStart).format(`MMM D`)}`);
  // console.log(`dates`, `${dayjs(sortedDate[0][sortedDate[0].length - 1].dateStart).format(`MMM D`)}`);

  return /* html */ `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${titleText}</h1>

      <p class="trip-info__dates">${dates}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value"></span>
    </p>
  </section>`;
};

export default class TripInfo extends AbstractView {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createTripInfoTemplate(this._points);
  }
}

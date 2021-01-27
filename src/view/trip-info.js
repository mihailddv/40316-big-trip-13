import dayjs from "dayjs";
import AbstractView from "./abstract.js";
import {sortByDate} from '../utils/common';
import {INFO_CITIES} from '../const';

const createTripInfoTemplate = (points) => {
  let sortedDate = [];
  let dates = ``;
  let totalPrice = Number(0);
  let titleText = ``;

  if (points.length) {
    sortedDate.push(points.sort(sortByDate));

    const pointFirst = sortedDate[0][0];
    const pointLast = sortedDate[0][sortedDate[0].length - 1];
    const pointFirstCity = pointFirst.city.name;
    const pointLastCity = pointLast.city.name;
    const pointFirstDate = dayjs(pointFirst.dateStart).format(`D MMM`);
    const pointLastDate = dayjs(pointLast.dateEnd).format(`D MMM`);

    if (points.length <= INFO_CITIES) {
      titleText = `${pointFirstCity} &mdash; ${pointLastCity}`;
    } else {
      titleText = `${pointFirstCity} &mdash; ... &mdash; ${pointLastCity}`;
    }

    if (pointFirstDate && pointLastDate) {
      dates = `${pointFirstDate} &mdash; ${pointLastDate}`;
    } else {
      dates = ``;
    }

    points.forEach((item) => {
      totalPrice += item.price;
      item.eventType.offers.forEach((offer) => {
        totalPrice += offer.price;
      });
    });
  }

  return /* html */ `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${titleText}</h1>

      <p class="trip-info__dates">${dates}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;
      <span class="trip-info__cost-value">
        ${totalPrice}
      </span>
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

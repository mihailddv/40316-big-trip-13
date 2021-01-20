import AbstractView from "./abstract.js";

const createTripInfoTemplate = (points) => {
  // console.log(`points`, points);
  // console.log(`point`, points[0].city.name);s

  let sortedDate = [];

  const sortByDate = (a, b) => {
    return new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime();
  };

  sortedDate.push(points.sort(sortByDate));

  const cityFirst = sortedDate[0][0].city.name;
  const cityLast = sortedDate[0][sortedDate[0].length - 1].city.name;

  let titleText = ``;

  if (points.length < 2) {
    titleText = `${cityFirst} &mdash; ${cityLast}`;
  } else {
    titleText = `${cityFirst} &mdash; ... &mdash; ${cityLast}`;
  }

  return /* html */ `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${titleText}</h1>

      <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
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

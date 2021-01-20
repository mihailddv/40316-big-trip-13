import AbstractView from "./abstract.js";

const createTripInfoTemplate = (points) => {
  console.log(`points`, points);
  console.log(`point`, points[0].city.name);
  const cityFirst = points[0].city.name;
  const cityLast = points[points.length - 1].city.name;

  console.log(`points.length`, points.length);

  let titleText = ``;

  if (points.length < 3) {
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

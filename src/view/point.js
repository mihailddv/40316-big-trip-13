import AbstractView from "./abstract.js";
import {humanizePointDate, humanizeEventTime} from "../utils/point";


const createOffers = (offers) => {
  return `
  ${(offers) ? `
    ${offers.map(({title, price}) => /* html */`
      <li class="event__offer">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </li>
    `).join(``)}
  ` : ``}
  `;
};

const createPointTemplate = (data) => {
  const {
    city,
    eventType,
    dateStart,
    dateEnd,
    price,
    isFavorite,
  } = data;

  const travelHours = Math.floor((dateEnd - dateStart) / 3600000) % 24;
  const travelMinutes = Math.ceil((dateEnd - dateStart) / 36000) % 60;
  const travelDays = Math.floor((dateEnd - dateStart) / (1000 * 60 * 60 * 24));

  let durationText = `${travelHours}H ${travelMinutes}M`;

  if (travelDays > 0) {
    durationText = `${travelDays}D ${travelHours}H ${travelMinutes}M`;
  }

  const image = eventType.type.toLowerCase();

  const detailsSection = createOffers(eventType.offers);

  const favoriteClassName = isFavorite
    ? `event__favorite-btn--active`
    : ``;

  return /* html */ `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${dateStart}">${humanizePointDate(dateStart)}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${image}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${eventType.type} ${city.name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dateStart}">${humanizeEventTime(dateStart)}</time>
          &mdash;
          <time class="event__end-time" datetime="${dateEnd}">${humanizeEventTime(dateEnd)}</time>
        </p>
        <p class="event__duration">${durationText}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${detailsSection}
      </ul>
      <button class="event__favorite-btn  ${favoriteClassName}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>
  `;
};
export default class Point extends AbstractView {
  constructor(point) {
    super();
    this.point = point;

    this._editClickHandler = this._editClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createPointTemplate(this.point);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._editClickHandler);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, this._favoriteClickHandler);
  }
}

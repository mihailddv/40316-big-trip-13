import SmartView from "./smart.js";
import {EVENT_TYPE} from '../const';
import {humanizeEditPointTime} from '../utils/point';

export const createEditPointTemplate = (data) => {

  const {
    city,
    eventType,
    dateStart,
    dateEnd,
    price,
    destination,
    offers,
    photos,
  } = data;

  const createDetailsSection = () => {
    return `
    ${(offers.length || destination.length) ? `
      <section class="event__details">
        ${offersSection}
        ${destinationSection}
      </section>
    ` : ``}
    `;
  };

  const createOffersSection = () => {
    return `
    ${offers.length ? `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${offersTemplate}
      </div>
    </section>
    ` : ``}
    `;
  };

  const createDesctinationSection = () => {
    return `
    ${destination.length ? `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destination}</p>
    </section>
    ` : ``}
    `;
  };

  const createPhotosSection = () => {
    return `
    ${photos.length ? `
      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${photos.map(({photoPath}) => `
            <img class="event__photo" src="${photoPath}" alt="Event photo">
          `).join(``)}
        </div>
      </div>
    ` : ``}
    `;
  };

  const createOffers = () => {
    return /* html */`
      ${offers.map(({id, name, offerPrice, isChecked}) => /* html */`
        <div class="event__offer-selector">
          <input
            class="event__offer-checkbox visually-hidden"
            id="event-offer-${id}"
            type="checkbox"
            name="event-offer-${id}"
            ${isChecked ? `checked` : ``}
          >
          <label class="event__offer-label" for="event-offer-${id}">
            <span class="event__offer-title">${name}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offerPrice}</span>
          </label>
        </div>
      `).join(``)}
    `;
  };

  const createEventTypeItems = () => {
    return `
      ${EVENT_TYPE.map(({id, type, name, image}) => `
        <div class="event__type-item">
          <input
            id="event-type-${type}-${id}"
            class="event__type-input visually-hidden"
            type="radio"
            name="event-type"
            value="${name}"
          >
          <label
            class="event__type-label event__type-label--${image}"
            for="event-type-${type}-${id}"
          >
            ${name}
          </label>
        </div>
      `).join(``)}
    `;
  };

  const offersTemplate = createOffers(offers);
  const offersSection = createOffersSection();
  const destinationSection = createDesctinationSection();
  const detailsSection = createDetailsSection();
  const photosSection = createPhotosSection();
  const eventTypeItems = createEventTypeItems();

  return /* html */ `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${eventType.image}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${eventTypeItems}
            </fieldset>
          </div>

        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${eventType.name}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
          <datalist id="destination-list-1">
            <option value="Amsterdam"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input
            class="event__input event__input--time"
            id="event-start-time-1"
            type="text"
            name="event-start-time"
            data-time="start"
            value="${humanizeEditPointTime(dateStart)}"
          >
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input
            class="event__input event__input--time"
            id="event-end-time-1"
            type="text"
            name="event-end-time"
            data-time="end"
            value="${humanizeEditPointTime(dateEnd)}"
          >
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input
            class="event__input event__input--price"
            id="event-price-1"
            type="text"
            name="event-price"
            value="${price}"
          >
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>

      ${detailsSection}

      ${photosSection}

    </form>
  </li>
  `;
};
export default class PointEdit extends SmartView {
  constructor(point) {
    super();
    this._data = point;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._priceInputHandler = this._priceInputHandler.bind(this);
    this._cityInputHandler = this._cityInputHandler.bind(this);
    this._dateStartInputHandler = this._dateStartInputHandler.bind(this);
    this._dateEndInputHandler = this._dateEndInputHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createEditPointTemplate(this._data);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`.event__input--price`)
      .addEventListener(`input`, this._priceInputHandler);
    this.getElement()
      .querySelector(`.event__input--destination`)
      .addEventListener(`input`, this._cityInputHandler);
    this.getElement()
      .querySelector(`[data-time="start"]`)
      .addEventListener(`input`, this._dateStartInputHandler);
    this.getElement()
      .querySelector(`[data-time="end"]`)
      .addEventListener(`input`, this._dateEndInputHandler);
  }

  _priceInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      price: evt.target.value
    }, true);
  }

  _cityInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      city: evt.target.value
    }, true);
  }

  _dateStartInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      dateStart: evt.target.value
    }, true);
  }

  _dateEndInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      dateEnd: evt.target.value
    }, true);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(this._data);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }

  setCardArrowHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`.event--edit .event__rollup-btn`).addEventListener(`click`, this._formSubmitHandler);
  }
}

import he from "he";
import dayjs from "dayjs";
import flatpickr from "flatpickr";

import "../../node_modules/flatpickr/dist/flatpickr.min.css";

import SmartView from "./smart.js";
import {humanizeEditPointTime} from '../utils/point';
import {BLANK_EVENT} from '../const';

export const createEditPointTemplate = (data, destinations, offers) => {

  const {
    city,
    eventType,
    dateStart,
    dateEnd,
    price,
    isDisabled,
    isSaving,
    isDeleting
  } = data;

  const createOffers = () => {
    const names = Object.values(offers).map((item) => item);
    const type = names.find((offer) => offer.type === eventType.type);

    if (type) {
      const list = type.offers.slice().map((offer) => {
        let isChecked;

        if (eventType.offers) {
          isChecked = eventType.offers.some((item) => item.title === offer.title);
        }

        return /* html */`<div class="event__offer-selector">
            <input
              class="event__offer-checkbox visually-hidden"
              id="event-offer-${offer.title}"
              type="checkbox"
              name="event-offer-${offer.title}"
              data-name="${offer.title}"
              ${isChecked ? `checked` : ``}
              ${isDisabled ? `disabled` : ``}
            >
            <label class="event__offer-label" for="event-offer-${offer.title}">
              <span class="event__offer-title">${offer.title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${offer.price}</span>
            </label>
          </div>
        `;
      });
      return list.join(``);
    } else {
      return ``;
    }
  };

  const createOffersSection = () => {
    const names = Object.values(offers).map((item) => item);
    const type = names.find((offer) => offer.type === eventType.type);

    return `
      ${type && type.offers.length ? `<section class="event__section event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
            ${offersTemplate}
          </div>
        </section>
        ` : ``}
    `;
  };

  const createDestinationSection = () => {
    return `
      ${city && city.text ? `<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${he.encode(city.text)}</p>
      </section>
      ` : ``}
    `;
  };

  const createPhotosSection = () => {
    return `
      ${city && city.photos ? `
        <div class="event__photos-container">
          <div class="event__photos-tape">
          ${city.photos.map(({src}) => `
            <img class="event__photo" src="${src}" alt="Event photo">
          `).join(``)}
          </div>
        </div>
      ` : ``}
    `;
  };

  const createEventTypeItems = (currentType) => {
    const types = Object.values(offers).map((item) => item);

    return `
      ${types.map(({type}) => `
        <div class="event__type-item">
          <input
            id="event-type-${type}"
            class="event__type-input visually-hidden"
            type="radio"
            name="event-type"
            value="${type}"
            ${isDisabled ? `disabled` : ``}
            ${currentType === type ? `checked` : ``}
          >
          <label
            class="event__type-label event__type-label--${type}"
            for="event-type-${type}"
          >
            ${type}
          </label>
        </div>
      `).join(``)}
    `;
  };

  const createDestinationList = () => {
    const names = Object.values(destinations).map((destination) => destination.name);
    const list = names.map((name) => {
      return `<option value="${name}"></option>`;
    });

    return list.join(``);
  };

  let offersTemplate;

  if (offers) {
    offersTemplate = createOffers();
  }

  const offersSection = createOffersSection();
  const destinationSection = createDestinationSection();
  const photosSection = createPhotosSection();
  const eventTypeItems = createEventTypeItems(data.eventType.type);
  const destinationList = createDestinationList();

  let btnDeleteText = `Delete`;

  if (!data.id) {
    btnDeleteText = `Cancel`;
  } else if (isDeleting) {
    btnDeleteText = `Deleting`;
  }

  return /* html */ `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${eventType.type.toLowerCase()}.png" alt="Event type icon">
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
            ${eventType.type}
          </label>
          <input
            class="event__input event__input--destination"
            id="event-destination-1"
            type="text"
            name="event-destination"
            value="${city.name}"
            list="destination-list-1"
          >
          <datalist id="destination-list-1">
            ${destinationList}
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
            type="number"
            name="event-price"
            value="${price}"
          >
        </div>

        <button
          class="event__save-btn  btn  btn--blue"
          type="submit"
          ${isDisabled ? `disabled` : ``}
        >
          ${isSaving ? `Saving...` : `Save`}
        </button>
        <button
          class="event__reset-btn"
          type="reset"
          ${isDisabled ? `disabled` : ``}
        >
          ${btnDeleteText}
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>

      <section class="event__details">
        ${offersSection}
        ${destinationSection}
        ${photosSection}
      </section>


    </form>
  </li>
  `;
};
export default class PointEdit extends SmartView {
  constructor(destinations, offers, event = BLANK_EVENT) {
    super();
    this._data = event;
    this._datepicker = null;
    this._destinations = Object.assign({}, destinations);
    this._offers = Object.assign({}, offers);

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._cardArrowHandler = this._cardArrowHandler.bind(this);
    this._priceInputHandler = this._priceInputHandler.bind(this);
    this._cityInputHandler = this._cityInputHandler.bind(this);
    this._eventTypeHandler = this._eventTypeHandler.bind(this);
    this._dateStartChangeHandler = this._dateStartChangeHandler.bind(this);
    this._dateEndChangeHandler = this._dateEndChangeHandler.bind(this);
    this._cityInputHandler = this._cityInputHandler.bind(this);

    this._setInnerHandlers();
    this._setDatepicker();
  }

  _setDatepicker() {
    if (this._datepickerStart) {
      this._datepickerStart.destroy();
      this._datepickerStart = null;
    }

    if (this._datepickerEnd) {
      this._datepickerEnd.destroy();
      this._datepickerEnd = null;
    }

    this._datepickerStart = flatpickr(
        this.getElement().querySelector(`[data-time="start"]`),
        {
          minDate: `today`,
          dateFormat: `d/m/y H:i`,
          enableTime: true,
          defaultDate: this._data.dateStart,
          onChange: this._dateStartChangeHandler,
        }
    );

    this._datepickerEnd = flatpickr(
        this.getElement().querySelector(`[data-time="end"]`),
        {
          minDate: this._data.dateStart,
          dateFormat: `d/m/y H:i`,
          enableTime: true,
          defaultDate: this._data.dateEnd,
          onChange: this._dateEndChangeHandler,
        }
    );
  }

  _dateStartChangeHandler([userDate]) {
    this.updateData({
      dateStart: dayjs(userDate).toDate()
    });
  }

  _dateEndChangeHandler([userDate]) {
    this.updateData({
      dateEnd: dayjs(userDate).toDate()
    });
  }

  removeElement() {
    super.removeElement();

    if (this._datepickerStart) {
      this._datepickerStart.destroy();
      this._datepickerStart = null;
    }

    if (this._datepickerEnd) {
      this._datepickerEnd.destroy();
      this._datepickerEnd = null;
    }
  }

  reset(event) {
    this.updateData(
        PointEdit.parseEventToData(event)
    );
  }

  getTemplate() {
    return createEditPointTemplate(this._data, this._destinations, this._offers);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setDeleteClickHandler(this._callback.deleteClick);
    this._setDatepicker();
  }

  _priceInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      price: evt.target.value,
    }, true);
  }

  _cityInputHandler(evt) {
    evt.preventDefault();
    const destinations = this._destinations;
    const cities = Object.keys(destinations).map(function (key) {
      return destinations[key];
    });
    const city = cities.find((elem) => elem.name === evt.target.value);

    const name = evt.target.value;
    let photos = [];
    let text = ``;

    const eventElement = document.querySelector(`.event--edit`);
    const destinationElement = eventElement.querySelector(`.event__destination-description`);
    const photosElement = eventElement.querySelector(`.event__photos-tape`);

    if (city) {
      photos = city.pictures;
      text = city.description;

      this.updateData({
        city: {
          name,
          text,
          photos,
        }
      });
    } else if (destinationElement) {
      destinationElement.textContent = `Description not found`;
      photosElement.textContent = ``;
    }
  }

  _eventTypeHandler(evt) {
    evt.preventDefault();
    const type = evt.target.value;

    this.updateData({
      eventType: {
        type,
        offers: [],
      },
    });
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();

    const names = Object.values(this._offers).map((item) => item);
    const type = names.find((offer) => offer.type === this._data.eventType.type);
    const checkedOffers = [];

    const findCheckedElements = () => {
      this.getElement().querySelectorAll(`.event__offer-checkbox`)
        .forEach((item, i) => {
          if (item.checked) {
            checkedOffers.push(type.offers[i]);
          }
        });
    };

    if (type.offers) {
      findCheckedElements();
    }

    this.updateData({
      eventType: {
        type: this._data.eventType.type,
        offers: checkedOffers,
      },
    });
    this._callback.formSubmit(this._data);
  }

  _cardArrowHandler() {
    this._callback.arrowClick();
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }

  setCardArrowHandler(callback) {
    this._callback.arrowClick = callback;
    this.getElement().querySelector(`.event--edit .event__rollup-btn`).addEventListener(`click`, this._cardArrowHandler);
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(PointEdit.parseDataToEvent(this._data));
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._formDeleteClickHandler);
  }

  _setInnerHandlers() {
    const isOffers = document.querySelector(`.event__available-offers`);

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
    this.getElement()
      .querySelector(`.event__type-group`)
      .addEventListener(`change`, this._eventTypeHandler);
    if (isOffers) {
      this.getElement()
        .querySelector(`.event__available-offers`)
        .addEventListener(`change`, this._onOfferChange);
    }
  }

  static parseEventToData(event) {
    return Object.assign(
        {},
        event,
        {
          isDisabled: false,
          isSaving: false,
          isDeleting: false
        }
    );
  }

  static parseDataToEvent(data) {
    data = Object.assign({}, data);

    delete data.isDisabled;
    delete data.isSaving;
    delete data.isDeleting;

    return data;
  }
}

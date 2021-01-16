import PointView from "../view/point";
import PointEditView from "../view/edit-point";
import {render, RenderPosition, replace, remove} from "../utils/render.js";
import {UserAction, UpdateType} from "../const.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export const State = {
  SAVING: `SAVING`,
  DELETING: `DELETING`,
  ABORTING: `ABORTING`
};

export default class Event {
  constructor(eventsListContainer, changeData, changeMode, _destinationsModel, _offersModel) {
    this._eventListContainer = eventsListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this.destinations = Object.assign({}, _destinationsModel.getDestinations());
    this.offers = Object.assign({}, _offersModel.getOffers());

    this._eventComponent = null;
    this._eventEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._handleArrowClick = this._handleArrowClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(event, destinations, offers) {
    // console.log(`pres events`, event);
    this._event = event;
    this._destinations = destinations;
    this._offers = offers;

    // console.log(`this._offers`, this._offers);

    const prevEventComponent = this._eventComponent;
    const prevEventEditComponent = this._eventEditComponent;

    this._eventComponent = new PointView(event);
    this._eventEditComponent = new PointEditView(event, this.destinations, this.offers);

    this._eventComponent.setEditClickHandler(this._handleEditClick);
    this._eventEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._eventEditComponent.setCardArrowHandler(this._handleArrowClick);
    this._eventEditComponent.setDeleteClickHandler(this._handleDeleteClick);
    this._eventComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this._eventListContainer, this._eventComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._eventComponent, prevEventComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._eventEditComponent, prevEventEditComponent);
      this._mode = Mode.DEFAULT;
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  setViewState(state) {
    const resetFormState = () => {
      this._eventEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    switch (state) {
      case State.SAVING:
        this._eventEditComponent.updateData({
          isDisabled: true,
          isSaving: true
        });
        break;
      case State.DELETING:
        this._eventEditComponent.updateData({
          isDisabled: true,
          isDeleting: true
        });
        break;
      case State.ABORTING:
        this._eventComponent.shake(resetFormState);
        this._eventEditComponent.shake(resetFormState);
        break;
    }
  }

  destroy() {
    remove(this._eventComponent);
    remove(this._eventEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToCard();
    }
  }

  _replaceCardToForm() {
    replace(this._eventEditComponent, this._eventComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToCard() {
    replace(this._eventComponent, this._eventEditComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._eventEditComponent.reset(this._event);
      this._replaceFormToCard();
    }
  }

  _handleFavoriteClick() {
    this._changeData(
        UserAction.UPDATE_EVENT,
        UpdateType.MINOR,
        Object.assign(
            {},
            this._event,
            {
              isFavorite: !this._event.isFavorite
            }
        )
    );
  }

  _handleEditClick() {
    this._replaceCardToForm();
  }

  _handleFormSubmit(update) {
    this._changeData(
        UserAction.UPDATE_EVENT,
        UpdateType.MINOR,
        update
    );
    this._replaceFormToCard();
  }

  _handleFormSubmit(update) {
    this._changeData(
        UserAction.UPDATE_EVENT,
        UpdateType.PATCH,
        update
    );
  }

  _handleArrowClick() {
    this._replaceFormToCard();
  }

  _handleDeleteClick(event) {
    this._changeData(
        UserAction.DELETE_EVENT,
        UpdateType.MINOR,
        event
    );
  }
}

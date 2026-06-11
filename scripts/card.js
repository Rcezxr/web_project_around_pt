export class Card {
  constructor(
    name,
    link,
    templateSelector,
    handleImageClick,
    id,
    isLiked,
    handleDelete,
    handleLike,
  ) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._template = document.querySelector(this._templateSelector).content;
    this._handleImageClick = handleImageClick;
    this._id = id;
    this._handleDelete = handleDelete;
    this._isLiked = isLiked;
    this._handleLike = handleLike;
  }
  _getCardElement() {
    const cardElement = this._template.querySelector(".card").cloneNode(true);
    cardElement.querySelector(".card__title").textContent = this._name;
    cardElement.querySelector(".card__image").src = this._link;
    cardElement.querySelector(".card__image").alt = this._name;

    if (this._isLiked) {
      cardElement
        .querySelector(".card__like-button")
        .classList.add("card__like-button_is-active");
    }

    return cardElement;
  }

  _clickLike() {
    this._handleLike(this._isLiked, this._id);
  }
  setLike(isLiked) {
    this._isLiked = isLiked;
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_is-active", isLiked);
  }
  _deleteCard() {
    this._handleDelete(this._id);
  }

  deleteCard() {
    this._cardElement.remove();
  }
  hideDeleteButton() {
    this._cardElement.querySelector(".card__delete-button").style.display =
      "none";
  }

  setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => this._clickLike());
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => this._deleteCard());
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () =>
        this._handleImageClick(this._name, this._link),
      );
  }
  generateCard() {
    this._cardElement = this._getCardElement();
    this.setEventListeners();
    return this._cardElement;
  }
}

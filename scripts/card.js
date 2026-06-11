export class Card {
  constructor(
    name,
    link,
    templateSelector,
    handleImageClick,
    id,
    isLiked,
    handleDelete,
  ) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._template = document.querySelector(this._templateSelector).content;
    this._handleImageClick = handleImageClick;
    this._id = id;
    this._handleDelete = handleDelete;
    this._isLiked = isLiked;
  }
  _getCardElement() {
    const cardElement = this._template.querySelector(".card").cloneNode(true);
    cardElement.querySelector(".card__title").textContent = this._name;
    cardElement.querySelector(".card__image").src = this._link;
    cardElement.querySelector(".card__image").alt = this._name;
    return cardElement;
  }

  _clickLike() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_is-active");
  }
  _deleteCard() {
    console.log("this._id no momento do clique:", this._id);
    console.log("this._id:", this._id);
    console.log("this._handleDelete:", this._handleDelete);
    this._handleDelete(this._id);
  }

  deleteCard() {
    this._cardElement.remove();
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

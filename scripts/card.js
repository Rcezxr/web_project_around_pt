class Card {
  constructor(name, link, templateSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._template = document.querySelector(this._templateSelector).content;
    this._handleImageClick = handleImageClick;
    this._cardElement = this._getCardElement();
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
    this._cardElement.remove();
  }
  _cardImage() {
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () =>
        this._handleImageClick(this._name, this._link),
      );
  }
}

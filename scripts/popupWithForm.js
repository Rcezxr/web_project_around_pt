import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._button = this._popup.querySelector(".popup__button");
  }
  _getInputValues() {
    this._inputValues = {};
    const inputList = this._form.querySelectorAll(".popup__input");
    inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }
  renderLoading(isLoading) {
    if (isLoading) {
      this._button.textContent = "Salvando...";
    } else {
      this._button.textContent = "Salvar";
    }
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
  close() {
    super.close();
    this._form.reset();
  }
}

import { Popup } from "./popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector(".popup__button");
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", () => {
      this._action();
      this.close();
    });
  }

  open(action) {
    this._action = action;
    super.open();
  }
}

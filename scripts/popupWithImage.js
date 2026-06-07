import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open(imageLink, imageName) {
    super.open();
    const imageElement = this._popup.querySelector(".popup__image");
    const captionElement = this._popup.querySelector(".popup__caption");
    this._imageLink = imageLink;
    this._imageName = imageName;
    imageElement.src = this._imageLink;
    imageElement.alt = this._imageName;
    captionElement.textContent = this._imageName;
  }
}

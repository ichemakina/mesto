import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupCardImage = this._popup.querySelector('.popup__image');
        this._popupImageCaption = this._popup.querySelector('.popup__caption');
    }

    open(link, name) {
        this._popupCardImage.setAttribute('src', link);
        this._popupCardImage.setAttribute('alt', name);
        this._popupImageCaption.textContent = name;

        super.open();
    }
}
import { Popup } from "./Popup";

export class PopupWithConfirm extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._confirmButton = document.querySelector('.popup__confirm-button');
    }

    setConfirmAction(handleAction) {
        this._handleAction = handleAction;
    }

    setEventListeners() {
        super.setEventListeners();
        this._confirmButton.addEventListener('click', () => {
            this._handleAction();
        });
    }
}
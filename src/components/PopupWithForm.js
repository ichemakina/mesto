import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitData) {
        super(popupSelector);
        this._submitData = submitData;
        this._form = this._popup.querySelector('.popup__form');
        this._inputs = this._form.querySelectorAll('.popup__field');
        this._inputValues = {};
        this._isNotResetFormData = popupSelector === '.popup_type_edit-profile';
    }

    _getInputValues() {
        this._inputs.forEach(element => {
            this._inputValues[element.name] = element.value;
        });
        return this._inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();

            this._submitData(this._getInputValues());
            this.close();
        });
    }

    close() {
        super.close();
        if (!this._isNotResetFormData) {
            this._form.reset();
        }
    }
}
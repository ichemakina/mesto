import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitData) {
        super(popupSelector);
        this._submitData = submitData;
        this._form = this._popup.querySelector('.popup__form');
        this._inputs = this._form.querySelectorAll('.popup__field');
        this._inputValues = {};
    }

    _getInputValues() {
        this._inputs.forEach(element => {
            this._inputValues[element.name] = element.value;
        });
        return this._inputValues;
    }

    _submit() {
        this._submitData(this._getInputValues());
    }

    renderLoading(isLoading) {
        this._submitButton = this._form.querySelector('.popup__submit-button');
        if (isLoading) {
            this._submitButton.textContent = `${this._submitButton.textContent}...`;
        }
        else {
            this._submitButton.textContent = this._submitButton.textContent.slice(0, -3);
        }
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.renderLoading(true);
            this._submit();
        });
    }

    close() {
        super.close();
        this._form.reset();
    }
}
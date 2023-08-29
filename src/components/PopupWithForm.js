import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitData) {
        super(popupSelector);
        this._submitData = submitData;
        this._form = this._popup.querySelector('.popup__form');
        this._inputs = this._form.querySelectorAll('.popup__field');
        this._inputValues = {};
        this._submitButton = this._form.querySelector('.popup__submit-button');
        this._submitButtonText = this._submitButton.textContent;
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

    renderLoading(isLoading, loadingText = 'Сохранение...') {
        if (isLoading) {
            this._submitButton.textContent = loadingText;
        }
        else {
            this._submitButton.textContent = this._submitButtonText;
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
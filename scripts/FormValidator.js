export class FormValidator {
    constructor(settings, formElement) {
        this._formElement = formElement;
        this._filedSelector = settings.filedSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._filedErrorClass = settings.filedErrorClass;
        this._errorClass = settings.errorClass;
    }

    _hasInvalidInput(filedList) {
        return filedList.some((fieldElement) => {
            return !fieldElement.validity.valid;
        })
    }

    _showInputError(fieldElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${fieldElement.id}-error`);
        fieldElement.classList.add(this._filedErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hideInputError(fieldElement) {
        const errorElement = this._formElement.querySelector(`.${fieldElement.id}-error`);
        fieldElement.classList.remove(this._filedErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }

    _checkInputValidity(fieldElement) {
        if (!fieldElement.validity.valid) {
            this._showInputError(fieldElement, fieldElement.validationMessage);
        } else {
            this._hideInputError(fieldElement);
        }
    }

    _setEventListeners() {
        const filedList = Array.from(this._formElement.querySelectorAll(this._filedSelector));
        this.toggleButtonState(filedList);
        filedList.forEach((fieldElement) => {
            fieldElement.addEventListener('input', () => {
                this._checkInputValidity(fieldElement);
                this.toggleButtonState(filedList);
            });
        });
    }

    clearError(filedList) {
        filedList.forEach((fieldElement) => {
            this._hideInputError(fieldElement);
        });
    }

    toggleButtonState(filedList) {
        const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        if (this._hasInvalidInput(filedList)) {
            buttonElement.setAttribute('disabled', 'disabled');
            buttonElement.classList.add(this._inactiveButtonClass);
        } else {
            buttonElement.classList.remove(this._inactiveButtonClass);
            buttonElement.removeAttribute('disabled', 'disabled');
        }
    }

    enableValidation() {
        this._formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        this._setEventListeners();
    }
}
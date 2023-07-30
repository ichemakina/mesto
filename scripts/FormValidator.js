export class FormValidator {
    constructor(settings, formElement) {
        this._formElement = formElement;
        this._filedSelector = settings.filedSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._filedErrorClass = settings.filedErrorClass;
        this._errorClass = settings.errorClass;
        this._filedList = Array.from(this._formElement.querySelectorAll(this._filedSelector));
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    }

    _hasInvalidInput() {
        return this._filedList.some((fieldElement) => {
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
        this.toggleButtonState();
        this._filedList.forEach((fieldElement) => {
            fieldElement.addEventListener('input', () => {
                this._checkInputValidity(fieldElement);
                this.toggleButtonState();
            });
        });
    }

    clearError() {
        this._filedList.forEach((fieldElement) => {
            this._hideInputError(fieldElement);
        });
    }

    toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonElement.setAttribute('disabled', 'disabled');
            this._buttonElement.classList.add(this._inactiveButtonClass);
        } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled', 'disabled');
        }
    }

    enableValidation() {
        this._formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        this._setEventListeners();
    }
}
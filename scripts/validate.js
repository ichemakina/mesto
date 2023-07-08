function toggleButtonState(filedList, buttonElement, inactiveButtonClass) {
    if (hasInvalidInput(filedList)) {
        buttonElement.setAttribute('disabled', 'disabled');
        buttonElement.classList.add(inactiveButtonClass);
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.removeAttribute('disabled', 'disabled');
    }
};

function hasInvalidInput(filedList) {
    return filedList.some((fieldElement) => {
        return !fieldElement.validity.valid;
    })
}

const showInputError = (formElement, fieldElement, errorMessage, filedErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${fieldElement.id}-error`);
    fieldElement.classList.add(filedErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, fieldElement, filedErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${fieldElement.id}-error`);
    fieldElement.classList.remove(filedErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
};

function checkInputValidity(settings, formElement, fieldElement) {
    if (!fieldElement.validity.valid) {
        showInputError(formElement, fieldElement, fieldElement.validationMessage, settings.filedErrorClass, settings.errorClass);
    } else {
        hideInputError(formElement, fieldElement, settings.filedErrorClass, settings.errorClass);
    }
};


function setEventListeners(settings, formElement) {
    const filedList = Array.from(formElement.querySelectorAll(settings.filedSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);
    toggleButtonState(filedList, buttonElement, settings.inactiveButtonClass);
    filedList.forEach((fieldElement) => {
        fieldElement.addEventListener('input', function () {
            checkInputValidity(settings, formElement, fieldElement);
            toggleButtonState(filedList, buttonElement, settings.inactiveButtonClass);
        });
    });
}


function enableValidation(settings) {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        setEventListeners(settings, formElement);
    });
}

enableValidation({
    formSelector: '.popup__form',
    filedSelector: '.popup__field',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    filedErrorClass: 'popup__filed_type_error',
    errorClass: 'popup__field-error_visible'
});
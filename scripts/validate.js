import { FormValidator } from "./FormValidator.js";

const settings = {
    formSelector: '.popup__form',
    filedSelector: '.popup__field',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    filedErrorClass: 'popup__filed_type_error',
    errorClass: 'popup__field-error_visible'
};
const formList = Array.from(document.querySelectorAll(settings.formSelector));

formList.forEach((formElement) => {
    const formValidator = new FormValidator(settings, formElement);
    formValidator.enableValidation();
})

export function toggleButtonState(filedList, buttonElement, inactiveButtonClass) {
    if (hasInvalidInput(filedList)) {
        buttonElement.setAttribute('disabled', 'disabled');
        buttonElement.classList.add(inactiveButtonClass);
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.removeAttribute('disabled', 'disabled');
    }
}

function hasInvalidInput(filedList) {
    return filedList.some((fieldElement) => {
        return !fieldElement.validity.valid;
    })
}
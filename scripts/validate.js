import { FormValidator } from "./FormValidator.js";

export const settings = {
    formSelector: '.popup__form',
    filedSelector: '.popup__field',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    filedErrorClass: 'popup__filed_type_error',
    errorClass: 'popup__field-error_visible'
};
const formList = Array.from(document.querySelectorAll(settings.formSelector));

formList.forEach((formElement) => {
    const formValidator = createFormValidator(settings, formElement);
    formValidator.enableValidation();
})

export function createFormValidator(settings, formElement){
    return new FormValidator(settings, formElement);
}
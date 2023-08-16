import { FormValidator } from "../components/FormValidator.js";
import { popupEditProfile, popupAddCard } from "../utils/constants.js";

export const settings = {
    formSelector: '.popup__form',
    filedSelector: '.popup__field',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    filedErrorClass: 'popup__filed_type_error',
    errorClass: 'popup__field-error_visible'
};

export const validatorFormEditProfile = new FormValidator(settings, popupEditProfile);
validatorFormEditProfile.enableValidation();

export const validatorFormAddCard = new FormValidator(settings, popupAddCard);
validatorFormAddCard.enableValidation();
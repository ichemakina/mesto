import { Card } from "./Card.js";
import { toggleButtonState } from "./validate.js";
import { openPopup, closePopup } from "./utils.js";
import { initialCards } from "./constants.js"

/* Открытие формы редактирования профиля */
const editButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('.popup__field_type_name');
const descriptionInput = document.querySelector('.popup__field_type_description');
editButton.addEventListener('click', openEditProfileForm);

function openEditProfileForm() {
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
    openPopup(popupEditProfile);
}

/* Закрытие формы редактирования профиля */
const closeEditProfileFormButton = document.querySelector('.popup__close-button_form_edit-profile');
closeEditProfileFormButton.addEventListener('click', closeEditProfileForm);

function closeEditProfileForm() {
    closePopup(popupEditProfile);
}

/* Изменение информации в профиле */
const editProfileForm = document.querySelector('form[name="editPrifile"]');
editProfileForm.addEventListener('submit', submitProfileInfo);

function submitProfileInfo(evt) {
    evt.preventDefault();

    const newName = nameInput.value;
    const newDescription = descriptionInput.value;

    profileName.textContent = newName;
    profileDescription.textContent = newDescription;
    closeEditProfileForm();
}

/* Добавление карточек "из коробки" */
const cardsList = document.querySelector('.photo-grid__elements');
const cardTemplateClass = '.photo-grid-element-template';

initialCards.forEach(function (element) {
    const newCard = new Card(element, cardTemplateClass);
    const cardElement = newCard.createCard();
    cardsList.append(cardElement);
});

/* Открытие формы для добавления карточки */
const popupAddCard = document.querySelector('.popup_type_add-card');

const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click', openAddCardForm);

function openAddCardForm() {
    const filedList = Array.from(addCardForm.querySelectorAll('.popup__field'));
    const buttonElement = addCardForm.querySelector('.popup__submit-button');
    toggleButtonState(filedList, buttonElement, 'popup__submit-button_disabled');

    openPopup(popupAddCard);
}

/* Закрытие формы для добавления карточки */
const closeAddCardFormButton = document.querySelector('.popup__close-button_form_add-card');
closeAddCardFormButton.addEventListener('click', closeAddCardForm);

function closeAddCardForm() {
    closePopup(popupAddCard);
}

/* Добавление карточки */
const addCardForm = document.querySelector('form[name="addCard"]');
const cardNameInput = document.querySelector('.popup__field_type_card-name');
const imgLinkInput = document.querySelector('.popup__field_type_card-img-link');
addCardForm.addEventListener('submit', addCard);

function addCard(evt) {
    evt.preventDefault();

    const newCardName = cardNameInput.value;
    const newImgLink = imgLinkInput.value;
    const cardData = {
        name: newCardName,
        link: newImgLink
    };

    const newCard = new Card(cardData, cardTemplateClass);
    const cardElement = newCard.createCard();
    cardsList.prepend(cardElement);

    evt.target.reset();
    closeAddCardForm();
}
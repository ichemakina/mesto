import { Card } from "./Card.js";
import { openPopup, closePopup } from "./utils.js";
import { initialCards, popupCardImage, popupEditProfile, popupAddCard } from "./constants.js"
import { validatorFormEditProfile, validatorFormAddCard } from "./validate.js";

/* Открытие формы редактирования профиля */
const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('.popup__field_type_name');
const descriptionInput = document.querySelector('.popup__field_type_description');
editButton.addEventListener('click', openEditProfileForm);

function openEditProfileForm() {
    validatorFormEditProfile.clearError();

    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
    openPopup(popupEditProfile);
}

/* Закрытие формы редактирования профиля */
const buttonClosePopupProfile = document.querySelector('.popup__close-button_form_edit-profile');
buttonClosePopupProfile.addEventListener('click', closeEditProfileForm);

function closeEditProfileForm() {
    closePopup(popupEditProfile);
}

/* Изменение информации в профиле */
const formEditProfile = document.querySelector('form[name="editPrifile"]');
formEditProfile.addEventListener('submit', submitProfileInfo);

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
    const newCard = createNewCard(element, cardTemplateClass);
    cardsList.append(newCard);
});

/* Открытие формы для добавления карточки */

const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click', openAddCardForm);

function openAddCardForm() {
    validatorFormAddCard.toggleButtonState();

    openPopup(popupAddCard);
}

/* Закрытие формы для добавления карточки */
const buttonClosePopupAddCard = document.querySelector('.popup__close-button_form_add-card');
buttonClosePopupAddCard.addEventListener('click', closeAddCardForm);

function closeAddCardForm() {
    closePopup(popupAddCard);
}

/* Добавление карточки */
const formAddCard = document.querySelector('form[name="addCard"]');
const cardNameInput = document.querySelector('.popup__field_type_card-name');
const imgLinkInput = document.querySelector('.popup__field_type_card-img-link');
formAddCard.addEventListener('submit', addCard);

function addCard(evt) {
    evt.preventDefault();

    const newCardName = cardNameInput.value;
    const newImgLink = imgLinkInput.value;
    const cardData = {
        name: newCardName,
        link: newImgLink
    };

    const newCard = createNewCard(cardData, cardTemplateClass);
    cardsList.prepend(newCard);

    evt.target.reset();
    closeAddCardForm();
}

function createNewCard(cardData, cardTemplateClass) {
    const newCard = new Card(cardData, cardTemplateClass);
    return newCard.createCard();
}

/* Закрытие просмотра картинки */
const closeCardImageButton = document.querySelector('.popup__close-button_form_card-img');
closeCardImageButton.addEventListener('click', closeCardImage);


function closeCardImage() {
    closePopup(popupCardImage);
}
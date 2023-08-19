import './pages/index.css';

import { Card } from "./components/Card.js";
import { Section } from "./components/Section.js";
import { Popup } from "./components/Popup.js";
import { PopupWithImage } from "./components/PopupWithImage";
import { initialCards } from "./utils/constants.js"
import { validatorFormEditProfile, validatorFormAddCard } from "./utils/validate.js";

/* Открытие формы редактирования профиля */
const popupEditProfile = new Popup('.popup_type_edit-profile');
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
    popupEditProfile.open()
    popupEditProfile.setEventListeners();
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
    popupEditProfile.close();
}

/* Добавление карточек "из коробки" */
const defaultCardList = new Section({
    data: initialCards,
    renderer: (item) => {
        const cardElement = createNewCard(item);
        defaultCardList.addItem(cardElement);
    }
}, '.photo-grid__elements');
defaultCardList.renderItems();

/* Открытие формы для добавления карточки */
const popupAddCard = new Popup('.popup_type_add-card');
const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click', openAddCardForm);

function openAddCardForm() {
    validatorFormAddCard.toggleButtonState();
    popupAddCard.open()
    popupAddCard.setEventListeners();
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

    const cardElement = createNewCard(cardData);
    defaultCardList.addItem(cardElement, true);

    evt.target.reset();
    popupAddCard.close();
}

function createNewCard(cardData) {
    const newCard = new Card(cardData, '.photo-grid-element-template', openCardImage);
    return newCard.createCard();
}

/* Просмотр картинки */
const popupImage = new PopupWithImage('.popup_type_card-img');
function openCardImage(link, name) {
    popupImage.open(link, name);
    popupImage.setEventListeners();
}
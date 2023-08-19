import './pages/index.css';

import { Card } from "./components/Card.js";
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage";
import { initialCards } from "./utils/constants.js"
import { validatorFormEditProfile, validatorFormAddCard } from "./utils/validate.js";
import { PopupWithForm } from './components/PopupWithForm';
import { UserInfo } from './components/UserInfo';

/* Открытие формы редактирования профиля */
const popupEditProfile = new PopupWithForm('.popup_type_edit-profile', submitProfileInfo);
const editButton = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('.popup__field_type_name');
const descriptionInput = document.querySelector('.popup__field_type_description');
editButton.addEventListener('click', openEditProfileForm);
const profileInfo = new UserInfo({
    profileNameSelector: '.profile__name',
    profileDescriptionSelector: '.profile__subtitle'
});
function openEditProfileForm() {
    validatorFormEditProfile.clearError();

    const profile = profileInfo.getUserInfo();
    nameInput.value = profile.name;
    descriptionInput.value = profile.description;
    popupEditProfile.open()
    popupEditProfile.setEventListeners();
}

/* Изменение информации в профиле */
function submitProfileInfo(values) {
    profileInfo.setUserInfo(values);
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
const popupAddCard = new PopupWithForm('.popup_type_add-card', addCard);
const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click', openAddCardForm);

function openAddCardForm() {
    validatorFormAddCard.toggleButtonState();
    popupAddCard.open()
    popupAddCard.setEventListeners();
}

/* Добавление карточки */
function addCard(values) {
    const cardElement = createNewCard(values);

    const card = new Section({ data: values, }, '.photo-grid__elements');
    card.addItem(cardElement, true);
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
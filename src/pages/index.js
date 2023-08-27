import './index.css';

import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage";
import { settings, popupEditProfileSelector, popupAddCardSelector } from "../utils/constants.js"
import { PopupWithForm } from '../components/PopupWithForm';
import { UserInfo } from '../components/UserInfo';
import { FormValidator } from '../components/FormValidator';
import { apiConfig } from '../utils/apiConfig';
import { Api } from '../components/Api';
import { PopupWithConfirm } from '../components/PopupWithConfirm';

let currentUserId;
const api = new Api(apiConfig);

/* Добавление карточек "из коробки" */
const defaultCardList = new Section({
    renderer: (item) => {
        const cardElement = createNewCard(item);
        defaultCardList.addItem(cardElement);
    }
}, '.photo-grid__elements');

Promise.all([
    api.getUserInfo(),
    api.getInitialCards()
])
    .then((results) => {
        currentUserId = results[0]._id;
        profileInfo.setUserInfo(results[0]);
        defaultCardList.renderItems(results[1]);
    })
    .catch((err) => {
        console.log(err.message)
    });

/* Валидация форм */
const formEditProfile = document.querySelector(popupEditProfileSelector);
const validatorFormEditProfile = new FormValidator(settings, formEditProfile);
validatorFormEditProfile.enableValidation();

const formAddCard = document.querySelector(popupAddCardSelector);
const validatorFormAddCard = new FormValidator(settings, formAddCard);
validatorFormAddCard.enableValidation();

/* Открытие формы редактирования профиля */
const popupEditProfile = new PopupWithForm(popupEditProfileSelector, submitProfileInfo);
popupEditProfile.setEventListeners();
const editButton = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('.popup__field_type_name');
const descriptionInput = document.querySelector('.popup__field_type_description');
editButton.addEventListener('click', openEditProfileForm);
const profileInfo = new UserInfo({
    profileNameSelector: '.profile__name',
    profileDescriptionSelector: '.profile__subtitle',
    profileAvatarSelector: '.profile__image'
});
function openEditProfileForm() {
    validatorFormEditProfile.clearError();

    const profile = profileInfo.getUserInfo();
    nameInput.value = profile.name;
    descriptionInput.value = profile.about;
    popupEditProfile.open()
}

/* Изменение информации в профиле */
function submitProfileInfo(values) {
    api.updateUserInfo(values);
    profileInfo.setUserInfo(values);
    popupEditProfile.close();
}

/* Открытие формы для добавления карточки */
const popupAddCard = new PopupWithForm(popupAddCardSelector, addCard);
popupAddCard.setEventListeners();
const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click', openAddCardForm);

function openAddCardForm() {
    validatorFormAddCard.toggleButtonState();
    validatorFormAddCard.clearError();
    popupAddCard.open();
}

/* Добавление карточки */
function addCard(values) {
    const cardElement = createNewCard(values);
    defaultCardList.addItem(cardElement, true);
    api.addNewCard(values);
    popupAddCard.close();
}

function createNewCard(cardData) {
    const newCard = new Card(cardData, currentUserId, '.photo-grid-element-template', openCardImage, () => {
        deleteCard(newCard)
    });
    return newCard.createCard();
}

/* Просмотр картинки */
const popupImage = new PopupWithImage('.popup_type_card-img');
popupImage.setEventListeners();
function openCardImage(link, name) {
    popupImage.open(link, name);
}

const popupDeleteCard = new PopupWithConfirm('.popup_type_confirm');
popupDeleteCard.setEventListeners();
function deleteCard(card) {
    popupDeleteCard.open();
    popupDeleteCard.setConfirmAction(() => {
        card.deleteCard();
        popupDeleteCard.close();
    });
}
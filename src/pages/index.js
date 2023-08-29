import './index.css';

import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage";
import { settings, popupEditProfileSelector, popupAddCardSelector, popupEditAvatarSelector } from "../utils/constants.js"
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
    .catch(console.error);

/* Валидация форм */
const formValidators = {};

const enableValidation = (settings) => {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach((formElement) => {
        const validator = new FormValidator(settings, formElement)
        const formName = formElement.getAttribute('name');
        formValidators[formName] = validator;
        validator.enableValidation();
    });
};

enableValidation(settings);

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
    formValidators['editPrifile'].clearError();

    const profile = profileInfo.getUserInfo();
    nameInput.value = profile.name;
    descriptionInput.value = profile.about;
    popupEditProfile.open()
}

/* Изменение информации в профиле */
function submitProfileInfo(values) {
    api.updateUserInfo(values)
        .then(() => {
            profileInfo.setUserInfo(values);
            popupEditProfile.close();
        })
        .catch(console.error)
        .finally(() => {
            popupEditProfile.renderLoading(false);
        });
}

/* Открытие формы для добавления карточки */
const popupAddCard = new PopupWithForm(popupAddCardSelector, addCard);
popupAddCard.setEventListeners();
const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click', openAddCardForm);

function openAddCardForm() {
    formValidators['addCard'].toggleButtonState();
    formValidators['addCard'].clearError();
    popupAddCard.open();
}

/* Добавление карточки */
function addCard(values) {
    api.addNewCard(values)
        .then((data) => {
            const cardElement = createNewCard(data);
            defaultCardList.addItem(cardElement, true);
            popupAddCard.close();
        })
        .catch(console.error)
        .finally(() => {
            popupAddCard.renderLoading(false);
        });
}

function createNewCard(cardData) {
    const newCard = new Card(cardData,
        currentUserId,
        '.photo-grid-element-template',
        openCardImage,
        () => {
            deleteCard(newCard)
        },
        () => {
            likeCard(newCard)
        });
    return newCard.createCard();
}

/* Просмотр картинки */
const popupImage = new PopupWithImage('.popup_type_card-img');
popupImage.setEventListeners();
function openCardImage(link, name) {
    popupImage.open(link, name);
}

/* Удаление карточки */
const popupDeleteCard = new PopupWithConfirm('.popup_type_confirm');
popupDeleteCard.setEventListeners();
function deleteCard(card) {
    popupDeleteCard.open();
    popupDeleteCard.setConfirmAction(() => {
        api.deleteCard(card._id)
            .then(() => {
                card.deleteCard();
                popupDeleteCard.close();
            })
            .catch(console.error);
    });
}

/* Добавление/удаление лайков */
function likeCard(card) {
    let promise;
    if (!card.isLikedCard()) {
        promise = api.likeCard(card._id);
    }
    else {
        promise = api.deleteLikeCard(card._id);
    }
    promise
        .then((data) => {
            card.like(data)
        })
        .catch(console.error);
}

/* Открытие формы для изменения аватара */
const popupEditAvatar = new PopupWithForm(popupEditAvatarSelector, editAvatar);
popupEditAvatar.setEventListeners();
const editAvatarButton = document.querySelector('.profile__edit-avatar-button');
editAvatarButton.addEventListener('click', openEditAvatarForm);

function openEditAvatarForm() {
    formValidators['editAvatar'].toggleButtonState();
    formValidators['editAvatar'].clearError();
    popupEditAvatar.open();
}

/* Изменение аватара */
function editAvatar(values) {
    api.updateUserAvatar(values.avatar)
        .then(() => {
            profileInfo.updateAvatar(values.avatar);
            popupEditAvatar.close();
        })
        .catch(console.error)
        .finally(() => {
            popupEditAvatar.renderLoading(false);
        });
}
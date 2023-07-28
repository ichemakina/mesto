import { openPopup, closePopup } from './index.js';

const popupCardImage = document.querySelector('.popup_type_card-img');
const closeCardImageButton = document.querySelector('.popup__close-button_form_card-img');

export class Card {
    constructor(data, cardTemplateClass) {
        this._name = data.name;
        this._link = data.link;
        this._cardTemplateClass = cardTemplateClass;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._cardTemplateClass)
            .content
            .cloneNode(true);

        return cardElement;
    }

    _setEventListeners() {
        this._cardElement.querySelector('.photo-grid__like-button').addEventListener('click', this._like);
        this._cardElement.querySelector('.photo-grid__delete-button').addEventListener('click', this._deleteCard);
        this._cardElement.querySelector('.photo-grid__image').addEventListener('click', this._openCardImage);

        closeCardImageButton.addEventListener('click', this._closeCardImage);
    }

    /* Добавление лайков */
    _like(evt) {
        evt.target.classList.toggle('photo-grid__like-button_active');
    }

    /* Удаление карточки */
    _deleteCard(evt) {
        evt.target.parentElement.remove();
    }

    /* Просмотр картинки */
    _openCardImage(evt) {
        const imageLink = evt.target.src;
        const imageName = evt.target.alt;

        document.querySelector('.popup__image').setAttribute('src', imageLink);
        document.querySelector('.popup__image').setAttribute('alt', imageName);
        document.querySelector('.popup__caption').textContent = imageName;

        openPopup(popupCardImage);
    }

    /* Закрытие просмотра картинки */
    _closeCardImage() {
        closePopup(popupCardImage);
    }

    createCard() {
        this._cardElement = this._getTemplate();

        this._cardElement.querySelector('.photo-grid__name').textContent = this._name;
        this._cardElement.querySelector('.photo-grid__image').setAttribute('src', this._link);
        this._cardElement.querySelector('.photo-grid__image').setAttribute('alt', this._name);

        this._setEventListeners();

        return this._cardElement;
    }
}
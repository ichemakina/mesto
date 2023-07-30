import { openPopup } from './utils.js';
import { popupCardImage, popupImage, popupImageCaption } from './constants.js';

export class Card {
    constructor(data, cardTemplateClass) {
        this._name = data.name;
        this._link = data.link;
        this._cardTemplateClass = cardTemplateClass;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._cardTemplateClass)
            .content
            .querySelector('.photo-grid__element')
            .cloneNode(true);

        return cardElement;
    }

    _setEventListeners() {
        this._cardElement.querySelector('.photo-grid__like-button').addEventListener('click', () => {
            this._like()
        });
        this._cardElement.querySelector('.photo-grid__delete-button').addEventListener('click', () => {
            this._deleteCard()
        });
        this._cardElement.querySelector('.photo-grid__image').addEventListener('click', () => {
            this._openCardImage()
        });
    }

    /* Добавление лайков */
    _like() {
        const likeElement = this._cardElement.querySelector('.photo-grid__like-button');
        likeElement.classList.toggle('photo-grid__like-button_active');
    }

    /* Удаление карточки */
    _deleteCard() {
        this._cardElement.remove();
    }

    /* Просмотр картинки */
    _openCardImage() {
        popupImage.setAttribute('src', this._link);
        popupImage.setAttribute('alt', this._name);
        popupImageCaption.textContent = this._name;

        openPopup(popupCardImage);
    }

    createCard() {
        this._cardElement = this._getTemplate();

        const cardNameElement = this._cardElement.querySelector('.photo-grid__name');
        const cardImageElement = this._cardElement.querySelector('.photo-grid__image');

        cardNameElement.textContent = this._name;
        cardImageElement.setAttribute('src', this._link);
        cardImageElement.setAttribute('alt', this._name);

        this._setEventListeners();

        return this._cardElement;
    }
}
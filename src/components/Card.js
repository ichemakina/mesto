export class Card {
    constructor(data, currentUserId, cardTemplateClass, handleCardClick, handleDeleteCardButtonClick, handleLikeCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._ownerId = data.owner._id;
        this._id = data._id;
        this._likes = data.likes;
        this._currentUserId = currentUserId;
        this._cardTemplateClass = cardTemplateClass;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCardButtonClick = handleDeleteCardButtonClick;
        this._handleLikeCardClick = handleLikeCardClick;
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
            this._handleLikeCardClick()
        });
        this._cardElement.querySelector('.photo-grid__delete-button').addEventListener('click', () => {
            this._handleDeleteCardButtonClick()
        });
        this._cardElement.querySelector('.photo-grid__image').addEventListener('click', () => {
            this._handleCardClick(this._link, this._name);
        });
    }

    /* Добавление лайков */
    like(data) {
        this._likeElement.classList.toggle('photo-grid__like-button_active');
        this._likes = data.likes;
        this._cardCountLikesElement.textContent = data.likes.length;
    }

    isLikedCard() {
        return this._likes.some(l => l._id == this._currentUserId)
    }

    /* Удаление карточки */
    deleteCard() {
        this._cardElement.remove();
        this._cardElement = null;
    }

    createCard() {
        this._cardElement = this._getTemplate();

        const cardNameElement = this._cardElement.querySelector('.photo-grid__name');
        const cardImageElement = this._cardElement.querySelector('.photo-grid__image');

        cardNameElement.textContent = this._name;
        cardImageElement.setAttribute('src', this._link);
        cardImageElement.setAttribute('alt', this._name);

        this._cardCountLikesElement = this._cardElement.querySelector('.photo-grid__count-likes');
        this._cardCountLikesElement.textContent = this._likes.length;

        if (this._currentUserId == this._ownerId) {
            const cardDeleteButton = this._cardElement.querySelector('.photo-grid__delete-button');
            cardDeleteButton.classList.add('photo-grid__delete-button_visible');
        }

        this._likeElement = this._cardElement.querySelector('.photo-grid__like-button');
        if (this.isLikedCard()) {
            this._likeElement.classList.add('photo-grid__like-button_active');
        }

        this._setEventListeners();

        return this._cardElement;
    }
}
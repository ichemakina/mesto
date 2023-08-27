export class Card {
    constructor(data, cardTemplateClass, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._countLikes = data.likes.length;
        this._cardTemplateClass = cardTemplateClass;
        this._handleCardClick = handleCardClick;
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
            this._handleCardClick(this._link, this._name);
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
        this._cardElement = null;
    }

    createCard() {
        this._cardElement = this._getTemplate();

        const cardNameElement = this._cardElement.querySelector('.photo-grid__name');
        const cardImageElement = this._cardElement.querySelector('.photo-grid__image');
        const cardCountLikesElement = this._cardElement.querySelector('.photo-grid__count-likes');

        cardNameElement.textContent = this._name;
        cardImageElement.setAttribute('src', this._link);
        cardImageElement.setAttribute('alt', this._name);
        cardCountLikesElement.textContent = this._countLikes;

        this._setEventListeners();

        return this._cardElement;
    }
}
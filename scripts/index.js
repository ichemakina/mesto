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
    popupEditProfile.classList.add('popup_opened');
}

/* Закрытие формы редактирования профиля */
const closeEditProfileFormButton = document.querySelector('.popup__close-button_form_edit-profile');
closeEditProfileFormButton.addEventListener('click', closeEditProfileForm);

function closeEditProfileForm() {
    popupEditProfile.classList.remove('popup_opened');
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
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const cardsList = document.querySelector('.photo-grid__elements');
const cardTemplate = document.querySelector('.photo-grid-element-template').content;

initialCards.forEach(function (element) {
    const newCard = createCard(element.name, element.link);
    cardsList.append(newCard);
});

/* Добавление лайков */
function like(evt) {
    evt.target.classList.toggle('photo-grid__like-button_active');
}

/* Открытие формы для добавления карточки */
const popupAddCard = document.querySelector('.popup_type_add-card');

const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click', openAddCardForm);

function openAddCardForm() {
    popupAddCard.classList.add('popup_opened');
}

/* Закрытие формы для добавления карточки */
const closeAddCardFormButton = document.querySelector('.popup__close-button_form_add-card');
closeAddCardFormButton.addEventListener('click', closeAddCardForm);

function closeAddCardForm() {
    popupAddCard.classList.remove('popup_opened');
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

    const newCard = createCard(newCardName, newImgLink);
    cardsList.prepend(newCard);

    evt.target.reset();
    closeAddCardForm();
}

/* Удаление карточки */
function deleteCard(evt) {
    evt.target.parentElement.remove();
}

/* Просмотр картинки */
const popupCardImage = document.querySelector('.popup_type_card-img');
const popupCardImageContent = document.querySelector('.popup__card-img-content');
const cardImageTemplate = document.querySelector('.popup-card-img-template').content;

function openCardImage(evt) {
    const imageLink = evt.target.src;
    const imageName = evt.target.alt;
    const cardImageElement = cardImageTemplate.cloneNode(true);

    cardImageElement.querySelector('.popup__image').setAttribute('src', imageLink);
    cardImageElement.querySelector('.popup__caption').textContent = imageName;

    popupCardImage.classList.add('popup_opened');
    popupCardImageContent.append(cardImageElement);
}

/* Закрытие просмотра картинки */
const closeCardImageButton = document.querySelector('.popup__close-button_form_card-img');
closeCardImageButton.addEventListener('click', closeCardImage);

function closeCardImage(evt) {
    popupCardImage.classList.remove('popup_opened');
    evt.target.parentElement.querySelector('.popup__figure').remove();
}

/* Создание карточки */
function createCard(cardName, imgLink) {
    const cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.photo-grid__name').textContent = cardName;
    cardElement.querySelector('.photo-grid__image').setAttribute('src', imgLink);
    cardElement.querySelector('.photo-grid__image').setAttribute('alt', cardName);
    cardElement.querySelector('.photo-grid__like-button').addEventListener('click', like);
    cardElement.querySelector('.photo-grid__delete-button').addEventListener('click', deleteCard);
    cardElement.querySelector('.photo-grid__image').addEventListener('click', openCardImage);

    return cardElement;
}
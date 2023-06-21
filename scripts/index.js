/* Открытие формы редактирования профиля */
const editButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup__edit-profile');
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

function closeEditProfileForm(evt) {
    popupEditProfile.classList.remove('popup_opened');
}

/* Изменение информации в профиле */
const editProfileForm = document.querySelector('form[name="editPrifile"]');
editProfileForm.addEventListener('submit', profileInfoSubmit);

function profileInfoSubmit(evt) {
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
    const cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.photo-grid__name').textContent = element.name;
    cardElement.querySelector('.photo-grid__image').setAttribute('src', element.link);

    cardsList.append(cardElement);
});

/* Добавление лайков */
const likes = document.querySelectorAll('.photo-grid__like-button');

likes.forEach(like => like.addEventListener('click', (evt) => {
    evt.target.classList.toggle('photo-grid__like-button_active');
}));

/* Открытие формы для добавления карточки */
const popupAddCard = document.querySelector('.popup__add-card');

const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click', openAddCardForm);

function openAddCardForm() {
    popupAddCard.classList.add('popup_opened');
}

/* Закрытие формы для добавления карточки */
const closeAddCardFormButton = document.querySelector('.popup__close-button_form_add-card');
closeAddCardFormButton.addEventListener('click', closeAddCardForm);

function closeAddCardForm(evt) {
    popupAddCard.classList.remove('popup_opened');
}

/* Добавление карточки */
const addCardForm = document.querySelector('form[name="addCard"]');
const cardNameInput = document.querySelector('.popup__field_type_card-name');
const imgLinkInput = document.querySelector('.popup__field_type_card-img-link');
addCardForm.addEventListener('submit', cardSubmit);

function cardSubmit(evt) {
    evt.preventDefault();

    const newCardName = cardNameInput.value;
    const newImgLink = imgLinkInput.value;

    const cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.photo-grid__name').textContent = newCardName;
    cardElement.querySelector('.photo-grid__image').setAttribute('src', newImgLink);

    cardsList.prepend(cardElement);
    closeAddCardForm();
}
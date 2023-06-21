let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-button');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__subtitle');

let form = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__field_type_name');
let descriptionInput = document.querySelector('.popup__field_type_description');

function openForm() {
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
    popup.classList.add('popup_opened');
}

function closeForm() {
    popup.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
    evt.preventDefault();

    let newName = nameInput.value;
    let newDescription = descriptionInput.value;

    profileName.textContent = newName;
    profileDescription.textContent = newDescription;
    closeForm();
}

editButton.addEventListener('click', openForm);
closeButton.addEventListener('click', closeForm);

form.addEventListener('submit', handleFormSubmit);

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

const likes = document.querySelectorAll('.photo-grid__like-button');

likes.forEach(like => like.addEventListener('click', (evt) => {
    evt.target.classList.toggle('photo-grid__like-button_active');
}));
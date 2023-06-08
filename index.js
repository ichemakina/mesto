let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-button');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__subtitle');
let likes = document.querySelectorAll('.photo-grid__like');

let form = document.querySelector('.popup__container');
let nameInput = document.querySelector('input[name="name"]');
let descriptionInput = document.querySelector('input[name="description"]');

function openForm() {
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
}

editButton.addEventListener('click', openForm);
closeButton.addEventListener('click', closeForm);
nameInput.value = profileName.textContent;
descriptionInput.value = profileDescription.textContent;

form.addEventListener('submit', handleFormSubmit);
likes.forEach(l => l.addEventListener('click', function () {
    l.className = 'photo-grid__like_active';
}))
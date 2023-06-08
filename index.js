let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-button')

function openForm() {
    popup.classList.add('popup_opened');
}

function closeForm() {
    popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', openForm);
closeButton.addEventListener('click', closeForm);
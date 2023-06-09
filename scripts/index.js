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
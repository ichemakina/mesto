/* Открытие попапа */
export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', escapeHandler);
    popup.addEventListener("click", popupClickHandler);
}

/* Закрытие попапа */
export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', escapeHandler);
    popup.removeEventListener("click", popupClickHandler);
}

/* Закрытие попапа по Esc */
function escapeHandler(evt) {
    const popup = document.querySelector('.popup_opened');
    if (evt.code === "Escape") {
        closePopup(popup);
    }
}

/* Закрытие попапа кликом на оверлей */
function popupClickHandler(evt) {
    const popup = document.querySelector('.popup_opened');
    if (evt.currentTarget === evt.target) {
        closePopup(popup);
    }
}
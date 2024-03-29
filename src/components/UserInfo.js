export class UserInfo {
    constructor({ profileNameSelector, profileDescriptionSelector, profileAvatarSelector }) {
        this._profileName = document.querySelector(profileNameSelector);
        this._profileDescription = document.querySelector(profileDescriptionSelector);
        this._profileAvatar = document.querySelector(profileAvatarSelector);
    }

    updateAvatar(avatarLink) {
        this._profileAvatar.setAttribute('src', avatarLink);
    }

    getUserInfo() {
        return {
            name: this._profileName.textContent,
            about: this._profileDescription.textContent
        };
    }

    setUserInfo(data) {
        this._profileName.textContent = data.name;
        this._profileDescription.textContent = data.about;
        if (data.avatar != null) {
            this.updateAvatar(data.avatar);
        }
    }
}
export class UserInfo {
    constructor({ profileNameSelector, profileDescriptionSelector }) {
        this._profileName = document.querySelector(profileNameSelector);
        this._profileDescription = document.querySelector(profileDescriptionSelector);
    }

    getUserInfo() {
        return {
            name: this._profileName.textContent,
            description: this._profileDescription.textContent
        };
    }

    setUserInfo(data) {
        this._profileName.textContent = data.name;
        this._profileDescription.textContent = data.description;
    }
}
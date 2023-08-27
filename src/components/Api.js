export class Api {
    constructor(options) {
        this._url = options.baseUrl;
        this._headers = options.headers;
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => {
                console.log(err.message)
            });
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => {
                console.log(err.message)
            });
    }

    updateUserInfo(data) {
        fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        });
    }

    addNewCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        });
    }

    deleteCard(cardId) {
        fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        });
    }
}
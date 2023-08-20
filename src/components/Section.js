export class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems(data) {
        data.forEach((element) => {
            this._renderer(element);
        });
    }

    addItem(element, isNeedPrepend = false) {
        if (isNeedPrepend) {
            this._container.prepend(element);
        }
        else {
            this._container.append(element);
        }

    }
}
export class Section {
    constructor({ data, renderer }, containerSelector) {
        this._renderedItems = data;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems() {
        this._renderedItems.forEach((element) => {
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
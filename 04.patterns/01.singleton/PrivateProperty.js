class PrivateProperty {
    static #instance = null;

    constructor() {
        if (PrivateProperty.#instance) {
            return PrivateProperty.#instance;
        }

        PrivateProperty.#instance = this;
    }
}

module.exports = PrivateProperty;

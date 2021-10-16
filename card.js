class Card {
    constructor({ isLand }) {
        this._isLand = isLand;
    }

    get isLand() {
        return this._isLand;
    }
}

module.exports = Card;

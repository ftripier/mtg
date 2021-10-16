class Card {
    constructor({ isLand = false, isManaRamp = false }) {
        this._isLand = isLand;
        this._isManaRamp = isManaRamp;
    }

    get manaCost() {
        // mana ramp is two on average
        if (this._isManaRamp) {
            return 2;
        }
        return 0;
    }

    get isLand() {
        return this._isLand;
    }

    get isManaRamp() {
        return this._isManaRamp;
    }
}

module.exports = Card;

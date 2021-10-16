class Turn {
    constructor(field) {
        this._field = field;
        this._landPlayed = false;
        this._manaUsed = 0;
    }

    get landPlayed() {
        return this._landPlayed;
    }

    playCard(card) {
        if (card.isLand) {
            if (this._landPlayed) {
                throw new Error('land already played');
            } else {
                this._landPlayed = true;
            }
            this._field.playableMana += 1;
        }
        if (card.isManaRamp && this.manaAvailable > 2) {
            this._manaUsed += 2;
            this._field.playableMana += 1;
        }
    }

    get manaAvailable() {
        return this._field.playableMana - this._manaUsed;
    }

}

module.exports = Turn;
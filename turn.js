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
        if (card.isManaRamp) {
            if (this.manaAvailable >= 2) {
                this._manaUsed += 2;
                this._field.playableMana += 1;
            } else {
                throw new Error('not enough available to play a mana ramp');
            }
        }
    }

    get manaAvailable() {
        return this._field.playableMana - this._manaUsed;
    }

}

module.exports = Turn;
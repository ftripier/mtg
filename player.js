const strategies = require('./strategies');
const Turn = require('./turn');

const DEFAULT_STRATEGIES = {
    mulligan: strategies.MULLIGAN.LAND_PRIORITY(),
    playstyle: strategies.PLAYSTYLE.MANA_RAMP(),
};

class Player {
    constructor(deck, strategies) {
        this._strategies = {...DEFAULT_STRATEGIES, ...strategies};
        this._deck = deck;
        this._hand = null;
        this.field = {
            playableMana: 0
        };
    }

    drawHand() {
        if (this._hand) {
            throw new Error('player already drew a hand');
        }
        const hand = this._deck.drawHand();
        this._strategies.mulligan(hand);
        this._hand = hand;
    }

    nextTurn() {
        if (!this._hand) {
            this.drawHand();
        }
        this._hand.drawNext();
        this._strategies.playstyle(this._hand, new Turn(this.field));
    }

    get hand() {
        return this._hand;
    }
}

module.exports = Player;
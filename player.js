const strategies = require('./strategies');

const DEFAULT_STRATEGIES = {
    mulligan: strategies.MULLIGAN.LAND_PRIORITY()
};

class Player {
    constructor(deck, strategies) {
        this._strategies = {...DEFAULT_STRATEGIES, ...strategies};
        this._deck = deck;
        this._hand = null;
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
    }

    get hand() {
        return this._hand;
    }
}

module.exports = Player;
const Card = require("./card");
const Hand = require("./hand");
const random = require("./random");

const SHUFFLE_ENTROPY = 5;

class Deck {
    constructor(deckList = []) {
        this._deckList = deckList;
    }

    static fromNLands(nLands, nCards) {
        if (nLands > nCards) {
            throw new Error('must have more cards than lands');
        }
        let lands = Array.from({ length: nLands }).map(() => new Card({ isLand: true }));
        let other = Array.from({ length: nCards - nLands }).map(() => new Card({ isLand: false }));
        let deckList = lands.concat(other);
        let deck = new Deck(deckList);
        deck.shuffle();
        return deck;
    }

    draw() {
        if (!this.hasCards()) {
            throw new Error("no more cards");
        }
        return this._deckList.pop();
    }

    drawHand() {
        return Hand.drawFromDeck(this);
    }

    shuffle() {
        for (let i = 0; i < SHUFFLE_ENTROPY; i += 1) {
            random.shuffle(this._deckList);
        }
    }

    hasCards() {
        return this._deckList.length > 0;
    }
}

module.exports = Deck;
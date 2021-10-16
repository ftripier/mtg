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

    static fromNLandsAndManaRamp(nLands, manaRamp, nCards) {
        const nMana = nLands + manaRamp;
        if (nMana > nCards) {
            throw new Error('must have more cards than lands and mana ramp');
        }
        let lands = Array.from({ length: nLands }).map(() => new Card({ isLand: true, isManaRamp: false }));
        let mr = Array.from({ length: manaRamp }).map(() => new Card({ isManaRamp: true, isLand: false }));
        let other = Array.from({ length: nCards - nMana }).map(() => new Card({ isLand: false, isManaRamp: false }));
        let deckList = lands.concat(mr).concat(other);
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
        const hand = new Hand(this);
        hand.drawFromDeck();
        return hand;
    }

    shuffle() {
        for (let i = 0; i < SHUFFLE_ENTROPY; i += 1) {
            random.shuffle(this._deckList);
        }
    }

    putCardsOnTop(cards) {
        this._deckList = this._deckList.concat(cards);
    }

    hasCards() {
        return this._deckList.length > 0;
    }
}

module.exports = Deck;
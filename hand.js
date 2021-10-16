const HAND_SIZE = 7;

class Hand {
    constructor(deck) {
        this._deck = deck;
        this._cards = [];
        this._mulligans = 0;
    }

    drawFromDeck() {
        this._cards = [];
        let cardsLostFromMulligan = Math.max(0, this._mulligans - 1);
        let cardsToDraw = HAND_SIZE - cardsLostFromMulligan;
        for (let i = 0; i < cardsToDraw; i += 1) {
            this.drawNext();
        }
    }

    drawNext() {
        this._cards.push(this._deck.draw());
    }

    reshuffle() {
        const cards = this._cards.slice();
        this._cards = [];
        this._deck.putCardsOnTop(cards);
        this._deck.shuffle();
    }

    mulligan() {
        this._mulligans += 1;
        this.reshuffle();
        this.drawFromDeck();
    }

    get nLands() {
        return this._cards.filter((card) => card.isLand).length;
    }
}

module.exports = Hand;

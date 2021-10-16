const HAND_SIZE = 7;

class Hand {
    constructor(cards, deck) {
        this._cards = cards;
        this._deck = deck;
    }

    static drawFromDeck(deck) {
        let cards = [];
        for (let i = 0; i < HAND_SIZE; i += 1) {
            cards.push(deck.draw());
        }
        let hand = new Hand(cards, deck);
        return hand;
    }

    drawNext() {
        this._cards.push(this._deck.draw());
    }

    get nLands() {
        return this._cards.filter((card) => card.isLand).length;
    }
}

module.exports = Hand;

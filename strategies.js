const MULLIGAN = {
    LAND_PRIORITY: (landLowerBound = 2, landUpperBound = 5) => {
        return (hand) => {
            let nLands = hand.nLands;
            if (nLands < landLowerBound || nLands > landUpperBound) {
                if (hand.nMulligans < 2) {
                    hand.mulligan();
                }
            }
        }
    }
};

const PLAYSTYLE = {
    MANA_RAMP: () => {
        return (hand, turn) => {
            hand.playCards((card) => {
                if (card.isLand) {
                    if (!turn.landPlayed) {
                        turn.playCard(card);
                        return true;
                    }
                }
                if (card.isManaRamp) {
                    if (turn.manaAvailable >= card.manaCost) {
                        turn.playCard(card);
                        return true;
                    }
                }
                return false;
            });
        }
    }
}

module.exports = {
    MULLIGAN,
    PLAYSTYLE
};
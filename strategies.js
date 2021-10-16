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

module.exports = {
    MULLIGAN
};
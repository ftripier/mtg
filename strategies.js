const MULLIGAN = {
    LAND_PRIORITY: (landLowerBound = 2, landUpperBound = 5) => {
        return (hand) => {
            let nLands = hand.nLands;
            if (nLands < landLowerBound || nLands > landUpperBound) {
                hand.mulligan();
            }
        }
    }
};

module.exports = {
    MULLIGAN
};
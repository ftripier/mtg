const Deck = require("./deck");
const ss = require('simple-statistics');

function runTrial(nLands, beatNumber) {
    let deck = Deck.fromNLands(nLands, 100);

    let currentTurn = 0;
    let hand = deck.drawHand();
    while (deck.hasCards()) {
        if (hand.nLands >= beatNumber) {
            return currentTurn;
        }
        hand.drawNext();
        currentTurn += 1;
    }
    return currentTurn;
}

function hittingBeatsInCommander(nLands, nTrials, beatNumber) {
    let results = [];
    for (let i = 0; i < nTrials; i += 1) {
        results.push(runTrial(nLands, beatNumber));
    }
    return {
        stdDev: ss.standardDeviation(results),
        max: ss.max(results),
        min: ss.min(results),
        mean: ss.mean(results),
        median: ss.median(results)
    }
}

module.exports = {
    hittingBeatsInCommander,
}

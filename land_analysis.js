const Deck = require("./deck");
const ss = require('simple-statistics');
const Player = require("./player");

function runTrial(nLands, beatNumber) {
    let deck = Deck.fromNLands(nLands, 100);

    let currentTurn = 0;
    let player = new Player(deck);
    player.drawHand();
    while (deck.hasCards()) {
        let hand = player.hand;
        if (hand.nLands >= beatNumber) {
            return currentTurn;
        }
        player.nextTurn();
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

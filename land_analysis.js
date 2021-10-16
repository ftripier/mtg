const Deck = require("./deck");
const ss = require('simple-statistics');
const Player = require("./player");

function runTrial(nLands, beatNumber, manaRamp) {
    let deck = Deck.fromNLandsAndManaRamp(nLands, manaRamp, 100);

    let currentTurn = 0;
    let player = new Player(deck);
    player.drawHand();
    while (deck.hasCards()) {
        let playableMana = player.field.playableMana;
        if (playableMana >= beatNumber) {
            return currentTurn;
        }
        player.nextTurn();
        currentTurn += 1;
    }
    return currentTurn;
}

function hittingBeatsInCommander(nLands, nTrials, beatNumber, manaRamp) {
    let results = [];
    for (let i = 0; i < nTrials; i += 1) {
        results.push(runTrial(nLands, beatNumber, manaRamp));
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

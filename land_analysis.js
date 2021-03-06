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

function hittingBeatsInCommander(nLands, nTrials, beatNumber, manaRamp, targetTurn) {
    let results = [];
    for (let i = 0; i < nTrials; i += 1) {
        results.push(runTrial(nLands, beatNumber, manaRamp));
    }
    let targetTurnWasHit = 0;
    results.forEach((turnHitBeat) => {
        if (turnHitBeat <= targetTurn) {
            targetTurnWasHit += 1;
        }
    });
    const percentageTargetTurnWasHit = targetTurnWasHit/results.length;
    const stdDev = ss.standardDeviation(results);
    const mean = ss.mean(results)
    return {
        stdDev,
        max: ss.max(results),
        min: ss.min(results),
        mean,
        median: ss.median(results),
        eightyFifthPercentile: mean + stdDev,
        percentageTargetTurnWasHit
    }
}

module.exports = {
    hittingBeatsInCommander,
}

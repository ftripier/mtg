function probabilityWithReplacement(nTotalObjects, nTargets, nTargetRetrievals, nAttempts) {
    let stack = [{
        currentTotal: nTotalObjects,
        currentRetrievals: 0,
        probabilityHistory: [],
        currentAttemps: 0
    }];
    let probabilityOfHits = {};
    while (stack.length) {
        let { currentTotal, currentRetrievals, probabilityHistory, currentAttemps } = stack.pop();
        if (currentTotal < 0) {
            throw new Error('got a negative current total somehow');
        }
        if (currentTotal > 0 && currentRetrievals < nTargetRetrievals && currentAttemps < nAttempts) {
            let probabilityOfRetrieval = (nTargets - currentRetrievals) / currentTotal;
            let probabilityOfNotRetrieval = 1 - probabilityOfRetrieval;
            // we got a retrieval
            stack.push({
                currentTotal: currentTotal - 1,
                currentRetrievals: currentRetrievals + 1,
                probabilityHistory: probabilityHistory.concat(probabilityOfRetrieval),
                currentAttemps: currentAttemps + 1
            });
            // we didn't get a retrieval
            stack.push({
                currentTotal: currentTotal - 1,
                currentRetrievals,
                probabilityHistory: probabilityHistory.concat(probabilityOfNotRetrieval),
                currentAttemps: currentAttemps + 1,
            });
        } else {
            const branchProbability = probabilityHistory.reduce((accum, currProb) => accum * currProb, 1);
            if (probabilityOfHits[currentRetrievals] == null) {
                probabilityOfHits[currentRetrievals] = 0;
            }
            probabilityOfHits[currentRetrievals] += branchProbability;
        }
    }
    return probabilityOfHits;
}


console.log("starting");
const nDraws = 15;
const nWheelHits = 1;
const nWheels = 10;
console.log(`probability of drawing wheel(s) in ${nDraws} draws in a deck with ${nWheels} wheels:\n`, probabilityWithReplacement(100, 10, nWheelHits, nDraws));
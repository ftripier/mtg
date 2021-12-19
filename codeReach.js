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
            const hitName = currentRetrievals === 0 ? 'none' : currentRetrievals;
            if (probabilityOfHits[hitName] == null) {
                probabilityOfHits[hitName] = 0;
            }
            probabilityOfHits[hitName] += branchProbability;
        }
    }
    const anyHits = Object.entries(probabilityOfHits).reduce((accum, [hits, prob]) => {
        if (hits === 'none') {
            return accum;
        }
        return accum + prob;
    }, 0);
    probabilityOfHits.any = anyHits;
    return probabilityOfHits;
}


console.log("starting");

const cases = [
    { nDraws: 14, nWheels: 1},
    { nDraws: 14, nWheels: 2},
    { nDraws: 14, nWheels: 3},
    { nDraws: 14, nWheels: 4},
    { nDraws: 14, nWheels: 5},
    { nDraws: 14, nWheels: 6},
    { nDraws: 14, nWheels: 7},
    { nDraws: 14, nWheels: 8},
    { nDraws: 14, nWheels: 9},
    { nDraws: 14, nWheels: 10},
    { nDraws: 14, nWheels: 11},
];

cases.forEach(({ nDraws, nWheels}) => {
    console.log(`probability of drawing wheel(s) in ${nDraws} draw(s) in a deck with ${nWheels} wheel(s):\n`, probabilityWithReplacement(100, nWheels, nWheels, nDraws));
});
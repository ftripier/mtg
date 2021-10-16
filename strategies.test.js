const Deck = require('./deck');
const Hand = require('./hand');

jest.mock('./deck');

const strategies = require('./strategies');

test('land priority strategy mulligans hands with less than two lands', () => {
    const deck = new Deck();
    const hand = new Hand(deck);
    jest.spyOn(hand, 'nLands', 'get').mockReturnValue(1);
    const mulliganSpy = jest.spyOn(hand, 'mulligan');
    const strategy = strategies.MULLIGAN.LAND_PRIORITY();
    strategy(hand);
    expect(mulliganSpy).toHaveBeenCalled();
});

test('land priority strategy mulligans hands with more than five lands', () => {
    const deck = new Deck();
    const hand = new Hand(deck);
    jest.spyOn(hand, 'nLands', 'get').mockReturnValue(6);
    const mulliganSpy = jest.spyOn(hand, 'mulligan');
    const strategy = strategies.MULLIGAN.LAND_PRIORITY();
    strategy(hand);
    expect(mulliganSpy).toHaveBeenCalled();
});

test('land priority strategy does not mulligan hands with more than three lands', () => {
    const deck = new Deck();
    const hand = new Hand(deck);
    jest.spyOn(hand, 'nLands', 'get').mockReturnValue(3);
    const mulliganSpy = jest.spyOn(hand, 'mulligan');
    const strategy = strategies.MULLIGAN.LAND_PRIORITY();
    strategy(hand);
    expect(mulliganSpy).not.toHaveBeenCalled();
});

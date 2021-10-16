const Deck = require('./deck');
const Hand = require('./hand');

jest.mock('./deck');
jest.mock('./strategies', () => {
    return {
        MULLIGAN: {
            LAND_PRIORITY: () => () => {}
        }
    };
});

const Player = require('./player')


test('player can draw hand from a deck', () => {
    const deck = new Deck();
    const player = new Player(deck);
    player.drawHand();
});

#! /usr/bin/env node

const { Command } = require('commander');
const analysis = require('./land_analysis');

const program = new Command();
program.version('0.0.1');

function ArgParseInt(value, dummyPrevious) {
    // parseInt takes a string and a radix
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue)) {
      throw new commander.InvalidArgumentError('Not a number.');
    }
    return parsedValue;
  }

program
  .option('-t, --n-trials <number>', 'the number of trials to run.', ArgParseInt, 100000)
  .option('-mr, --mana-ramp <number>', 'the number of mana ramp permanents.', ArgParseInt, 0)
  .option('-tt, --target-turn <number>', 'a target turn to hit the given mana beat. Yields the percentage of time this was reached.', ArgParseInt, 0)
  .requiredOption('-b, --beat-number <number>', 'the target amount of mana you need to have', ArgParseInt)
  .requiredOption('-l, --n-lands <type>', 'the amount of lands in your commander deck', ArgParseInt);

program.parse(process.argv);

const options = program.opts();

const { nLands, beatNumber, nTrials, manaRamp, targetTurn } = options;
console.log(`nLands:`, nLands, `nManaRamp`, manaRamp, `beatNumber:`, beatNumber, `nTrials:`, nTrials);
if (targetTurn) {
  console.log(`targetTurn:`, targetTurn);
}

const results = analysis.hittingBeatsInCommander(nLands, nTrials, beatNumber, manaRamp, targetTurn);
console.log('\n');
console.log('Amount of turns to hit the "beat number" (target mana per turn)');
console.log(results);

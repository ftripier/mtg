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
  .requiredOption('-b, --beat-number <number>', 'the target amount of mana you need to have', ArgParseInt)
  .requiredOption('-l, --n-lands <type>', 'the amount of lands in your commander deck', ArgParseInt);

program.parse(process.argv);

const options = program.opts();

const { nLands, beatNumber, nTrials } = options;
console.log(`nLands:`, nLands, `beatNumber:`, beatNumber, `nTrials:`, nTrials);

const results = analysis.hittingBeatsInCommander(nLands, nTrials, beatNumber);
console.log('\n');
console.log('Amount of turns to hit the "beat number" (amount of lands drawn, and mana eventually available to you):');
console.log(results);

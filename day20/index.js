const fs = require('fs');
const path = require('path');

const parseInput = (raw) =>
  raw
    .trim()
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line) => ({
      dir: line[0],
      steps: Number(line.slice(1)),
    }));

const part1 = () => {

};

const part2 = () => {

};

const run = () => {
  const samplePath = path.join(__dirname, 'sampleInput.txt');
  const realPath = path.join(__dirname, 'realInput.txt');

  const sampleInput = fs.readFileSync(samplePath, 'utf8');
  const realInput = fs.readFileSync(realPath, 'utf8');

  const sampleInstructions = parseInput(sampleInput);
  const realInstructions = parseInput(realInput);

  console.log('Sample Part 1:', part1(sampleInstructions));
  console.log('Sample Part 2:', part2(sampleInstructions));
  console.log('Real Part 1:', part1(realInstructions));
  console.log('Real Part 2:', part2(realInstructions));
};

if (require.main === module) {
  run();
}

module.exports = { parseInput, part1, part2 };
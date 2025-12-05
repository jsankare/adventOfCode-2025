const fs = require('fs');
const path = require('path');

const START_POSITION = 50;
const DIAL_SIZE = 100;

const parseInput = (raw) =>
  raw
    .trim()
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line) => ({
      dir: line[0],
      steps: Number(line.slice(1)),
    }));

const applyRotation = (position, dir, steps) => {
  const delta = dir === 'R' ? steps : -steps;
  const next = (position + delta) % DIAL_SIZE;
  return (next + DIAL_SIZE) % DIAL_SIZE; // keep in [0, 99]
};

const countZerosDuringRotation = (position, dir, steps) => {
  // Solve (position + dirSign * k) % 100 === 0 for k in [1, steps]
  const dirSign = dir === 'R' ? 1 : -1;
  const base = dirSign === 1 ? (DIAL_SIZE - position) % DIAL_SIZE : position % DIAL_SIZE;

  // When base is 0, the first time we hit zero is after 100 clicks.
  const firstHit = base === 0 ? DIAL_SIZE : base;
  if (steps < firstHit) return 0;

  return 1 + Math.floor((steps - firstHit) / DIAL_SIZE);
};

const part1 = (instructions, start = START_POSITION) => {
  let position = start;
  let zeroHits = 0;

  for (const { dir, steps } of instructions) {
    position = applyRotation(position, dir, steps);
    if (position === 0) zeroHits += 1;
  }

  return zeroHits;
};

const part2 = (instructions, start = START_POSITION) => {
  let position = start;
  let zeroHits = 0;

  for (const { dir, steps } of instructions) {
    zeroHits += countZerosDuringRotation(position, dir, steps);
    position = applyRotation(position, dir, steps);
  }

  return zeroHits;
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

module.exports = { parseInput, applyRotation, part1, part2 };
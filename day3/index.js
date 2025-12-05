const fs = require('fs');
const path = require('path');

const parseInput = (raw) =>
  raw
    .trim()
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line) => line.trim());

const bestPairValue = (digits) => {
  const nums = digits.split('').map((c) => Number(c));
  const n = nums.length;
  const suffixMax = Array(n).fill(0);
  suffixMax[n - 1] = nums[n - 1];
  for (let i = n - 2; i >= 0; i -= 1) {
    suffixMax[i] = Math.max(nums[i], suffixMax[i + 1]);
  }

  let best = 0;
  for (let i = 0; i < n - 1; i += 1) {
    const value = nums[i] * 10 + suffixMax[i + 1];
    if (value > best) best = value;
  }
  return best;
};

const part1 = (banks) => banks.reduce((sum, line) => sum + bestPairValue(line), 0);

const part2 = () => {
  // Not required for now.
};

const run = () => {
  const samplePath = path.join(__dirname, 'sampleInput.txt');
  const realPath = path.join(__dirname, 'realInput.txt');

  const sampleInput = fs.readFileSync(samplePath, 'utf8');
  const realInput = fs.readFileSync(realPath, 'utf8');

  const sampleBanks = parseInput(sampleInput);
  const realBanks = parseInput(realInput);

  console.log('Sample Part 1:', part1(sampleBanks));
  console.log('Real Part 1:', part1(realBanks));
};

if (require.main === module) {
  run();
}

module.exports = { parseInput, part1, part2 };
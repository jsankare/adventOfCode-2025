const fs = require('fs');
const path = require('path');

const parseInput = (raw) => {
  const ranges = [];
  const joined = raw.trim().replace(/\s+/g, '');
  const regex = /(\d+)-(\d+)/g;
  let match;
  while ((match = regex.exec(joined))) {
    ranges.push({ start: Number(match[1]), end: Number(match[2]) });
  }
  return ranges;
};

const isRepeatedTwice = (n) => {
  const s = String(n);
  if (s.length % 2 !== 0) return false;
  const half = s.length / 2;
  const left = s.slice(0, half);
  return left + left === s;
};

const isRepeatedPattern = (n) => {
  const s = String(n);
  const len = s.length;
  // Check all divisor lengths that produce at least 2 repeats
  for (let patternLen = 1; patternLen <= len / 2; patternLen += 1) {
    if (len % patternLen !== 0) continue;
    const repeats = len / patternLen;
    if (repeats < 2) continue;
    const unit = s.slice(0, patternLen);
    if (unit.repeat(repeats) === s) return true;
  }
  return false;
};

const part1 = (ranges) => {
  let total = 0;
  for (const { start, end } of ranges) {
    for (let n = start; n <= end; n += 1) {
      if (isRepeatedTwice(n)) {
        total += n;
      }
    }
  }
  return total;
};

const part2 = (ranges) => {
  let total = 0;
  for (const { start, end } of ranges) {
    for (let n = start; n <= end; n += 1) {
      if (isRepeatedPattern(n)) {
        total += n;
      }
    }
  }
  return total;
};

const run = () => {
  const samplePath = path.join(__dirname, 'sampleInput.txt');
  const realPath = path.join(__dirname, 'realInput.txt');

  const sampleInput = fs.readFileSync(samplePath, 'utf8');
  const realInput = fs.readFileSync(realPath, 'utf8');

  const sampleRanges = parseInput(sampleInput);
  const realRanges = parseInput(realInput);

  console.log('Sample Part 1:', part1(sampleRanges));
  console.log('Sample Part 2:', part2(sampleRanges));
  console.log('Real Part 1:', part1(realRanges));
  console.log('Real Part 2:', part2(realRanges));
};

if (require.main === module) {
  run();
}

module.exports = { parseInput, part1, part2 };
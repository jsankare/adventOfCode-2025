const fs = require('fs');
const path = require('path');

const parseInput = (raw) => {
  const [rangeSection, idsSection] = raw.trim().split(/\r?\n\r?\n/);
  const ranges = rangeSection
    .trim()
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line) => {
      const [a, b] = line.split('-').map(Number);
      return { start: a, end: b };
    });
  const ids = idsSection
    .trim()
    .split(/\r?\n/)
    .filter(Boolean)
    .map(Number);
  return { ranges, ids };
};

const mergeRanges = (ranges) => {
  const sorted = [...ranges].sort((a, b) => a.start - b.start);
  const merged = [];
  for (const r of sorted) {
    if (merged.length === 0) {
      merged.push({ ...r });
      continue;
    }
    const last = merged[merged.length - 1];
    if (r.start <= last.end + 1) {
      last.end = Math.max(last.end, r.end);
    } else {
      merged.push({ ...r });
    }
  }
  return merged;
};

const inAnyRange = (n, ranges) => {
  let lo = 0;
  let hi = ranges.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    const { start, end } = ranges[mid];
    if (n < start) hi = mid - 1;
    else if (n > end) lo = mid + 1;
    else return true;
  }
  return false;
};

const part1 = ({ ranges, ids }) => {
  const merged = mergeRanges(ranges);
  let fresh = 0;
  for (const id of ids) {
    if (inAnyRange(id, merged)) fresh += 1;
  }
  return fresh;
};

const part2 = () => {
  // Not required for now.
};

const run = () => {
  const samplePath = path.join(__dirname, 'sampleInput.txt');
  const realPath = path.join(__dirname, 'realInput.txt');

  const sampleInput = fs.readFileSync(samplePath, 'utf8');
  const realInput = fs.readFileSync(realPath, 'utf8');

  const sampleData = parseInput(sampleInput);
  const realData = parseInput(realInput);

  console.log('Sample Part 1:', part1(sampleData));
  console.log('Real Part 1:', part1(realData));
};

if (require.main === module) {
  run();
}

module.exports = { parseInput, part1, part2 };
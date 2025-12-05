const fs = require('fs');
const path = require('path');

const parseInput = (raw) =>
  raw
    .trim()
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line) => line.trim());

const directions = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

const part1 = (gridLines) => {
  const grid = gridLines.map((line) => line.split(''));
  const rows = grid.length;
  const cols = grid[0].length;

  let accessible = 0;
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      if (grid[r][c] !== '@') continue;
      let neighbors = 0;
      for (const [dr, dc] of directions) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
        if (grid[nr][nc] === '@') neighbors += 1;
      }
      if (neighbors < 4) accessible += 1;
    }
  }
  return accessible;
};

const part2 = () => {
  // Not required for now.
};

const run = () => {
  const samplePath = path.join(__dirname, 'sampleInput.txt');
  const realPath = path.join(__dirname, 'realInput.txt');

  const sampleInput = fs.readFileSync(samplePath, 'utf8');
  const realInput = fs.readFileSync(realPath, 'utf8');

  const sampleGrid = parseInput(sampleInput);
  const realGrid = parseInput(realInput);

  console.log('Sample Part 1:', part1(sampleGrid));
  console.log('Real Part 1:', part1(realGrid));
};

if (require.main === module) {
  run();
}

module.exports = { parseInput, part1, part2 };
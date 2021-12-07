const fs = require("fs");
const input = fs.readFileSync("input.txt").toString().split("\n");

let hydrothermalVents = {};

const iterateLine = (to, from, static, vertical = true) => {
  const totalSteps = Math.abs(from - to);
  for (let i = 0; i <= totalSteps; i++) {
    const increasing = from < to;
    const coord = vertical
      ? `${static},${increasing ? from + i : from - i}`
      : `${increasing ? from + i : from - i},${static}`;
    hydrothermalVents[coord] = hydrothermalVents[coord] + 1 || 1;
  }
};

const diagonalLine = (fromX, fromY, toX, toY) => {
  const totalSteps = Math.abs(fromX - toX);
  for (let i = 0; i <= totalSteps; i++) {
    const xIncreasing = fromX < toX;
    const yIncreasing = fromY < toY;
    const coord = `${xIncreasing ? fromX + i : fromX - i},${yIncreasing ? fromY + i : fromY - i}`;
    hydrothermalVents[coord] = hydrothermalVents[coord] + 1 || 1;
  }
};

const getOverlaps = (row, withDiagonal = false) => {
  const [from, to] = row.split(" -> ");
  const [fromX, fromY] = from.split(",").map((numberAsString) => +numberAsString);
  const [toX, toY] = to.split(",").map((numberAsString) => +numberAsString);
  const is45deg = Math.abs(fromY - toY) == Math.abs(fromX - toX);
  if (fromX === toX) {
    iterateLine(fromY, toY, fromX);
  } else if (fromY === toY) {
    iterateLine(fromX, toX, fromY, false);
  } else if (withDiagonal && is45deg) {
    diagonalLine(fromX, fromY, toX, toY);
  }
};

const pointsWithMoreThanTwoOverlaps = (withDiagonal = false) => {
  hydrothermalVents = {};
  input.forEach((row) => getOverlaps(row, withDiagonal));
  return Object.values(hydrothermalVents).filter((val) => val > 1).length;
};

console.log(pointsWithMoreThanTwoOverlaps());
console.log(pointsWithMoreThanTwoOverlaps(true));

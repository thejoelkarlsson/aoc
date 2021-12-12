const fs = require("fs");
const input = fs
  .readFileSync("input.txt")
  .toString()
  .split("\n")
  .map((row) => row.split("").map((number) => +number));

const DIRECTIONS = ["UP", "RIGHT", "DOWN", "LEFT"];
const lowPoints = [];
let riskLevel = 0;

const getNeighbor = (y, x, direction) => {
  switch (direction) {
    case "UP":
      return y - 1 < 0 ? null : { y: y - 1, x: x, value: input[y - 1][x] };
    case "RIGHT":
      return x + 1 >= input[0].length ? null : { y: y, x: x + 1, value: input[y][x + 1] };
    case "DOWN":
      return y + 1 >= input.length ? null : { y: y + 1, x: x, value: input[y + 1][x] };
    case "LEFT":
      return x - 1 < 0 ? null : { y: y, x: x - 1, value: input[y][x - 1] };
    default:
      throw Error("WRONG DIRECTION");
  }
};

const getNeighbors = (y, x) => {
  return DIRECTIONS.map((direction) => getNeighbor(y, x, direction)).filter((direction) => direction);
};

const isLowPoint = (y, x) => {
  const currentValue = input[y][x];
  const neigbors = getNeighbors(y, x);

  return Object.values(neigbors).reduce((acc, curr) => acc && (curr.value < 0 || curr.value > currentValue), true);
};

const getPartOfBasin = (pos) => {
  const [y, x] = pos;
  const currentValue = input[y][x];
  const newPartsOfBasin = getNeighbors(y, x).filter(
    (neighbor) => neighbor.value == currentValue + 1 && currentValue < 8,
  );
  return [
    newPartsOfBasin.flat(),
    newPartsOfBasin.map((newPart) => getPartOfBasin([newPart.y, newPart.x])).flat(),
  ].flat();
};

for (let y = 0; y < input.length; y++) {
  for (let x = 0; x < input[y].length; x++) {
    if (isLowPoint(y, x)) {
      lowPoints.push([y, x]);
      riskLevel += input[y][x] + 1;
    }
  }
}

const getBasin = (lowPoint) => {
  const uniqueBasins = {};
  const basinsWithDuplicates = getPartOfBasin(lowPoint);
  basinsWithDuplicates.forEach((basin) => (uniqueBasins[`${basin.y},${basin.x}`] = basin.value));
  console.log(uniqueBasins);
  return Object.keys(uniqueBasins).length + 1;
};

const basinSizes = lowPoints
  .map((lowPoint) => getBasin(lowPoint))
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce((prev, curr) => prev * curr);

console.log(riskLevel);
console.log(basinSizes);

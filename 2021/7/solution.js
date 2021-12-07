const fs = require("fs");
const input = fs.readFileSync("input.txt").toString().split(",");
const inputAsNumbers = input.map((numberAsString) => +numberAsString);

const getMedian = (list) => list.slice().sort((a, b) => a - b)[Math.floor(list.length / 2)];
const getFloor = (list) => Math.floor(list.reduce((prev, curr) => prev + curr) / list.length);
const getCeil = (list) => Math.ceil(list.reduce((prev, curr) => prev + curr) / list.length);

getShortest = (list) => list.map((number) => Math.abs(number - getMedian(list))).reduce((prev, curr) => prev + curr);
getShortestExponential = (list) => {
  const floor = getFloor(list);
  const ceil = getCeil(list);
  const avg = (floorOrCeil) =>
    list
      .map((number) => {
        const distance = Math.abs(number - floorOrCeil);
        return (distance * (distance + 1)) / 2;
      })
      .reduce((prev, curr) => prev + curr);

  return Math.min(avg(floor), avg(ceil));
};

const shortestLinear = getShortest(inputAsNumbers);
console.log(shortestLinear);

const shortestExponential = getShortestExponential(inputAsNumbers);
console.log(shortestExponential);

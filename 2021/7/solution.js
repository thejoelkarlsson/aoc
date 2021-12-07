const fs = require("fs");
const input = fs.readFileSync("input.txt").toString().split(",");
const inputAsNumbers = input.map((numberAsString) => +numberAsString);

const getMedian = (list) => list.slice().sort((a, b) => a - b)[Math.floor(list.length / 2)];
const getMean = (list) => Math.floor((list.reduce((prev, curr) => prev + curr) + 1) / list.length);

getShortest = (list) => list.map((number) => Math.abs(number - getMedian(list))).reduce((prev, curr) => prev + curr);
getShortestExponential = (list) =>
  list
    .map((number) => (Math.abs(number - getMean(list)) * (Math.abs(number - getMean(list)) + 1)) / 2)
    .reduce((prev, curr) => prev + curr);

const shortestLinear = getShortest(inputAsNumbers);
console.log(shortestLinear);

const shortestExponential = getShortestExponential(inputAsNumbers);
console.log(shortestExponential);

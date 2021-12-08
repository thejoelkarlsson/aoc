const fs = require("fs");
const input = fs.readFileSync("input.txt").toString().split("\n");

const correctLength = (length) => length === 2 || length === 3 || length === 4 || length === 7;

const counter = input
  .map((row) => {
    return row
      .split(" | ")[1]
      .split(" ")
      .filter((signal) => correctLength(signal.length)).length;
  })
  .reduce((prev, curr) => prev + curr);
console.log(counter);

// --------------
// --- PART 2 ---
// --------------

const symmetricDiff = (arr1, arr2) => [
  ...arr1.filter((a) => !arr2.includes(a)),
  ...arr2.filter((b) => !arr1.includes(b)),
];

const diff = (arr1, arr2) => arr1.filter((a) => !arr2.includes(a));

const decodeSignals = (signals) => {
  const knownNumbers = {};
  const segmentMapper = new Array(7).fill(null);
  const encodedSignals = signals.split(" ");
  encodedSignals.forEach((encodedSignal) => {
    if (encodedSignal.length == 2) {
      knownNumbers["1"] = encodedSignal;
    } else if (encodedSignal.length == 3) {
      knownNumbers["7"] = encodedSignal;
    } else if (encodedSignal.length == 7) {
      knownNumbers["8"] = encodedSignal;
    } else if (encodedSignal.length == 4) {
      knownNumbers["4"] = encodedSignal;
    }
  });

  const findNumberSix = (potential6) => {
    let [letter1, letter2] = knownNumbers[1].split("");
    return potential6.filter((pot) => !pot.split("").includes(letter1) || !pot.split("").includes(letter2))[0];
  };

  segmentMapper[0] = symmetricDiff(knownNumbers["7"].split(""), knownNumbers["1"].split(""));
  knownNumbers["6"] = findNumberSix(encodedSignals.filter((encodedSignal) => encodedSignal.length == 6));
  segmentMapper[2] = diff(knownNumbers["8"].split(""), knownNumbers["6"].split(""));
  segmentMapper[5] = diff(knownNumbers["1"].split(""), segmentMapper[2]);
  knownNumbers["5"] = encodedSignals
    .filter((encodedSignal) => encodedSignal.length == 5)
    .filter((encodedSignal) => !encodedSignal.split("").includes(segmentMapper[2][0]))[0];
  segmentMapper[4] = diff(knownNumbers["6"].split(""), knownNumbers["5"].split(""));
  knownNumbers["0"] = encodedSignals.filter(
    (encodedSignal) =>
      encodedSignal.length == 6 && diff(knownNumbers["5"].split(""), encodedSignal.split("")).length > 0,
  )[0];
  knownNumbers["9"] = encodedSignals.filter(
    (encodedSignal) =>
      encodedSignal.length == 6 && encodedSignal !== knownNumbers["6"] && encodedSignal !== knownNumbers["0"],
  )[0];
  knownNumbers["3"] = encodedSignals.filter(
    (encodedSignal) =>
      encodedSignal.length == 5 &&
      encodedSignal !== knownNumbers["5"] &&
      diff(encodedSignal.split(""), knownNumbers["9"].split("")).length === 0,
  )[0];
  knownNumbers["2"] = encodedSignals.filter(
    (encodedSignal) =>
      encodedSignal.length == 5 && encodedSignal !== knownNumbers["3"] && encodedSignal !== knownNumbers["5"],
  )[0];

  const decoder = {};
  Object.entries(knownNumbers).forEach(([key, value]) => (decoder[value.split("").sort().join("")] = key));
  return decoder;
};

const solveB = (rows) => {
  return rows.map((row) => solveRow(row)).reduce((prev, curr) => +prev + +curr);
};
const solveRow = (row) => {
  const [signals, digitString] = row.split(" | ");
  const decoder = decodeSignals(signals);
  const digits = digitString.split(" ").map((digit) => decoder[digit.split("").sort().join("")]);
  const sum = digits.reduce((prev, curr) => prev + curr);
  return sum;
};

const res = solveB(input);
console.log(res);

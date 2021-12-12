const fs = require("fs");
const input = fs
  .readFileSync("input.txt")
  .toString()
  .split("\n")
  .map((row) => row.split(""));

const chunkSiblings = { "(": ")", "[": "]", "{": "}", "<": ">" };
const closingPoints = { ")": 3, "]": 57, "}": 1197, ">": 25137 };
const autoCompletePoints = { ")": 1, "]": 2, "}": 3, ">": 4 };

let corruptionPoints = 0;
const autoCompleteRows = [];

const validateRow = (row) => {
  const openChunk = [];
  let corruptedLine = false;
  for (char of row) {
    if (chunkSiblings[char]) {
      openChunk.push(char);
    } else {
      if (char === chunkSiblings[openChunk.slice(-1)[0]]) {
        openChunk.pop();
      } else {
        corruptionPoints += closingPoints[char];
        corruptedLine = true;
        break;
      }
    }
  }

  if (!corruptedLine) {
    autoCompleteRows.push(
      openChunk
        .reverse()
        .map((char) => autoCompletePoints[chunkSiblings[char]])
        .reduce((prev, curr) => prev * 5 + curr, 0),
    );
  }
};

input.forEach((row) => validateRow(row));
console.log(corruptionPoints);
const middleAutcomplete = autoCompleteRows.sort((a, b) => a - b)[Math.round((autoCompleteRows.length - 1) / 2)];
console.log(middleAutcomplete);

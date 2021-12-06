const fs = require("fs");
const input = fs.readFileSync("input.txt").toString().split("\n");

indexSum = [];
input.forEach((row) => {
 row.split("").forEach((_, i) => {
  if (!indexSum[i]) indexSum[i] = 0;
  indexSum[i] += parseInt(row[i]);
 });
});

const gamma = indexSum
 .map((index) => (index >= input.length / 2 ? 1 : 0))
 .join("");
const epsilon = gamma
 .split("")
 .map((char) => (char == 1 ? 0 : 1))
 .join("");

const powerConsumption = parseInt(gamma, 2) * parseInt(epsilon, 2);
console.log(powerConsumption);

// ---------------------

const lifeSupport = (list, pos, isOxygen) => {
 let count = 0;
 let wantedNumber = 0;
 list.forEach((number) => (count += +number[pos]));

 if (count >= list.length / 2 && isOxygen) wantedNumber = 1;
 if (count < list.length / 2 && !isOxygen) wantedNumber = 1;

 const subList = list.filter((item) => item[pos] === `${wantedNumber}`);
 return subList.length > 1 ? lifeSupport(subList, pos + 1, isOxygen) : subList;
};

const oxygen = lifeSupport(input, 0, false);
const co2 = lifeSupport(input, 0, true);
const lifeSupportRating = parseInt(oxygen, 2) * parseInt(co2, 2);
console.log(lifeSupportRating);

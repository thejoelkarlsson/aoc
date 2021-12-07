const fs = require("fs");
const intialFish = fs.readFileSync("input.txt").toString().split(",");

const simulation = (fish, days) => {
  let fishByDaysLeft = new Array(9).fill(0);
  fish.forEach((f) => fishByDaysLeft[f - 1]++);

  for (let i = 1; i < days; i++) {
    let fishNewDay = new Array(9).fill(0);
    for (let j = 0; j <= 8; j++) {
      if (j == 0) {
        fishNewDay[8] = fishByDaysLeft[0];
      } else if (j == 7) {
        fishNewDay[j - 1] = fishByDaysLeft[j] + fishByDaysLeft[0];
      } else {
        fishNewDay[j - 1] = fishByDaysLeft[j];
      }
    }
    fishByDaysLeft = fishNewDay;
  }
  return fishByDaysLeft.reduce((prev, curr) => prev + curr);
};

const fishVolumeAfter80Days = simulation(intialFish, 80);
console.log(fishVolumeAfter80Days);

const fishVolumeAfter256Days = simulation(intialFish, 256);
console.log(fishVolumeAfter256Days);

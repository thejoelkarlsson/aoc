var fs = require("fs");
var input = fs
	.readFileSync("input.txt")
	.toString()
	.split("\n")
	.map((number) => parseInt(number));

let increaseCounter = 0;
for (i in input) {
	if (i > 0 && input[i] > input[i - 1]) {
		increaseCounter++;
	}
}
console.log(increaseCounter);

let slidingWindows = [];
let increasingSlidingWindowsCounter = 0;
for (let i = 0; i < input.length - 2; i++) {
	slidingWindows.push(input[i] + input[i + 1] + input[i + 2]);
}
for (i in slidingWindows) {
	if (i > 0 && slidingWindows[i] > slidingWindows[i - 1]) {
		increasingSlidingWindowsCounter++;
	}
}
console.log(increasingSlidingWindowsCounter);

const fs = require("fs");
const input = fs.readFileSync("input.txt").toString().split("\n");

const pilotPosition = (useAim = false) => {
	const pos = { x: 0, y: 0, aim: 0 };
	input.forEach((row, i) => {
		if (row.startsWith("forward")) {
			pos.x += +row.split(" ")?.[1];
			if (useAim) pos.y += +row.split(" ")?.[1] * pos.aim;
		} else if (row.startsWith("down")) {
			if (useAim) pos.aim += +row.split(" ")?.[1];
			else pos.y += +row.split(" ")?.[1];
		} else if (row.startsWith("up")) {
			if (useAim) pos.aim -= +row.split(" ")?.[1];
			else pos.y -= +row.split(" ")?.[1];
		}
	});

	return pos.x * pos.y;
};

console.log(pilotPosition());
console.log(pilotPosition(true));

const fs = require("fs");
const input = fs.readFileSync("input.txt").toString().split("\n");

class BingoNumber {
	constructor(number) {
		this.number = number;
		this.isDrawn = false;
	}
	setDrawn() {
		this.isDrawn = true;
	}
}

class Row {
	constructor(row) {
		this.row = row.split(/\s+/).map((number) => new BingoNumber(number));
		this.hasBingo = false;
	}

	getNumberAt(pos) {
		return this.row[pos];
	}

	drawNumber(number) {
		for (let bingoNumber of this.row) {
			if (bingoNumber.number === number) bingoNumber.setDrawn();
		}
		this.hasBingo = this.row.filter((number) => number.isDrawn).length === this.row.length;
	}

	getScore() {
		return this.row
			.filter((number) => !number.isDrawn)
			.map((number) => +number.number)
			.reduce((prev, curr) => prev + curr, 0);
	}
}

class Column {
	constructor(column) {
		this.column = column;
		this.hasBingo = false;
	}

	drawNumber(number) {
		for (let bingoNumber of this.column) {
			if (bingoNumber.number === number) bingoNumber.setDrawn();
		}
		this.hasBingo = this.column.filter((number) => number.isDrawn).length === this.column.length;
	}
}

class BingoBoard {
	constructor(bingoBoard) {
		this.hasBingo = false;
		this.score = 0;
		this.rows = bingoBoard.map((row) => new Row(row));
		let columns = [];
		for (let i = 0; i < 5; i++) {
			for (let j = 0; j < 5; j++) {
				if (!columns[j]) columns[j] = [];
				columns[j][i] = this.rows[i].getNumberAt(j);
			}
		}
		this.columns = columns.map((column) => new Column(column));
	}

	drawNumber(number) {
		[...this.rows, ...this.columns].forEach((rowOrColumn) => rowOrColumn.drawNumber(number));

		this.hasBingo = [...this.rows, ...this.columns].some((rowOrColumn) => rowOrColumn.hasBingo) > 0;

		this.score = [...this.rows.map((row) => row.getScore())].reduce((prev, curr) => prev + curr) * +number;
	}
}

class BingoSystem {
	constructor(bingoSystem) {
		let bingoBoards = [];
		for (let i = 0; i < bingoSystem.length; i += 6) {
			bingoBoards.push(new BingoBoard(bingoSystem.slice(i + 1, i + 6)));
		}
		this.bingoBoards = bingoBoards;
	}

	drawNumber(number) {
		this.bingoBoards.forEach((bingoBoard) => bingoBoard.drawNumber(number));
	}

	findWinner(drawOrder) {
		let i = 0;
		let winner = this.bingoBoards;
		let finalScore = 0;
		let number = 0;
		while (i < drawOrder.length && winner.length != 1) {
			number = drawOrder[i];
			this.drawNumber(number);
			winner = this.bingoBoards.filter((bingoBoard) => bingoBoard.hasBingo);
			i++;
		}

		finalScore = winner?.[0]?.score;

		return finalScore;
	}
}

const bingoSystem = new BingoSystem(input.slice(1));

const finalScore = bingoSystem.findWinner(input[0].split(","));

console.log(finalScore);

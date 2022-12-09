import { readFileSync } from "node:fs";
import { manhattanDistance } from "../utils.mjs";

const lines = readFileSync('input.txt', { encoding: 'utf-8' })
	.replace(/\r/g, "")
	.trim()
	.split('\n');

const parse = (lines) => {
	return lines.map(line => {
		const [dir, steps] = line.split(' ');
		return { dir, steps: +steps };
	});
};

const movement = {
	U: { x: 0, y: -1 },
	D: { x: 0, y: 1 },
	R: { x: 1, y: 0 },
	L: { x: -1, y: 0 },
};

class Position {
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}

	moveTowards(dir) {
		this.x += movement[dir].x;
		this.y += movement[dir].y;
	}

	follow(pos) {
		const dist = manhattanDistance(this, pos);
		if (dist <= 1) return;

		const deltaX = pos.x - this.x;
		const deltaY = pos.y - this.y;
		this.x += Math.abs(deltaX) === 1 ? deltaX : deltaX / 2;
		this.y += Math.abs(deltaY) === 1 ? deltaY : deltaY / 2;
	}
}

const part1 = () => {
	const commands = parse(lines);
	// console.debug(commands);
	const head = new Position();
	const tail = new Position();
	const visited = new Set();
	visited.add(tail.x + '|' + tail.y);

	for (let cmd of commands) {
		for (let i = 0; i < cmd.steps; i++) {
			head.moveTowards(cmd.dir);
			tail.follow(head);
			visited.add(tail.x + '|' + tail.y);
		}
	}
	console.debug(visited.size);
};

const part2 = () => {
	const commands = parse(lines);
	// console.debug(commands);
	const knots = new Array(10).fill(1).map(_x => new Position());
	const head = knots[0];
	const tail = knots.slice(-1)[0];
	const visited = new Set();
	visited.add(tail.x + '|' + tail.y);

	for (let cmd of commands) {
		for (let i = 0; i < cmd.steps; i++) {
			head.moveTowards(cmd.dir);
			for (let j = 1; j < knots.length; j++) {
				const knot = knots[j];
				const prevKnot = knots[j - 1];
				knot.follow(prevKnot);
			}
			visited.add(tail.x + '|' + tail.y);
		}
	}
	console.debug(visited.size);
};

part1();
part2();
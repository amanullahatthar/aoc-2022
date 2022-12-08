import { readFileSync } from "node:fs";
import { sum } from "../utils.mjs";

const lines = readFileSync('input.txt', { encoding: 'utf-8' })
	.replace(/\r/g, "")
	.trim()
	.split('\n');

const parse = () => {
	return {
		rows: lines.length,
		cols: lines[0].length,
		map: lines.map(line => [...line].map(Number))
	};
};

const isTreeVisibleFromTop = (row, col, treeGrid) => {
	if (row === 0) return 1;
	const tree = treeGrid.map[row][col];
	for (let i = 0; i < row; i++) {
		if (tree <= treeGrid.map[i][col]) return 0;
	}
	return 1;
};

const isTreeVisibleFromBottom = (row, col, treeGrid) => {
	if (row === treeGrid.rows - 1) return 1;
	const tree = treeGrid.map[row][col];
	for (let i = treeGrid.rows - 1; i > row; i--) {
		if (tree <= treeGrid.map[i][col]) return 0;
	}
	return 1;
};

const isTreeVisibleFromLeft = (col, treeRow) => {
	if (col === 0) return 1;
	const tree = treeRow[col];
	for (let i = 0; i < col; i++) {
		if (tree <= treeRow[i]) return 0;
	}
	return 1;
};

const isTreeVisibleFromRight = (col, treeRow) => {
	if (col === treeRow.length - 1) return 1;
	const tree = treeRow[col];
	for (let i = treeRow.length; i > col; i--) {
		if (tree <= treeRow[i]) return 0;
	}
	return 1;
};

const getVisibilityGrid = treeGrid => {
	const visibilityGrid = [];
	for (let i = 0; i < treeGrid.rows; i++) {
		const row = treeGrid.map[i];
		visibilityGrid[i] = [];
		for (let j = 0; j < treeGrid.cols; j++) {
			const visibleFromTop = isTreeVisibleFromTop(i, j, treeGrid);
			const visibleFromBottom = isTreeVisibleFromBottom(i, j, treeGrid);
			const visibleFromLeft = isTreeVisibleFromLeft(j, row);
			const visibleFromRight = isTreeVisibleFromRight(j, row);
			const visible = visibleFromTop || visibleFromBottom || visibleFromLeft || visibleFromRight;
			visibilityGrid[i][j] = visible;
		}
	}

	return visibilityGrid;
};

const part1 = () => {
	const treeGrid = parse(lines);
	// console.debug(treeGrid);
	const visibilityGrid = getVisibilityGrid(treeGrid);
	// console.debug(visibilityGrid);
	const visibleTreeCount = visibilityGrid.reduce((acc, row) => acc + sum(row), 0);
	console.log(visibleTreeCount);
};

const getScenicScoreTop = (row, col, treeGrid) => {
	if (row === 0) return 0;

	const tree = treeGrid.map[row][col];
	let count = 0;
	for (let i = row - 1; i >= 0; i--) {
		const t = treeGrid.map[i][col];
		count++;
		if (t >= tree) break;
	}
	return count;
};

const getScenicScoreBottom = (row, col, treeGrid) => {
	if (row === treeGrid.rows - 1) return 0;

	const tree = treeGrid.map[row][col];
	let count = 0;
	for (let i = row + 1; i < treeGrid.rows; i++) {
		const t = treeGrid.map[i][col];
		count++;
		if (t >= tree) break;
	}

	return count;
};

const getScenicScoreLeft = (col, treeRow) => {
	if (col === 0) return 0;

	const tree = treeRow[col];
	let count = 0;
	for (let i = col - 1; i >= 0; i--) {
		const t = treeRow[i];
		count++;
		if (t >= tree) break;
	}

	return count;
};

const getScenicScoreRight = (col, treeRow) => {
	if (col === treeRow.length - 1) return 0;

	const tree = treeRow[col];
	let count = 0;
	for (let i = col + 1; i < treeRow.length; i++) {
		const t = treeRow[i];
		count++;
		if (t >= tree) break;
	}

	return count;
};

const getScenicScoreGrid = treeGrid => {
	const scenicScoreGrid = [];
	for (let i = 0; i < treeGrid.rows; i++) {
		const row = treeGrid.map[i];
		scenicScoreGrid[i] = [];
		for (let j = 0; j < treeGrid.cols; j++) {
			const topScore = getScenicScoreTop(i, j, treeGrid);
			const bottomScore = getScenicScoreBottom(i, j, treeGrid);
			const leftScore = getScenicScoreLeft(j, row);
			const rightScore = getScenicScoreRight(j, row);
			const scenicScore = topScore * bottomScore * leftScore * rightScore;
			scenicScoreGrid[i][j] = scenicScore;
		}
	}

	return scenicScoreGrid;
};

const part2 = () => {
	const treeGrid = parse(lines);
	// console.debug(treeGrid);
	const scenicScoreGrid = getScenicScoreGrid(treeGrid);
	// console.debug(scenicScoreGrid);
	const scenicScores = [].concat(...scenicScoreGrid);
	console.log(Math.max(...scenicScores));

};

part1();
part2();
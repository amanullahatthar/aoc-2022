import { readFileSync } from "node:fs";
import { sum } from "../utils.mjs";

const data = readFileSync('input.txt', { encoding: 'utf-8' }).replace(/\r/g, "").trim();

const terminalLines = data.split('\n');
const dirSizes = [];

const fileSystem = {};
const parseFileSystem = terminalLines => {
	let cur = fileSystem;
	const stack = [cur];
	for (let i = 0; i < terminalLines.length; i++) {
		const line = terminalLines[i];
		if (line.startsWith('$')) {
			const [cmd, arg] = line.slice(2).split(' ');
			if (cmd === 'cd' && arg == '/') continue;
			else if (cmd === 'ls') {
				while (true && ((i + 1) < terminalLines.length)) {
					const nextLine = terminalLines[i + 1];
					if (nextLine.startsWith('$')) break;
					if (nextLine.startsWith('dir')) {
						const dirName = nextLine.split(' ')[1];
						cur[dirName] = {};
					} else {
						const [size, fileName] = nextLine.split(' ');
						cur[fileName] = size;
					}
					i++;
				}
			} else if (cmd === 'cd') {
				if (arg === '..') {
					cur = stack.pop();
					continue;
				}
				stack.push(cur);
				// stack.push(JSON.parse(JSON.stringify(cur)));
				cur = cur[arg];
			}
		}
	}

	return fileSystem;
};

const getDirSize = dir => {
	let total = 0;
	for (let name in dir) {
		if (typeof dir[name] !== 'object') {
			total += +dir[name];
			continue;
		}
		const dirTotal = getDirSize(dir[name]);
		total += dirTotal;
		dirSizes.push(dirTotal);
	}

	return total;
};

const part1 = () => {
	const fileSystem = parseFileSystem(terminalLines);
	// console.debug(fileSystem);
	// console.debug(JSON.stringify(fileSystem));
	const totalSize = getDirSize(fileSystem);
	// console.debug(total, dirSizes);
	const reqDirSizes = dirSizes.filter(size => size < 100000);
	// console.debug(reqDirSizes);
	console.log(sum(reqDirSizes));
};

const part2 = () => {
	const fileSystem = parseFileSystem(terminalLines);
	const totalSize = getDirSize(fileSystem);
	const sortedSizes = dirSizes.sort((a, b) => a - b);
	// console.debug(sortedSizes);
	const totalDiskSize = 70000000;
	const neededSpace = 30000000;
	const unusedSpace = totalDiskSize - totalSize;
	const extraSpaceNeeded = neededSpace - unusedSpace;
	const dirSizeToDelete = sortedSizes.find(size => size >= extraSpaceNeeded);
	console.log(dirSizeToDelete);
};

part1();
part2();
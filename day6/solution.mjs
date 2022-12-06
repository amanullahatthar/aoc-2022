import { readFileSync } from "node:fs";

const data = readFileSync('input.txt', { encoding: 'utf-8' }).replace(/\r/g, "").trim();

const buffer = data.split``;

const getFirstStartOfMarker = (buffer, markerLength) => {
	let i = 0;
	for (i = 0; i < buffer.length; i++) {
		const packet = buffer.slice(i, i + markerLength);
		const uniquePacket = new Set(packet);
		// console.debug(packet, new Array(...uniquePacket));
		if (packet.length === uniquePacket.size) break;
	}

	return i + markerLength;
};

const part1 = () => {
	console.log(getFirstStartOfMarker(buffer, 4));
};


const part2 = () => {
	console.log(getFirstStartOfMarker(buffer, 14));
};

part1();
part2();
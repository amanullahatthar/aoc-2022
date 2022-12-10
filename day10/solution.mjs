import { readFileSync } from "node:fs";
import { sum } from "../utils.mjs";

const lines = readFileSync("input.txt", { encoding: "utf-8" })
    .replace(/\r/g, "")
    .trim()
    .split("\n");

const parse = (lines) => {
    return lines.map((line) => {
        const [cmd, value] = line.split(" ");
        return { cmd, val: +value };
    });
};

class CPU {
    constructor(maxCycles) {
        this.cycles = 0;
        this.x = 1;
        this.q = [];

        this.timer = 0;
        this.crt = new Array(maxCycles).fill(".");
    }

    tick(cmdObj) {
        this.cycles++;
        if (cmdObj) {
            const { cmd, val } = cmdObj;
            this.timer = cmd === "noop" ? 1 : 2;
            !isNaN(val) && this.q.push(val);
        }
        this.timer = Math.max(0, this.timer - 1);
    }

    update() {
        if (this.timer === 0) this.x += this.q.length > 0 ? this.q.shift() : 0;
    }

    draw(cmdObj) {
        this.tick(cmdObj);
        const spriteStartIndex = this.x - 1;
        const spriteEndIndex = this.x + 1;
        const pixelPosition = (this.cycles - 1) % 40;
        const pixelInTheSprite =
            pixelPosition >= spriteStartIndex &&
            pixelPosition <= spriteEndIndex;
        if (pixelInTheSprite) this.crt[this.cycles - 1] = "#";
        // Update should happen after the cycle ends
        this.update();
    }
}

const part1 = () => {
    const commands = parse(lines);
    // console.debug(commands);
    const maxCycles = 220;
    const cpu = new CPU(maxCycles);
    const cycleData = [];
    for (let i = 1; i <= maxCycles; i++) {
        const cmdObj = cpu.timer === 0 ? commands.shift() : null;
        cpu.tick(cmdObj);
        // Update should happen after the cycle ends
        cpu.update();
        cycleData.push({ cycle: cpu.cycles, x: cpu.x });
    }
    const requiredCycles = [20, 60, 100, 140, 180, 220];
    const reqCycleData = cycleData.filter((cd) =>
        requiredCycles.includes(cd.cycle + 1)
    );
    const signalStrengths = reqCycleData.map(
        (data) => (data.cycle + 1) * data.x
    );
    console.log(sum(signalStrengths));
};

const part2 = () => {
    const commands = parse(lines);
    const maxCycles = 240;
    const cpu = new CPU(maxCycles);
    for (let i = 1; i <= maxCycles; i++) {
        const cmdObj = cpu.timer === 0 ? commands.shift() : null;
        cpu.draw(cmdObj);
    }
    const crt = [0, 1, 2, 3, 4, 5].map((i) =>
        cpu.crt.slice(i * 40, (i + 1) * 40).join("")
    );
    console.debug(crt);
};

part1();
part2();

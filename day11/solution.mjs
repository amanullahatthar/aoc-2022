import { readFileSync } from "node:fs";

const lines = readFileSync("input.txt", { encoding: "utf-8" })
    .replace(/\r/g, "")
    .trim()
    .split("\n\n");

const parse = (lines) => {
    return lines.map((line) => {
        const monkeyLines = line.split("\n");
        const [
            idInfo,
            itemsInfo,
            operationInfo,
            testInfo,
            trueInfo,
            falseInfo,
        ] = monkeyLines;
        const idResult = /^Monkey (?<id>\d)+:$/g.exec(idInfo.trim());
        const itemResult = /^Starting items: (?<nums>[\d\, ]+)+$/g.exec(
            itemsInfo.trim()
        );
        const operationResult =
            /^Operation: new = (?<op>\w+ [\*\+]{1} \w+)+$/g.exec(
                operationInfo.trim()
            );
        const testResult = /^Test: divisible by (?<divisibleBy>\d+)$/g.exec(
            testInfo.trim()
        );
        const trueResult = /^If true: throw to monkey (?<m1>\d+)$/g.exec(
            trueInfo.trim()
        );
        const falseResult = /^If false: throw to monkey (?<m2>\d+)$/g.exec(
            falseInfo.trim()
        );

        const id = idResult.groups.id;
        const items = itemResult.groups.nums
            .replace(" ", "")
            .split(",")
            .map((item) => ({
                worry: +item,
            }));
        const operation = operationResult.groups.op;
        const divideBy = +testResult.groups.divisibleBy;
        const throwTo = [+trueResult.groups.m1, +falseResult.groups.m2];

        return new Monkey(id, items, operation, divideBy, throwTo);
    });
};

class Monkey {
    constructor(id, items, operation, divideBy, throwTo) {
        this.id = id;
        this.items = items;
        this.operation = operation;
        this.divideBy = divideBy;
        this.throwTo = throwTo;
        this.inspections = 0;
    }

    inspect(worryIsManageable) {
        for (const item of this.items) {
            const opString = this.operation.replace(/old/g, item.worry);
            // Given divisibility numbers in the input
            // Proper way is to get these from the parsed input directly
            const primeProduct = 2 * 3 * 5 * 7 * 11 * 13 * 17 * 19;
            const increasedWorry = eval(opString);
            item.worry = worryIsManageable
                ? Math.floor(increasedWorry / 3)
                : increasedWorry % primeProduct;
            item.throwTo =
                item.worry % this.divideBy === 0
                    ? this.throwTo[0]
                    : this.throwTo[1];
            this.inspections++;
        }
    }
}

class Game {
    constructor(monkeys) {
        this.monkeys = monkeys;
        this.round = 0;
    }

    play(worryIsManageable = true) {
        for (const m of this.monkeys) {
            m.inspect(worryIsManageable);
            this.throw([...m.items]);
            m.items = [];
        }
        this.round++;
    }

    throw(items) {
        for (const item of items) {
            const targetMonkey = this.monkeys[item.throwTo];
            targetMonkey.items.push({ worry: item.worry });
        }
    }
}

const part1 = () => {
    const monkeys = parse(lines);
    const game = new Game(monkeys);
    const MAX_ROUNDS = 20;
    while (game.round < MAX_ROUNDS) {
        game.play();
    }
    const inspections = game.monkeys.map((m) => m.inspections);
    const sortedInspections = inspections.sort((i1, i2) => i2 - i1);
    console.log(sortedInspections[0] * sortedInspections[1]);
};

const part2 = () => {
    const monkeys = parse(lines);
    const game = new Game(monkeys);
    const MAX_ROUNDS = 10000;
    while (game.round < MAX_ROUNDS) {
        game.play(false);
    }
    const inspections = game.monkeys.map((m) => m.inspections);
    // console.debug(inspections);
    const sortedInspections = inspections.sort((i1, i2) => i2 - i1);
    console.log(sortedInspections[0] * sortedInspections[1]);
};

part1();
part2();

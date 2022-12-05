import { readFileSync } from "node:fs";

const data = readFileSync('input.txt', { encoding: 'utf-8' }).replace(/\r/g, "");

const [stackInfo, instructionInfo] = data.split('\n\n');

const prepareStacks = () => {
  const stacks = [];
  const stackLines = stackInfo.split('\n');
  for (let i = 0; i < stackLines.length; i++) {
    const line = stackLines[i];
    if (line.match(/[0-9]/g)) continue;
    for (let j = 0; j < line.length; j += 4) {
      // console.debug(j, j + 3, line.slice(j, j + 3));
      const crate = line.slice(j, j + 3);
      if (!crate.trim()) continue;
      const stackIndex = Math.floor(j / 4);
      let stack = stacks[stackIndex];
      if (!stack) stack = [];
      stack.unshift(crate[1]); // Iterating from top, so unshift instead of push
      stacks[stackIndex] = stack;
    }
  }
  return stacks;
};

const getTopCrates = stacks => {
  let answer = '';
  stacks.map(stack => {
    answer += stack.pop();
  });

  return answer;
};

const part1 = () => {
  const stacks = prepareStacks(stackInfo);
  const regex = /(\d{1,})/ig;
  instructionInfo.split('\n').forEach(instruction => {
    // console.debug(instruction, '||', instruction.match(regex))
    const [qty, from, to] = instruction.match(regex).map(Number);
    const fromStack = stacks[from - 1];
    const toStack = stacks[to - 1];
    for (let i = 1; i <= qty; i++) {
      const crate = fromStack.pop();
      toStack.push(crate);
    }
  });
  console.debug(stacks);

  const answer = getTopCrates(stacks);

  console.log(answer);
};


const part2 = () => {
  const stacks = prepareStacks(stackInfo);
  const regex = /(\d{1,})/ig;
  instructionInfo.split('\n').forEach(instruction => {
    // console.debug(instruction, '||', instruction.match(regex))
    const [qty, from, to] = instruction.match(regex).map(Number);
    const fromStack = stacks[from - 1];
    const toStack = stacks[to - 1];
    const crates = fromStack.splice(fromStack.length - qty);
    toStack.push(...crates);
  });
  console.debug(stacks);

  const answer = getTopCrates(stacks);

  console.log(answer);
};

part1();
part2();
import { readFileSync } from "node:fs";

const data = readFileSync('input.txt', { encoding: 'utf-8' }).replace(/\r/g, "").trim();

let calories = data.split('\n\n');
calories = calories.map(c => c.split('\n').map(Number).reduce((a, b) => a + b, 0));
console.log(Math.max(...calories));

calories.sort((a, b) => b - a);
calories = calories.slice(0, 3);
console.log(calories.reduce((a, b) => a + b, 0));
import { readFileSync } from "node:fs";

const data = readFileSync('input.txt', { encoding: 'utf-8' }).replace(/\r/g, "").trim();

const rpsWin = { 'X': 'C', 'Y': 'A', 'Z': 'B' };
const points = ['X', 'Y', 'Z'];
const trans = { 'A': 'X', 'B': 'Y', 'C': 'Z' };

const games = data.split('\n');

// Part 1
let score = 0;
games.forEach(game => {
  const [op, me] = game.split` `;
  score += points.indexOf(me) + 1;
  if (trans[op] === me) score += 3;
  else if (rpsWin[me] === op) score += 6;
});
console.log(score);

// Part 2
score = 0;
const newPoints = { 'X': 0, 'Y': 3, 'Z': 6 };
const rpsOtherWin = { 'A': 'Z', 'B': 'X', 'C': 'Y' };
const win = { 'A': 'Y', 'B': 'Z', 'C': 'X' };
games.forEach(game => {
  const [op, me] = game.split` `;
  const myScore = newPoints[me];
  score += myScore;
  const obj = myScore === 6 ? win : myScore === 3 ? trans : rpsOtherWin;
  const actualMe = obj[op];
  score += points.indexOf(actualMe) + 1;
});
console.log(score);

import { readFileSync } from "node:fs";
import { sum } from '../utils.mjs';

const data = readFileSync('input.txt', { encoding: 'utf-8' }).replace(/\r/g, "").trim();

const rucksacks = data.split('\n');

const getScore = char => {
  const score = char.charCodeAt(0)
  return char === char.toLowerCase() ? score - 96 : score - 65 + 27;
}

//Part 1
const scores = rucksacks.map(rs => {
  const mid = rs.length / 2;
  const c1 = rs.slice(0, mid).split``;
  const c2 = rs.slice(mid).split``;
  // console.debug(c1, c2)
  const duplicateItem = c1.filter(item => c2.indexOf(item) > -1)[0];
  return getScore(duplicateItem);
});

console.log(sum(scores));

// Part 2
const groups = rucksacks.reduce((acc, rs, idx) => {
  const groupIndex = Math.floor(idx / 3);
  const group = acc[groupIndex];
  if (!group) return [...acc, [rs]];
  group.push(rs);
  acc[groupIndex] = group;

  return [...acc];
}, []);

const commonItems = groups.map(group => {
  const [rs1, rs2, rs3] = group;
  const commonItem = rs1.split``.filter(item => rs2.indexOf(item) > -1 && rs3.indexOf(item) > -1)[0];
  return getScore(commonItem);
});

console.debug(sum(commonItems));

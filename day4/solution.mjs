import { readFileSync } from "node:fs";

const data = readFileSync('input.txt', { encoding: 'utf-8' }).replace(/\r/g, "").trim();

const assignmentPairs = data.split('\n');

const fullyContains = (section1, section2) => {
  const [a1, b1] = section1.split('-').map(Number);
  const [a2, b2] = section2.split('-').map(Number);
  return (a1 <= a2 && b1 >= b2);
};

const part1 = () => {
  const fullyContainingPairs = assignmentPairs.filter(pair => {
    const [section1, section2] = pair.split(',');
    return fullyContains(section1, section2) || fullyContains(section2, section1);
  });
  console.log(fullyContainingPairs.length);
};

const doesOverlap = (section1, section2) => {
  const [a1, b1] = section1.split('-').map(Number);
  const [a2, b2] = section2.split('-').map(Number);
  return !((a1 < a2 && b1 < a2) || (a1 > b2 && b1 > b2));
};

const part2 = () => {
  const overlappingPairs = assignmentPairs.filter(pair => {
    const [section1, section2] = pair.split(',');
    // console.debug(section1, section2, doesOverlap(section1, section2));
    return doesOverlap(section1, section2) || doesOverlap(section2, section1);
  });
  console.log(overlappingPairs.length);
};

part1();
part2();
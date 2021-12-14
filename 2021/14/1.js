import { solution, splitLines } from '../utils.js';

await solution(
  import.meta.url,
  `

NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C

  `,
  '1588',
  splitLines,
  (lines) => {
    const [tpl, _, ...ruleStrs] = lines;
    const rules = new Map(ruleStrs.map((str) => str.split(' -> ')));
    let polymer = tpl;
    for (let step = 0; step < 10; step++) {
      const pairs = polymer
        .split('')
        .map((_, i, arr) => (i === 0 ? undefined : arr[i - 1] + arr[i]))
        .filter((str) => str !== undefined);
      const newPolymer = pairs
        .map((pair, j, arr) => {
          if (j === arr.length - 1) {
            return `${pair[0]}${rules.get(pair)}${pair[1]}`;
          } else {
            return `${pair[0]}${rules.get(pair)}`;
          }
        })
        .join('');
      polymer = newPolymer;
    }
    const counts = new Map();
    polymer.split('').forEach((char) => {
      if (!counts.has(char)) {
        counts.set(char, 0);
      }
      counts.set(char, counts.get(char) + 1);
    });
    const sorted = [...counts.values()].sort((a, b) => a - b);
    return sorted[sorted.length - 1] - sorted[0];
  },
);

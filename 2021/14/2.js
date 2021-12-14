import { memoize } from 'lodash-es';
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
  '2188189693529',
  splitLines,
  (lines) => {
    const [tpl, _, ...ruleStrs] = lines;
    const rules = new Map(ruleStrs.map((str) => str.split(' -> ')));
    const pairs = tpl
      .split('')
      .map((_, i, arr) => (i === 0 ? undefined : arr[i - 1] + arr[i]))
      .filter((str) => str !== undefined);

    function sumMaps(...maps) {
      const [a, ...others] = maps;
      const newMap = new Map(a);
      others.forEach((b) => {
        [...b.entries()].forEach(([k, v]) => {
          newMap.set(k, v + (newMap.get(k) || 0));
        });
      });
      return newMap;
    }

    const getCountsOfInsertedChildren = memoize(
      (pair, level) => {
        if (level === 40) {
          return new Map();
        }
        const next = rules.get(pair);
        return sumMaps(
          new Map([[next, 1]]),
          getCountsOfInsertedChildren(pair[0] + next, level + 1),
          getCountsOfInsertedChildren(next + pair[1], level + 1),
        );
      },
      (pair, level) => `${pair}:${level}`,
    );

    const totalCounts = sumMaps(
      tpl.split('').reduce((counts, char) => {
        if (!counts.has(char)) {
          counts.set(char, 0);
        }
        counts.set(char, counts.get(char) + 1);
        return counts;
      }, new Map()),
      ...pairs.map((pair) => getCountsOfInsertedChildren(pair, 0)),
    );
    const sorted = [...totalCounts.values()].sort((a, b) => a - b);
    return sorted[sorted.length - 1] - sorted[0];
  },
);

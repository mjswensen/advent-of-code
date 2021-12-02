import { parseIntegers, splitLines, solution } from '../../utils.mjs';

solution(
  import.meta.url,
  `
14
1969
100756
  `,
  '51314',
  splitLines,
  parseIntegers,
  (lines) => {
    return lines.reduce((acc, line) => {
      let toAdd = 0;
      let fuel = Math.floor(line / 3) - 2;
      while (fuel > 0) {
        toAdd += fuel;
        fuel = Math.floor(fuel / 3) - 2;
      }
      return acc + toAdd;
    }, 0);
  },
);

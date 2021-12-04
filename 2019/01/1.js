import { parseIntegers, splitLines, solution } from '../../utils.js';

solution(
  import.meta.url,
  `
12
14
1969
100756
  `,
  '34241',
  splitLines,
  parseIntegers,
  (lines) => lines.reduce((acc, line) => acc + (Math.floor(line / 3) - 2), 0),
);
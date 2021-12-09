import { solution, splitLines } from '../../utils.js';

await solution(
  import.meta.url,
  `

2199943210
3987894921
9856789892
8767896789
9899965678

  `,
  '15',
  splitLines,
  (lines) => {
    const lowPoints = [];
    lines.forEach((line, i) => {
      line.split('').forEach((num, j) => {
        const adj = [
          j > 0 ? +line[j - 1] : null,
          j < line.length - 1 ? +line[j + 1] : null,
          i > 0 ? +lines[i - 1][j] : null,
          i < lines.length - 1 ? +lines[i + 1][j] : null,
        ].filter((num) => num !== null);
        if (adj.every((n) => n > +num)) {
          lowPoints.push(+num);
        }
      });
    });
    return lowPoints.reduce((total, num) => total + num + 1, 0);
  },
);

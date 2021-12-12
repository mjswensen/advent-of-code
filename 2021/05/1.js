import { solution, splitLines } from '../utils.js';
import { range } from 'lodash-es';

solution(
  import.meta.url,
  `

0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2

  `,
  '5',
  splitLines,
  (lines) => {
    const seen = new Map();
    function add(x, y) {
      const key = `${x},${y}`;
      if (!seen.has(key)) {
        seen.set(key, 0);
      }
      seen.set(key, seen.get(key) + 1);
    }
    for (const line of lines) {
      const [ss, es] = line.split(' -> ');
      const [sx, sy] = ss.split(',').map(Number);
      const [ex, ey] = es.split(',').map(Number);
      if (sx === ex) {
        range(Math.min(sy, ey), Math.max(sy, ey) + 1, 1).forEach((y) => {
          add(sx, y);
        });
      }
      if (sy === ey) {
        range(Math.min(sx, ex), Math.max(sx, ex) + 1, 1).forEach((x) => {
          add(x, sy);
        });
      }
    }
    return [...seen.values()].filter((count) => count >= 2).length;
  },
);

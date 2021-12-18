import { memoize } from 'lodash-es';
import { parseIndividualIntegers, solution, splitLines } from '../utils.js';

await solution(
  import.meta.url,
  `

1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581

  `,
  '40',
  splitLines,
  parseIndividualIntegers,
  (rows) => {
    const directions = [
      { x: -1, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: -1 },
      { x: 0, y: 1 },
    ];
    const size = rows.length;
    const lowestTotalRisk = memoize(
      (x, y, history) => {
        if (x === 0 && y === 0) {
          return 0;
        }
        if (history.length > size * 2) return Infinity; // Assumption: the least total risk path doesn't wander at all. This wasn't explicit in the description but turns out to be true.
        const risk = rows[y][x];
        const nextOptions = directions
          .map(({ x: dx, y: dy }) => ({ x: x + dx, y: y + dy }))
          .filter(({ x, y }) => !(y < 0 || y >= size || x < 0 || x >= size))
          .filter(
            ({ x, y }) =>
              !history.find(({ x: hx, y: hy }) => x === hx && y === hy),
          );
        return (
          risk +
          Math.min(
            ...nextOptions.map((next) =>
              lowestTotalRisk(next.x, next.y, [{ x, y }, ...history]),
            ),
          )
        );
      },
      (x, y, history) => `${x}:${y}:${history.length}`,
    );

    return lowestTotalRisk(size - 1, size - 1, []);
  },
);

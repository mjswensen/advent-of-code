import { clone, memoize } from 'lodash-es';
import { parseIndividualIntegers, solution, splitLines } from '../utils.js';
import heapq from 'heapq';

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
  '315',
  splitLines,
  parseIndividualIntegers,
  (rows) => {
    const outerRow = Array(5)
      .fill(undefined)
      .map(() => clone(rows));
    const outerRows = Array(5)
      .fill(undefined)
      .map(() => clone(outerRow));
    const fullMap = outerRows.map((outerRow, i) =>
      outerRow.map((rows, j) =>
        rows.map((row) =>
          row.map((cell) => {
            const newValue = cell + i + j;
            return newValue > 9 ? newValue - 9 : newValue;
          }),
        ),
      ),
    );
    const finalMap = Array(rows.length * 5)
      .fill(undefined)
      .map(() => []);
    fullMap.forEach((outerRow, i) => {
      outerRow.forEach((rows, j) => {
        rows.forEach((row, k) => {
          finalMap[i * rows.length + k].push(...row);
        });
      });
    });
    return finalMap;
  },
  (rows) => {
    const directions = [
      { x: -1, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: -1 },
      { x: 0, y: 1 },
    ];
    const heap = [];
    const comparator = (a, b) => a.total < b.total;

    const maxIdx = rows.length - 1;
    const push = (item) => heapq.push(heap, item, comparator);
    const pop = () => heapq.pop(heap, comparator);

    push({ x: 0, y: 0, total: 0 });
    const visited = new Set();
    const getKey = (x, y) => `${x}:${y}`;

    while (true) {
      const { x, y, total } = pop();
      if (x === maxIdx && y === maxIdx) {
        return total;
      }
      const key = getKey(x, y);
      if (visited.has(key)) {
        continue;
      }
      visited.add(key);
      directions
        .map(({ x: dx, y: dy }) => ({
          x: x + dx,
          y: y + dy,
        }))
        .filter(({ x, y }) => !(x < 0 || x > maxIdx || y < 0 || y > maxIdx))
        .forEach(({ x, y }) => {
          push({ x, y, total: total + rows[y][x] });
        });
    }
  },
);

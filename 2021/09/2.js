import { solution, splitLines } from '../utils.js';

await solution(
  import.meta.url,
  `

2199943210
3987894921
9856789892
8767896789
9899965678

  `,
  '1134',
  splitLines,
  (lines) => {
    const visited = new Set();
    const sizes = [];
    const arr = lines.map((line) => line.split('').map((s) => +s));
    function getKey(i, j) {
      return `${i}:${j}`;
    }
    function getSize(i, j) {
      if (i < 0 || i > arr.length - 1) return 0;
      if (j < 0 || j > arr[i].length - 1) return 0;
      if (arr[i][j] === 9) return 0;
      const key = getKey(i, j);
      if (visited.has(key)) return 0;
      visited.add(key);
      return (
        getSize(i, j + 1) +
        getSize(i, j - 1) +
        getSize(i - 1, j) +
        getSize(i + 1, j) +
        1
      );
    }
    arr.forEach((row, i) => {
      row.forEach((cell, j) => {
        sizes.push(getSize(i, j));
      });
    });
    sizes.sort((a, b) => a - b).reverse();
    return sizes[0] * sizes[1] * sizes[2];
  },
);

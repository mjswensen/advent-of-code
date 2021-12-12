import { parseIndividualIntegers, solution, splitLines } from '../../utils.js';

await solution(
  import.meta.url,
  `

5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526

  `,
  '1656',
  splitLines,
  parseIndividualIntegers,
  (lines) => {
    let state = lines;
    let totalFlashes = 0;
    function propagate(arr, flashed) {
      let found = false;
      rowLoop: for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
          if (arr[i][j] > 9 && !flashed.has(`${i}:${j}`)) {
            [
              [i - 1, j - 1],
              [i - 1, j],
              [i - 1, j + 1],
              [i, j - 1],
              [i, j],
              [i, j + 1],
              [i + 1, j - 1],
              [i + 1, j],
              [i + 1, j + 1],
            ].forEach(([row, col]) => {
              if (arr[row] !== undefined && arr[row][col] !== undefined) {
                arr[row][col]++;
              }
            });
            flashed.add(`${i}:${j}`);
            found = true;
            break rowLoop;
          }
        }
      }
      if (found) {
        return propagate(arr, flashed);
      } else {
        return arr;
      }
    }
    for (let i = 1; i <= 100; i++) {
      state = state.map((line) => line.map((cell) => cell + 1));
      const flashed = new Set();
      propagate(state, flashed);
      for (let i = 0; i < state.length; i++) {
        for (let j = 0; j < state[i].length; j++) {
          if (state[i][j] > 9) {
            totalFlashes++;
            state[i][j] = 0;
          }
        }
      }
    }
    return totalFlashes;
  },
);

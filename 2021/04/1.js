import { solution } from '../../utils.js';
import { zip } from 'lodash-es';

function getSolutionSets(board) {
  const rows = board
    .split('\n')
    .map((row) => row.split(' ').filter((cell) => !!cell));
  const columns = zip(...rows);
  return [...rows, ...columns];
}

function getAllCells(board) {
  return board
    .split('\n')
    .reduce(
      (cells, row) => [...cells, ...row.split(' ').filter((cell) => !!cell)],
      [],
    );
}

function isSubset(outer, inner) {
  return inner.every((cell) => outer.includes(cell));
}

solution(
  import.meta.url,
  `

7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7

  `,
  '4512',
  (input) => {
    const [call, ...boards] = input.split('\n\n');
    const numbers = call.split(',');
    for (let i = 5; i < numbers.length; i++) {
      const progress = numbers.slice(0, i);
      const winner = boards.find((board) => {
        return getSolutionSets(board).some((set) => isSubset(progress, set));
      });
      if (winner) {
        const cells = getAllCells(winner);
        const sumUnmarked = cells
          .filter((cell) => !progress.includes(cell))
          .reduce((sum, cell) => sum + parseInt(cell, 10), 0);
        return sumUnmarked * Number(progress[progress.length - 1]);
      }
    }
  },
);

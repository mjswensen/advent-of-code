import { solution, splitLines } from '../utils.js';

await solution(
  import.meta.url,
  `

6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5

  `,
  `
#####
#...#
#...#
#...#
#####
  `,
  splitLines,
  (lines) => {
    function otherAxis(axis) {
      return axis === 'x' ? 'y' : 'x';
    }
    const idx = lines.indexOf('');
    const coordinates = lines.slice(0, idx).map((str) => {
      const [x, y] = str.split(',').map(Number);
      return { x, y };
    });
    const instructions = lines.slice(idx + 1).map((str) => {
      const [axis, value] = str.replace('fold along ', '').split('=');
      return { axis, value: +value };
    });
    const newCoordinates = instructions.reduce(
      (coordinates, instruction) =>
        coordinates.map((coordinate) => {
          if (coordinate[instruction.axis] > instruction.value) {
            return {
              ...coordinate,
              [instruction.axis]:
                instruction.value -
                (coordinate[instruction.axis] - instruction.value),
            };
          } else {
            return coordinate;
          }
        }),
      coordinates,
    );
    const maxX = Math.max(...newCoordinates.map(({ x }) => x));
    const maxY = Math.max(...newCoordinates.map(({ y }) => y));
    const space = new Array(maxY + 1)
      .fill(0)
      .map(() => new Array(maxX + 1).fill('.'));
    newCoordinates.forEach(({ x, y }) => {
      space[y][x] = '#';
    });
    return space.map((line) => line.join('')).join('\n');
  },
);

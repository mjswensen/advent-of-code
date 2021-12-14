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
  '17',
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
    const [firstInstruction] = instructions;
    const newCoordinates = coordinates.map((coordinate) => {
      if (coordinate[firstInstruction.axis] > firstInstruction.value) {
        return {
          ...coordinate,
          [firstInstruction.axis]:
            firstInstruction.value -
            (coordinate[firstInstruction.axis] - firstInstruction.value),
        };
      } else {
        return coordinate;
      }
    });
    const points = new Set(newCoordinates.map(({ x, y }) => `${x}:${y}`));
    return points.size;
  },
);

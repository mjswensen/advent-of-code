import { solution } from '../utils.js';

await solution(
  import.meta.url,
  `

target area: x=20..30, y=-10..-5

  `,
  '45',
  (input) => {
    const [_, xRange, yRange] = /x=(.+), y=(.+)/.exec(input);
    const [yMin, yMax] = yRange.split('..').map(Number);
    let height = 0;
    for (let i = 0 - yMin - 1; i >= 0; i--) {
      height += i;
    }
    return height;
  },
);

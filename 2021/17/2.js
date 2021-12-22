import { solution } from '../utils.js';

await solution(
  import.meta.url,
  `

target area: x=20..30, y=-10..-5

  `,
  '112',
  (input) => {
    const [_, xRange, yRange] = /x=(.+), y=(.+)/.exec(input);
    const [yMin, yMax] = yRange.split('..').map(Number);
    const [xMin, xMax] = xRange.split('..').map(Number);

    const hits = new Set();
    const hitKey = (x, y) => `${x}:${y}`;

    function inTarget(x, y) {
      return x >= xMin && x <= xMax && y >= yMin && y <= yMax;
    }

    function outOfBounds(x, y) {
      return x > xMax || y < yMin;
    }

    for (let x = 0; x <= xMax; x++) {
      for (let y = 500; y >= yMin; y--) {
        let currentX = 0;
        let currentY = 0;
        let currentXVelocity = x;
        let currentYVelocity = y;
        while (true) {
          currentX += currentXVelocity;
          currentY += currentYVelocity;
          if (inTarget(currentX, currentY)) {
            hits.add(hitKey(x, y));
            break;
          }
          if (outOfBounds(currentX, currentY)) {
            break;
          }
          currentXVelocity = Math.max(currentXVelocity - 1, 0);
          currentYVelocity--;
        }
      }
    }
    return hits.size;
  },
);

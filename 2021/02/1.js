import { splitLines, solution } from '../utils.js';

solution(
  import.meta.url,
  `

forward 5
down 5
forward 8
up 3
down 8
forward 2


  `,
  '150',
  splitLines,
  (lines) => {
    const pos = lines.reduce(
      ({ h, d }, line) => {
        const [command, dist] = line.split(' ');
        const parsedDist = parseInt(dist, 10);
        switch (command) {
          case 'forward':
            return { h: h + parsedDist, d };
          case 'down':
            return { h, d: d + parsedDist };
          case 'up':
            return {
              h,
              d: d - parsedDist,
            };
        }
      },
      { h: 0, d: 0 },
    );
    return pos.h * pos.d;
  },
);

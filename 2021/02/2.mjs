import { splitLines, solution } from '../../utils.mjs';

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
  '900',
  splitLines,
  (lines) => {
    const pos = lines.reduce(
      ({ h, d, a }, line) => {
        const [command, dist] = line.split(' ');
        const parsedDist = parseInt(dist, 10);
        switch (command) {
          case 'forward':
            return { h: h + parsedDist, d: d + a * parsedDist, a };
          case 'down':
            return { h, d, a: a + parsedDist };
          case 'up':
            return { h, d, a: a - parsedDist };
        }
      },
      { h: 0, d: 0, a: 0 },
    );
    return pos.h * pos.d;
  },
);

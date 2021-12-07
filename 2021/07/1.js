import { solution } from '../../utils.js';

await solution(
  import.meta.url,
  `

16,1,2,0,4,2,7,1,2,14

  `,
  '37',
  (input) => {
    const positions = input.split(',').map(Number);
    const best = positions.sort((a, b) => a - b)[
      Math.round(positions.length / 2)
    ];
    return positions.reduce((total, pos) => total + Math.abs(pos - best), 0);
  },
);

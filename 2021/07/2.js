import { range } from 'lodash-es';
import { solution } from '../../utils.js';

await solution(
  import.meta.url,
  `

16,1,2,0,4,2,7,1,2,14

  `,
  '168',
  (input) => {
    function cost(n) {
      let total = 0;
      for (let i = n; i > 0; i--) {
        total += i;
      }
      return total;
    }
    const positions = input.split(',').map(Number);
    return Math.min(
      ...range(0, positions.length).map((best) =>
        positions.reduce((total, pos) => total + cost(Math.abs(pos - best)), 0),
      ),
    );
  },
);

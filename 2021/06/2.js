import { solution } from '../utils.js';

solution(
  import.meta.url,
  `

3,4,3,1,2

  `,
  '26984457539',
  (input) => {
    const memo = new Map();
    function getKey(fish, gen) {
      return `${fish}:${gen}`;
    }
    function posteritySize(fish, gen) {
      const key = getKey(fish, gen);
      if (!memo.has(key)) {
        let total = 1;
        for (let i = gen; i > 0; i--) {
          fish--;
          if (fish < 0) {
            fish = 6;
            total += posteritySize(8, i - 1);
          }
        }
        memo.set(key, total);
      }
      return memo.get(key);
    }
    const firstGen = input.split(',').map(Number);
    return firstGen.reduce(
      (total, fish) => total + posteritySize(fish, 256),
      0,
    );
  },
);

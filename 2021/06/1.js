import { solution } from '../../utils.js';

solution(
  import.meta.url,
  `

3,4,3,1,2

  `,
  '5934',
  (input) => {
    let fish = input.split(',').map(Number);
    for (let i = 0; i < 80; i++) {
      let toAdd = 0;
      fish.forEach((ind, j) => {
        fish[j]--;
        if (fish[j] < 0) {
          fish[j] = 6;
          toAdd++;
        }
      });
      fish.push(...Array(toAdd).fill(8));
    }
    return fish.length;
  },
);

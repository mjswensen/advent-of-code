import { readInputLines } from '../utils.js';

const lines = await readInputLines(import.meta.url);

const answer = lines
  .map((line) => parseInt(line, 10))
  .reduce((acc, line, i, arr) => {
    if (i <= 2) {
      return acc;
    } else {
      return [...acc, arr[i] + arr[i - 1] + arr[i - 2]];
    }
  }, [])
  .reduce(
    (inc, sum, i, arr) => (i !== 0 && arr[i - 1] < sum ? inc + 1 : inc),
    0,
  );
console.log(answer);

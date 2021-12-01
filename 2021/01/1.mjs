import { readInputLines } from '../../utils.mjs';

const lines = await readInputLines(import.meta.url);

const answer = lines
  .map((line) => parseInt(line, 10))
  .reduce(
    (inc, line, i, arr) => (i !== 0 && arr[i - 1] < line ? inc + 1 : inc),
    0,
  );
console.log(answer);

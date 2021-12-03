import { splitLines, solution } from '../../utils.js';

function mostCommon(bits) {
  let count0 = 0;
  let count1 = 0;
  bits.forEach((bit) => (bit === '1' ? count1++ : count0++));
  return count0 > count1 ? '0' : '1';
}

function opposite(bit) {
  return bit === '1' ? '0' : '1';
}

solution(
  import.meta.url,
  `

00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010

  `,
  '230',
  splitLines,
  (lines) => {
    function filter(arr, i, most) {
      const mcap = mostCommon(arr.map((num) => num[i]));
      const compare = most ? mcap : opposite(mcap);
      const next = arr.filter((num) => num[i] === compare);
      if (next.length === 1) {
        return next[0];
      } else {
        return filter(next, i + 1, most);
      }
    }
    const oxygen = filter(lines, 0, true);
    const co2 = filter(lines, 0, false);
    return parseInt(oxygen, 2) * parseInt(co2, 2);
  },
);

import { splitLines, solution } from '../utils.js';

function mostCommon(bits) {
  let count0 = 0;
  let count1 = 0;
  bits.forEach((bit) => (bit === '1' ? count1++ : count0++));
  return count1 > count0 ? '1' : '0';
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
  '198',
  splitLines,
  (lines) => {
    const gamma = lines[0]
      .split('')
      .map((_, i) => mostCommon(lines.map((line) => line[i])))
      .join('');
    const epsilon = gamma
      .split('')
      .map((bit) => (bit === '1' ? '0' : '1'))
      .join('');
    return parseInt(gamma, 2) * parseInt(epsilon, 2);
  },
);

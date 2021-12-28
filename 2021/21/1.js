import { range } from 'lodash-es';
import { solution, splitLines } from '../utils.js';

await solution(
  import.meta.url,
  `

Player 1 starting position: 4
Player 2 starting position: 8

  `,
  '739785',
  splitLines,
  (lines) => {
    const [p1Start, p2Start] = lines.map((line) => {
      const [_, pos] = line.split(': ');
      return parseInt(pos, 10);
    });

    let dieValue = 1;
    let rollCount = 0;

    function nextThreeRolls() {
      const rolls = range(dieValue, dieValue + 3).map((roll) => roll % 100);
      dieValue += 3;
      rollCount += 3;
      return rolls.reduce((a, b) => a + b);
    }

    let p1Score = 0;
    let p1Position = p1Start;
    let p2Score = 0;
    let p2Position = p2Start;

    while (true) {
      p1Position = ((p1Position - 1 + nextThreeRolls()) % 10) + 1;
      p1Score += p1Position;
      if (p1Score >= 1000) {
        return p2Score * rollCount;
      }

      p2Position = ((p2Position - 1 + nextThreeRolls()) % 10) + 1;
      p2Score += p2Position;
      if (p2Score >= 1000) {
        return p1Score * rollCount;
      }
    }
  },
);

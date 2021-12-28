import { solution, splitLines } from '../utils.js';
import { memoize } from 'lodash-es';

await solution(
  import.meta.url,
  `

Player 1 starting position: 4
Player 2 starting position: 8

  `,
  '444356092776315',
  splitLines,
  (lines) => {
    const [p1Start, p2Start] = lines.map((line) => {
      const [_, pos] = line.split(': ');
      return parseInt(pos, 10);
    });

    const turn = memoize(
      (currScore, currPosition, otherScore, otherPosition) => {
        let currWins = 0;
        let otherWins = 0;
        for (let roll1 = 1; roll1 <= 3; roll1++) {
          for (let roll2 = 1; roll2 <= 3; roll2++) {
            for (let roll3 = 1; roll3 <= 3; roll3++) {
              const nextPosition =
                ((currPosition - 1 + roll1 + roll2 + roll3) % 10) + 1;
              const nextScore = currScore + nextPosition;
              if (nextScore >= 21) {
                currWins++;
              } else {
                const [other, curr] = turn(
                  otherScore,
                  otherPosition,
                  nextScore,
                  nextPosition,
                );
                currWins += curr;
                otherWins += other;
              }
            }
          }
        }
        return [currWins, otherWins];
      },
      (...args) => args.join(':'),
    );

    return Math.max(...turn(0, p1Start, 0, p2Start));
  },
);

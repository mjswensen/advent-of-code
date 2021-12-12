import { solution, splitLines } from '../utils.js';

await solution(
  import.meta.url,
  `

[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]

  `,
  '288957',
  splitLines,
  (lines) => {
    const goodLines = lines.filter((line) => {
      const stack = [];
      for (const char of line) {
        switch (char) {
          case '(':
          case '[':
          case '{':
          case '<':
            stack.push(char);
            break;
          case ')':
            if (stack[stack.length - 1] === '(') {
              stack.pop();
              break;
            } else {
              return false;
            }
          case ']':
            if (stack[stack.length - 1] === '[') {
              stack.pop();
              break;
            } else {
              return false;
            }
          case '}':
            if (stack[stack.length - 1] === '{') {
              stack.pop();
              break;
            } else {
              return false;
            }
          case '>':
            if (stack[stack.length - 1] === '<') {
              stack.pop();
              break;
            } else {
              return false;
            }
        }
      }
      return true;
    });
    const completions = goodLines.map((line) => {
      const unClosed = [];
      for (const char of line) {
        switch (char) {
          case '(':
          case '[':
          case '{':
          case '<':
            unClosed.push(char);
            break;
          case ')':
          case ']':
          case '}':
          case '>':
            unClosed.pop();
            break;
        }
      }
      return unClosed
        .map((char) => {
          switch (char) {
            case '(':
              return ')';
            case '[':
              return ']';
            case '{':
              return '}';
            case '<':
              return '>';
          }
        })
        .reverse();
    });
    const scores = completions.map((closers) => {
      let total = 0;
      closers.forEach((char) => {
        total *= 5;
        switch (char) {
          case ')':
            total += 1;
            break;
          case ']':
            total += 2;
            break;
          case '}':
            total += 3;
            break;
          case '>':
            total += 4;
            break;
        }
      });
      return total;
    });
    scores.sort((a, b) => a - b);
    return scores[Math.floor(scores.length / 2)];
  },
);

/*

Did you know that autocomplete tools also have contests? It's true! The score is determined by considering the completion string character-by-character. Start with a total score of 0. Then, for each character, multiply the total score by 5 and then increase the total score by the point value given for the character in the following table:

): 1 point.
]: 2 points.
}: 3 points.
>: 4 points.
So, the last completion string above - ])}> - would be scored as follows:

Start with a total score of 0.
Multiply the total score by 5 to get 0, then add the value of ] (2) to get a new total score of 2.
Multiply the total score by 5 to get 10, then add the value of ) (1) to get a new total score of 11.
Multiply the total score by 5 to get 55, then add the value of } (3) to get a new total score of 58.
Multiply the total score by 5 to get 290, then add the value of > (4) to get a new total score of 294.
The five lines' completion strings have total scores as follows:

}}]])})] - 288957 total points.
)}>]}) - 5566 total points.
}}>}>)))) - 1480781 total points.
]]}}]}]}> - 995444 total points.
])}> - 294 total points.

*/

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
  '26397',
  splitLines,
  (lines) => {
    let total = 0;
    for (const line of lines) {
      const stack = [];
      lineLoop: for (const char of line) {
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
              total += 3;
              break lineLoop;
            }
          case ']':
            if (stack[stack.length - 1] === '[') {
              stack.pop();
              break;
            } else {
              total += 57;
              break lineLoop;
            }
          case '}':
            if (stack[stack.length - 1] === '{') {
              stack.pop();
              break;
            } else {
              total += 1197;
              break lineLoop;
            }
          case '>':
            if (stack[stack.length - 1] === '<') {
              stack.pop();
              break;
            } else {
              total += 25137;
              break lineLoop;
            }
        }
      }
    }
    return total;
  },
);

/*

): 3 points.
]: 57 points.
}: 1197 points.
>: 25137 points.

*/

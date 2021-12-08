import { solution, splitLines } from '../../utils.js';
import { isEqual } from 'lodash-es';

// subtract b from A
function subtract(a, b) {
  return a.split('').filter((letter) => !b.includes(letter));
}

// does A contain B
function contains(a, b) {
  return b.split('').every((letter) => a.includes(letter));
}

function equal(a, b) {
  return isEqual(a.split('').sort(), b.split('').sort());
}

await solution(
  import.meta.url,
  `

be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce

  `,
  '61229',
  splitLines,
  (lines) => {
    let ret = 0;
    for (const line of lines) {
      const [start, output] = line.split(' | ');
      const hints = start.split(' ');
      const seven = hints.find((hint) => hint.length === 3);
      const one = hints.find((hint) => hint.length === 2);
      const four = hints.find((hint) => hint.length === 4);
      const fourArm = subtract(four, one);
      const five = hints.find(
        (hint) => hint.length === 5 && contains(hint, fourArm.join('')),
      );
      const three = hints.find(
        (hint) => hint.length === 5 && contains(hint, one),
      );
      const two = hints.find(
        (hint) =>
          hint.length === 5 && !equal(hint, five) && !equal(hint, three),
      );
      const [leftArm] = subtract(fourArm.join(''), two);
      const [center] = subtract(fourArm.join(''), leftArm);
      const zero = hints.find(
        (hint) => hint.length === 6 && !contains(hint, center),
      );
      const nine = hints.find(
        (hint) =>
          hint.length === 6 && contains(hint, one) && !equal(hint, zero),
      );
      const six = hints.find(
        (hint) => hint.length === 6 && !equal(hint, nine) && !equal(hint, zero),
      );
      const eight = hints.find((hint) => hint.length === 7);

      const answer = output
        .split(' ')
        .map((digit) => {
          if (equal(digit, zero)) {
            return 0;
          }
          if (equal(digit, one)) {
            return 1;
          }
          if (equal(digit, two)) {
            return 2;
          }
          if (equal(digit, three)) {
            return 3;
          }
          if (equal(digit, four)) {
            return 4;
          }
          if (equal(digit, five)) {
            return 5;
          }
          if (equal(digit, six)) {
            return 6;
          }
          if (equal(digit, seven)) {
            return 7;
          }
          if (equal(digit, eight)) {
            return 8;
          }
          if (equal(digit, nine)) {
            return 9;
          }
          debugger;
        })
        .join('');
      ret += Number(answer);
    }
    return ret;
  },
);

/*

0,9,6 have 6 letters
5,2,3 have 5 letters

1 has 2
7 has 3
4 has 4
8 has 7 so is not useful

*/

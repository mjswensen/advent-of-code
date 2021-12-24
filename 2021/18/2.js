import { solution, splitLines } from '../utils.js';
import { toTree, add, magnitude } from './lib.js';

await solution(
  import.meta.url,
  `

[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
[[[5,[2,8]],4],[5,[[9,9],0]]]
[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
[[[[5,4],[7,7]],8],[[8,3],8]]
[[9,3],[[9,9],[6,[4,9]]]]
[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]

  `,
  '3993',
  splitLines,
  (lines) => lines.map((line) => JSON.parse(line)),
  (arrs) => arrs.map((arr) => toTree(arr)),
  (trees) => {
    let max = -Infinity;
    for (let i = 0; i < trees.length; i++) {
      for (let j = 0; j < trees.length; j++) {
        if (i === j) continue;
        max = Math.max(max, magnitude(add(trees[i], trees[j])));
        max = Math.max(max, magnitude(add(trees[j], trees[i])));
      }
    }
    return max;
  },
);

import { solution, splitLines } from '../utils.js';

await solution(
  import.meta.url,
  `

dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc

  `,
  '103',
  splitLines,
  (lines) => {
    const connections = new Map();
    lines.forEach((line) => {
      const [a, b] = line.split('-');
      if (!connections.has(a)) {
        connections.set(a, []);
      }
      connections.get(a).push(b);
      if (!connections.has(b)) {
        connections.set(b, []);
      }
      connections.get(b).push(a);
    });
    function hasVisitedTwoSmallCavesTwice(path) {
      const smalls = path.filter(
        (cave) =>
          cave !== 'start' && cave !== 'end' && cave === cave.toLowerCase(),
      );
      return smalls.length - new Set(smalls).size >= 2;
    }
    const paths = [];
    function buildPaths(prev) {
      const last = prev[prev.length - 1];
      if (last === 'end') {
        paths.push(prev);
        return;
      }
      const options = connections
        .get(last)
        .filter((connected) => connected !== 'start')
        .filter(
          (connected) =>
            connected === connected.toUpperCase() ||
            !hasVisitedTwoSmallCavesTwice([...prev, connected]) ||
            !prev.includes(connected),
        );
      options.forEach((option) => {
        buildPaths([...prev, option]);
      });
    }
    buildPaths(['start']);
    return paths.length;
  },
);

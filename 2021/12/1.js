import { solution, splitLines } from '../utils.js';

await solution(
  import.meta.url,
  `

start-A
start-b
A-c
A-b
b-d
A-end
b-end

  `,
  '10',
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
    const paths = [];
    function buildPaths(prev) {
      const last = prev[prev.length - 1];
      if (last === 'end') {
        paths.push(prev);
        return;
      }
      const options = connections
        .get(last)
        .filter(
          (connected) =>
            connected === connected.toUpperCase() || !prev.includes(connected),
        );
      options.forEach((option) => {
        buildPaths([...prev, option]);
      });
    }
    buildPaths(['start']);
    return paths.length;
  },
);

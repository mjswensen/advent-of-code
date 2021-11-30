import { readInputLines } from '../../utils.mjs';

const lines = await readInputLines(import.meta.url);
for (const a of lines) {
  for (const b of lines) {
    for (const c of lines) {
      const _a = parseInt(a, 10);
      const _b = parseInt(b, 10);
      const _c = parseInt(c, 10);
      if (_a + _b + _c === 2020) {
        console.log(_a * _b * _c);
        process.exit(0);
      }
    }
  }
}

import { readInputLines } from '../../utils.js';

const lines = await readInputLines(import.meta.url);
for (const a of lines) {
  for (const b of lines) {
    const _a = parseInt(a, 10);
    const _b = parseInt(b, 10);
    if (_a + _b === 2020) {
      console.log(_a * _b);
      process.exit(0);
    }
  }
}

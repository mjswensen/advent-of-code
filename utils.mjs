import { dirname, format } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';

function inputPath(programUrl) {
  return format({
    dir: dirname(fileURLToPath(programUrl)),
    base: 'input.txt',
  });
}

export async function readInput(programUrl) {
  return (await readFile(inputPath(programUrl), 'utf-8')).trim();
}

export async function readInputLines(programUrl) {
  return (await readInput(programUrl)).split('\n');
}

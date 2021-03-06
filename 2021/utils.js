import { basename, dirname, format, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFile, stat, writeFile } from 'node:fs/promises';
import { strictEqual } from 'node:assert/strict';
import { config } from 'dotenv';
import fetch from 'node-fetch';

config({ path: join(process.cwd(), '2021', '.env') });

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

function getPathData(programUrl) {
  const dir = dirname(fileURLToPath(programUrl));
  const day = parseInt(basename(dir), 10).toString();
  return { day, dir };
}

async function getInput(programUrl) {
  const { day, dir } = getPathData(programUrl);
  const inputFilePath = join(dir, 'input.txt');
  try {
    await stat(inputFilePath);
    console.log(`Input file found (${inputFilePath})`);
  } catch (e) {
    if (e.code === 'ENOENT') {
      console.log(`Downloading puzzle input to ${inputFilePath}`);
      const response = await fetch(
        `https://adventofcode.com/2021/day/${day}/input`,
        {
          headers: {
            Cookie: `session=${process.env.SESSION}`,
          },
        },
      );
      const body = await response.text();
      await writeFile(inputFilePath, body);
    } else {
      throw e;
    }
  }
  return await readFile(inputFilePath, 'utf-8');
}

export async function solution(
  programUrl,
  exampleInput,
  exampleExpected,
  ...solutionFunctions
) {
  const exampleActual = solutionFunctions
    .reduce((prev, fn) => fn(prev), exampleInput.trim())
    .toString();
  const ee = exampleExpected.trim();
  const ea = exampleActual.trim();
  strictEqual(ea, ee, `Got ${ea} (expected ${ee})`);
  console.log('Test passed for example input');

  const input = await getInput(programUrl);
  const actual = solutionFunctions
    .reduce((prev, fn) => fn(prev), input.trim())
    .toString();
  console.log('Output:');
  console.log(actual);
}

export function splitLines(trimmedInput) {
  return trimmedInput.split('\n');
}

export function parseIntegers(lines) {
  return lines.map((line) => parseInt(line, 10));
}

export function parseIndividualIntegers(lines) {
  return lines.map((line) => line.split('').map((s) => parseInt(s, 10)));
}

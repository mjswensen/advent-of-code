import { solution, splitLines } from '../utils.js';
import { get } from 'lodash-es';

await solution(
  import.meta.url,
  `

..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..###..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###.######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#..#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#......#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#.....####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#.......##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#
  
#..#.
#....
##..#
..#..
..###

  `,
  '35',
  splitLines,
  (lines) => {
    const [algorithm, _, ...imageLines] = lines;

    function generation(image, algorithm, defaultPixel) {
      const padding = Array(image[0].length + 2).fill(defaultPixel);
      const paddedImage = [
        padding,
        ...image.map((row) => [defaultPixel, ...row, defaultPixel]),
        padding,
      ];
      return paddedImage.map((row, i) =>
        row.map((_, j) => {
          const key = [
            get(paddedImage, [i - 1, j - 1], defaultPixel),
            get(paddedImage, [i - 1, j], defaultPixel),
            get(paddedImage, [i - 1, j + 1], defaultPixel),
            get(paddedImage, [i, j - 1], defaultPixel),
            get(paddedImage, [i, j], defaultPixel),
            get(paddedImage, [i, j + 1], defaultPixel),
            get(paddedImage, [i + 1, j - 1], defaultPixel),
            get(paddedImage, [i + 1, j], defaultPixel),
            get(paddedImage, [i + 1, j + 1], defaultPixel),
          ]
            .map((pixel) => (pixel === '#' ? '1' : '0'))
            .join('');
          return algorithm[parseInt(key, 2)];
        }),
      );
    }

    let image = imageLines.map((line) => line.split(''));
    for (let i = 0; i < 2; i++) {
      image = generation(
        image,
        algorithm,
        algorithm[0] === '#' ? (i % 2 === 0 ? '.' : '#') : '.',
      );
    }
    return image.reduce(
      (total, row) =>
        total +
        row.reduce(
          (rowTotal, pixel) => (pixel === '#' ? rowTotal + 1 : rowTotal),
          0,
        ),
      0,
    );
  },
);

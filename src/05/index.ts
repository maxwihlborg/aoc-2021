import chalk from "chalk";
import F from "lodash/fp";

const parse = F.flow(
  F.toString,
  F.split("\n"),
  F.filter(Boolean),
  F.map(
    F.flow(
      F.split("->"),
      F.map(
        F.flow(F.split(","), F.map(F.flow(F.trim, F.toNumber)), ([x, y]) => ({
          x,
          y,
        })),
      ),
      ([start, end]) => ({ start, end }),
    ),
  ),
);

interface Pos {
  x: number;
  y: number;
}

interface Line {
  start: Pos;
  end: Pos;
}

function* expandLine({ start, end }: Line): Generator<Pos> {
  if (start.x === end.x) {
    let iter = F.min([start.y, end.y]);
    const max = F.max([start.y, end.y]);
    do {
      yield { y: iter++, x: start.x };
    } while (iter <= max);
  }
  if (start.y === end.y) {
    let iter = F.min([start.x, end.x]);
    const max = F.max([start.x, end.x]);
    do {
      yield { x: iter++, y: start.y };
    } while (iter <= max);
  }
}

function debugGrid(data: number[], width: number, height: number) {
  let debug = "";
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const n = data[x + y * width];
      debug += n ? chalk.blue(n) : chalk.dim(".");
    }
    debug += "\n";
  }
  console.log(debug);
}

export function partOne(input: Buffer) {
  const answer = F.flow(
    parse,
    F.filter(({ start, end }) => start.x === end.x || start.y === end.y),
    (lines) => {
      const points = F.flatMap(({ start, end }) => [start, end], lines);
      const min = {
        x: F.min(F.map("x", points)),
        y: F.min(F.map("y", points)),
      };
      const max = {
        // need to add one in since zero-indexed
        x: F.max(F.map("x", points)) + 1,
        y: F.max(F.map("y", points)) + 1,
      };
      const w = max.x - min.x;
      const h = max.y - min.y;

      const data = new Array(w * h).fill(0);

      for (const line of lines) {
        for (const { x, y } of expandLine(line)) {
          const ox = x - min.x;
          const oy = y - min.y;

          data[ox + oy * w] += 1;
        }
      }
      //debugGrid(data, w, h);
      return F.sumBy((n) => (n > 1 ? 1 : 0), data);
    },
  );

  return answer(input);
}

export function partTwo(input: Buffer) {
  const answer = F.flow(parse, F.constant(0));

  return answer(input);
}

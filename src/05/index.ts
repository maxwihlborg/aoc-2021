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
  const dx = Math.sign(end.x - start.x);
  const dy = Math.sign(end.y - start.y);
  let point = Object.assign({}, start);
  yield point;
  do {
    point.x += dx;
    point.y += dy;
    yield point;
  } while (!(point.x === end.x && point.y === end.y));
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

function getDimensions(lines: Line[]) {
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
  const width = max.x - min.x;
  const height = max.y - min.y;

  return { min, max, width, height };
}
const isStright = ({ start, end }: Line) =>
  start.x === end.x || start.y === end.y;

const getMinMax = ({ start, end }: Line) => {
  return {
    min: {
      x: Math.min(start.x, end.x),
      y: Math.min(start.y, end.y),
    },
    max: {
      x: Math.max(start.x, end.x),
      y: Math.max(start.y, end.y),
    },
  };
};

const isDiagonal = (line: Line) => {
  const { min, max } = getMinMax(line);
  const dx = max.x - min.x;
  const dy = max.y - min.y;
  return dx === dy;
};

function buildGrid(lines: Line[]) {
  const { min, width, height } = getDimensions(lines);
  const data = new Array(width * height).fill(0);

  for (const line of lines) {
    for (const { x, y } of expandLine(line)) {
      const ox = x - min.x;
      const oy = y - min.y;

      data[ox + oy * width] += 1;
    }
  }
  //debugGrid(data, width, height);
  return data;
}

export function partOne(input: Buffer) {
  const answer = F.flow(
    parse,
    F.filter((line: Line) => isStright(line)),
    buildGrid,
    F.sumBy((n) => (n > 1 ? 1 : 0)),
  );

  return answer(input);
}

export function partTwo(input: Buffer) {
  const answer = F.flow(
    parse,
    F.filter((line: Line) => isStright(line) || isDiagonal(line)),
    buildGrid,
    F.sumBy((n) => (n > 1 ? 1 : 0)),
  );

  return answer(input);
}

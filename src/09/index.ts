import F from "lodash/fp";

const parse = F.flow(
  F.toString,
  F.trim,
  F.split("\n"),
  F.map(F.flow(F.split(""), F.map(F.toNumber))),
  (rows) => ({
    data: F.flatten(rows),
    w: rows[0].length,
    h: rows.length,
  }),
);

function* iter(w: number, h: number) {
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      yield [x, y];
    }
  }
}
const dirs = [
  [-1, 0],
  [0, -1],
  [1, 0],
  [0, 1],
];
function* neigh(x: number, y: number, w: number, h: number) {
  for (const [ox, oy] of dirs) {
    const nx = x + ox;
    const ny = y + oy;
    if (0 <= nx && nx < w && 0 <= ny && ny < h) {
      yield [nx, ny];
    }
  }
}

function* lowPoints(data: number[], w: number, h: number) {
  for (const [x, y] of iter(w, h)) {
    const n = data[x + y * w];
    if (n === 9) {
      continue;
    }
    let low = true;
    for (const [nx, ny] of neigh(x, y, w, h)) {
      if (data[nx + ny * w] < n) {
        low = false;
        break;
      }
    }
    if (low) {
      yield [n, x, y];
    }
  }
}

export function partOne(input: Buffer) {
  const answer = F.flow(
    parse,
    ({ data, w, h }) => Array.from(lowPoints(data, w, h)),
    F.map(F.flow(F.get(0), F.add(1))),
    F.sum,
  );

  return answer(input);
}

const basinSize = (
  data: number[],
  sx: number,
  sy: number,
  w: number,
  h: number,
) => {
  const step = (visited: Set<number>, acc: number, x: number, y: number) => {
    const n = data[x + y * w];
    for (let [nx, ny] of neigh(x, y, w, h)) {
      const c = nx + ny * w;
      const b = data[c];
      if (!(b > n && b !== 9 && !visited.has(c))) continue;
      visited.add(c);
      acc += step(visited, 1, nx, ny);
    }
    return acc;
  };
  return step(new Set([sx + sy * w]), 1, sx, sy);
};

function* basinSizes(data: number[], w: number, h: number) {
  for (const [_n, x, y] of lowPoints(data, w, h)) {
    yield basinSize(data, x, y, w, h);
  }
}

export function partTwo(input: Buffer) {
  const answer = F.flow(
    parse,
    ({ data, w, h }) => Array.from(basinSizes(data, w, h)),
    (n) => n.sort((a, b) => b - a),
    F.take(3),
    F.reduce((acc, n) => acc * n, 1),
  );

  return answer(input);
}

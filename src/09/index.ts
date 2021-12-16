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
      yield n + 1;
    }
  }
}

export function partOne(input: Buffer) {
  const answer = F.flow(
    parse,
    ({ data, w, h }) => Array.from(lowPoints(data, w, h)),
    F.sum,
  );

  return answer(input);
}

export function partTwo(input: Buffer) {
  const answer = F.flow(parse, F.constant(0));

  return answer(input);
}

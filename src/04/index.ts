import F from "lodash/fp";
import chalk from "chalk";

const parseBoard = F.flow(
  F.split("\n"),
  F.filter(Boolean),
  F.map(F.flow(F.trim, F.split(/\s+/), F.map(F.toNumber))),
  (data) => new Board(data),
);

const parse = F.flow(F.toString, F.split("\n\n"), (arr: string[]) => ({
  input: F.map(F.toNumber, F.split(",", arr[0])),
  boards: F.map(parseBoard, arr.slice(1)),
}));

class Board {
  width;
  height;
  values;
  state;
  constructor(public data: number[][]) {
    this.width = data[0].length;
    this.height = data.length;
    this.values = new Map(
      data.flatMap((row, y) => row.map((n, x) => [n, { x, y, check: false }])),
    );
    this.state = {
      rows: Array.from({ length: this.height }).fill(0) as number[],
      cols: Array.from({ length: this.width }).fill(0) as number[],
    };
  }

  mark(val: number) {
    const pos = this.values.get(val);
    if (!pos) {
      return false;
    }
    this.values.set(val, F.set("check", true, pos));
    this.state.rows[pos.y] |= 1 << pos.x;
    this.state.cols[pos.x] |= 1 << pos.y;

    const mask = (1 << 5) - 1;

    return this.state.rows[pos.y] === mask || this.state.cols[pos.x] === mask;
  }

  uncheckedSum = () =>
    F.sumBy(
      ([val, { check }]) => (check ? 0 : val),
      Array.from(this.values.entries()),
    );

  checkWon = F.some(F.eq((1 << 5) - 1));

  toString() {
    let out = [];
    for (let y = 0; y < this.height; y++) {
      let row = "";
      for (let x = 0; x < this.height; x++) {
        const val = this.data[y][x];
        const n = String(val).padStart(3, " ");
        row += this.values.get(val)?.check ? chalk.blue(n) : chalk.dim(n);
      }
      out.push(row);
    }
    return out.join("\n");
  }
}

export function partOne(input: Buffer) {
  const answer = F.flow(parse, ({ input, boards }) => {
    for (const val of input) {
      for (const board of boards) {
        if (!board.mark(val)) continue;
        console.log(board.toString());

        return board.uncheckedSum() * val;
      }
    }
    return -1;
  });

  return answer(input);
}

export function partTwo(input: Buffer) {
  const answer = F.flow(parse, ({ input, boards }) => {
    for (const val of input) {
      for (let i = 0; i < boards.length; i++) {
        const board = boards[i];
        if (!board.mark(val)) continue;

        if (boards.length === 1) {
          console.log(board.toString());
          return board.uncheckedSum() * val;
        }

        boards.splice(i, 1);
        i--;
      }
    }
    return -1;
  });

  return answer(input);
}

import chalk from "chalk";
import F from "lodash/fp";

const parseRow = F.map(
  F.flow(F.split("|"), F.map(F.flow(F.trim, F.split(/\s+/)))),
);
const parse = F.flow(
  F.toString,
  F.trim,
  F.split("\n"),
  parseRow,
  F.map(([signal, out]) => ({ signal, out })),
);

const ONE = 2;
const SEVEN = 3;
const FOUR = 4;
const EIGHT = 7;

export function partOne(input: Buffer) {
  const answer = F.flow(
    parse,
    F.sumBy(({ out }) =>
      F.sumBy(
        F.flow(F.get("length"), F.includes(F.__, [ONE, FOUR, SEVEN, EIGHT])),
        out,
      ),
    ),
  );

  return answer(input);
}

const M_235 = 5;
const M_069 = 6;

export function partTwo(input: Buffer) {
  const toBit = F.flow(
    F.split(""),
    F.reduce((n, i) => {
      const o = i.charCodeAt(0) - "a".charCodeAt(0);
      return n | (1 << o);
    }, 0),
  );
  const eqMask = (m: number) => (n: number) => (n & m) === m;
  const notIn = (arr: number[], arg: number[]) =>
    F.first(F.reject(F.includes(F.__, arr), arg));

  const answer = F.flow(
    parse,
    F.map(({ signal, out }) => {
      const bits = F.mapValues(F.map(toBit), F.groupBy("length", signal));
      const digit = new Array(10).fill(0);

      digit[1] = F.first(bits[ONE]);
      digit[4] = F.first(bits[FOUR]);
      digit[7] = F.first(bits[SEVEN]);
      digit[8] = F.first(bits[EIGHT]);

      const m5 = digit[4] ^ digit[1];
      digit[3] = F.find(eqMask(digit[1]), bits[M_235]);
      digit[5] = F.find(eqMask(m5), bits[M_235]);
      digit[2] = notIn([digit[3], digit[5]], bits[M_235]);

      digit[6] = digit[8] ^ (digit[5] ^ (digit[1] | digit[5]));
      digit[9] = digit[5] | digit[1];
      digit[0] = notIn([digit[6], digit[9]], bits[M_069]);

      const idx = F.fromPairs(digit.map((v, n) => [v, n]));
      return parseInt(
        out
          .map(toBit)
          .map((n) => idx[n])
          .join(""),
        10,
      );
    }),
    F.sum,
  );

  return answer(input);
}

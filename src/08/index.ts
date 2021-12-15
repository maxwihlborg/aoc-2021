import F from "lodash/fp";

const parseRow = F.map(
  F.flow(F.split("|"), F.map(F.flow(F.trim, F.split(/\s+/)))),
);
const parse = F.flow(
  F.toString,
  F.trim,
  F.split("\n"),
  parseRow,
  F.map(([input, out]) => ({ input, out })),
);

export function partOne(input: Buffer) {
  const answer = F.flow(
    parse,
    F.sumBy(({ out }) =>
      F.sumBy(F.flow(F.get("length"), F.includes(F.__, [2, 4, 3, 7])), out),
    ),
  );

  return answer(input);
}

export function partTwo(input: Buffer) {
  const answer = F.flow(parse, F.constant(0));

  return answer(input);
}

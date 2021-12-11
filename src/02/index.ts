import F from "lodash/fp";

const parse = F.flow(
  F.toString,
  F.split("\n"),
  F.filter(Boolean),
  F.map(F.flow(F.split(/\s+/), ([a, b]) => [F.first(a), F.toNumber(b)])),
);

export function partOne(input: Buffer) {
  const answer = F.flow(
    parse,
    F.reduce(
      ([pos, depth], [d, a]) => {
        switch (d) {
          case "f":
            pos += a;
            break;
          case "d":
            depth += a;
            break;
          case "u":
            depth -= a;
            break;
        }
        return [pos, depth];
      },
      [0, 0],
    ),
    ([pos, depth]) => pos * depth,
  );

  return answer(input);
}

export function partTwo(input: Buffer) {}

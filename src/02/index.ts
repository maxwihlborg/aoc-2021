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
      ([pos, depth], [t, n]) => {
        switch (t) {
          case "f":
            pos += n;
            break;
          case "d":
            depth += n;
            break;
          case "u":
            depth -= n;
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

export const partTwo = F.flow(
  parse,
  F.reduce(
    ([pos, depth, aim], [t, n]) => {
      switch (t) {
        case "f":
          pos += n;
          depth += aim * n;
          break;
        case "d":
          aim += n;
          break;
        case "u":
          aim -= n;
          break;
      }
      return [pos, depth, aim];
    },
    [0, 0, 0],
  ),
  ([pos, depth]) => pos * depth,
);

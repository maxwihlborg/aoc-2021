import F from "lodash/fp";

const parse = F.flow(F.toString, F.trim, F.split(","), F.map(F.toNumber));

export function partOne(input: Buffer) {
  const answer = F.flow(parse, (arr: number[]) => {
    const min = F.min(arr)!;
    const max = F.max(arr)!;

    function cost(n: number) {
      return F.sumBy((c) => Math.abs(n - c), arr);
    }

    return F.reduce(
      (acc, n) => {
        return Math.min(acc, cost(n));
      },
      Number.MAX_SAFE_INTEGER,
      F.range(min, max),
    );
  });

  return answer(input);
}

export function partTwo(input: Buffer) {
  const answer = F.flow(
    parse,
    (arr: number[]) => {
      const min = F.min(arr)!;
      const max = F.max(arr)!;

      function cost(n: number) {
        return F.sumBy((c) => {
          const d = Math.abs(n - c);
          return (d * (d + 1)) / 2;
        }, arr);
      }

      return F.reduce(
        (acc, n) => {
          return Math.min(acc, cost(n));
        },
        Number.MAX_SAFE_INTEGER,
        F.range(min, max),
      );
    },
  );

  return answer(input);
}

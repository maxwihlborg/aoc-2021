import F from "lodash/fp";

const parse = F.flow(
  F.toString,
  F.split("\n"),
  F.filter(Boolean),
  F.map((n: string) => parseInt(n, 2)),
);

const lb = (n: number, o: number) =>
  console.log(n.toString(2).padStart(o, "0"));

export function partOne(input: Buffer, o: number) {
  const answer = F.flow(parse, (arr: number[]) => {
    let gam = 0;
    for (let i = 0; i < o; i++) {
      const s = F.sumBy((n) => (n & (1 << i) ? 1 : 0), arr);
      if (s < Math.floor(arr.length / 2)) {
        continue;
      }
      gam |= 1 << i;
    }
    const eps = ~gam & ((1 << o) - 1);
    lb(gam, o);
    lb(eps, o);

    return eps * gam;
  });

  return answer(input);
}

export function partTwo(input: Buffer, o: number) {
  const stepOx = (arr: number[], i: number): number => {
    if (arr.length <= 1 || i < 0) {
      return arr[0];
    }

    const s = F.sumBy((n) => (n & (1 << i) ? 1 : 0), arr);
    const m = arr.length - s;

    if (s >= m) {
      return stepOx(
        F.filter((n) => !!(n & (1 << i)), arr),
        i - 1,
      );
    } else {
      return stepOx(
        F.reject((n) => !!(n & (1 << i)), arr),
        i - 1,
      );
    }
  };

  const stepCo = (arr: number[], i: number): number => {
    if (arr.length <= 1 || i < 0) {
      return arr[0];
    }

    const ones = F.sumBy((n) => (n & (1 << i) ? 1 : 0), arr);
    const zeroes = arr.length - ones;

    if (zeroes <= ones) {
      return stepCo(
        F.reject((n) => !!(n & (1 << i)), arr),
        i - 1,
      );
    } else {
      return stepCo(
        F.filter((n) => !!(n & (1 << i)), arr),
        i - 1,
      );
    }
  };

  const answer = F.flow(parse, (arr: number[]) => {
    const oxRat = stepOx(arr, o - 1);
    const coRat = stepCo(arr, o - 1);

    lb(oxRat, o);
    lb(coRat, o);

    return oxRat * coRat;
  });

  return answer(input);
}

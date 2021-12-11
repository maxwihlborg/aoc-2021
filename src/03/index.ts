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

export function partTwo(input: Buffer) {
  const answer = F.flow(parse, F.constant(0));

  return answer(input);
}

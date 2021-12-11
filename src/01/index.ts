import F from "lodash/fp";

const parse = F.flow(
  F.toString,
  F.split("\n"),
  F.filter(Boolean),
  F.map(F.toNumber),
);

const countAsc = () => {
  let prev = Number.MAX_SAFE_INTEGER;
  return F.reduce<number, number>((acc, next) => {
    if (next > prev) {
      acc += 1;
    }
    prev = next;
    return acc;
  }, 0);
};

function* chunks(arr: number[]) {
  for (let i = 0; i < arr.length; i++) {
    const chunk = arr.slice(i, i + 3);
    if (chunk.length < 3) {
      break;
    }
    yield F.sum(chunk);
  }
}

export function partOne(input: Buffer) {
  const answer = F.flow(parse, countAsc());

  return answer(input);
}

export function partTwo(input: Buffer) {
  const answer = F.flow(parse, (arr) => Array.from(chunks(arr)), countAsc());

  return answer(input);
}

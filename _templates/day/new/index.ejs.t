---
to: src/<%= String(name).padStart(2, '0') %>/index.ts
sh: yarn prettier -w src/<%= String(name).padStart(2, '0') %>/index.ts
---
import F from "lodash/fp";

const parse = F.flow(F.toString);

export function partOne(input: Buffer) {
  const answer = F.flow(parse, F.constant(0));

  return answer(input);
}

export function partTwo(input: Buffer) {
  const answer = F.flow(parse, F.constant(0));

  return answer(input);
}

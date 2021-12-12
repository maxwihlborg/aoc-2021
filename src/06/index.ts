import F from "lodash/fp";

const parse = F.flow(F.toString, F.trim, F.split(","), F.map(F.toNumber));

function simulate(days: number) {
  const step = (state: number[], index: number) => {
    if (index <= 0) {
      return state;
    }
    for (let i = 0, len = state.length; i < len; i++) {
      if (state[i]-- > 0) continue;
      state[i] = 6;
      state.push(8);
    }
    return step(state, index - 1);
  };
  return (state: number[]) => {
    return step(state, days);
  };
}

export function partOne(input: Buffer) {
  const answer = F.flow(parse, simulate(80), F.get("length"));

  return answer(input);
}

export function partTwo(input: Buffer) {
  const answer = F.flow(parse, F.constant(0));

  return answer(input);
}

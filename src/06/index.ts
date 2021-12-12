import F from "lodash/fp";

const parse = F.flow(F.toString, F.trim, F.split(","), F.map(F.toNumber));

function simulateRecursive(days: number) {
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

function simulateSmart(days: number) {
  return (state: number[]) => {
    const map = new Array(9).fill(0);
    for (const n of state) {
      map[n] += 1;
    }
    for (let i = 0; i < days; i++) {
      const swp = map.slice(0);
      for (let j = 0; j < map.length; j++) {
        if (j > 0) {
          map[j - 1] += swp[j];
          map[j] -= swp[j];
        } else {
          map[6] += swp[0];
          map[8] += swp[0];
          map[0] = 0;
        }
      }
    }

    return F.sum(map);
  };
}

export function partOne(input: Buffer) {
  const answer = F.flow(parse, simulateRecursive(80), F.get("length"));

  return answer(input);
}

export function partTwo(input: Buffer) {
  const answer = F.flow(parse, simulateSmart(256));

  return answer(input);
}

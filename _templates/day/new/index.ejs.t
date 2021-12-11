---
to: src/<%= String(name).padStart(2, '0') %>/index.ts
sh: yarn prettier -w src/<%= String(name).padStart(2, '0') %>/index.ts
---
import F from 'lodash/fp'

export function partOne(input: Buffer) {}

export function partTwo(input: Buffer) {}

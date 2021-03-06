---
to: src/<%= String(name).padStart(2, '0') %>/index.spec.ts
sh: yarn prettier -w src/<%= String(name).padStart(2, '0') %>/index.spec.ts
---
import { partOne, partTwo } from './index'
import { expect } from 'chai'
import { tap } from 'lodash/fp'
import path from 'path'
import fs from 'fs/promises'

const SAMPLE_FILE = path.resolve(__dirname, './sample.txt')
const INPUT_FILE = path.resolve(__dirname, './input.txt')

const PART_ONE = 0
const PART_TWO = 0

describe('day <%= String(name).padStart(2, '0') %>', ()=>{

  it.only('partOne (sample)', async () => {
    expect(partOne(await fs.readFile(SAMPLE_FILE))).to.equal(PART_ONE)
  })

  it('partOne (input)', async () => {
    expect(tap(console.log, partOne(await fs.readFile(INPUT_FILE)))).to.be.a('number')
  })

  it('partTwo (sample)', async () => {
    expect(partTwo(await fs.readFile(SAMPLE_FILE))).to.equal(PART_TWO)
  })

  it('partTwo (input)', async () => {
    expect(tap(console.log, partTwo(await fs.readFile(INPUT_FILE)))).to.be.a('number')
  })
})

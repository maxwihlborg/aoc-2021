import { partOne, partTwo } from "./index";
import { expect } from "chai";
import fs from "fs/promises";

const PART_ONE = 0;
const PART_TWO = 0;

describe("day 01", () => {
  it.only("partOne (sample)", async () => {
    expect(partOne(await fs.readFile("./sample.txt"))).to.equal(PART_ONE);
  });

  it("partOne (input)", async () => {
    expect(partOne(await fs.readFile("./input.txt"))).to.be("number");
  });

  it("partTwo (input)", async () => {
    expect(partTwo(await fs.readFile("./sample.txt"))).to.equal(PART_TWO);
  });

  it("partTwo (input)", async () => {
    expect(partTwo(await fs.readFile("./input.txt"))).to.be("number");
  });
});

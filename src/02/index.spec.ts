import { partOne, partTwo } from "./index";
import { expect } from "chai";
import { tap } from "lodash/fp";
import path from "path";
import fs from "fs/promises";

const SAMPLE_FILE = path.resolve(__dirname, "./sample.txt");
const INPUT_FILE = path.resolve(__dirname, "./input.txt");

const PART_ONE = 150;
const PART_TWO = 900;

describe("day 02", () => {
  it("partOne (sample)", async () => {
    expect(partOne(await fs.readFile(SAMPLE_FILE))).to.equal(PART_ONE);
  });

  it("partOne (input)", async () => {
    expect(tap(console.log, partOne(await fs.readFile(INPUT_FILE)))).to.be.a(
      "number",
    );
  });

  it("partTwo (sample)", async () => {
    expect(partTwo(await fs.readFile(SAMPLE_FILE))).to.equal(PART_TWO);
  });

  it("partTwo (input)", async () => {
    expect(tap(console.log, partTwo(await fs.readFile(INPUT_FILE)))).to.be.a(
      "number",
    );
  });
});

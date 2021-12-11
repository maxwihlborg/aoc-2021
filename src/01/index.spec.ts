import { partOne, partTwo } from "./index";
import { expect } from "chai";
import path from "path";
import fs from "fs/promises";

const SAMPLE_FILE = path.resolve(__dirname, "./sample.txt");
const INPUT_FILE = path.resolve(__dirname, "./input.txt");

const PART_ONE = 7;
const PART_TWO = 5;

describe("day 01", () => {
  it("partOne (sample)", async () => {
    expect(partOne(await fs.readFile(SAMPLE_FILE))).to.equal(PART_ONE);
  });

  it("partOne (input)", async () => {
    expect(partOne(await fs.readFile(INPUT_FILE))).to.be.a("number");
  });

  it("partTwo (input)", async () => {
    expect(partTwo(await fs.readFile(SAMPLE_FILE))).to.equal(PART_TWO);
  });

  it("partTwo (input)", async () => {
    expect(partTwo(await fs.readFile(INPUT_FILE))).to.be.a("number");
  });
});

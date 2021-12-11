#!/usr/bin/env zx
import { assert } from "chai";
import fs from "fs/promises";

/** globals argv, fs, path, glob*/

const exec = $;
const day = parseInt(argv._[1], 10);

try {
  assert(!isNaN(day), "day is number");

  const dir = path.resolve(__dirname, "../src", String(day).padStart(2, "0"));
  await fs.mkdir(dir);
  console.log(chalk`{cyan info} created`, dir)

} catch (e) {
  console.log(e);
  process.exit(1);
}

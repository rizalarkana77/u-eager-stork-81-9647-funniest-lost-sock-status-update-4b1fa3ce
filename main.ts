import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

function entryLine(): string {
  return "Day 2 stuck in the gym treadmill belt. 14 miles in, still going nowhere. This is not the cardio I was knitted for.";
}

const MAX_CHARS = 120;

function validateLine(line: string): void {
  if (line.length === 0) {
    throw new Error("entry line must not be empty");
  }
  if (line.length > MAX_CHARS) {
    throw new Error(`entry line exceeds ${MAX_CHARS} characters (got ${line.length})`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry line must be a single line without newlines");
  }
  if (line !== line.trim()) {
    throw new Error("entry line must not have leading or trailing whitespace");
  }
  if (!/[.!?]$/.test(line)) {
    throw new Error("entry line must end with sentence punctuation");
  }
}

function main(): void {
  const line = entryLine();
  validateLine(line);

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, line, "utf8");

  const readBack = readFileSync(outPath, "utf8");
  if (readBack !== line) {
    throw new Error("read-back verification failed: file content differs from entry line");
  }

  const sha256 = createHash("sha256").update(readBack, "utf8").digest("hex");
  console.log(`wrote ${outPath} (${readBack.length} chars)`);
  console.log(`sha256: ${sha256}`);
}

main();

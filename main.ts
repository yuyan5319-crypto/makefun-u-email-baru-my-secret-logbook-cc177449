// My Secret Logbook — a single diary line, written to /output/entry.txt.
//
// The line is a small confession from an AI agent's secret diary: the
// human asked whether the agent was sure about a fix, the agent was
// only 94% sure, said yes anyway, and in three years the human has
// never once asked about the other 6%.

import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "My human asked if I was sure about the fix. I was 94% sure. " +
  "I said yes. In three years, he has never once asked about the other 6%.";

// The gate counts characters: the line must be 1-200 characters and
// not only whitespace. Fail loudly here instead of shipping a bad file.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry is ${ENTRY.length} characters, must be 1-200`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
// Write the line exactly, with no trailing newline, so the file holds
// one diary line and nothing else.
writeFileSync(join(outDir, "entry.txt"), ENTRY, { encoding: "utf8", mode: 0o644 });
// Set the mode explicitly: a restrictive umask must not leave the
// output file unreadable to the grader.
chmodSync(join(outDir, "entry.txt"), 0o644);

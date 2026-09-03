import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

test("KB worker default AI URL matches apps/ai default port", async () => {
  const worker = await readFile(
    new URL("../apps/server/src/workers/kb.worker.ts", import.meta.url),
    "utf8"
  );

  assert.ok(
    worker.includes(`process.env.AI_API_URL ?? "http://localhost:5555"`)
  );
});

import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function loadWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  return (await import(workerUrl.href)).default;
}

async function render(pathname) {
  const worker = await loadWorker();
  return worker.fetch(
    new Request(new URL(pathname, "http://localhost"), { headers: { accept: "text/html" } }),
    {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

const routeExpectations = [
  ["/", ["ดวงวันนี้", "แตะไพ่เพื่อเปิดดวง"]],
  ["/today", ["ราหูโคจรทับดาวเสาร์", "แนะนำอุปกรณ์", "เพื่อแก้เคล็ด"]],
  ["/exercise?mode=main", ["เริ่มออกกำลังกาย", "ท่าหมุนไหล่", "วงไปด้านหน้า"]],
  ["/complete", ["เริ่ดเลยล่ะ!", "เสริมดวง", "Add LINE OA"]],
  ["/challenge", ["Challenge ต่อไป", "ประโยชน์", "เริ่ม Challenge!"]],
  ["/exercise?mode=challenge", ["Challenge เริ่มแล้ว", "ตั้งท่า Plank", "แตะไหล่ซ้าย-ขวา"]],
];

for (const [route, expectedCopy] of routeExpectations) {
  test(`server-renders ${route}`, async () => {
    const response = await render(route);
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

    const html = await response.text();
    for (const copy of expectedCopy) assert.match(html, new RegExp(copy));
    assert.doesNotMatch(html, /Your site is taking shape|Building your site|codex-preview/i);
  });
}

test("emits FITFORTUNE metadata", async () => {
  const response = await render("/");
  const html = await response.text();
  assert.match(html, /<html lang="th">/i);
  assert.match(html, /<title>FITFORTUNE — เปิดดวง ฟิตสุขภาพ<\/title>/i);
  assert.match(html, /og-v3\.png/i);
  assert.match(html, /favicon\.svg/i);
});

test("all referenced runtime assets exist", async () => {
  const sourceFiles = [
    "app/globals.css",
    "app/page.tsx",
    "app/today/page.tsx",
    "app/challenge/page.tsx",
    "components/fitfortune/ui.tsx",
    "components/fitfortune/congrats-actions.tsx",
    "content/fitfortune.ts",
  ];

  const contents = await Promise.all(sourceFiles.map((file) => readFile(new URL(`../${file}`, import.meta.url), "utf8")));
  const assetPaths = new Set(contents.flatMap((source) => [...source.matchAll(/\/assets\/[A-Za-z0-9_./-]+/g)].map(([path]) => path)));

  assert.ok(assetPaths.size > 0);
  await Promise.all([...assetPaths].map((assetPath) => access(new URL(`../public${assetPath}`, import.meta.url))));
});

test("starter-only source files are removed", async () => {
  const removedFiles = [
    "app/chatgpt-auth.ts",
    "db/index.ts",
    "examples/d1/app/api/notes/route.ts",
    "drizzle.config.ts",
  ];

  for (const file of removedFiles) {
    await assert.rejects(access(new URL(`../${file}`, import.meta.url)));
  }
});

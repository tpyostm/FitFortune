import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const outputDir = join(projectRoot, "dist-pages");
const indexPath = join(outputDir, "index.html");
const indexHtml = await readFile(indexPath, "utf8");
const routeFiles = [
  "today/index.html",
  "exercise/index.html",
  "exercise/challenge/index.html",
  "complete/index.html",
  "challenge/index.html",
];

for (const routeFile of routeFiles) {
  const destination = join(outputDir, routeFile);
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, indexHtml);
}

await copyFile(indexPath, join(outputDir, "404.html"));
await writeFile(join(outputDir, ".nojekyll"), "");

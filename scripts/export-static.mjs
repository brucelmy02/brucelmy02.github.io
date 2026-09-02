import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, "..");
const clientDirectory = path.join(projectRoot, "dist", "client");
const outputDirectory = path.join(projectRoot, "out");
const workerUrl = pathToFileURL(path.join(projectRoot, "dist", "server", "index.js"));

workerUrl.searchParams.set("static-export", String(Date.now()));

const { default: worker } = await import(workerUrl.href);
const response = await worker.fetch(
  new Request("https://brucelmy02.github.io/", {
    headers: { accept: "text/html" },
  }),
  {
    ASSETS: {
      fetch: async () => new Response("Not found", { status: 404 }),
    },
  },
  {
    waitUntil() {},
    passThroughOnException() {},
  },
);

if (!response.ok) {
  throw new Error(`Static rendering failed with status ${response.status}`);
}

const html = await response.text();

if (!html.includes("<title>Muyu Liu</title>")) {
  throw new Error("Static rendering did not produce the expected homepage title");
}

if (html.includes("localhost:3000")) {
  throw new Error("Static rendering still contains a localhost URL");
}

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });
await cp(clientDirectory, outputDirectory, { recursive: true });
await writeFile(path.join(outputDirectory, "index.html"), html, "utf8");
await writeFile(path.join(outputDirectory, "404.html"), html, "utf8");
await writeFile(path.join(outputDirectory, ".nojekyll"), "", "utf8");

console.log("Static site exported to out/");

import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", String(process.pid) + "-" + String(Date.now()));
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
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
}

test("server-renders the personal homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Muyu Liu<\/title>/i);
  assert.doesNotMatch(html, /I study how generative models can be steered/);
  assert.match(html, /id="about"/);
  assert.match(html, /My name is Muyu Liu \(柳沐雨 in Chinese\)/);
  assert.doesNotMatch(html, /M\.Sc\. candidate, Computer Science/);
  assert.doesNotMatch(html, /Rather than retraining a model for every new task/);
  assert.doesNotMatch(html, /I also work on efficient autoregressive video generation/);
  assert.match(html, /<h3>Diffusion Models<\/h3>/);
  assert.match(html, /Diffusion Models for Inverse Problems/);
  assert.match(html, /Diffusion Bridges/);
  assert.match(html, /<h3>Autoregressive Video Generation<\/h3>/);
  assert.match(html, /Long-Form Video Generation/);
  assert.match(html, /KV Cache Compression/);
  assert.match(html, /id="experience"/);
  assert.match(html, /id="publications"/);
  assert.doesNotMatch(html, /class="hero-meta"/);
  assert.doesNotMatch(html, /Generative models, structured inference, and visual computing/);
  assert.match(html, /href="#experience">Experience<\/a>/);
  assert.match(html, /href="https:\/\/github\.com\/brucelmy02"[^>]*aria-label="GitHub profile"/);
  assert.match(html, /href="https:\/\/scholar\.google\.com\/citations\?hl=zh-CN&amp;user=IE-DDTEAAAAJ"[^>]*aria-label="Google Scholar"/);
  assert.match(html, /href="mailto:liumy2024@shanghaitech\.edu\.cn"[^>]*aria-label="Email Muyu Liu"/);
  assert.match(html, /ShanghaiTech University/);
  assert.match(html, /Shandong University/);
  assert.match(html, />vivo</);
  assert.match(html, /AIGC Algorithm Intern/);
  assert.doesNotMatch(html, /Imaging Algorithm Research Department/);
  assert.doesNotMatch(html, /approximately 50%/);
  assert.match(html, /href="https:\/\/duchenhe\.com\/en\/"[^>]*>Chenhe Du<\/a>/);
  assert.match(html, /href="https:\/\/meijitian\.github\.io\/"[^>]*>Xuanyu Tian<\/a>/);
  assert.match(html, /href="https:\/\/iwuqing\.github\.io\/"[^>]*>Qing Wu<\/a>/);
  assert.match(html, /class="section-index" aria-hidden="true">03<\/div>/);
  assert.equal((html.match(/class="signature-curve"/g) ?? []).length, 4);
  assert.match(html, /property="og:image"/);
  assert.match(html, /https:\/\/brucelmy02\.github\.io\/og\.png/);
});

test("keeps the compact content layout responsive and its logos local", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const logoRoot = new URL("../public/logos/", import.meta.url);

  await Promise.all([
    access(new URL("shanghaitech-v2.svg", logoRoot)),
    access(new URL("sdu-v2.svg", logoRoot)),
    access(new URL("vivo-v2.svg", logoRoot)),
    access(new URL("../public/og.png", import.meta.url)),
    access(new URL("../scripts/export-static.mjs", import.meta.url)),
    access(new URL("../.github/workflows/deploy-pages.yml", import.meta.url)),
  ]);

  assert.match(css, /\.experience-inner,\s*\n\.publications-inner\s*\{/);
  assert.match(css, /\.experience-entry\s*\{/);
  assert.match(css, /grid-template-columns:\s*120px 146px minmax\(0, 1fr\)/);
  assert.match(css, /grid-template-columns:\s*26px minmax\(230px, 280px\) minmax\(0, 1fr\)/);
  assert.match(css, /@media \(max-width:\s*1100px\)/);
  assert.match(css, /@media \(max-width:\s*900px\)/);
  assert.match(css, /@media \(max-width:\s*640px\)/);
  assert.match(css, /\.experience-logo\s*\{[^}]*background:\s*transparent;/);
  assert.match(css, /\.experience-logo\s*\{[^}]*box-shadow:\s*none;/);
  assert.match(css, /\.section-heading \.signature-curve\s*\{/);
  assert.match(css, /\.research-interest-groups\s*\{[^}]*grid-template-columns:\s*1fr;/);
  assert.match(css, /\.research-focus ul\s*\{[^}]*padding:\s*0 0 0 18px;/);
  assert.match(css, /--font-display:[^;]*sans-serif;/);
  assert.match(css, /--font-body:[^;]*sans-serif;/);
  assert.doesNotMatch(css, /Georgia|Baskerville|Iowan Old Style|Songti SC|SimSun/);
  assert.match(css, /\.publications\s*\{[^}]*color:\s*var\(--ink\);[^}]*background:\s*var\(--paper\);/);
  assert.doesNotMatch(css, /nav a:nth-child\(2\)/);
});

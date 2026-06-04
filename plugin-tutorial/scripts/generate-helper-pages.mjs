import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { allHelpers } from "../course-data.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const siteRoot = join(__dirname, "..");
const helpersRoot = join(siteRoot, "helpers");

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function helperShell(helper) {
  const title = `${helper.name} | Codex in Plain English for Plugins`;
  const description = `${helper.name} in plain English: when to use it, what to ask, and what proof to expect.`;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="${escapeHtml(description)}" />
    <title>${escapeHtml(title)}</title>
    <link rel="icon" href="../../favicon-trex.svg" type="image/svg+xml" />
    <link rel="stylesheet" href="../../styles.css" />
  </head>
  <body>
    <a class="skip-link" href="#main">Skip to main content</a>
    <header class="top-nav subpage-nav">
      <div class="top-nav-inner">
        <a href="../../" class="top-nav-brand" aria-label="Codex in Plain English for Plugins">
          <span class="top-nav-brand-dex" aria-hidden="true">🦖</span>
          <span class="top-nav-brand-text top-nav-brand-text-full" aria-hidden="true">Codex in Plain English</span>
          <span class="top-nav-brand-text top-nav-brand-text-compact" aria-hidden="true">Plugins</span>
        </a>
        <nav class="top-nav-links" aria-label="Primary">
          <a class="top-nav-link" href="../../">Home</a>
          <a class="top-nav-link active" href="../">Helpers</a>
          <a class="top-nav-link" href="../../chatgpt/">Connect</a>
        </nav>
        <div class="top-nav-actions">
          <a href="../" class="top-nav-cta">Helper map</a>
        </div>
      </div>
    </header>
    <main id="main" class="subpage-main">
      <div class="page-container helper-page" id="helperDetail"></div>
    </main>
    <script type="module" src="../../helper-detail.js"></script>
  </body>
</html>
`;
}

await mkdir(helpersRoot, { recursive: true });

for (const helper of allHelpers()) {
  const pageDir = join(helpersRoot, helper.slug);
  await mkdir(pageDir, { recursive: true });
  await writeFile(join(pageDir, "index.html"), helperShell(helper));
}

console.log(`Generated ${allHelpers().length} helper pages.`);

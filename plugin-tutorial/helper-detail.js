import { findHelperBySlug } from "./course-data.mjs";

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const pathParts = window.location.pathname.split("/").filter(Boolean);
let slug = pathParts[pathParts.length - 1] || "";
if (slug === "index.html") {
  slug = pathParts[pathParts.length - 2] || "";
}
const helper = findHelperBySlug(slug);
const root = document.getElementById("helperDetail");

if (!helper) {
  root.innerHTML = `
    <section class="helper-detail-hero">
      <p class="section-kicker">Helper guide</p>
      <h1>Helper not found</h1>
      <p>This guide may not have been generated yet.</p>
      <a class="btn btn-primary" href="../">Back to the helper map</a>
    </section>
  `;
} else {
  const safe = Object.fromEntries(
    Object.entries(helper).map(([key, value]) => [key, escapeHtml(value)])
  );

  document.title = `${helper.name} | Codex in Plain English for Plugins`;
  document.querySelector("meta[name='description']")?.setAttribute(
    "content",
    `${helper.name} in plain English: when to use it, what to ask, and what proof to expect.`
  );

  root.innerHTML = `
    <nav class="helper-breadcrumb" aria-label="Breadcrumb">
      <a href="../../">Course</a>
      <span>/</span>
      <a href="../">Helper map</a>
      <span>/</span>
      <strong>${safe.name}</strong>
    </nav>

    <section class="helper-detail-hero">
      <p class="section-kicker">${safe.plainTitle}</p>
      <h1>${safe.name}</h1>
      <p>${safe.description}</p>
    </section>

    <section class="helper-detail-grid" aria-label="${safe.name} guide">
      <article class="helper-detail-panel helper-detail-panel-large">
        <span>Use it when</span>
        <h2>${safe.job}</h2>
        <p>Say the task in normal language first. Codex can decide whether this helper is the right doorway.</p>
      </article>
      <article class="helper-detail-panel">
        <span>First tiny test</span>
        <p>${safe.tinyTest}</p>
      </article>
      <article class="helper-detail-panel">
        <span>Watch out for</span>
        <p>${safe.watchOut}</p>
      </article>
    </section>

    <section class="helper-tutorial-block" aria-labelledby="mini-lesson-title">
      <div class="helper-tutorial-copy">
        <p class="section-kicker">Mini lesson</p>
        <h2 id="mini-lesson-title">How to start without knowing the technical name</h2>
        <p>
          Treat ${safe.name} as one option Codex may use, not a magic word you have to memorize.
          Start with the work, the boundary, and the proof you need before you trust the result.
        </p>
      </div>
      <ol class="helper-lesson-steps">
        <li>
          <strong>Say the job</strong>
          <span>Name the outcome in normal language, like follow up, compare options, fix this page, or draft the artifact.</span>
        </li>
        <li>
          <strong>Ask for one safe check</strong>
          <span>${safe.tinyTest}</span>
        </li>
        <li>
          <strong>Review the proof</strong>
          <span>${safe.proof}</span>
        </li>
      </ol>
    </section>

    <section class="helper-prompt-block" aria-labelledby="starter-prompt-title">
      <div>
        <p class="section-kicker">Starter prompt</p>
        <h2 id="starter-prompt-title">Try this first</h2>
      </div>
      <pre>${safe.firstAsk}</pre>
      <button class="btn btn-secondary" type="button" id="copyHelperPrompt">Copy starter prompt</button>
    </section>

    <section class="helper-practice-block" aria-labelledby="practice-title">
      <div>
        <p class="section-kicker">Practice run</p>
        <h2 id="practice-title">Before you use it on real work</h2>
      </div>
      <div class="helper-practice-grid">
        <article>
          <span>Use a harmless task</span>
          <p>${safe.tinyTest}</p>
        </article>
        <article>
          <span>Keep the boundary clear</span>
          <p>Ask Codex to draft, inspect, or summarize first. Do not let it send, buy, book, publish, or change private work until you say yes.</p>
        </article>
        <article>
          <span>Ask for the receipt</span>
          <p>${safe.proof}</p>
        </article>
      </div>
    </section>

    <section class="proof-table-wrapper helper-proof-block" aria-labelledby="proof-title">
      <h2 id="proof-title">What Codex should show you before you trust it</h2>
      <table class="content-table">
        <thead>
          <tr>
            <th>Ask for</th>
            <th>Why it matters</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-label="Ask for">Sources checked</td>
            <td data-label="Why it matters">You can tell whether Codex looked in the right place.</td>
          </tr>
          <tr>
            <td data-label="Ask for">Missing access</td>
            <td data-label="Why it matters">A helper may be installed but not signed in or allowed to see the right account.</td>
          </tr>
          <tr>
            <td data-label="Ask for">Draft or artifact</td>
            <td data-label="Why it matters">You review the output before anything external happens.</td>
          </tr>
          <tr>
            <td data-label="Ask for">Stop condition</td>
            <td data-label="Why it matters">Codex knows when to ask you before sending, booking, buying, publishing, or editing something sensitive.</td>
          </tr>
        </tbody>
      </table>
      <p class="helper-proof-note"><strong>Proof habit:</strong> ${safe.proof}</p>
    </section>

    <section class="helper-next-links" aria-label="Next steps">
      <a class="starter-card starter-card-secondary" href="../">
        <p class="starter-card-kicker">Helper map</p>
        <h3>Find another helper</h3>
        <p>Go back to the directory when the work lives somewhere else.</p>
      </a>
      <a class="starter-card starter-card-secondary" href="../../">
        <p class="starter-card-kicker">Course</p>
        <h3>Practice the loop</h3>
        <p>Go back to the course when you want to practice routing a real task.</p>
      </a>
    </section>
  `;

  document.getElementById("copyHelperPrompt")?.addEventListener("click", async (event) => {
    await navigator.clipboard.writeText(helper.firstAsk);
    event.currentTarget.textContent = "Copied";
    setTimeout(() => {
      event.currentTarget.textContent = "Copy starter prompt";
    }, 1200);
  });
}

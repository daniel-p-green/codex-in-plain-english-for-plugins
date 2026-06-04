import { findHelperBySlug } from "./course-data.mjs";

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
      <strong>${helper.name}</strong>
    </nav>

    <section class="helper-detail-hero">
      <p class="section-kicker">${helper.plainTitle}</p>
      <h1>${helper.name}</h1>
      <p>${helper.description}</p>
    </section>

    <section class="helper-detail-grid" aria-label="${helper.name} guide">
      <article class="helper-detail-panel helper-detail-panel-large">
        <span>Use it when</span>
        <h2>${helper.job}</h2>
        <p>Say the task in normal language first. Codex can decide whether this helper is the right doorway.</p>
      </article>
      <article class="helper-detail-panel">
        <span>First tiny test</span>
        <p>${helper.tinyTest}</p>
      </article>
      <article class="helper-detail-panel">
        <span>Watch out for</span>
        <p>${helper.watchOut}</p>
      </article>
    </section>

    <section class="helper-prompt-block" aria-labelledby="starter-prompt-title">
      <div>
        <p class="section-kicker">Starter prompt</p>
        <h2 id="starter-prompt-title">Try this first</h2>
      </div>
      <pre>${helper.firstAsk}</pre>
      <button class="btn btn-secondary" type="button" id="copyHelperPrompt">Copy starter prompt</button>
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
      <p class="helper-proof-note"><strong>Proof habit:</strong> ${helper.proof}</p>
    </section>

    <section class="helper-next-links" aria-label="Next steps">
      <a class="starter-card starter-card-secondary" href="../">
        <p class="starter-card-kicker">Helper map</p>
        <h3>Find another helper</h3>
        <p>Go back to the directory when the work lives somewhere else.</p>
      </a>
      <a class="starter-card starter-card-secondary" href="../../chatgpt/">
        <p class="starter-card-kicker">Sign-in truth</p>
        <h3>Connect with ChatGPT</h3>
        <p>Understand what this website can and cannot do for login.</p>
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

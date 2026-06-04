import { allHelpers, helperGroups, slugify } from "./course-data.mjs";

const helperCount = allHelpers().length;
const countNode = document.getElementById("helperCount");
const groupNode = document.getElementById("helperGroups");
const searchNode = document.getElementById("helperSearch");

if (countNode) {
  countNode.textContent = String(helperCount);
}

function renderGroups(query = "") {
  const normalizedQuery = query.trim().toLowerCase();

  groupNode.innerHTML = helperGroups.map((group) => {
    const helpers = group.helpers
      .map(([name, description]) => ({ name, description, slug: slugify(name) }))
      .filter((helper) => {
        if (!normalizedQuery) return true;
        return `${helper.name} ${helper.description} ${group.title} ${group.job}`.toLowerCase().includes(normalizedQuery);
      });

    if (!helpers.length) return "";

    return `
      <section class="helper-directory-group">
        <div class="helper-directory-group-copy">
          <p class="section-kicker">${group.plainTitle}</p>
          <h2>${group.title}</h2>
          <p>${group.job}</p>
          <div class="plugin-proof"><strong>Proof:</strong> ${group.proof}</div>
        </div>
        <div class="helper-card-grid">
          ${helpers.map((helper) => `
            <a class="helper-card" href="./${helper.slug}/">
              <strong>${helper.name}</strong>
              <span>${helper.description}</span>
            </a>
          `).join("")}
        </div>
      </section>
    `;
  }).join("");
}

searchNode?.addEventListener("input", (event) => {
  renderGroups(event.target.value);
});

renderGroups();

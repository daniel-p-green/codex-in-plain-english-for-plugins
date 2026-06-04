const moduleIds = ["router", "prompts", "lab", "stack", "directory"];
const completed = new Set(JSON.parse(localStorage.getItem("pluginCourseCompleted") || "[]"));
const answeredQuiz = new Set();
let selectedScenarioId = localStorage.getItem("pluginCourseSelectedScenario") || "";
let promptCheckCount = 0;
let promptMeasured = false;

const scenarios = [
  {
    id: "event",
    number: "Lane 1",
    title: "Workshop follow-up",
    tag: "Private connector",
    text: "You need a recap, attendee follow-up draft, and missing-source list.",
    lane: "Slack + Gmail + Calendar + Drive + Granola + Zoom",
    why: "The work lives across messages, docs, calendar context, meeting notes, and recordings.",
    prompt: "Use Slack, Gmail, Calendar, Drive, Granola, and Zoom to draft a workshop follow-up packet. Do not send anything. Show sources checked and missing access.",
    verify: "Look for drafts, source names, missing-access notes, and no external send action."
  },
  {
    id: "repo",
    number: "Lane 2",
    title: "Repo fix",
    tag: "Local or GitHub",
    text: "You want a bug fixed, tested, and explained from a GitHub repo.",
    lane: "GitHub + Browser + Computer Use",
    why: "GitHub gives repo context, Browser checks the visible app, and Computer Use can inspect desktop surfaces.",
    prompt: "Inspect the repo and live route, fix the bug, run the narrowest useful checks, and summarize what changed with file links.",
    verify: "Look for changed files, test output, and a live-route or screenshot check."
  },
  {
    id: "design",
    number: "Lane 3",
    title: "Prototype an idea",
    tag: "Visual workspace",
    text: "You have a rough product idea and want something people can click.",
    lane: "Product Design + Figma + Browser",
    why: "Product Design turns briefs, URLs, and screenshots into reviewable prototypes and audits.",
    prompt: "Turn this product idea into three directions, then build a clickable prototype after I choose one. Verify desktop and mobile.",
    verify: "Look for directions first, then a runnable prototype with responsive checks."
  },
  {
    id: "creative",
    number: "Lane 4",
    title: "Social asset pack",
    tag: "Public-demo safe if sanitized",
    text: "You need polished image or video variants from a brief or source asset.",
    lane: "Creative Production + Canva + Fal + Adobe + Remotion/HyperFrames",
    why: "Creative Production explores directions; Canva and Adobe polish assets; Remotion and HyperFrames help with video.",
    prompt: "Create three social directions from this brief, keep claims honest, and turn the selected direction into export-ready assets.",
    verify: "Look for reviewable variants, source and claim notes, and final files or design links."
  },
  {
    id: "data",
    number: "Lane 5",
    title: "Metric question",
    tag: "Source-backed",
    text: "You need to understand why a number changed and package the answer.",
    lane: "Data Analytics + Spreadsheets + Drive",
    why: "Data Analytics is for metric movement, dashboards, KPI readouts, and evidence-backed reports.",
    prompt: "Analyze why this metric changed, show assumptions and caveats, then create a short report with charts.",
    verify: "Look for source tables, calculations, caveats, and a chart or report artifact."
  },
  {
    id: "course",
    number: "Lane 6",
    title: "Teaching material",
    tag: "Artifact",
    text: "You want a beginner-friendly lesson, deck, or reusable handout.",
    lane: "Documents + Presentations + Drive + Browser",
    why: "The artifact matters more than the connector. Build reusable course material and verify it opens.",
    prompt: "Turn this topic into a beginner lesson with exercises, a short deck outline, and a reusable handout.",
    verify: "Look for a document or deck artifact plus a quick readability and opening check."
  }
];

const pluginGroups = [
  {
    title: "Everyday Context And Relationships",
    job: "Find the surrounding conversation, prepare meetings, follow up, or use relationship context.",
    proof: "Source names, timestamps, draft outputs, missing access, and no external send unless approved.",
    plugins: [
      ["Slack", "Search channels, threads, files, and people; draft messages or canvases."],
      ["Gmail", "Find emails, triage inbox context, and draft replies."],
      ["Google Calendar", "Check schedules, availability, meeting prep, and daily briefs."],
      ["Google Drive", "Work across Drive, Docs, Sheets, and Slides files."],
      ["Granola", "Use meeting notes and transcripts as source context."],
      ["Zoom", "Use post-meeting summaries, recordings, documents, and moments."],
      ["Happenstance", "Search your professional network and warm intro paths."],
      ["Sales", "Prepare sales meetings, follow up, review pipeline, and reuse preferences."]
    ]
  },
  {
    title: "Build, Debug, And Ship Software",
    job: "Inspect code, implement changes, test apps, deploy projects, or work with developer platforms.",
    proof: "Changed files, command output, route checks, screenshots, deployment URLs, logs, or blockers.",
    plugins: [
      ["GitHub", "Inspect repos, issues, pull requests, CI, and publish changes."],
      ["Browser", "Use the Codex in-app browser for local routes, file URLs, and localhost checks."],
      ["Chrome", "Automate authenticated remote pages, Chrome profiles, tabs, cookies, and extensions."],
      ["Computer Use", "Control desktop apps on macOS when the work is outside the browser or repo."],
      ["OpenAI Developers", "Build with OpenAI APIs, Agents SDK, ChatGPT Apps, and API keys."],
      ["ChatGPT Apps", "Build and prepare ChatGPT Apps and submission materials."],
      ["Build Web Apps", "Build frontend apps, components, browser tests, payments, and web patterns."],
      ["Build iOS Apps", "Build and debug iOS apps with SwiftUI, simulators, and performance workflows."],
      ["Build macOS Apps", "Build, run, test, debug, and package macOS apps."],
      ["Expo", "Build, debug, upgrade, and deploy Expo or React Native apps."],
      ["Test Android Apps", "Test Android apps with emulator, screenshots, logs, and performance checks."],
      ["Cloudflare", "Build Workers, Agents SDK projects, MCP servers, and Cloudflare deployments."],
      ["Vercel", "Build and deploy web apps and agents."],
      ["Lovable", "Build and inspect Lovable app projects."]
    ]
  },
  {
    title: "Data, Databases, Finance, And Reports",
    job: "Answer metric questions, build dashboards, work with spreadsheets, databases, or market analysis.",
    proof: "Source rows, queries, metric definitions, caveats, chart artifacts, and refresh boundaries.",
    plugins: [
      ["Data Analytics", "Analyze usage, metric movement, KPIs, dashboards, reports, and semantic layers."],
      ["Build Web Data Visualization", "Create charts, maps, dashboards, reports, and data stories."],
      ["Spreadsheets", "Create, edit, analyze, visualize, and export spreadsheet workbooks."],
      ["Neon Postgres", "Manage Neon projects, branches, databases, schemas, and SQL queries."],
      ["Supabase", "Manage Supabase projects, Postgres tables, auth, migrations, and edge functions."],
      ["Public Equity Investing", "Research public companies, earnings, valuation, catalysts, and memos."],
      ["Investment Banking", "Support M&A, valuation, diligence, pitch materials, and deal workflows."]
    ]
  },
  {
    title: "Design, Creative, Media, And Games",
    job: "Make visual artifacts, prototypes, videos, campaign directions, game experiences, or generated media.",
    proof: "Reviewable variants, design links, exported files, screenshots, claim notes, and selected direction.",
    plugins: [
      ["Product Design", "Turn ideas, screenshots, or URLs into prototypes, audits, and product directions."],
      ["Figma", "Read, generate, edit, and sync designs, FigJam diagrams, and Figma Slides."],
      ["Canva", "Create and edit social posts, presentations, and brand assets."],
      ["adobe-for-creativity", "Use Adobe tools for images, vectors, design, batch edits, and video polish."],
      ["Adobe Acrobat", "Transform, organize, compress, OCR, redact, split, merge, and convert PDFs."],
      ["Adobe Express", "Design flyers, invitations, social graphics, and lightweight branded assets."],
      ["Adobe Photoshop", "Edit images, change backgrounds, remove objects, retouch, and stylize photos."],
      ["Creative Production", "Explore campaigns, offers, moodboards, product placements, and launch assets."],
      ["Fal", "Generate and edit images, video, audio, 3D assets, and media jobs."],
      ["HeyGen", "Create avatar videos, video translations, voices, and personalized presenter content."],
      ["HyperFrames by HeyGen", "Write HTML and render motion graphics, captions, voiceovers, and website video."],
      ["Remotion", "Build programmatic videos with React, animation, captions, and audio."],
      ["Game Studio", "Design, prototype, playtest, and ship browser games with 2D or 3D workflows."]
    ]
  },
  {
    title: "Documents, Research, Models, And Technical Knowledge",
    job: "Create polished documents, presentations, research synthesis, model work, or technical artifacts.",
    proof: "Exported files, source lists, citations, rendered artifacts, compiled output, or reviewed examples.",
    plugins: [
      ["Documents", "Create and edit document artifacts, including Word files and Google Docs."],
      ["Presentations", "Create, edit, render, verify, and export slide decks or PowerPoint files."],
      ["LaTeX", "Compile LaTeX projects with bundled Tectonic or larger TeX runtimes."],
      ["Hugging Face", "Inspect models, datasets, Spaces, papers, training jobs, and community evals."],
      ["Life Science Research", "Route and synthesize life-sciences evidence, datasets, biology, chemistry, and clinical sources."],
      ["NVIDIA", "Navigate GPU acceleration, CUDA, inference, robotics, Omniverse, and simulation workflows."]
    ]
  },
  {
    title: "Consumer, Commerce, Travel, And Safety Apps",
    job: "Research purchases, travel, reservations, rides, food, homes, events, learning, markets, or suspicious links.",
    proof: "Live result links, prices or ranges, dates, locations, risk notes, and a clear handoff before buying or booking.",
    plugins: [
      ["Alpaca", "Ask live market-data questions about stocks, options, crypto, and historical performance."],
      ["Coursera", "Find relevant courses and video lectures for learning goals."],
      ["Malwarebytes", "Check suspicious links, domains, emails, phone numbers, and phishing risk."],
      ["OpenTable", "Find restaurant reservations."],
      ["StubHub", "Search live events and ticket listings."],
      ["Target", "Browse products, plan baskets, and prepare shopping lists or checkout handoffs."],
      ["Tripadvisor", "Research hotels, neighborhoods, reviews, amenities, photos, and booking options."],
      ["Uber", "Estimate real-time US ride fares and ride options."],
      ["Uber Eats", "Find deliverable restaurants and dishes."],
      ["Zillow", "Search homes or rentals and compare real-estate options."]
    ]
  },
  {
    title: "Agent Workflows, Security, Evaluation, And Local Power Tools",
    job: "Plan agentic work, evaluate plugins, scan security risk, manage goals, or use local helper workflows.",
    proof: "Plans, findings, reports, receipts, verified scans, saved knowledge, or explicit stop conditions.",
    plugins: [
      ["Codex Security", "Run security scans, threat models, attack-path analysis, and finding validation."],
      ["Plugin Eval", "Evaluate Codex skills and plugins with guided reports and benchmarks."],
      ["GoalBuddy", "Turn broad work into goal runs with boards, pressure, receipts, and verification."],
      ["compound-knowledge", "Brainstorm, plan, review, execute, and save knowledge compounds."],
      ["Superpowers", "Use structured software-development methods for planning, TDD, debugging, and collaboration."],
      ["Techwerker", "Use local Tech Week planning helpers, RSVP queues, and event state."]
    ]
  }
];

const quizItems = [
  {
    question: "You just finished a Zoom or Granola-heavy meeting and need follow-up notes with exact source boundaries.",
    correct: "Granola / Zoom",
    options: ["Granola / Zoom", "Vercel", "Game Studio"],
    note: "Meeting context first. Re-read the current note before editing or quoting."
  },
  {
    question: "You want to audit a live onboarding flow and produce screenshot-backed UX findings.",
    correct: "Product Design",
    options: ["Product Design", "Gmail", "LaTeX"],
    note: "Use Product Design when the job is a flow, prototype, screen, URL, or UX critique."
  },
  {
    question: "You need a polished social image set for a public workshop recap.",
    correct: "Creative Production",
    options: ["Creative Production", "Neon Postgres", "Codex Security"],
    note: "Creative Production handles creative routes; Canva/Fal/Adobe can help produce and polish."
  },
  {
    question: "You need to explain a metric movement and make a source-backed dashboard.",
    correct: "Data Analytics",
    options: ["Data Analytics", "Happenstance", "Chrome"],
    note: "Data Analytics is the right lane for business questions, KPIs, charts, and dashboards."
  }
];

const checklistItems = [
  {
    title: "Auth check",
    text: "Can Codex access the connector without asking you to sign in again?"
  },
  {
    title: "Read smoke test",
    text: "Ask for one harmless search or recent item. Confirm it returns the expected kind of result."
  },
  {
    title: "Write boundary",
    text: "Confirm whether the plugin can draft only, edit local artifacts, or perform external actions."
  },
  {
    title: "Privacy rule",
    text: "Decide whether this plugin is safe for demos or should stay off in public screenshares."
  },
  {
    title: "Done signal",
    text: "Write what proof you expect: file path, source list, screenshot, test output, draft, or published link."
  }
];

function saveProgress() {
  localStorage.setItem("pluginCourseCompleted", JSON.stringify([...completed]));
  const completeCount = moduleIds.filter((id) => completed.has(id)).length;
  const pct = Math.round((completeCount / moduleIds.length) * 100);
  const xp = completeCount * 125 + answeredQuiz.size * 25;
  document.getElementById("progressText").textContent = `${pct}% complete`;
  document.getElementById("xpValue").textContent = String(xp);
  document.getElementById("levelValue").textContent = `Lv.${Math.max(1, Math.ceil((xp || 1) / 250))}`;
  document.getElementById("completeCount").textContent = `${completeCount}/${moduleIds.length}`;
  document.getElementById("quizCount").textContent = `${answeredQuiz.size}/${quizItems.length}`;
  const checked = [...document.querySelectorAll(".check-item input")].filter((item) => item.checked).length;
  document.getElementById("setupCount").textContent = `${checked}/${checklistItems.length}`;
  document.getElementById("proofHabitCount").textContent = `${getProofHabitCount()}/3`;
  document.getElementById("sidebarStatus").textContent = pct === 100 ? "Done" : "Start";
  localStorage.setItem("pluginCourseChecklist", JSON.stringify([...document.querySelectorAll(".check-item input")].map((item) => item.checked)));
  renderMilestones();
}

function getCorrectQuizCount() {
  return [...document.querySelectorAll(".quiz-card")].filter((card) => {
    const selected = card.querySelector(".quiz-option.selected");
    return selected?.classList.contains("correct");
  }).length;
}

function getChecklistCount() {
  return [...document.querySelectorAll(".check-item input")].filter((item) => item.checked).length;
}

function getProofHabitCount() {
  const checklist = [...document.querySelectorAll(".check-item input")];
  const hasDoneSignal = checklist[4]?.checked ? 1 : 0;
  const hasScenario = selectedScenarioId ? 1 : 0;
  const hasCompletePrompt = promptCheckCount === 6 ? 1 : 0;
  return hasScenario + hasCompletePrompt + hasDoneSignal;
}

function getMilestones() {
  const completeCount = moduleIds.filter((id) => completed.has(id)).length;
  return [
    {
      title: "Routing accuracy",
      value: getCorrectQuizCount(),
      target: quizItems.length,
      unit: "correct",
      description: "Can choose the right plugin lane from real work prompts."
    },
    {
      title: "Prompt completeness",
      value: promptCheckCount,
      target: 6,
      unit: "checks",
      description: "Includes goal, context, boundary, deliverable, proof, and stop condition."
    },
    {
      title: "Setup readiness",
      value: getChecklistCount(),
      target: checklistItems.length,
      unit: "checks",
      description: "Verifies auth, smoke test, write boundary, privacy rule, and done signal."
    },
    {
      title: "Proof habit",
      value: getProofHabitCount(),
      target: 3,
      unit: "signals",
      description: "Selects a scenario, writes a complete prompt, and names expected proof."
    },
    {
      title: "Course completion",
      value: completeCount,
      target: moduleIds.length,
      unit: "modules",
      description: "Finishes the core learning path without relying on passive reading."
    }
  ];
}

function renderMilestones() {
  const grid = document.getElementById("milestoneGrid");
  if (!grid) return;
  const milestones = getMilestones();
  const totalPct = Math.round(
    milestones.reduce((sum, item) => sum + Math.min(item.value / item.target, 1), 0) / milestones.length * 100
  );

  document.getElementById("milestoneScore").textContent = `${totalPct}%`;
  document.getElementById("dashboardMilestoneScore").textContent = `${totalPct}%`;
  grid.innerHTML = milestones.map((item) => {
    const pct = Math.round(Math.min(item.value / item.target, 1) * 100);
    return `
      <article class="milestone-card">
        <div class="milestone-card-head">
          <h3>${item.title}</h3>
          <span>${item.value}/${item.target} ${item.unit}</span>
        </div>
        <div class="milestone-track" aria-label="${item.title}: ${pct}% complete">
          <div class="milestone-fill" style="width: ${pct}%"></div>
        </div>
        <p>${item.description}</p>
      </article>
    `;
  }).join("");
}

function renderScenarios() {
  const grid = document.getElementById("scenarioGrid");
  grid.innerHTML = scenarios.map((item) => `
    <button class="module-card scenario-card" type="button" data-scenario="${item.id}">
      <span class="module-card-release updated">${item.number}</span>
      <div class="module-card-meta">
        <span class="module-card-number">Plugin lane</span>
        <span class="scenario-tag">${item.tag}</span>
      </div>
      <h3>${item.title}</h3>
      <p>${item.text}</p>
      <div class="module-card-progress" aria-hidden="true"><div class="module-card-progress-fill"></div></div>
    </button>
  `).join("");

  grid.addEventListener("click", (event) => {
    const card = event.target.closest(".scenario-card");
    if (!card) return;
    const item = scenarios.find((scenario) => scenario.id === card.dataset.scenario);
    selectedScenarioId = item.id;
    localStorage.setItem("pluginCourseSelectedScenario", selectedScenarioId);
    document.querySelectorAll(".scenario-card").forEach((node) => node.classList.toggle("active", node === card));
    document.getElementById("scenarioAnswer").innerHTML = `
      <h3>${item.title}</h3>
      <div class="answer-grid">
        <div><span>Use</span><strong>${item.lane}</strong></div>
        <div><span>Why</span><p>${item.why}</p></div>
        <div><span>Try</span><p>${item.prompt}</p></div>
        <div><span>Verify</span><p>${item.verify}</p></div>
      </div>
      <button class="btn btn-secondary scenario-copy" type="button" data-copy-prompt="${item.id}">Copy starter prompt</button>
    `;
    saveProgress();
  });

  document.getElementById("scenarioAnswer").addEventListener("click", async (event) => {
    const button = event.target.closest(".scenario-copy");
    if (!button) return;
    const item = scenarios.find((scenario) => scenario.id === button.dataset.copyPrompt);
    await navigator.clipboard.writeText(item.prompt);
    button.textContent = "Copied";
    setTimeout(() => (button.textContent = "Copy starter prompt"), 1200);
  });
}

function renderPluginDirectory() {
  const directory = document.getElementById("pluginDirectory");
  if (!directory) return;
  const pluginCount = pluginGroups.reduce((sum, group) => sum + group.plugins.length, 0);
  document.getElementById("pluginCount").textContent = String(pluginCount);
  directory.innerHTML = pluginGroups.map((group) => `
    <article class="plugin-directory-group">
      <div class="plugin-directory-group-head">
        <h3>${group.title}</h3>
        <span>${group.plugins.length} plugins</span>
      </div>
      <p>${group.job}</p>
      <div class="plugin-proof"><strong>Proof:</strong> ${group.proof}</div>
      <div class="plugin-list">
        ${group.plugins.map(([name, description]) => `
          <div class="plugin-list-item">
            <strong>${name}</strong>
            <span>${description}</span>
          </div>
        `).join("")}
      </div>
    </article>
  `).join("");
}

function buildPrompt({ measure = true } = {}) {
  const form = document.getElementById("promptForm");
  const values = Object.fromEntries(new FormData(form).entries());
  const prompt = `Goal: ${values.goal}

Context: ${values.context}

Boundaries: ${values.boundaries}

Deliverable: ${values.deliverable}

Done when: ${values.done}

Stop and ask if: ${values.stop}`;

  document.getElementById("promptOutput").textContent = prompt;
  renderPromptFeedback(prompt, measure);
}

function renderPromptFeedback(prompt, measure = true) {
  const checks = [
    ["Goal", /Goal:\s+\S/i.test(prompt)],
    ["Context", /Context:\s+\S/i.test(prompt)],
    ["Boundary", /Boundaries:\s+\S/i.test(prompt)],
    ["Deliverable", /Deliverable:\s+\S/i.test(prompt)],
    ["Proof", /Done when:\s+\S/i.test(prompt)],
    ["Stop condition", /Stop and ask if:\s+\S/i.test(prompt)]
  ];
  const passed = checks.filter(([, ok]) => ok).length;
  promptMeasured = measure;
  promptCheckCount = promptMeasured ? passed : 0;
  const summary = promptMeasured
    ? `${passed}/6 prompt checks present.`
    : `Example prompt: ${passed}/6 checks present. Build your starter prompt to count it.`;
  document.getElementById("promptFeedback").innerHTML = `
    <strong>${summary}</strong>
    <span>${checks.map(([label, ok]) => `${ok ? "✓" : "•"} ${label}`).join(" · ")}</span>
  `;
  renderMilestones();
}

function renderQuiz() {
  const quiz = document.getElementById("quiz");
  quiz.innerHTML = quizItems.map((item, index) => `
    <article class="quiz-card" data-index="${index}">
      <h3>${index + 1}. ${item.question}</h3>
      <p>Choose the best lane.</p>
      <div class="quiz-options">
        ${item.options.map((option) => `<button class="quiz-option" type="button" data-answer="${option}">${option}</button>`).join("")}
      </div>
      <p class="quiz-feedback" hidden></p>
    </article>
  `).join("");

  quiz.addEventListener("click", (event) => {
    const button = event.target.closest(".quiz-option");
    if (!button) return;
    const card = button.closest(".quiz-card");
    const index = Number(card.dataset.index);
    const item = quizItems[index];
    answeredQuiz.add(index);
    card.querySelectorAll(".quiz-option").forEach((choice) => {
      choice.classList.remove("selected", "correct", "wrong");
      if (choice.dataset.answer === item.correct) choice.classList.add("correct");
    });
    button.classList.add("selected");
    if (button.dataset.answer !== item.correct) button.classList.add("wrong");
    const feedback = card.querySelector(".quiz-feedback");
    feedback.hidden = false;
    feedback.textContent = item.note;
    updateScore();
    saveProgress();
  });
}

function updateScore() {
  const correct = getCorrectQuizCount();
  document.getElementById("score").textContent = `${correct} of ${quizItems.length} correct. ${answeredQuiz.size}/${quizItems.length} attempted.`;
}

function renderChecklist() {
  const checklist = document.getElementById("setupChecklist");
  const saved = JSON.parse(localStorage.getItem("pluginCourseChecklist") || "[]");
  checklist.innerHTML = checklistItems.map((item, index) => `
    <label class="check-item module-orientation-item">
      <input type="checkbox" data-check="${index}" ${saved[index] ? "checked" : ""} />
      <span>
        <h2>${item.title}</h2>
        <p>${item.text}</p>
      </span>
    </label>
  `).join("");

  checklist.addEventListener("change", saveProgress);
}

function wireCompletion() {
  document.querySelectorAll(".complete-btn").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.complete === "all") {
        moduleIds.forEach((section) => completed.add(section));
      } else {
        completed.add(button.dataset.complete);
      }
      saveProgress();
    });
  });
}

function resetMeasurements() {
  completed.clear();
  answeredQuiz.clear();
  selectedScenarioId = "";
  localStorage.removeItem("pluginCourseCompleted");
  localStorage.removeItem("pluginCourseChecklist");
  localStorage.removeItem("pluginCourseSelectedScenario");

  document.querySelectorAll(".scenario-card").forEach((card) => card.classList.remove("active"));
  document.getElementById("scenarioAnswer").innerHTML = `
    <h3>Choose a scenario</h3>
    <p>Click a card above to see the plugin lane, starter prompt, and verification habit.</p>
  `;

  document.querySelectorAll(".quiz-option").forEach((choice) => choice.classList.remove("selected", "correct", "wrong"));
  document.querySelectorAll(".quiz-feedback").forEach((feedback) => {
    feedback.hidden = true;
    feedback.textContent = "";
  });
  document.getElementById("score").textContent = "Answer the scenarios to get your score.";

  document.querySelectorAll(".check-item input").forEach((item) => {
    item.checked = false;
  });

  buildPrompt({ measure: false });
  saveProgress();
}

function wireMeasurementReset() {
  document.getElementById("resetMeasurements").addEventListener("click", resetMeasurements);
}

function wireActiveNav() {
  const links = [...document.querySelectorAll(".left-sidebar-link, .top-nav-link")];
  const sections = [...document.querySelectorAll("main section[id]")];
  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    const id = visible.target.id;
    links.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${id}`));
  }, { rootMargin: "-25% 0px -55% 0px", threshold: [0.2, 0.5, 0.8] });
  sections.forEach((section) => observer.observe(section));
}

document.getElementById("promptForm").addEventListener("submit", (event) => {
  event.preventDefault();
  buildPrompt({ measure: true });
});

document.getElementById("copyPrompt").addEventListener("click", async () => {
  const text = document.getElementById("promptOutput").textContent;
  await navigator.clipboard.writeText(text);
  document.getElementById("copyPrompt").textContent = "Copied";
  setTimeout(() => (document.getElementById("copyPrompt").textContent = "Copy"), 1200);
});

if (location.protocol === "file:") {
  document.getElementById("serverNotice").hidden = false;
}

renderScenarios();
renderPluginDirectory();
renderQuiz();
renderChecklist();
wireCompletion();
wireMeasurementReset();
wireActiveNav();
buildPrompt({ measure: false });
saveProgress();

const moduleIds = ["router", "prompts", "lab", "stack"];
const completed = new Set(JSON.parse(localStorage.getItem("pluginCourseCompleted") || "[]"));
const answeredQuiz = new Set();
let selectedScenarioId = localStorage.getItem("pluginCourseSelectedScenario") || "";
let promptCheckCount = 0;
let promptMeasured = false;

const scenarios = [
  {
    id: "event",
    number: "Lane 1",
    title: "Follow up after an event",
    tag: "Private app access",
    text: "You need a recap, a thank-you note, and a list of anything still missing.",
    lane: "Slack + Gmail + Calendar + Drive + Granola + Zoom",
    why: "The details may be spread across messages, emails, calendar invites, notes, docs, and recordings.",
    prompt: "Help me follow up after this event. Look for the relevant messages, calendar item, notes, and docs. Draft only. Do not send anything. Tell me what you checked and what you could not access.",
    verify: "Look for a draft, a source list, missing-access notes, and no external send action."
  },
  {
    id: "repo",
    number: "Lane 2",
    title: "Fix something on a website",
    tag: "Website or files",
    text: "Something looks wrong on a site or app, and you want Codex to inspect it and explain the fix.",
    lane: "GitHub + Browser + Computer Use",
    why: "Codex may need to look at the visible page, the files behind it, and sometimes the desktop app.",
    prompt: "This page is not behaving the way I expect. Inspect the visible page and the related files, make the smallest fix, and show me what changed. Verify it in the browser.",
    verify: "Look for a before/after explanation, file links, and a browser check."
  },
  {
    id: "design",
    number: "Lane 3",
    title: "Make an idea clickable",
    tag: "Visual workspace",
    text: "You have a rough idea and want a screen, prototype, or simple flow people can react to.",
    lane: "Product Design + Figma + Browser",
    why: "Codex can turn a brief, screenshot, or URL into something easier to review.",
    prompt: "Turn this idea into three simple directions. After I pick one, make a clickable version and check it on desktop and mobile.",
    verify: "Look for directions first, then a runnable prototype with responsive checks."
  },
  {
    id: "creative",
    number: "Lane 4",
    title: "Make a social post",
    tag: "Public-demo safe if sanitized",
    text: "You need a few polished image or video options from a short brief.",
    lane: "Creative Production + Canva + Fal + Adobe + Remotion/HyperFrames",
    why: "Codex can explore directions, make variants, polish assets, and keep claims grounded.",
    prompt: "Create three social post directions from this brief. Keep claims honest. After I choose one, make the final asset and show me where it is.",
    verify: "Look for options, a selected direction, claim notes, and final files or links."
  },
  {
    id: "data",
    number: "Lane 5",
    title: "Understand a number",
    tag: "Show the source",
    text: "A number changed and you need a simple explanation with a chart or summary.",
    lane: "Data Analytics + Spreadsheets + Drive",
    why: "Codex can look at the spreadsheet or report source, explain the movement, and make a chart.",
    prompt: "Help me understand why this number changed. Show the source data you used, explain assumptions in plain English, and make a short chart or summary.",
    verify: "Look for source rows, a plain-English explanation, caveats, and a chart or report."
  },
  {
    id: "course",
    number: "Lane 6",
    title: "Turn knowledge into a handout",
    tag: "Artifact",
    text: "You want a lesson, deck, guide, checklist, or document someone else can use.",
    lane: "Documents + Presentations + Drive + Browser",
    why: "Codex can turn messy notes into a document, deck, or shareable resource.",
    prompt: "Turn this topic into a beginner-friendly handout with a short outline, exercises, and a checklist. Keep it practical and easy to skim.",
    verify: "Look for a document or deck artifact plus a quick readability and opening check."
  }
];

const pluginGroups = [
  {
    title: "Messages, Meetings, And Follow-Up",
    job: "Use this when the answer lives in email, calendar, chat, meeting notes, recordings, or your network.",
    proof: "Ask for the sources checked, draft text, missing access, and confirmation that nothing was sent.",
    plugins: [
      ["Slack", "Find messages, threads, files, and people; draft updates."],
      ["Gmail", "Find emails, sort inbox context, and draft replies."],
      ["Google Calendar", "Check schedules, availability, meeting prep, and daily briefs."],
      ["Google Drive", "Work across Drive, Docs, Sheets, and Slides files."],
      ["Granola", "Use meeting notes and transcripts as source context."],
      ["Zoom", "Use post-meeting summaries, recordings, documents, and moments."],
      ["Happenstance", "Search your professional network and warm intro paths."],
      ["Sales", "Prepare sales meetings, follow up, review pipeline, and reuse preferences."]
    ]
  },
  {
    title: "Websites, Apps, And Technical Help",
    job: "Use this when something has to be checked, fixed, tested, published, or explained by looking at a website, app, or project files.",
    proof: "Ask for what changed, what was checked, screenshots or links, and anything that still needs a human review.",
    plugins: [
      ["GitHub", "Look at project files, issues, pull requests, checks, and published changes."],
      ["Browser", "Use the Codex in-app browser for local routes, file URLs, and localhost checks."],
      ["Chrome", "Automate authenticated remote pages, Chrome profiles, tabs, cookies, and extensions."],
      ["Computer Use", "Control desktop apps on macOS when the work is outside the browser."],
      ["OpenAI Developers", "Build with OpenAI APIs, Agents SDK, ChatGPT Apps, and API keys."],
      ["ChatGPT Apps", "Build and prepare ChatGPT Apps and submission materials."],
      ["Build Web Apps", "Build websites, app screens, browser tests, payments, and web patterns."],
      ["Build iOS Apps", "Build and debug iOS apps with SwiftUI, simulators, and performance workflows."],
      ["Build macOS Apps", "Build, run, test, debug, and package macOS apps."],
      ["Expo", "Build, debug, upgrade, and deploy Expo or React Native apps."],
      ["Test Android Apps", "Test Android apps with emulator, screenshots, logs, and performance checks."],
      ["Cloudflare", "Build and publish Cloudflare-hosted apps, agents, and services."],
      ["Vercel", "Build and deploy web apps and agents."],
      ["Lovable", "Build and inspect Lovable app projects."]
    ]
  },
  {
    title: "Numbers, Spreadsheets, And Money Questions",
    job: "Use this when you need to understand a spreadsheet, chart, dashboard, database, company, market, or financial question.",
    proof: "Ask for the source data, assumptions, caveats, calculations, and a chart or plain-English summary.",
    plugins: [
      ["Data Analytics", "Explain numbers, metric changes, dashboards, reports, and business questions."],
      ["Build Web Data Visualization", "Create charts, maps, dashboards, reports, and data stories."],
      ["Spreadsheets", "Create, edit, analyze, visualize, and export spreadsheet workbooks."],
      ["Neon Postgres", "Work with Neon databases, tables, and SQL questions."],
      ["Supabase", "Manage Supabase projects, Postgres tables, auth, migrations, and edge functions."],
      ["Public Equity Investing", "Research public companies, earnings, valuation, catalysts, and memos."],
      ["Investment Banking", "Support M&A, valuation, diligence, pitch materials, and deal workflows."]
    ]
  },
  {
    title: "Design, Images, Video, And Creative Work",
    job: "Use this when you need something visual: a prototype, flyer, image, video, social post, game, or creative direction.",
    proof: "Ask for options, the selected direction, export links or files, and notes on any public claims.",
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
    title: "Docs, Slides, Research, And Learning",
    job: "Use this when you need to turn notes or sources into a document, deck, research summary, technical guide, or learning resource.",
    proof: "Ask for the finished file, source list, citations when needed, and a quick check that it opens or renders.",
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
    title: "Shopping, Travel, Food, Homes, And Safety",
    job: "Use this when you are comparing places, tickets, rides, restaurants, homes, products, courses, prices, or suspicious links.",
    proof: "Ask for live links, dates, prices, risk notes, and a clear stop before buying or booking.",
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
    title: "Planning, Safety Checks, And Power-User Workflows",
    job: "Use this when the work needs a plan, security review, evaluation, goal tracking, saved knowledge, or a local helper.",
    proof: "Ask for the plan, findings, risks, receipts, saved notes, or clear stop conditions.",
    plugins: [
      ["Codex Security", "Run security scans, threat models, attack-path analysis, and finding validation."],
      ["Plugin Eval", "Compare Codex skills and plugins with guided reports and simple benchmarks."],
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
    text: "Confirm whether the helper can draft only, edit local artifacts, or perform external actions."
  },
  {
    title: "Privacy rule",
    text: "Decide whether this helper is safe for demos or should stay off in public screenshares."
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
      title: "Choosing the helper",
      value: getCorrectQuizCount(),
      target: quizItems.length,
      unit: "correct",
      description: "Can look at a normal task and pick the right kind of help."
    },
    {
      title: "Clear request",
      value: promptCheckCount,
      target: 6,
      unit: "checks",
      description: "Says the goal, context, boundary, output, proof, and when to stop."
    },
    {
      title: "Ready to use",
      value: getChecklistCount(),
      target: checklistItems.length,
      unit: "checks",
      description: "Checks sign-in, a tiny test, privacy, limits, and what done means."
    },
    {
      title: "Trust habit",
      value: getProofHabitCount(),
      target: 3,
      unit: "signals",
      description: "Asks Codex to show what it checked before trusting the result."
    },
    {
      title: "Practice completed",
      value: completeCount,
      target: moduleIds.length,
      unit: "modules",
      description: "Finishes the course by practicing, not just reading."
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
        <span class="module-card-number">Helper type</span>
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
        <span>${group.plugins.length} helpers</span>
      </div>
      <p>${group.job}</p>
      <div class="plugin-proof"><strong>Proof:</strong> ${group.proof}</div>
      <div class="plugin-list">
        ${group.plugins.map(([name, description]) => `
          <a class="plugin-list-item" href="./helpers/${name.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}/">
            <strong>${name}</strong>
            <span>${description}</span>
          </a>
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
    <p>Click a card above to see the helper to try, starter prompt, and verification habit.</p>
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

function wireMobileMenu() {
  const button = document.querySelector(".top-nav-menu");
  const sidebarNav = document.querySelector(".left-sidebar-nav");
  if (!button || !sidebarNav) return;

  const drawer = document.createElement("div");
  drawer.className = "mobile-drawer";
  drawer.innerHTML = `
    <div class="mobile-drawer-backdrop" data-drawer-close></div>
    <div class="mobile-drawer-panel" role="dialog" aria-modal="true" aria-label="Course navigation">
      <div class="mobile-drawer-header">
        <h2>Course map</h2>
        <button class="mobile-drawer-close" type="button" aria-label="Close navigation" data-drawer-close>&times;</button>
      </div>
      <div class="mobile-drawer-content"></div>
    </div>
  `;
  drawer.querySelector(".mobile-drawer-content").append(sidebarNav.cloneNode(true));
  document.body.append(drawer);

  const setOpen = (isOpen) => {
    drawer.classList.toggle("open", isOpen);
    button.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  };

  button.setAttribute("aria-expanded", "false");
  button.addEventListener("click", () => setOpen(true));
  drawer.addEventListener("click", (event) => {
    if (event.target.closest("[data-drawer-close]") || event.target.closest("a")) {
      setOpen(false);
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });
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
wireMobileMenu();
buildPrompt({ measure: false });
saveProgress();

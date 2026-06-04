export const helperGroups = [
  {
    id: "messages",
    title: "Messages, Meetings, And Follow-Up",
    plainTitle: "When the work is in conversations",
    job: "Use this when the answer lives in email, calendar, chat, meeting notes, recordings, or your network.",
    proof: "Ask for the sources checked, draft text, missing access, and confirmation that nothing was sent.",
    firstAsk: "Help me follow up on this. Look in the relevant conversations, notes, calendar items, and files if you can. Draft only. Tell me what you checked and what you could not access.",
    tinyTest: "Ask Codex to find one harmless recent item, like a meeting title or a thread name, before asking it to draft anything.",
    watchOut: "This lane can touch private messages. Ask Codex to draft only unless you explicitly want it to send or publish.",
    helpers: [
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
    id: "websites",
    title: "Websites, Apps, And Technical Help",
    plainTitle: "When something online or on your computer needs checking",
    job: "Use this when something has to be checked, fixed, tested, published, or explained by looking at a website, app, or project files.",
    proof: "Ask for what changed, what was checked, screenshots or links, and anything that still needs a human review.",
    firstAsk: "Something is not behaving the way I expect. Inspect the visible page or files, make the smallest safe fix if needed, and show me exactly what you checked.",
    tinyTest: "Ask Codex to open the page or project and report what it sees before changing anything.",
    watchOut: "Some of these helpers are mostly for builders. If you are not building software, use the plain task first and let Codex choose whether technical help is needed.",
    helpers: [
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
    id: "numbers",
    title: "Numbers, Spreadsheets, And Money Questions",
    plainTitle: "When a number needs explaining",
    job: "Use this when you need to understand a spreadsheet, chart, dashboard, database, company, market, or financial question.",
    proof: "Ask for the source data, assumptions, caveats, calculations, and a chart or plain-English summary.",
    firstAsk: "Help me understand this number. Show the source data you used, explain assumptions in plain English, and make a short chart or summary if useful.",
    tinyTest: "Ask Codex to show a few source rows or the table name before making a conclusion.",
    watchOut: "Numbers can sound more certain than they are. Ask for denominators, date ranges, caveats, and missing data.",
    helpers: [
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
    id: "creative",
    title: "Design, Images, Video, And Creative Work",
    plainTitle: "When you need something visual",
    job: "Use this when you need something visual: a prototype, flyer, image, video, social post, game, or creative direction.",
    proof: "Ask for options, the selected direction, export links or files, and notes on any public claims.",
    firstAsk: "Create a few directions from this brief first. Keep claims honest. After I choose one, make the final asset and show me where it is.",
    tinyTest: "Ask for rough directions or a tiny draft before spending time on a polished version.",
    watchOut: "Creative tools can make things look finished before the message is true. Ask Codex to flag unsupported claims.",
    helpers: [
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
    id: "docs",
    title: "Docs, Slides, Research, And Learning",
    plainTitle: "When messy knowledge needs to become a useful artifact",
    job: "Use this when you need to turn notes or sources into a document, deck, research summary, technical guide, or learning resource.",
    proof: "Ask for the finished file, source list, citations when needed, and a quick check that it opens or renders.",
    firstAsk: "Turn this into a beginner-friendly artifact. Keep it practical, cite or list the sources you used, and check that the final file opens.",
    tinyTest: "Ask for an outline first so you can catch the wrong shape before Codex writes the full artifact.",
    watchOut: "Research and document helpers need source boundaries. Ask what was used, what was skipped, and what needs human review.",
    helpers: [
      ["Documents", "Create and edit document artifacts, including Word files and Google Docs."],
      ["Presentations", "Create, edit, render, verify, and export slide decks or PowerPoint files."],
      ["LaTeX", "Compile LaTeX projects with bundled Tectonic or larger TeX runtimes."],
      ["Hugging Face", "Inspect models, datasets, Spaces, papers, training jobs, and community evals."],
      ["Life Science Research", "Route and synthesize life-sciences evidence, datasets, biology, chemistry, and clinical sources."],
      ["NVIDIA", "Navigate GPU acceleration, CUDA, inference, robotics, Omniverse, and simulation workflows."]
    ]
  },
  {
    id: "shopping",
    title: "Shopping, Travel, Food, Homes, And Safety",
    plainTitle: "When you are comparing real-world options",
    job: "Use this when you are comparing places, tickets, rides, restaurants, homes, products, courses, prices, or suspicious links.",
    proof: "Ask for live links, dates, prices, risk notes, and a clear stop before buying or booking.",
    firstAsk: "Help me compare options for this real-world decision. Show dates, prices, links, and tradeoffs. Stop before buying, booking, ordering, or contacting anyone.",
    tinyTest: "Ask for two or three live options first and check that the location, date, and budget are right.",
    watchOut: "Anything involving money, travel, homes, or safety can change quickly. Ask Codex to verify live details and stop before purchase.",
    helpers: [
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
    id: "planning",
    title: "Planning, Safety Checks, And Power-User Workflows",
    plainTitle: "When the work needs a plan or a second look",
    job: "Use this when the work needs a plan, security review, evaluation, goal tracking, saved knowledge, or a local helper.",
    proof: "Ask for the plan, findings, risks, receipts, saved notes, or clear stop conditions.",
    firstAsk: "Help me make a plan for this work. Break it into clear steps, name the risks, and show what you will verify before calling it done.",
    tinyTest: "Ask for the plan or checklist first, then approve the next move.",
    watchOut: "These helpers can sound abstract. Keep them tied to a real task, a clear stop condition, and visible proof.",
    helpers: [
      ["Codex Security", "Run security scans, threat models, attack-path analysis, and finding validation."],
      ["Plugin Eval", "Compare Codex skills and plugins with guided reports and simple benchmarks."],
      ["GoalBuddy", "Turn broad work into goal runs with boards, pressure, receipts, and verification."],
      ["compound-knowledge", "Brainstorm, plan, review, execute, and save knowledge compounds."],
      ["Superpowers", "Use structured software-development methods for planning, TDD, debugging, and collaboration."],
      ["Techwerker", "Use local Tech Week planning helpers, RSVP queues, and event state."]
    ]
  }
];

export function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function allHelpers() {
  return helperGroups.flatMap((group) =>
    group.helpers.map(([name, description]) => ({
      name,
      slug: slugify(name),
      description,
      groupId: group.id,
      groupTitle: group.title,
      plainTitle: group.plainTitle,
      job: group.job,
      proof: group.proof,
      firstAsk: group.firstAsk,
      tinyTest: group.tinyTest,
      watchOut: group.watchOut
    }))
  );
}

export function findHelperBySlug(slug) {
  return allHelpers().find((helper) => helper.slug === slug);
}

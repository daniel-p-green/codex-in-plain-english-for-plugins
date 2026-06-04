# Codex in Plain English for Plugins

An interactive course for normal people who want Codex to help across email, calendars, docs, meetings, spreadsheets, websites, shopping, travel, and creative tools without needing to learn plugin names first.

## Publishing

This folder is deployed as a static GitHub Pages site by `.github/workflows/deploy-plugin-tutorial.yml`.

Every push or merge to `main` or `master` that changes `plugin-tutorial/**` redeploys the course.

The workflow regenerates one dedicated mini-tutorial page per helper before publishing.

This is a static course site. It can offer a ChatGPT login option only when a local Codex sign-in helper is running. The course itself does not store credentials or helper tokens.

## Open Locally

```bash
cd plugin-tutorial
node scripts/generate-helper-pages.mjs
python3 -m http.server 8765
```

Then open:

```text
http://localhost:8765/
```

## Optional ChatGPT Sign-In Helper

The public GitHub Pages course cannot talk directly to `codex app-server` from browser JavaScript because Codex rejects browser-origin WebSocket requests. The bridge below is the local helper that talks to Codex app-server from Node and returns only status or a sign-in link to the course page.

```bash
cd plugin-tutorial
node scripts/codex-login-bridge.mjs
```

Then press `Sign in` in the site header.

## Course Shape

- Overview: Who this is for and how helpers fit plain-English delegation
- Module 1: Scenario router for everyday work
- Module 2: Six-field starter prompt builder
- Module 3: Routing practice quiz
- Module 4: Where the work lives
- Helper map: Searchable directory plus one mini-tutorial page per helper
- Header login: ChatGPT login option for local Codex harnesses without API keys
- Finish: Setup and verification checklist

## Teaching Notes

The course uses the same operating loop as Codex in Plain English:

Ask -> Codex works -> Inspect -> Revise -> Verify

The point is to teach people to choose a helper based on the job:

- Messages, meetings, and follow-up: Slack, Gmail, Calendar, Drive, Granola, Zoom
- Websites, apps, and technical help: GitHub, Browser, Chrome, Computer Use, OpenAI Developers
- Docs, slides, and reports: Documents, Spreadsheets, Presentations, Data Analytics
- Design, images, and video: Creative Production, Canva, Figma, Fal, Adobe, Remotion, HyperFrames, HeyGen
- Shopping, travel, food, homes, and safety: Target, Tripadvisor, Uber, Uber Eats, Zillow, Malwarebytes

The final setup checklist reinforces that "installed" is not the same as "ready." A helper is ready when it is signed in, tried once, safe enough for the moment, and has a clear done signal.

## Login And App Server Notes

GitHub Pages is the public course surface. It cannot run the Codex app-server, own OAuth callbacks, store secrets, or sign someone into ChatGPT by itself.

Real helper access happens inside Codex or ChatGPT after the user has connected the relevant account or service.

The Codex app-server lane is real: a Codex client or harness can ask it to start ChatGPT login, including browser auth and device-code flows. In this course, that path runs through `scripts/codex-login-bridge.mjs`, which stays local and does not persist tokens. If this becomes a real ChatGPT app or MCP server, build that as a separate authenticated surface instead of faking sign-in on the public course page.

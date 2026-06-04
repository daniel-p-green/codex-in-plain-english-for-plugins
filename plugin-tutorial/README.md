# Codex in Plain English for Plugins

An interactive course for normal people who want Codex to help across email, calendars, docs, meetings, spreadsheets, websites, and creative tools without needing to learn plugin names first.

## Publishing

This folder is deployed as a static GitHub Pages site by `.github/workflows/deploy-plugin-tutorial.yml`.

Every push or merge to `main` or `master` that changes `plugin-tutorial/**` redeploys the course.

This is a static course site. It does not log people into plugins. The course teaches learners how to ask Codex whether a helper is signed in and ready.

## Open It Through A Local App Server

Run a local server from this folder:

```bash
cd plugin-tutorial
python3 -m http.server 8765
```

Then open:

```text
http://localhost:8765/
```

## Course Shape

- Overview: Who this is for and how helpers fit plain-English delegation
- Module 1: Scenario router for everyday work
- Module 2: Six-field starter prompt builder
- Module 3: Routing practice quiz
- Finish: Setup and verification checklist

## Teaching Notes

The course uses the same operating loop as Codex in Plain English:

Ask -> Codex works -> Inspect -> Revise -> Verify

The point is to teach people to choose a helper based on the job:

- Messages, meetings, and follow-up: Slack, Gmail, Calendar, Drive, Granola, Zoom
- Websites, apps, and technical help: GitHub, Browser, Computer Use, OpenAI Developers
- Docs, slides, and reports: Documents, Spreadsheets, Presentations, Data Analytics
- Design, images, and video: Creative Production, Canva, Figma, Fal, Adobe, Remotion, HyperFrames, HeyGen
- Shopping, travel, food, homes, and safety: Target, Tripadvisor, Uber, Uber Eats, Zillow, Malwarebytes

The final setup checklist reinforces that "installed" is not the same as "ready." A helper is ready when it is signed in, tried once, safe enough for the moment, and has a clear done signal.

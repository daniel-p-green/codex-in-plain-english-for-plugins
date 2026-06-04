# Codex in Plain English for Plugins

An interactive course for explaining what Codex plugins are, when to use them, and how to get started without drowning people in connector names.

## Publishing

This folder is deployed as a static GitHub Pages site by `.github/workflows/deploy-plugin-tutorial.yml`.

Every push or merge to `main` or `master` that changes `plugin-tutorial/**` redeploys the course.

This is a static course site. It does not implement a real Codex app-server login, OAuth callback, or connector-auth probe. The course teaches learners how to verify plugin authentication from inside Codex.

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

- Overview: How plugins fit the plain-English delegation model
- Module 1: Scenario router for common Daniel-style workflows
- Module 2: Six-field starter prompt builder
- Module 3: Routing practice quiz
- Finish: Setup and verification checklist

## Teaching Notes

The course uses the same operating loop as Codex in Plain English:

Ask -> Codex works -> Inspect -> Revise -> Verify

The point is to teach people to choose a plugin based on the job:

- Meeting and event context: Slack, Gmail, Calendar, Drive, Granola, Zoom
- Build and verify: GitHub, Browser, Computer Use, OpenAI Developers
- Artifacts: Documents, Spreadsheets, Presentations
- Creative output: Creative Production, Canva, Figma, Fal, Adobe, Remotion, HyperFrames, HeyGen
- Analysis and prototypes: Data Analytics, Product Design, Creative Production

The final setup checklist reinforces that "installed" is not the same as "useful." A plugin is ready when it is authenticated, callable, bounded, privacy-safe for the moment, and has a visible done signal.

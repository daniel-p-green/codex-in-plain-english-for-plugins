# Login Architecture

This course is public, static, and hosted on GitHub Pages.

It should not pretend to log visitors into ChatGPT, Codex, or any helper. That is separate from the Codex app-server protocol, which can start ChatGPT login for a Codex client or harness.

## Plain-English Split

- GitHub Pages site: teaches the pattern, helper map, prompts, and proof habits.
- Codex or ChatGPT: where the learner actually asks for work and checks whether helpers are signed in.
- Codex app-server: a real Codex client/harness lane that can initiate ChatGPT login through Codex-managed auth.
- Real ChatGPT app or MCP server: separate server surface with a proper authentication flow.

## Current Product Decision

Keep login language educational:

> This public course does not log you in by itself. Ask Codex to check whether the helper is signed in and ready.

Do not add a fake "Sign in with ChatGPT" button to the static course. If the project later becomes a real ChatGPT app, build and verify that as a separate app/server lane.

## Verified Codex App-Server Nuance

The local Codex CLI exposes `codex app-server` and the generated app-server protocol includes ChatGPT login account paths:

- `chatgpt`: returns a browser auth URL for the client to open.
- `chatgptDeviceCode`: returns a verification URL and user code.
- Codex-managed ChatGPT OAuth persists and refreshes tokens inside Codex.

So the accurate statement is not "Codex app-server cannot do ChatGPT login." It can. The accurate statement is:

> GitHub Pages cannot host or become that app-server by itself.

## Viable Architectures

1. Static course only: the current public site. Best for normal learners.
2. Static page plus local Codex app-server bridge: possible for a Codex client/harness where each learner has Codex running and the client is built to talk to it safely. More builder-facing.
3. Hosted app or MCP server: appropriate if this becomes a real interactive product with OAuth, callbacks, storage, and permission boundaries.

## Learner-Facing Readiness Prompt

```text
Check whether the helper for this task is ready. Tell me:
1. Which helper you would use.
2. Whether it appears signed in.
3. One tiny harmless test you can run.
4. What you cannot access.
5. What you will not do without asking me first.
```

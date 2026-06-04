# Login Architecture

This course is public, static, and hosted on GitHub Pages.

It should not pretend to log visitors into ChatGPT, Codex, or any helper. That is separate from the Codex app-server protocol, which can start ChatGPT login for a Codex client or harness.

## Plain-English Split

- GitHub Pages site: teaches the pattern, helper map, prompts, and proof habits.
- Codex or ChatGPT: where the learner actually asks for work and checks whether helpers are signed in.
- Codex app-server: a real Codex client/harness lane that can initiate ChatGPT login through Codex-managed auth.
- Real ChatGPT app or MCP server: separate server surface with a proper authentication flow.

## Current Product Decision

Keep login as product chrome, not course content:

> Sign in.

The visible course option is a header button that opens a small modal. The modal calls a real local sign-in helper, and that helper talks to Codex app-server. If the project later becomes a real ChatGPT app, build and verify that as a separate app/server lane.

## Verified Codex App-Server Nuance

The local Codex CLI exposes `codex app-server` and the generated app-server protocol includes ChatGPT login account paths:

- `chatgpt`: returns a browser auth URL for the client to open.
- `chatgptDeviceCode`: returns a verification URL and user code.
- Codex-managed ChatGPT OAuth persists and refreshes tokens inside Codex.

So the accurate statement is not "Codex app-server cannot do ChatGPT login." It can. The accurate statement is:

> GitHub Pages cannot host or become that app-server by itself.

The browser also cannot connect directly to the loopback WebSocket in the current CLI behavior: Codex app-server rejects browser requests that include an `Origin` header. That is why the implemented course path uses `scripts/codex-login-bridge.mjs` as a local Node bridge.

## Viable Architectures

1. Static course only: the current public site. Best for normal learners.
2. Static page plus local Codex sign-in helper: the implemented path. The helper talks to Codex app-server locally and returns only account status or a sign-in link to the page.
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

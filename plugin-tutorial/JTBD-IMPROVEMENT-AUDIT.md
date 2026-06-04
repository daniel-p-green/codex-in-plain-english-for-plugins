# Codex in Plain English for Plugins: JTBD Improvement Audit

Date: 2026-06-03

## Core Job

When I know Codex can use plugins but feel confused by the list, I want a safe, plain-English way to choose the right plugin, write the first prompt, and verify the result, so I can use connected Codex work without guessing or exposing the wrong thing.

## Job Steps

| Step | Learner Question | Desired Progress |
|---|---|---|
| Discover | What is this course and why does it exist? | Recognize this as the plugin-focused branch of Codex in Plain English. |
| Decide | Which plugin or lane should I use? | Choose by job type, not by memorizing plugin names. |
| Start | What do I actually type? | Build a safe first prompt with context, boundary, deliverable, and proof. |
| Act | How do I use a plugin without making a mess? | Practice on realistic scenarios before touching real accounts. |
| Verify | How do I know it worked? | Use a visible proof checklist: source, file, draft, screenshot, test, or blocker. |
| Maintain | How do I remember this later? | Leave with a routing map, reusable prompts, and setup smoke tests. |

## Decision Scale

- **Yes**: materially improves the learner job and should be implemented.
- **Maybe**: useful only if scoped carefully or added after the core course is stronger.
- **No**: adds polish, content, or complexity without improving the job.

## 100 Possible Improvements, Filtered

| # | Improvement idea | JTBD step | Would it really improve? | Decision |
|---:|---|---|---|---|
| 1 | Add a clearer opening promise: "choose, prompt, verify" in one line. | Discover | Yes | Do now |
| 2 | Make the T-rex brand mark visually match the main course header more closely. | Discover | Yes | Do now |
| 3 | Change the hero title to two intentional lines: parent brand, then "for Plugins." | Discover | Yes | Done |
| 4 | Add "Updated" metadata like the main course. | Discover | Maybe | Do if publishing |
| 5 | Add a short "Who this is for" panel. | Discover | Yes | Do now |
| 6 | Add a short "What this is not" panel: not a plugin catalog. | Discover | Yes | Do now |
| 7 | Add a first-screen CTA that says "Start Module 1 (10 min)." | Discover | Yes | Do now |
| 8 | Add a second CTA for "Run setup smoke test." | Discover | Maybe | Later |
| 9 | Replace generic "Course map" with a search-like nonfunctional label from the main course. | Discover | No | Keep if visually consistent only |
| 10 | Add a visual plugin-lane map above the scenarios. | Decide | Yes | Do now |
| 11 | Group plugin lanes into six plain-English buckets. | Decide | Yes | Do now |
| 12 | Add icons for each bucket. | Decide | Maybe | Only if restrained |
| 13 | Add "If you are unsure, start here" default lane. | Decide | Yes | Do now |
| 14 | Add "Ask Codex to choose the plugin" as a legitimate route. | Decide | Yes | Do now |
| 15 | Add a plugin decision tree with yes/no branches. | Decide | Yes | Do now |
| 16 | Add a printable cheat sheet. | Maintain | Maybe | Later |
| 17 | Add examples for every installed plugin. | Decide | No | Too much catalog noise |
| 18 | Add every marketplace plugin as searchable cards. | Decide | No | Opposite of the job |
| 19 | Add "daily context / build / artifact / creative / data / design" lanes. | Decide | Yes | Do now |
| 20 | Add "do not use plugin" as a valid answer. | Decide | Yes | Do now |
| 21 | Add a lane for "local files only." | Decide | Yes | Do now |
| 22 | Add a lane for "use browser instead of connector." | Decide | Yes | Do now |
| 23 | Add a lane for "ask user before external action." | Decide | Yes | Do now |
| 24 | Add a plugin readiness score. | Verify | Yes | Do now |
| 25 | Add smoke-test prompts per plugin lane. | Verify | Yes | Do now |
| 26 | Add "installed vs authenticated vs callable" explanation. | Verify | Yes | Do now |
| 27 | Add "what if auth fails?" recovery guidance. | Verify | Yes | Do now |
| 28 | Add "what if results look stale?" guidance. | Verify | Yes | Do now |
| 29 | Add "what if Codex used the wrong plugin?" repair prompt. | Verify | Yes | Do now |
| 30 | Add "what if plugin asks for permission?" explanation. | Verify | Maybe | Later |
| 31 | Add a fake login button. | Start | No | Misleading without real auth |
| 32 | Add a real app-server warning when opened via file://. | Start | Yes | Do now |
| 33 | Add "serve with local app server" instructions in UI, not only README. | Start | Yes | Do now |
| 34 | Add route-aware current module highlighting. | Maintain | Yes | Already partially done |
| 35 | Persist quiz answers across reload. | Maintain | Maybe | Later |
| 36 | Persist checklist state across reload. | Maintain | Yes | Do now |
| 37 | Add reset progress control. | Maintain | Maybe | Later |
| 38 | Add "copy all prompts" button. | Start | Maybe | Later |
| 39 | Add copy buttons for each scenario prompt. | Start | Yes | Do now |
| 40 | Add a prompt quality rubric. | Start | Yes | Do now |
| 41 | Score the prompt builder output against the rubric. | Start | Maybe | Later |
| 42 | Add immediate feedback if a prompt lacks boundaries. | Start | Yes | Do now if simple |
| 43 | Add immediate feedback if a prompt lacks proof. | Verify | Yes | Do now if simple |
| 44 | Add "make it safer" prompt rewrite button. | Start | Maybe | Later |
| 45 | Add examples of bad plugin prompts. | Start | Yes | Do now |
| 46 | Add before/after prompt transformations. | Start | Yes | Do now |
| 47 | Add a "vague request -> routed request" exercise. | Act | Yes | Do now |
| 48 | Add a "choose one of three plugin lanes" exercise. | Act | Yes | Already present, improve |
| 49 | Add scenario variety for event/admin work. | Act | Yes | Do now |
| 50 | Add scenario variety for creative asset work. | Act | Yes | Already present |
| 51 | Add scenario variety for source-backed writing. | Act | Yes | Do now |
| 52 | Add scenario variety for public demo privacy. | Act | Yes | Do now |
| 53 | Add scenario variety for local repo verification. | Act | Yes | Already present |
| 54 | Add scenario variety for live meeting follow-up. | Act | Yes | Already present |
| 55 | Add scenario variety for "plugin marketplace confusion." | Act | Yes | Do now |
| 56 | Add examples that reference Daniel's exact active projects. | Act | Maybe | Useful privately, risky publicly |
| 57 | Add sanitized examples modeled on Daniel's workflows. | Act | Yes | Do now |
| 58 | Add "public demo safe" labels to scenarios. | Verify | Yes | Do now |
| 59 | Add "private connector" labels to scenarios. | Verify | Yes | Do now |
| 60 | Add "local-only" labels to scenarios. | Verify | Yes | Do now |
| 61 | Add a table of plugin lanes and common proof artifacts. | Verify | Yes | Do now |
| 62 | Add "proof gallery" examples. | Verify | Yes | Do now |
| 63 | Add screenshots of good outputs. | Verify | Maybe | Later |
| 64 | Add video walkthrough. | Discover | Maybe | Later |
| 65 | Add audio narration. | Discover | No | Not needed for current job |
| 66 | Add animations to cards. | Discover | No | Polish without job progress |
| 67 | Add more color variation to modules. | Discover | Maybe | Only if it aids scanning |
| 68 | Tighten vertical spacing to match the main course. | Discover | Yes | Do now |
| 69 | Make module cards less dense. | Decide | Yes | Do now |
| 70 | Make scenario answers easier to scan. | Decide | Yes | Do now |
| 71 | Replace long plugin lists with lane labels. | Decide | Yes | Do now |
| 72 | Add progressive disclosure for exact plugin names. | Decide | Yes | Do now |
| 73 | Add "when not to use this lane." | Decide | Yes | Do now |
| 74 | Add glossary entries for plugin, connector, MCP, skill, app, smoke test. | Maintain | Yes | Do now |
| 75 | Add a glossary quiz. | Maintain | No | Secondary |
| 76 | Add a dashboard page like the original course. | Maintain | Maybe | Later |
| 77 | Keep as a single page instead of full SPA. | Maintain | Yes | Current scope |
| 78 | Convert to the main React app as a new route. | Maintain | Maybe | Best if publishing |
| 79 | Add GitHub Pages deployment path. | Maintain | Maybe | Later |
| 80 | Add tests using Playwright. | Verify | Yes | Do if this becomes repo-quality |
| 81 | Add accessibility checks. | Verify | Yes | Do now with quick pass |
| 82 | Add keyboard focus polish for scenario cards. | Act | Yes | Do now |
| 83 | Add ARIA live region for selected scenario answer. | Act | Yes | Do now |
| 84 | Add reduced-motion handling. | Discover | Maybe | Already minimal |
| 85 | Add mobile drawer like the main course. | Discover | Maybe | Later |
| 86 | Hide left sidebar on mobile like the main course. | Discover | Yes | Already inherited |
| 87 | Make top nav not overflow at mobile widths. | Discover | Yes | Verify now |
| 88 | Add "Open on localhost" warning when file:// is detected. | Start | Yes | Do now |
| 89 | Add "Codex app server login" note without fake auth. | Start | Yes | Do now |
| 90 | Add a real OAuth/login integration. | Start | No | Out of scope without endpoint |
| 91 | Add "Ask Codex to inspect plugin auth state" prompt. | Verify | Yes | Do now |
| 92 | Add "safe setup checklist for demos." | Verify | Yes | Do now |
| 93 | Add "private vs public course mode" toggle. | Verify | Maybe | Later |
| 94 | Add instructor notes. | Maintain | Yes | Do now in README or doc |
| 95 | Add facilitator script for a 15-minute workshop segment. | Maintain | Yes | Do now |
| 96 | Add a capstone exercise. | Act | Yes | Do now |
| 97 | Add downloadable markdown handout. | Maintain | Maybe | Later |
| 98 | Add a "top 10 prompts" section. | Start | Yes | Do now |
| 99 | Add "most common mistakes" section. | Verify | Yes | Do now |
| 100 | Cut any feature that does not help choose, prompt, act, verify, or remember. | Maintain | Yes | Operating rule |

## Best Improvements To Actually Make

1. Clarify the opening promise: choose, prompt, verify.
2. Add a visible local-server warning when the page is opened via `file://`.
3. Add "installed / authenticated / callable" as the first setup concept.
4. Add a compact decision tree before the scenario cards.
5. Add "do not use a plugin" as a valid decision.
6. Add copy buttons for each scenario prompt.
7. Add bad prompt -> better prompt examples.
8. Add prompt rubric: context, boundary, deliverable, proof, stop condition.
9. Add a plugin readiness score and persist checklist state.
10. Add "private connector" and "public demo safe" labels.
11. Add "when not to use this lane" under each lane.
12. Add a proof artifacts table.
13. Add smoke-test prompts for each lane.
14. Add a capstone exercise: route a real workflow end-to-end.
15. Add facilitator notes for teaching this in 15 minutes.

## Changes That Sound Good But Should Not Be Done Yet

- Full marketplace catalog.
- Fake login button.
- Video narration.
- More animation.
- Every plugin as a card.
- Exact private project examples.
- Full React SPA conversion before the learning flow is proven.

## Recommended Next Product Pass

The next pass should not add many more modules. It should deepen the existing course around one learner promise:

> "I can look at a real task, choose the right plugin lane, write the first safe prompt, and know what proof to ask for."

That means the page needs more guided practice, less plugin-name density, and stronger setup/proof language.

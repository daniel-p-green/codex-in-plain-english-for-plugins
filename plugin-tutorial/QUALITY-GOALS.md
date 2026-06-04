# Codex in Plain English for Plugins: Quality Goals

Date: 2026-06-04

## North Star

This should feel like a companion lesson to **Codex in Plain English** for normal people doing real work across apps.

It should not feel like:

- a plugin catalog
- an AI product dashboard
- a developer onboarding page
- a set of internal notes made public
- a pile of reactive UI patches

The first impression should be: **I can use this to ask Codex for help without learning the machinery first.**

## ICP

The learner is not a frontier-model-company employee and not primarily a developer.

They are someone who:

- has work scattered across email, calendar, docs, meetings, messages, websites, spreadsheets, and creative tools
- suspects Codex can help but does not know which helper/plugin/connector/skill matters
- wants a safe first prompt, not a taxonomy lesson
- needs proof before trusting the answer
- may use this in a public workshop, screenshare, or self-guided learning moment

## Core JTBD

When I know Codex can use connected helpers but I am confused by the list, I want a plain-English way to choose the right lane, write the first safe prompt, and know what proof to ask for, so I can finish the work without guessing or exposing the wrong thing.

## Product Goals

1. **Make the first screen calm and obvious.**
   The first viewport should show the course identity, the promise, and the next action. It should not compete with gamification, architecture notes, oversized diagrams, or dense explanation.

2. **Teach by job, not by tool name.**
   The course should start with the learner's work: follow up, fix a page, make a social post, understand a number, create a handout, compare options. Plugin names belong behind those jobs.

3. **Keep trust visible.**
   Every meaningful example should tell the learner what proof to ask for: sources checked, draft only, file path, screenshot, test result, missing access, or stop-before-action.

4. **Separate public learning from private plumbing.**
   Login, Codex app-server notes, local bridge instructions, and architecture caveats should be optional, quiet, and not framed as the main course experience.

5. **Look like a learning product, not a dashboard.**
   Favor light mode, generous reading space, clear lesson hierarchy, restrained cards, and simple actions. Avoid metrics-first UI, busy pills, fake diagrams, and decorative gradients that do not teach.

6. **Feel like a companion, not a new brand.**
   Keep the T-rex, plain-English tone, and course identity. The plugin course can be lighter and more polished, but it should not introduce a totally different visual system.

## Non-Goals

- Do not make the front page comprehensive.
- Do not expose every plugin as equal-weight cards in the learning flow.
- Do not let login architecture become public-facing course content.
- Do not add more decorative UI to solve unclear hierarchy.
- Do not use XP, levels, or confidence meters as primary navigation unless they clearly help the learner finish the course.
- Do not ship one-off visual changes without checking the whole first viewport.

## Current Problems To Fix

1. **The course is still too fragmented.**
   It has good pieces, but the page reads as accumulated patches: hero, audience panel, milestones, starter cards, modules, helper map, login, footer.

2. **The top nav is overloaded.**
   Brand, links, XP, level, course chip, sign-in, theme toggle, and continue all compete. A normal learner should not have to parse all of that before starting.

3. **The first viewport lacks a clean lesson path.**
   The hero is simpler now, but the next visible sections still feel like explanatory panels and measurement UI, not a guided start.

4. **The course mixes learning, progress tracking, setup, and architecture too early.**
   Measurement and login are useful, but they should not dominate the learner's first impression.

5. **The design language is inconsistent.**
   Some areas feel like the original course, some like a product dashboard, some like a plugin directory, and some like internal docs.

## Better Goals For The Next Pass

### Pass 1: First Viewport Reset

Goal: A normal learner can understand the course and start Module 1 in under 10 seconds.

Requirements:

- Header contains brand, Lessons, Helpers, Sign in, and one primary course action at most.
- Remove or demote XP/level/course chips from the top nav.
- Hero contains one promise and two actions maximum.
- The first section after the hero is a simple start path, not measurement.
- Desktop and mobile screenshots should show no awkward wrapping, crowding, or dashboard feel.

Evidence:

- Local browser check at `970x998`.
- Mobile check at `390x844`.
- Public deployed check after merge.

### Pass 2: Course Flow Cleanup

Goal: The page reads as a lesson sequence, not a feature inventory.

Requirements:

- Module titles are action-oriented and consistent.
- Scenario cards are the main practice surface.
- Plugin/category lists are progressive disclosure, not the center of the course.
- Progress and measurement move later or become quieter.

Evidence:

- Heading outline review.
- DOM/content scan for duplicated concepts.
- Browser check of Module 1 and Module 2 at desktop/mobile widths.

### Pass 3: Helper Map Boundary

Goal: Learners can browse helpers when they want detail, but the course does not become a catalog.

Requirements:

- Helper map has a clear "use after choosing a lane" role.
- Helper pages use the same mini-tutorial structure.
- Exact plugin names are searchable, but not required to start.

Evidence:

- Helper count check.
- Spot-check 3 helper pages.
- Verify no broken helper links.

### Pass 4: Trust And Privacy Pass

Goal: The learner knows what Codex may touch and what proof to request.

Requirements:

- Every scenario includes boundary and proof.
- Login is clearly optional and local-helper dependent.
- No public UI contains internal architecture notes, uncertainty notes, or private-work assumptions.

Evidence:

- Text scan for internal words and accidental notes.
- Public `/chatgpt/` check.
- Scenario answer check.

## Quality Gates Before Shipping UI Changes

For every future visual/content pass:

1. State which goal it improves.
2. Avoid adding a new component unless an existing one cannot do the job.
3. Check the whole first viewport, not just the changed element.
4. Check desktop and mobile.
5. Verify deployed Pages state, not only local files.
6. Leave unrelated generated files alone.

## Stop Rule

If a change makes the page look more impressive but does not make the learner's job clearer, safer, or easier to start, remove it.

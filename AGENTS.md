# AGENTS.md

Instructions for future Codex/Claude sessions working inside this knowledge bank.

## Safety

- Never delete existing notes unless the maintainer explicitly asks.
- Prefer appending, cross-linking, or moving uncertain material to `09_Inbox`.
- Do not write secrets, API keys, private records, or credentials into this folder.
- Keep the iCloud boundary intact; this folder is local-first under `local workspace`.

## Canonical Layers

- `index.html` is the human-facing dashboard. It must remain vanilla HTML, embedded CSS, and plain JavaScript with no build step.
- Markdown files are the canonical knowledge/source layer.
- `10_Agent_Data/*.json` files are machine-readable mirrors for agents and automation.
- Do not make the reader read raw JSON to use the knowledge bank.

## Update Rules

- Every new person/topic/source/playbook/tool should use the relevant template in `08_Templates`.
- Every significant claim should have a source link or be marked as `Hypothesis`.
- Maintain `CHANGELOG.md`.
- Maintain `10_Agent_Data/page-index.json`, `knowledge-graph.json`, `source-index.json`, `dashboard-data.json`, `mention-graph.json`, and `candidates.json` when adding major pages or changing links.
- Update related links and backlinks when adding new content.
- Update `index.html` when adding major pages or promoted candidates.

## Evidence-Driven Expansion

- Do not promote adjacent people just because they are famous or plausibly relevant.
- Prefer repeated references from the curated mentor/source graph.
- Keep weak candidates in `00_Home/candidates-to-review.md` and `10_Agent_Data/candidates.json`.
- When promoting a candidate into a full page, include `Why This Was Added` and `Referred By / Mention Evidence`.

## Browser Gate

- After changing `index.html`, use Browser to verify the dashboard is readable, navigable, human-friendly, search/filter works, no raw JSON is exposed, and desktop/mobile layouts do not overlap.
- Do not claim the knowledge bank update is done until Browser verification passes or the inability to use Browser is explicitly stated.

## Style

- Keep writing practical, dense, and non-fluffy.
- Separate durable principles from tool-specific snapshots.
- Mark confidence levels: High, Medium, Low.
- Prefer tables, checklists, source notes, and playbooks over long essays.

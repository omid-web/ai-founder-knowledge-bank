---
title: AI Code Review Checklist
type: playbook
status: active
confidence: High
last_updated: 2026-05-23
tags: [review, quality, agents]
related: []
sources: [simon-vibe-coding, matt-typescript-ai-era, mitchell-ai-adoption]
---

# AI Code Review Checklist

## Purpose

A repeatable workflow for ai code review checklist in the AI Founder Knowledge Bank.

## Steps

1. Read the diff before trusting the summary.
2. Confirm the change matches the original goal.
3. Run relevant tests and type checks.
4. Look for broad casts, deleted tests, skipped errors, and hidden TODOs.
5. Check security, data exposure, permissions, and user-visible regressions.
6. Ask the agent to explain tricky code; reject what you cannot explain.

## Checklist

- [ ] Can I explain this?
- [ ] Did tests prove the requested behavior?
- [ ] Did the agent remove constraints?
- [ ] Is the blast radius acceptable?
- [ ] Does the user-facing workflow still work?

## How This Applies To The Builder

Use this as an operating checklist before, during, or after delegating work to Codex/Claude. The goal is accepted output, not maximum agent activity.

## Sources

[Not all AI-assisted programming is vibe coding](https://simonwillison.net/2025/Mar/19/vibe-coding/), [The Case for TypeScript In The AI Coding Era](https://www.totaltypescript.com/the-case-for-typescript-in-the-ai-coding-era), [My AI Adoption Journey](https://mitchellh.com/writing/my-ai-adoption-journey)

## Related

- [Weekly Dashboard](../00_Home/weekly-dashboard.md)
- [Knowledge Bank Maintenance Prompts](../06_Prompts/knowledge-bank-maintenance-prompts.md)

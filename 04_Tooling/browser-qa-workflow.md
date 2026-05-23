---
title: Browser QA Workflow
type: tooling
status: active
confidence: High
last_updated: 2026-05-23
tags: [browser, qa, dashboard]
related: []
sources: [simon-agentic-patterns]
---

# Browser QA Workflow

## Why This Tooling Area Matters

Browser QA Workflow is part of the operating surface for an AI-native one-person company. Use it only when it improves speed, quality, observability, or distribution.

## Key Principles

- Human-facing artifacts need human-facing verification.
- A static dashboard is not done until it is readable in a browser.
- Desktop and mobile checks catch layout failures agents often miss.

## Practices

- Open index.html with Browser.
- Verify search, links, text wrapping, and useful next actions.
- Fix and re-run Browser checks before claiming done.

## How This Applies To The Builder

Prefer tools that make agent work visible, reviewable, and repeatable. Avoid adding tool layers that hide what the model did or increase context cost without improving outcomes.

## Sources

[Agentic Engineering Patterns](https://simonwillison.net/guides/agentic-engineering-patterns/)

## Related

- [Agentic Engineering](../02_Topics/agentic-engineering.md)
- [Daily Agent Manager Routine](../03_Playbooks/daily-agent-manager-routine.md)

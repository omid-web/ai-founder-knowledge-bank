---
title: Evals And Test Harnesses
type: tooling
status: active
confidence: High
last_updated: 2026-05-23
tags: [evals, tests, harness]
related: []
sources: [hamel-evals, shreya-hamel-evals, mitchell-ai-adoption, simon-agentic-patterns]
---

# Evals And Test Harnesses

## Why This Tooling Area Matters

Evals And Test Harnesses is part of the operating surface for an AI-native one-person company. Use it only when it improves speed, quality, observability, or distribution.

## Key Principles

- A harness is what lets agents iterate without guessing.
- Evals should be built from real failures and product goals.
- Tests, Browser checks, golden examples, and manual reviews all count when matched to the requirement.

## Practices

- Start with 10 to 20 high-value examples.
- Record expected behavior explicitly.
- Run evals before and after model/prompt/tool changes.

## How This Applies To The Builder

Prefer tools that make agent work visible, reviewable, and repeatable. Avoid adding tool layers that hide what the model did or increase context cost without improving outcomes.

## Sources

[Hamel Husain blog](https://hamel.dev/), [AI Evals for Engineers and PMs](https://maven.com/parlance-labs/evals), [My AI Adoption Journey](https://mitchellh.com/writing/my-ai-adoption-journey), [Agentic Engineering Patterns](https://simonwillison.net/guides/agentic-engineering-patterns/)

## Related

- [Agentic Engineering](../02_Topics/agentic-engineering.md)
- [Daily Agent Manager Routine](../03_Playbooks/daily-agent-manager-routine.md)

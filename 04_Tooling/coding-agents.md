---
title: Coding Agents
type: tooling
status: active
confidence: High
last_updated: 2026-05-23
tags: [codex, claude-code, agents]
related: []
sources: [openai-codex, claude-code-docs, simon-agentic-patterns]
---

# Coding Agents

## Why This Tooling Area Matters

Coding Agents is part of the operating surface for an AI-native one-person company. Use it only when it improves speed, quality, observability, or distribution.

## Key Principles

- Coding agents are execution partners, not autonomous owners.
- Best results come from task design, context, verification, and review.
- Use agents for bounded slices, research, refactors, tests, and prototypes.

## Practices

- Always define acceptance criteria.
- Keep an agent-ready backlog.
- Track rejected agent work and why.

## How This Applies To The Builder

Prefer tools that make agent work visible, reviewable, and repeatable. Avoid adding tool layers that hide what the model did or increase context cost without improving outcomes.

## Sources

[Codex](https://openai.com/codex/), [Claude Code overview](https://docs.anthropic.com/en/docs/claude-code/overview), [Agentic Engineering Patterns](https://simonwillison.net/guides/agentic-engineering-patterns/)

## Related

- [Agentic Engineering](../02_Topics/agentic-engineering.md)
- [Daily Agent Manager Routine](../03_Playbooks/daily-agent-manager-routine.md)

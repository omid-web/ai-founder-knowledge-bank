---
title: Automation Stack
type: tooling
status: active
confidence: Medium
last_updated: 2026-05-23
tags: [automation, ops, solo-company]
related: []
sources: [shopify-ai-playground, anthropic-effective-agents]
---

# Automation Stack

## Why This Tooling Area Matters

Automation Stack is part of the operating surface for an AI-native one-person company. Use it only when it improves speed, quality, observability, or distribution.

## Key Principles

- Automate repeatable work after you understand the workflow.
- Keep human approval for high-risk side effects.
- Use logs and review queues to prevent silent failures.

## Practices

- Start with draft, then approval, then partial autonomy.
- Automate source ingestion and weekly review prep.
- Keep secrets local and out of notes.

## How This Applies To The Builder

Prefer tools that make agent work visible, reviewable, and repeatable. Avoid adding tool layers that hide what the model did or increase context cost without improving outcomes.

## Sources

[Serious results, unserious methods: Shopify AI playground](https://www.shopify.com/news/unserious-exploration), [Building Effective Agents](https://www.anthropic.com/research/building-effective-agents/)

## Related

- [Agentic Engineering](../02_Topics/agentic-engineering.md)
- [Daily Agent Manager Routine](../03_Playbooks/daily-agent-manager-routine.md)

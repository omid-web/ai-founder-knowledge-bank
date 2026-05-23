---
title: Security And Risk For AI Agents
type: topic
status: active
confidence: High
last_updated: 2026-05-23
tags: [security, prompt-injection, risk]
related: [../01_People/simon-willison.md]
sources: [simon-vibe-coding, simon-agentic-patterns, anthropic-effective-agents]
---

# Security And Risk For AI Agents

## Why This Topic Matters

Agents can read, write, browse, call tools, and manipulate data. The blast radius has to be designed deliberately.

## Key Principles

- Instructions and untrusted data can collide in LLM contexts.
- Tool permissions should match task risk.
- Use least privilege for files, secrets, network, and external systems.
- Review generated changes before they touch customers or data.

## Mentor Perspectives

- [Simon Willison](../01_People/simon-willison.md)

## Tools And Practices

- Mark untrusted input in prompts and never let it override system/task instructions.
- Keep secrets out of source notes and screenshots.
- Run agents in scoped folders when possible.
- Require human approval for destructive or external side effects.

## Exercises

- Ask Codex to apply this topic to one current task and produce a concrete checklist.
- Find one failure from this week that maps to this topic and turn it into a reusable rule.
- Update one related playbook with a better verification step.

## Example Codex / Claude Prompts

- Apply the principles from Security And Risk For AI Agents to this task. Identify risks, constraints, and verification before editing.
- Review this workflow through the lens of Security And Risk For AI Agents. What should I change this week?
- Create one small exercise that helps me improve at Security And Risk For AI Agents.

## Failure Modes

- Prompt injection through web pages, docs, tickets, or emails.
- Agents exfiltrate secrets through logs or generated files.
- Over-broad filesystem or API permissions turn a small mistake into a large incident.

## Sources

[Not all AI-assisted programming is vibe coding](https://simonwillison.net/2025/Mar/19/vibe-coding/), [Agentic Engineering Patterns](https://simonwillison.net/guides/agentic-engineering-patterns/), [Building Effective Agents](https://www.anthropic.com/research/building-effective-agents/)

## Related

- [Simon Willison](../01_People/simon-willison.md)

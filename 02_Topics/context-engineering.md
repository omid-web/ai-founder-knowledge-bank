---
title: Context Engineering
type: topic
status: active
confidence: Medium
last_updated: 2026-05-23
tags: [context, prompts, files]
related: [../01_People/andrej-karpathy.md, ../01_People/thariq-shihipar.md, ../01_People/simon-willison.md]
sources: [karpathy-software-changing, thariq-agent-design, simon-agentic-patterns]
---

# Context Engineering

## Why This Topic Matters

The agent's output quality is shaped by the context it can see, the examples it receives, and the constraints it must satisfy.

## Key Principles

- Context should include goals, constraints, examples, acceptance criteria, and relevant files.
- More context is not always better; progressive discovery reduces noise.
- Use markdown and JSON indexes to make a folder legible to agents.

## Mentor Perspectives

- [Andrej Karpathy](../01_People/andrej-karpathy.md)
- [Thariq Shihipar](../01_People/thariq-shihipar.md)
- [Simon Willison](../01_People/simon-willison.md)

## Tools And Practices

- Use AGENTS.md for durable operating rules.
- Use source notes to preserve citations and confidence.
- Keep raw uncertain material in Inbox until promoted.

## Exercises

- Ask Codex to apply this topic to one current task and produce a concrete checklist.
- Find one failure from this week that maps to this topic and turn it into a reusable rule.
- Update one related playbook with a better verification step.

## Example Codex / Claude Prompts

- Apply the principles from Context Engineering to this task. Identify risks, constraints, and verification before editing.
- Review this workflow through the lens of Context Engineering. What should I change this week?
- Create one small exercise that helps me improve at Context Engineering.

## Failure Modes

- Context poisoning from irrelevant or low-quality instructions.
- Agents miss important constraints because they are buried in long prose.
- Stale docs mislead future sessions.

## Sources

[Software Is Changing Again](https://www.youtube.com/watch?v=LCEmiRjPEtQ), [Think like an agent / Claude Code agent design notes](https://x.com/trq212/article/2027463795355095314), [Agentic Engineering Patterns](https://simonwillison.net/guides/agentic-engineering-patterns/)

## Related

- [Andrej Karpathy](../01_People/andrej-karpathy.md)
- [Thariq Shihipar](../01_People/thariq-shihipar.md)
- [Simon Willison](../01_People/simon-willison.md)

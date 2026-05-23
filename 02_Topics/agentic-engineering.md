---
title: Agentic Engineering
type: topic
status: active
confidence: High
last_updated: 2026-05-23
tags: [agents, coding, workflow]
related: [../01_People/simon-willison.md, ../01_People/peter-steinberger.md, ../01_People/mitchell-hashimoto.md, ../01_People/andrej-karpathy.md, ../01_People/thariq-shihipar.md]
sources: [simon-agentic-patterns, steipete-just-talk, mitchell-ai-adoption, anthropic-effective-agents]
---

# Agentic Engineering

## Why This Topic Matters

This is the core practice of using coding agents as professional engineering amplifiers.

## Key Principles

- Give agents bounded tasks with explicit acceptance criteria.
- Design feedback loops before implementation: tests, browser checks, screenshots, logs, or golden examples.
- Review generated work as if it came from a fast junior teammate with uneven judgment.
- Keep the distinction between prototypes and production explicit.

## Mentor Perspectives

- [Simon Willison](../01_People/simon-willison.md)
- [Peter Steinberger](../01_People/peter-steinberger.md)
- [Mitchell Hashimoto](../01_People/mitchell-hashimoto.md)
- [Andrej Karpathy](../01_People/andrej-karpathy.md)
- [Thariq Shihipar](../01_People/thariq-shihipar.md)

## Tools And Practices

- Use red/green TDD when behavior is objective.
- Use Browser/manual QA for UI and human-facing workflows.
- Track blast radius: files touched, permissions, data exposure, rollback path.
- Record lessons from every failed agent run.

## Exercises

- Ask Codex to apply this topic to one current task and produce a concrete checklist.
- Find one failure from this week that maps to this topic and turn it into a reusable rule.
- Update one related playbook with a better verification step.

## Example Codex / Claude Prompts

- Apply the principles from Agentic Engineering to this task. Identify risks, constraints, and verification before editing.
- Review this workflow through the lens of Agentic Engineering. What should I change this week?
- Create one small exercise that helps me improve at Agentic Engineering.

## Failure Modes

- Generated code volume hides bad architecture.
- The agent solves the wrong problem because context was underspecified.
- The human accepts output without being able to explain it.
- A prototype becomes production without security, tests, or ownership.

## Sources

[Agentic Engineering Patterns](https://simonwillison.net/guides/agentic-engineering-patterns/), [Just Talk To It - the no-bs Way of Agentic Engineering](https://steipete.me/posts/just-talk-to-it), [My AI Adoption Journey](https://mitchellh.com/writing/my-ai-adoption-journey), [Building Effective Agents](https://www.anthropic.com/research/building-effective-agents/)

## Related

- [Simon Willison](../01_People/simon-willison.md)
- [Peter Steinberger](../01_People/peter-steinberger.md)
- [Mitchell Hashimoto](../01_People/mitchell-hashimoto.md)
- [Andrej Karpathy](../01_People/andrej-karpathy.md)
- [Thariq Shihipar](../01_People/thariq-shihipar.md)

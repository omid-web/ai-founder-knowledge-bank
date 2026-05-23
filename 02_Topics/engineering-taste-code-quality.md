---
title: Engineering Taste And Code Quality
type: topic
status: active
confidence: High
last_updated: 2026-05-23
tags: [quality, taste, maintenance]
related: [../01_People/matt-pocock.md, ../01_People/mitchell-hashimoto.md, ../01_People/simon-willison.md]
sources: [matt-typescript-ai-era, mitchell-large-projects, simon-vibe-coding]
---

# Engineering Taste And Code Quality

## Why This Topic Matters

When code is cheap, taste, maintainability, and ownership become stronger differentiators.

## Key Principles

- The person shipping code owns it, even if an agent wrote it.
- Types, tests, and small modules are communication tools for future agents and humans.
- Frequent demos and reviewable changes beat massive hidden rewrites.
- Refactoring is a normal part of the agent loop.

## Mentor Perspectives

- [Matt Pocock](../01_People/matt-pocock.md)
- [Mitchell Hashimoto](../01_People/mitchell-hashimoto.md)
- [Simon Willison](../01_People/simon-willison.md)

## Tools And Practices

- Ask agents to explain changed code before acceptance.
- Run typed, linted, tested checks where available.
- Schedule maintenance passes for duplication, dead code, and oversized files.
- Use comments only for tricky intent, not obvious narration.

## Exercises

- Ask Codex to apply this topic to one current task and produce a concrete checklist.
- Find one failure from this week that maps to this topic and turn it into a reusable rule.
- Update one related playbook with a better verification step.

## Example Codex / Claude Prompts

- Apply the principles from Engineering Taste And Code Quality to this task. Identify risks, constraints, and verification before editing.
- Review this workflow through the lens of Engineering Taste And Code Quality. What should I change this week?
- Create one small exercise that helps me improve at Engineering Taste And Code Quality.

## Failure Modes

- Agents pile abstractions on top of unclear requirements.
- Type casts hide real uncertainty.
- Review time grows faster than generation speed.

## Sources

[The Case for TypeScript In The AI Coding Era](https://www.totaltypescript.com/the-case-for-typescript-in-the-ai-coding-era), [My Approach to Building Large Technical Projects](https://mitchellh.com/writing/building-large-technical-projects), [Not all AI-assisted programming is vibe coding](https://simonwillison.net/2025/Mar/19/vibe-coding/)

## Related

- [Matt Pocock](../01_People/matt-pocock.md)
- [Mitchell Hashimoto](../01_People/mitchell-hashimoto.md)
- [Simon Willison](../01_People/simon-willison.md)

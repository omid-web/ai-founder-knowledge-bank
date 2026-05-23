---
title: Evals, Observability, And Feedback Loops
type: topic
status: active
confidence: High
last_updated: 2026-05-23
tags: [evals, observability, testing]
related: [../01_People/andrew-ng.md, ../01_People/mitchell-hashimoto.md, ../01_People/simon-willison.md]
sources: [hamel-evals, shreya-hamel-evals, eugene-yan, mitchell-ai-adoption, simon-agentic-patterns]
---

# Evals, Observability, And Feedback Loops

## Why This Topic Matters

AI-native products and agent workflows need proof loops. Without evals, you are managing vibes.

## Key Principles

- Start evals with observed failures and user value.
- Use small golden sets before complex dashboards.
- Evaluate every meaningful change in model, prompt, retrieval, or tool access.
- Prefer task-specific acceptance criteria over generic benchmark scores.

## Mentor Perspectives

- [Andrew Ng](../01_People/andrew-ng.md)
- [Mitchell Hashimoto](../01_People/mitchell-hashimoto.md)
- [Simon Willison](../01_People/simon-willison.md)

## Tools And Practices

- Keep a failure log with input, expected behavior, actual behavior, and fix.
- Turn repeated failures into eval cases.
- Use LLM-as-judge only with calibration and spot checks.
- Run browser/manual QA for human-facing behavior.

## Exercises

- Ask Codex to apply this topic to one current task and produce a concrete checklist.
- Find one failure from this week that maps to this topic and turn it into a reusable rule.
- Update one related playbook with a better verification step.

## Example Codex / Claude Prompts

- Apply the principles from Evals, Observability, And Feedback Loops to this task. Identify risks, constraints, and verification before editing.
- Review this workflow through the lens of Evals, Observability, And Feedback Loops. What should I change this week?
- Create one small exercise that helps me improve at Evals, Observability, And Feedback Loops.

## Failure Modes

- Using generic evals that do not map to user value.
- Measuring judge agreement instead of product usefulness.
- Skipping observability until users report silent failures.

## Sources

[Hamel Husain blog](https://hamel.dev/), [AI Evals for Engineers and PMs](https://maven.com/parlance-labs/evals), [Eugene Yan writing](https://eugeneyan.com/), [My AI Adoption Journey](https://mitchellh.com/writing/my-ai-adoption-journey), [Agentic Engineering Patterns](https://simonwillison.net/guides/agentic-engineering-patterns/)

## Related

- [Andrew Ng](../01_People/andrew-ng.md)
- [Mitchell Hashimoto](../01_People/mitchell-hashimoto.md)
- [Simon Willison](../01_People/simon-willison.md)

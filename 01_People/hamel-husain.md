---
title: Hamel Husain
type: person
status: active
confidence: High
last_updated: 2026-05-23
tags: [evals, llm-quality, debugging]
related: [../02_Topics/evals-observability-feedback-loops.md, ../02_Topics/agentic-engineering.md, ../03_Playbooks/ai-code-review-checklist.md, ../03_Playbooks/daily-agent-manager-routine.md, ../04_Tooling/evals-and-test-harnesses.md]
sources: [hamel-evals, shreya-hamel-evals]
---

# Hamel Husain

**Handle:** @HamelHusain

**Mentor role:** AI evals, product debugging, and LLM quality mentor

## Why This Was Added

Promoted from the candidate queue because the knowledge bank needs a stronger production-evals branch, and existing source notes already cite Hamel directly.

## Referred By / Mention Evidence

Candidate queue evidence: Hamel Husain blog and AI Evals for Engineers and PMs.

## Why This Person Matters

Hamel is a practical lens for turning vague AI quality concerns into observed failures, review loops, and task-specific evals.

## Best Lessons For The Builder

- Start evals from real mistakes and user-visible failures, not generic benchmarks.
- Use small, inspectable eval sets before building complex evaluation platforms.
- Treat evals as product debugging: failures should change prompts, data, UX, or workflow design.

## Concrete Practices To Adopt

- Keep a failure log for every serious agent or LLM workflow.
- Turn recurring review comments into eval cases with expected behavior and acceptance criteria.
- Review eval examples manually before trusting aggregate scores.

## What Not To Over-Copy

- Do not optimize for benchmark theater when the product workflow is still unclear.
- Do not let eval dashboards hide the actual examples that failed.

## Tools, Repos, Articles, Talks To Study

[Hamel Husain blog](../07_Sources/hamel-evals.md), [AI Evals for Engineers and PMs](../07_Sources/shreya-hamel-evals-course.md)

## Related Topics

- [Evals, Observability, And Feedback Loops](../02_Topics/evals-observability-feedback-loops.md)
- [Agentic Engineering](../02_Topics/agentic-engineering.md)

## Related Playbooks

- [AI Code Review Checklist](../03_Playbooks/ai-code-review-checklist.md)
- [Daily Agent Manager Routine](../03_Playbooks/daily-agent-manager-routine.md)

## Related Tools

- [Evals And Test Harnesses](../04_Tooling/evals-and-test-harnesses.md)

## Exercises

- Convert five rejected agent outputs into regression eval cases.
- Write a one-page rubric for an AI workflow you would actually trust in production.
- Run before/after evals around one prompt, retrieval, or tool change.

## Prompts Inspired By This Person

- Build an eval set from these failure examples. Include input, expected behavior, scoring rubric, and likely fixes.
- Review this AI workflow like a product debugger: where would evals expose hidden failure modes?
- Turn this human QA checklist into a lightweight eval harness.

## Sources

[Hamel Husain blog](https://hamel.dev/), [AI Evals for Engineers and PMs](https://maven.com/parlance-labs/evals)

## Confidence Notes

High confidence as an evals mentor from direct source material already in the source graph; individual tactical details should still be tied to primary notes.

## Related

- [Evals Observability Feedback Loops](../02_Topics/evals-observability-feedback-loops.md)
- [Agentic Engineering](../02_Topics/agentic-engineering.md)
- [Ai Code Review Checklist](../03_Playbooks/ai-code-review-checklist.md)
- [Daily Agent Manager Routine](../03_Playbooks/daily-agent-manager-routine.md)
- [Evals And Test Harnesses](../04_Tooling/evals-and-test-harnesses.md)

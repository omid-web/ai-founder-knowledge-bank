---
title: Shreya Shankar
type: person
status: active
confidence: High
last_updated: 2026-05-23
tags: [evals, data-quality, observability]
related: [../02_Topics/evals-observability-feedback-loops.md, ../03_Playbooks/ai-code-review-checklist.md, ../03_Playbooks/planning-before-coding.md, ../04_Tooling/evals-and-test-harnesses.md]
sources: [shreya-hamel-evals]
---

# Shreya Shankar

**Handle:** @sh_reya

**Mentor role:** LLM evaluation, data quality, and production AI observability mentor

## Why This Was Added

Promoted from the candidate queue to strengthen the production AI quality branch alongside Hamel Husain.

## Referred By / Mention Evidence

Candidate queue evidence: AI Evals for Engineers and PMs.

## Why This Person Matters

Shreya is useful for connecting eval design to data quality, observability, and the messy operational realities of AI systems.

## Best Lessons For The Builder

- Evaluation quality depends on the examples, labels, rubric, and review process behind the metric.
- Production AI systems need observability into inputs, outputs, reviewer judgments, and drift.
- Good evals are socio-technical: humans define usefulness, edge cases, and acceptable tradeoffs.

## Concrete Practices To Adopt

- Store representative examples with reviewer notes, not just pass/fail counts.
- Separate model failures from data, product, prompt, retrieval, and workflow failures.
- Track which eval cases matter most to user trust and business outcomes.

## What Not To Over-Copy

- Do not treat one score as a complete product-quality signal.
- Do not build evaluation machinery before naming the user-facing failure modes.

## Tools, Repos, Articles, Talks To Study

[AI Evals for Engineers and PMs](../07_Sources/shreya-hamel-evals-course.md)

## Related Topics

- [Evals, Observability, And Feedback Loops](../02_Topics/evals-observability-feedback-loops.md)

## Related Playbooks

- [AI Code Review Checklist](../03_Playbooks/ai-code-review-checklist.md)
- [Planning Before Coding](../03_Playbooks/planning-before-coding.md)

## Related Tools

- [Evals And Test Harnesses](../04_Tooling/evals-and-test-harnesses.md)

## Exercises

- Design an eval dataset schema for a support or sales assistant.
- Write a review rubric that separates factuality, helpfulness, policy fit, and business usefulness.
- Audit a workflow for missing observability: inputs, decisions, reviewer action, final outcome.

## Prompts Inspired By This Person

- Design an eval and observability plan for this LLM workflow, including what humans must review.
- Separate these AI failures into data, prompt, retrieval, model, and product categories.
- Create a rubric that maps LLM output quality to actual user trust.

## Sources

[AI Evals for Engineers and PMs](https://maven.com/parlance-labs/evals)

## Confidence Notes

High confidence for the evals branch based on the existing course source; expand with more primary writing before adding broader claims.

## Related

- [Evals Observability Feedback Loops](../02_Topics/evals-observability-feedback-loops.md)
- [Ai Code Review Checklist](../03_Playbooks/ai-code-review-checklist.md)
- [Planning Before Coding](../03_Playbooks/planning-before-coding.md)
- [Evals And Test Harnesses](../04_Tooling/evals-and-test-harnesses.md)

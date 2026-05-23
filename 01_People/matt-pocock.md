---
title: Matt Pocock
type: person
status: active
confidence: High
last_updated: 2026-05-23
tags: [typescript, code-quality, contracts]
related: [../04_Tooling/typescript-ai-stack.md, ../02_Topics/engineering-taste-code-quality.md, ../03_Playbooks/ai-code-review-checklist.md, ../06_Prompts/refactoring-prompts.md]
sources: [matt-typescript-ai-era, matt-total-typescript, matt-github, matt-ts-reset]
---

# Matt Pocock

**Handle:** @mattpocockuk

**Mentor role:** TypeScript clarity, contracts, and code-quality mentor

## Why This Was Added

Core mentor named by the builder and GitHub user requested. Useful for making TypeScript an agent guardrail.

## Referred By / Mention Evidence

User-curated seed list.

## Why This Person Matters

Matt is a practical mentor for making TypeScript readable, teachable, and strict enough to guide agents.

## Best Lessons For The Builder

- Types are executable specifications for agents and humans.
- Good TypeScript narrows ambiguity before the model writes code.
- Readable contracts reduce review burden.

## Concrete Practices To Adopt

- Require agents to preserve or improve type coverage when changing TS code.
- Use branded types, discriminated unions, and explicit interfaces where domain mistakes are expensive.
- Treat type errors as agent feedback, not busywork.

## What Not To Over-Copy

- Do not write clever type puzzles that future agents and teammates cannot understand.
- Do not let agents silence TypeScript with broad casts.

## Tools, Repos, Articles, Talks To Study

[The Case for TypeScript In The AI Coding Era](../07_Sources/matt-typescript-ai-era.md), [Total TypeScript](../07_Sources/matt-total-typescript.md), [Matt Pocock GitHub profile](../07_Sources/matt-github.md), [ts-reset](../07_Sources/matt-ts-reset.md)

## Related Topics

- [TypeScript AI Stack](../04_Tooling/typescript-ai-stack.md)
- [Engineering Taste And Code Quality](../02_Topics/engineering-taste-code-quality.md)

## Related Playbooks

- [AI Code Review Checklist](../03_Playbooks/ai-code-review-checklist.md)
- [Refactoring Prompts](../06_Prompts/refactoring-prompts.md)

## Related Tools

- [TypeScript AI Stack](../04_Tooling/typescript-ai-stack.md)

## Exercises

- Refactor one loose business-domain object into explicit TypeScript types.
- Ask an agent to explain every `any`, assertion, and broad cast in a file.
- Create a TS review checklist for AI-generated pull requests.

## Prompts Inspired By This Person

- Review this TypeScript for places where stronger types would prevent AI-generated bugs.
- Refactor this API boundary into explicit types without adding cleverness.
- Explain the type-level intent of this file and flag casts that hide real uncertainty.

## Sources

[The Case for TypeScript In The AI Coding Era](https://www.totaltypescript.com/the-case-for-typescript-in-the-ai-coding-era), [Total TypeScript](https://www.totaltypescript.com/), [Matt Pocock GitHub profile](https://github.com/mattpocock), [ts-reset](https://github.com/mattpocock/ts-reset)

## Confidence Notes

Strong primary source for TypeScript-in-AI-era claim; use article-specific claims rather than generalized TypeScript ideology.

## Related

- [Typescript Ai Stack](../04_Tooling/typescript-ai-stack.md)
- [Engineering Taste Code Quality](../02_Topics/engineering-taste-code-quality.md)
- [Ai Code Review Checklist](../03_Playbooks/ai-code-review-checklist.md)
- [Refactoring Prompts](../06_Prompts/refactoring-prompts.md)

---
title: Simon Willison
type: person
status: active
confidence: High
last_updated: 2026-05-23
tags: [llms, agentic-engineering, security, cli]
related: [../02_Topics/agentic-engineering.md, ../02_Topics/security-risk-ai-agents.md, ../04_Tooling/llm-cli-tools.md, ../02_Topics/evals-observability-feedback-loops.md, ../03_Playbooks/ai-code-review-checklist.md, ../03_Playbooks/daily-agent-manager-routine.md, ../04_Tooling/evals-and-test-harnesses.md]
sources: [simon-agentic-patterns, simon-vibe-coding, simon-llm-cli, simon-llm-docs, simon-lethal-trifecta]
---

# Simon Willison

**Handle:** GitHub: simonw

**Mentor role:** LLM pragmatism, security, tools, and responsible agentic engineering mentor

## Why This Was Added

Core mentor named by the builder and GitHub user requested. Useful for sober LLM practice, prompt injection awareness, and practical tools.

## Referred By / Mention Evidence

User-curated seed list.

## Why This Person Matters

Simon is a mentor for practical skepticism: build tools, test claims, own generated code, and treat security seriously.

## Best Lessons For The Builder

- Agentic engineering is professional software engineering with agents, not abdication.
- Generated code must be reviewed, tested, understood, and explainable.
- CLI tools and small experiments make model behavior observable.

## Concrete Practices To Adopt

- Never commit AI code you cannot explain.
- Use red/green tests and manual browser checks to guide coding agents.
- Keep prompt injection and tool risk in scope for any LLM-connected workflow.

## What Not To Over-Copy

- Do not call every AI-assisted workflow vibe coding.
- Do not let prototypes silently become production systems.

## Tools, Repos, Articles, Talks To Study

[Agentic Engineering Patterns](../07_Sources/simon-agentic-engineering-patterns.md), [Not all AI-assisted programming is vibe coding](../07_Sources/simon-not-all-ai-assisted-programming-is-vibe-coding.md), [LLM command-line tool and ecosystem](../07_Sources/simon-llm-cli.md), [LLM CLI documentation](../07_Sources/simon-llm-docs.md), [The lethal trifecta for AI agents](../07_Sources/simon-lethal-trifecta.md)

## Related Topics

- [Agentic Engineering](../02_Topics/agentic-engineering.md)
- [Security And Risk For AI Agents](../02_Topics/security-risk-ai-agents.md)
- [LLM CLI Tools](../04_Tooling/llm-cli-tools.md)
- [Evals, Observability, And Feedback Loops](../02_Topics/evals-observability-feedback-loops.md)

## Related Playbooks

- [AI Code Review Checklist](../03_Playbooks/ai-code-review-checklist.md)
- [Daily Agent Manager Routine](../03_Playbooks/daily-agent-manager-routine.md)

## Related Tools

- [LLM CLI Tools](../04_Tooling/llm-cli-tools.md)
- [Evals And Test Harnesses](../04_Tooling/evals-and-test-harnesses.md)

## Exercises

- Write a code-review checklist specifically for AI-generated changes.
- Build one tiny LLM CLI experiment and write down what failed.
- Add a prompt-injection risk note to one AI feature idea.

## Prompts Inspired By This Person

- Review this AI-generated code and tell me whether I can explain, test, and safely own it.
- Design red/green tests that will help a coding agent converge on this behavior.
- Audit this LLM feature for prompt injection, tool misuse, and data exposure risks.

## Sources

[Agentic Engineering Patterns](https://simonwillison.net/guides/agentic-engineering-patterns/), [Not all AI-assisted programming is vibe coding](https://simonwillison.net/2025/Mar/19/vibe-coding/), [LLM command-line tool and ecosystem](https://github.com/simonw/llm), [LLM CLI documentation](https://llm.datasette.io/), [The lethal trifecta for AI agents](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/)

## Confidence Notes

Strong primary sources. Simon updates his views frequently, so current agentic-engineering guidance should be refreshed periodically.

## Related

- [Agentic Engineering](../02_Topics/agentic-engineering.md)
- [Security Risk Ai Agents](../02_Topics/security-risk-ai-agents.md)
- [Llm Cli Tools](../04_Tooling/llm-cli-tools.md)
- [Evals Observability Feedback Loops](../02_Topics/evals-observability-feedback-loops.md)
- [Ai Code Review Checklist](../03_Playbooks/ai-code-review-checklist.md)
- [Daily Agent Manager Routine](../03_Playbooks/daily-agent-manager-routine.md)
- [Evals And Test Harnesses](../04_Tooling/evals-and-test-harnesses.md)

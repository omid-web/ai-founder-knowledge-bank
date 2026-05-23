---
title: Peter Steinberger
type: person
status: active
confidence: High
last_updated: 2026-05-23
tags: [codex, claude-code, parallel-agents, workflow]
related: [../02_Topics/agentic-engineering.md, ../03_Playbooks/parallel-agent-workflow.md, ../04_Tooling/mcp-and-agent-tools.md, ../03_Playbooks/daily-agent-manager-routine.md, ../03_Playbooks/ai-code-review-checklist.md, ../04_Tooling/claude-code-and-codex-workflows.md, ../04_Tooling/llm-cli-tools.md]
sources: [steipete-just-talk, steipete-workflow, steipete-openclaw, steipete-agent-rules]
---

# Peter Steinberger

**Handle:** @steipete

**Mentor role:** Agentic engineering workflow and high-throughput supervision mentor

## Why This Was Added

Core mentor named by the builder and GitHub user requested. Useful for practical high-throughput AI coding workflows.

## Referred By / Mention Evidence

User-curated seed list.

## Why This Person Matters

Steipete is a high-signal field report for running many agents, keeping blast radius visible, and avoiding overbuilt harnesses.

## Best Lessons For The Builder

- Parallelism is valuable only when each task has a manageable blast radius.
- Visible terminals, CLIs, tests, and browser loops can beat opaque orchestration.
- Refactoring and maintenance are part of the agent workflow, not afterthoughts.

## Concrete Practices To Adopt

- Tag each delegated task with expected file count, risk, and verification command.
- Run refactor passes for duplication, dead code, large files, slow tests, and stale docs.
- Use screenshots and browser feedback when UI context matters.

## What Not To Over-Copy

- Do not copy extreme parallelism before your review discipline can handle it.
- Do not let agent output volume become a substitute for product judgment.

## Tools, Repos, Articles, Talks To Study

[Just Talk To It - the no-bs Way of Agentic Engineering](../07_Sources/steipete-just-talk-to-it.md), [My Current AI Dev Workflow](../07_Sources/steipete-current-ai-dev-workflow.md), [OpenClaw, OpenAI and the future](../07_Sources/steipete-openclaw-openai.md), [agent-rules](../07_Sources/steipete-agent-rules.md)

## Related Topics

- [Agentic Engineering](../02_Topics/agentic-engineering.md)
- [Parallel Agent Workflow](../03_Playbooks/parallel-agent-workflow.md)
- [MCP And Agent Tools](../04_Tooling/mcp-and-agent-tools.md)

## Related Playbooks

- [Parallel Agent Workflow](../03_Playbooks/parallel-agent-workflow.md)
- [Daily Agent Manager Routine](../03_Playbooks/daily-agent-manager-routine.md)
- [AI Code Review Checklist](../03_Playbooks/ai-code-review-checklist.md)

## Related Tools

- [Claude Code And Codex Workflows](../04_Tooling/claude-code-and-codex-workflows.md)
- [MCP And Agent Tools](../04_Tooling/mcp-and-agent-tools.md)
- [LLM CLI Tools](../04_Tooling/llm-cli-tools.md)

## Exercises

- Run two small agents on disjoint tasks and review whether parallelism helped or hurt.
- Create a blast-radius rubric for your current repo.
- Have an agent produce a refactor-only PR with tests and a tight file list.

## Prompts Inspired By This Person

- Estimate the blast radius of this change before editing: files touched, risk, tests, rollback plan.
- Run a maintenance pass for duplication, dead code, oversized files, and missing tests. Propose edits before changing files.
- Give me three implementation options with different blast-radius profiles.

## Sources

[Just Talk To It - the no-bs Way of Agentic Engineering](https://steipete.me/posts/just-talk-to-it), [My Current AI Dev Workflow](https://steipete.me/posts/2025/optimal-ai-development-workflow), [OpenClaw, OpenAI and the future](https://steipete.me/posts/2026/openclaw), [agent-rules](https://github.com/steipete/agent-rules)

## Confidence Notes

Primary blog posts are strong but opinionated. Treat tool preferences as time-sensitive snapshots.

## Related

- [Agentic Engineering](../02_Topics/agentic-engineering.md)
- [Parallel Agent Workflow](../03_Playbooks/parallel-agent-workflow.md)
- [Mcp And Agent Tools](../04_Tooling/mcp-and-agent-tools.md)
- [Daily Agent Manager Routine](../03_Playbooks/daily-agent-manager-routine.md)
- [Ai Code Review Checklist](../03_Playbooks/ai-code-review-checklist.md)
- [Claude Code And Codex Workflows](../04_Tooling/claude-code-and-codex-workflows.md)
- [Llm Cli Tools](../04_Tooling/llm-cli-tools.md)

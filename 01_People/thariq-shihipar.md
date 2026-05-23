---
title: Thariq Shihipar
type: person
status: active
confidence: Medium
last_updated: 2026-05-23
tags: [claude-code, agent-tools, context]
related: [../02_Topics/agentic-engineering.md, ../03_Playbooks/parallel-agent-workflow.md, ../04_Tooling/mcp-and-agent-tools.md, ../03_Playbooks/planning-before-coding.md, ../04_Tooling/claude-code-and-codex-workflows.md]
sources: [thariq-site, thariq-agent-design, thariq-workshop-recap, thariq-code-with-claude, anthropic-teams-claude-code, claude-code-docs, claude-subagents-docs]
---

# Thariq Shihipar

**Handle:** @trq212

**Mentor role:** Claude Code and agent action-space mentor

## Why This Was Added

Core mentor named by the builder. Useful for understanding Claude Code from someone associated with its design and public workflow guidance.

## Referred By / Mention Evidence

User-curated seed list.

## Why This Person Matters

Thariq is a mentor for thinking like an agent designer: action space, context, tools, and feedback loops.

## Best Lessons For The Builder

- Agent capability is shaped by the action space you expose.
- Tool design should be discovered empirically through model behavior.
- Context management is a real engineering discipline.

## Concrete Practices To Adopt

- When an agent fails, inspect whether the tool/action space was wrong before blaming the model.
- Prefer progressive discovery over dumping every tool and doc into context.
- Use subagents for bounded research or log-heavy side work.

## What Not To Over-Copy

- Do not assume every X thread is stable documentation.
- Do not create too many tools before observing what the model needs.

## Tools, Repos, Articles, Talks To Study

[Thariq Shihipar personal site](../07_Sources/thariq-site.md), [Think like an agent / Claude Code agent design notes](../07_Sources/thariq-agent-design-space.md), [How We Claude Code - Thariq workshop recap](../07_Sources/thariq-workshop-recap.md), [Code with Claude session: How we Claude Code](../07_Sources/thariq-code-with-claude.md), [How teams use Claude Code](../07_Sources/anthropic-teams-claude-code.md), [Claude Code overview](../07_Sources/anthropic-claude-code-overview.md), [Claude Code subagents](../07_Sources/anthropic-claude-subagents.md)

## Related Topics

- [Agentic Engineering](../02_Topics/agentic-engineering.md)
- [Parallel Agent Workflow](../03_Playbooks/parallel-agent-workflow.md)
- [MCP And Agent Tools](../04_Tooling/mcp-and-agent-tools.md)

## Related Playbooks

- [Parallel Agent Workflow](../03_Playbooks/parallel-agent-workflow.md)
- [Planning Before Coding](../03_Playbooks/planning-before-coding.md)

## Related Tools

- [Claude Code And Codex Workflows](../04_Tooling/claude-code-and-codex-workflows.md)
- [MCP And Agent Tools](../04_Tooling/mcp-and-agent-tools.md)

## Exercises

- Take one failed agent task and classify the failure: context, tool, instruction, model, or verification.
- Design a minimal tool/action set for a business support-agent workflow.
- Compare one subagent workflow against a single-context workflow.

## Prompts Inspired By This Person

- Analyze this failed agent run as an action-space design problem.
- Given this task, what tools and context should the agent see initially, and what should be discovered later?
- Design a subagent for this bounded side task with narrow inputs and a compact report format.

## Sources

[Thariq Shihipar personal site](https://www.thariq.io/), [Think like an agent / Claude Code agent design notes](https://x.com/trq212/article/2027463795355095314), [How We Claude Code - Thariq workshop recap](https://howborisusesclaudecode.com/recap), [Code with Claude session: How we Claude Code](https://claude.com/code-with-claude/session/sf-ext-how-we-claude-code), [How teams use Claude Code](https://www-cdn.anthropic.com/58284b19e702b49db9302d5b6f135ad8871e7658.pdf), [Claude Code overview](https://docs.anthropic.com/en/docs/claude-code/overview), [Claude Code subagents](https://docs.anthropic.com/en/docs/claude-code/sub-agents)

## Confidence Notes

Some sources are X/community recaps. Keep Thariq-specific claims medium confidence unless backed by official Anthropic docs.

## Related

- [Agentic Engineering](../02_Topics/agentic-engineering.md)
- [Parallel Agent Workflow](../03_Playbooks/parallel-agent-workflow.md)
- [Mcp And Agent Tools](../04_Tooling/mcp-and-agent-tools.md)
- [Planning Before Coding](../03_Playbooks/planning-before-coding.md)
- [Claude Code And Codex Workflows](../04_Tooling/claude-code-and-codex-workflows.md)

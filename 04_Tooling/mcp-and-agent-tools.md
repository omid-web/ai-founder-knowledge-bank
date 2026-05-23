---
title: MCP And Agent Tools
type: tooling
status: active
confidence: Medium
last_updated: 2026-05-23
tags: [mcp, tools, cli]
related: []
sources: [anthropic-effective-agents, steipete-just-talk, claude-code-docs]
---

# MCP And Agent Tools

## Why This Tooling Area Matters

MCP And Agent Tools is part of the operating surface for an AI-native one-person company. Use it only when it improves speed, quality, observability, or distribution.

## Key Principles

- Tools expand agent capability and risk.
- Prefer simple CLIs when they provide the same capability with less context overhead.
- Expose only the tools required for the task.

## Practices

- Compare CLI vs MCP context cost.
- Use least privilege.
- Document tool assumptions in AGENTS.md.

## How This Applies To The Builder

Prefer tools that make agent work visible, reviewable, and repeatable. Avoid adding tool layers that hide what the model did or increase context cost without improving outcomes.

## Sources

[Building Effective Agents](https://www.anthropic.com/research/building-effective-agents/), [Just Talk To It - the no-bs Way of Agentic Engineering](https://steipete.me/posts/just-talk-to-it), [Claude Code overview](https://docs.anthropic.com/en/docs/claude-code/overview)

## Related

- [Agentic Engineering](../02_Topics/agentic-engineering.md)
- [Daily Agent Manager Routine](../03_Playbooks/daily-agent-manager-routine.md)

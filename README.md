# Stacked PR demo

This repository compares two ways to deliver the same **wishlist** feature:

1. One conventional pull request containing storage, API, tests, and UI-related output.
2. A GitHub stacked pull request split into a foundation layer and an API layer.

The stacked example is created with the official [`github/gh-stack`](https://github.com/github/gh-stack) extension and follows [GitHub's stacked pull request documentation](https://docs.github.com/en/pull-requests/how-tos/stacked-pull-requests).

## Tutorial

Follow [Moving from a large PR to GitHub Stacked PRs](docs/moving-to-gh-stack.md) to:

- create a new stack,
- adopt existing dependent branches,
- link existing PRs into a stack,
- synchronize, rebase, navigate, and merge the stack.

## Published automation

This repository includes four reusable automation surfaces:

| Surface | Location | Purpose |
| --- | --- | --- |
| Copilot setup workflow | [`.github/workflows/copilot-setup-steps.yml`](.github/workflows/copilot-setup-steps.yml) | Installs and verifies the official `github/gh-stack` extension for Copilot cloud agents. |
| Agent skill | [`.github/skills/stacked-pr-workflow/SKILL.md`](.github/skills/stacked-pr-workflow/SKILL.md) | Teaches Copilot how to plan, create, migrate, validate, and submit stacks. |
| Custom agent | [`.github/agents/stacked-pr-builder.agent.md`](.github/agents/stacked-pr-builder.agent.md) | Provides a specialized agent for end-to-end stacked PR work. |
| Git pre-push hook | [`.githooks/pre-push`](.githooks/pre-push) | Detects large non-stacked feature branches and recommends the workflow. |

Enable the repository hook:

```bash
./scripts/install-git-hooks.sh
```

The hook warns by default. To enforce the policy:

```bash
export GH_STACK_HOOK_ENFORCE=1
```

Thresholds can be configured with `GH_STACK_MAX_FILES`, `GH_STACK_MAX_LINES`, and `GH_STACK_MAX_COMMITS`. Set `GH_STACK_BYPASS=1` for an intentional conventional push.

## Baseline

The `main` branch contains a minimal product catalog API. The demonstration pull requests remain open so their target branches and diffs can be inspected.

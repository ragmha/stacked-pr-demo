# Stacked PR demo

Compare the same wishlist feature delivered as:

- [one conventional PR](https://github.com/ragmha/stacked-pr-demo/pull/1)
- a two-part stack: [foundation](https://github.com/ragmha/stacked-pr-demo/pull/2) → [API and view](https://github.com/ragmha/stacked-pr-demo/pull/3)

## Learn

Read [Moving to GitHub Stacked PRs](docs/moving-to-gh-stack.md).

## Automation

- [Copilot setup workflow](.github/workflows/copilot-setup-steps.yml)
- [Agent skill](.github/skills/stacked-pr-workflow/SKILL.md)
- [Custom agent](.github/agents/stacked-pr-builder.agent.md)
- [Pre-push hook](.githooks/pre-push)

Built with the official [`github/gh-stack`](https://github.com/github/gh-stack) extension and [GitHub stacked PR documentation](https://docs.github.com/en/pull-requests/how-tos/stacked-pull-requests).

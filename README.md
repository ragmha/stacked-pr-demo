# Stacked PR demo

Large features often begin as one long-lived branch:

```text
feature/wishlist ──────────────> main
                 one large PR
```

The PR mixes foundations, APIs, UI, and tests. Review starts late, feedback overlaps, and the whole feature waits for one approval.

With stacked PRs, the feature becomes a chain of focused changes:

```text
wishlist-api      ──> wishlist-storage
wishlist-storage  ──> main
```

Each PR shows only its layer. Reviews can happen in parallel, while merges proceed from the bottom of the stack toward the top.

## How this fits your Git strategy

Stacked PRs do not replace a branching strategy. They organize dependent work before it reaches the strategy's integration branch.

| Strategy | How to use a stack |
| --- | --- |
| Trunk-based development | Keep stacks short. The bottom PR targets `main`; merge frequently from bottom to top. |
| GitHub Flow | Treat each stack layer as a small feature branch. The bottom layer targets the default branch. |
| Git Flow | Target the bottom PR at `develop` or the appropriate release branch; upper PRs target the layer beneath them. |
| Release or hotfix branches | Use stacks only when the fix has real dependencies. Keep urgent fixes direct and small. |

## Step by step

```bash
# Start the bottom layer from your integration branch
gh stack init --base main wishlist-storage

# Commit the focused foundation, then add the next layer
gh stack add wishlist-api

# Inspect and publish the stack
gh stack view
gh stack submit --open
```

Review the layers independently. Merge the bottom PR first, then run `gh stack sync` or `gh stack rebase` before merging the next layer.

## See it in this repository

The same wishlist feature is available in both forms:

1. [PR #1](https://github.com/ragmha/stacked-pr-demo/pull/1) puts the feature into one conventional PR against `main`.
2. [PR #2](https://github.com/ragmha/stacked-pr-demo/pull/2) adds the storage foundation against `main`.
3. [PR #3](https://github.com/ragmha/stacked-pr-demo/pull/3) adds the API and view against PR #2's branch.

The repository also includes a [tutorial](docs/moving-to-gh-stack.md), [Copilot skill](.github/skills/stacked-pr-workflow/SKILL.md), [custom agent](.github/agents/stacked-pr-builder.agent.md), and [pre-push hook](.githooks/pre-push).

## References

- [`github/gh-stack`](https://github.com/github/gh-stack)
- [Stacked pull requests - GitHub Docs](https://docs.github.com/en/pull-requests/how-tos/stacked-pull-requests)

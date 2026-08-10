# Stacked PR demo

This repository compares two ways to deliver the same **wishlist** feature:

1. One conventional pull request containing storage, API, tests, and UI-related output.
2. A GitHub stacked pull request split into a foundation layer and an API layer.

The stacked example is created with the official [`github/gh-stack`](https://github.com/github/gh-stack) extension and follows [GitHub's stacked pull request documentation](https://docs.github.com/en/pull-requests/how-tos/stacked-pull-requests).

## Baseline

The `main` branch contains a minimal product catalog API. The demonstration pull requests remain open so their target branches and diffs can be inspected.

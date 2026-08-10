# Moving from a large PR to GitHub Stacked PRs

This tutorial uses GitHub's official [`github/gh-stack`](https://github.com/github/gh-stack) CLI extension. For the product overview and additional guidance, see [Stacked pull requests - GitHub Docs](https://docs.github.com/en/pull-requests/how-tos/stacked-pull-requests).

## What changes

A conventional feature usually has one branch and one PR:

```text
feature/wishlist -> main
```

A stack uses small branches that build on one another:

```text
wishlist-api        -> PR base: wishlist-storage
wishlist-storage    -> PR base: main
main
```

Reviewers see only the changes introduced by each layer. The bottom PR is closest to `main`; the top PR is furthest away.

## 1. Install the official extension

```bash
gh extension install github/gh-stack
```

Confirm the command is available:

```bash
gh stack --help
```

## 2. Create a new stack

Start from an updated trunk:

```bash
git switch main
git pull --ff-only
gh stack init wishlist-storage
```

Implement and commit the first focused layer:

```bash
git add src/wishlist-store.js test/wishlist-store.test.js
git commit -m "Add wishlist storage foundation"
```

Add the next branch on top:

```bash
gh stack add wishlist-api
```

Implement and commit the second layer:

```bash
git add src/server.js src/wishlist-view.js test/wishlist-view.test.js
git commit -m "Expose wishlist API and view"
```

Inspect the local stack:

```bash
gh stack view
```

Submit every layer and create the linked stack on GitHub:

```bash
gh stack submit
```

For a non-interactive demo, use:

```bash
gh stack submit --auto --open
```

## 3. Adopt existing dependent branches

If you already split the work into branches, list them from bottom to top:

```bash
gh stack init --base main wishlist-storage wishlist-api
gh stack submit
```

The expected commit history is:

```text
main <- wishlist-storage <- wishlist-api
```

Each branch must contain the branch beneath it in its history.

## 4. Link existing PRs into a GitHub stack

If the PRs already exist, link them in bottom-to-top order:

```bash
gh stack link --base main 2 3
```

You can also use branch names:

```bash
gh stack link --base main wishlist-storage wishlist-api
```

According to the official `gh-stack` documentation, `link` creates or updates the GitHub stack and corrects PR base branches to match the chain. It does not create local stack tracking metadata.

Use `gh stack init` and `gh stack submit` when you want local stack management. Use `gh stack link` when you only need to connect existing branches or PRs on GitHub.

## 5. Continue working

Add another layer from the current top branch:

```bash
gh stack add wishlist-ui
```

After committing changes, update the remote PRs:

```bash
gh stack submit
```

Bring the stack up to date with remote changes:

```bash
gh stack sync
```

Rebase the stack from trunk upward:

```bash
gh stack rebase
```

Navigate between layers:

```bash
gh stack bottom
gh stack up
gh stack down
gh stack top
```

## 6. Merge the stack

Merge from the bottom toward the top:

1. Merge the PR whose base is `main`.
2. Run `gh stack sync` or `gh stack rebase`.
3. Confirm the next PR now has the correct base and focused diff.
4. Continue until the top PR is merged.

Do not merge a top-layer PR before the behavior it depends on is available in the target branch.

## Try it in this repository

- [PR #1](https://github.com/ragmha/stacked-pr-demo/pull/1) shows the wishlist feature as one conventional PR.
- [PR #2](https://github.com/ragmha/stacked-pr-demo/pull/2) is the bottom storage layer.
- [PR #3](https://github.com/ragmha/stacked-pr-demo/pull/3) is the API layer based on PR #2's branch.

Clone the repository and inspect the stack:

```bash
git clone https://github.com/ragmha/stacked-pr-demo.git
cd stacked-pr-demo
gh stack checkout 4
gh stack view
```

Stack `4` is the linked two-PR demonstration created by `gh stack submit`.

## Official references

- [`github/gh-stack`: GitHub Stacked PRs](https://github.com/github/gh-stack)
- [Stacked pull requests - GitHub Docs](https://docs.github.com/en/pull-requests/how-tos/stacked-pull-requests)

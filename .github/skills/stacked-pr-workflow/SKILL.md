---
name: stacked-pr-workflow
description: Plan, create, migrate, update, and submit GitHub stacked pull requests with the official github/gh-stack CLI extension. Use when a feature is too large for one review, when asked to split a PR, or when existing dependent branches or PRs should become a GitHub stack.
---

# GitHub stacked pull request workflow

Use only the official GitHub Stacked PRs extension and GitHub documentation:

- https://github.com/github/gh-stack
- https://docs.github.com/en/pull-requests/how-tos/stacked-pull-requests

## Preconditions

1. Confirm the working tree is clean before restructuring branches.
2. Identify the repository trunk branch; do not assume it is `main`.
3. Confirm `gh stack --help` succeeds. If it does not, explain that `gh extension install github/gh-stack` is required.
4. Fetch the remote and inspect the complete feature diff from the trunk merge base.
5. Never discard, rewrite, or overwrite unrelated user changes.

## Decide whether stacking is appropriate

Recommend a stack when the feature contains two or more independently reviewable, dependent layers, such as:

- schema or foundational types,
- domain or persistence logic,
- API or service integration,
- user interface,
- rollout or cleanup.

Do not create a stack solely to satisfy a line-count target. Keep a conventional PR when the change is cohesive, small, and cannot be separated without temporary breakage.

## Design the stack

Before changing branches, present a bottom-to-top plan. For every proposed layer include:

- branch name,
- purpose,
- expected files,
- test or validation command,
- base branch,
- reason the layer is independently reviewable.

Every layer must:

- build on the layer beneath it,
- contain tests for its own behavior,
- leave its target branch valid and deployable,
- avoid unrelated refactoring,
- use a focused commit message.

## Create a new stack

Start from the updated trunk:

```bash
git switch <trunk>
git pull --ff-only
gh stack init --base <trunk> <bottom-branch>
```

Implement, test, stage, and commit the bottom layer. Then add each upper layer:

```bash
gh stack add <next-branch>
```

After every layer:

1. Run the smallest relevant tests.
2. Confirm the working tree is clean after committing.
3. Run `gh stack view`.
4. Confirm the branch order is bottom to top.

## Adopt existing dependent branches

When branches already form a linear dependency chain, adopt them in bottom-to-top order:

```bash
gh stack init --base <trunk> <bottom-branch> <next-branch> <top-branch>
```

Do not adopt branches until their commit ancestry matches the proposed order.

## Link existing pull requests

When the PRs already exist and only need GitHub stack linkage:

```bash
gh stack link --base <trunk> <bottom-pr> <next-pr> <top-pr>
```

Arguments must be in bottom-to-top order. `gh stack link` can correct PR base branches, but it does not create local stack tracking metadata.

## Submit

Creating or updating remote pull requests is an external side effect. Show the final stack and get explicit user confirmation immediately before running:

```bash
gh stack submit --open
```

Use `--auto --open` only when the user explicitly requests non-interactive submission.

After submission, verify:

1. The bottom PR targets the trunk.
2. Each upper PR targets the branch immediately beneath it.
3. Every PR diff contains only its layer.
4. The stack is linked on GitHub.
5. PR descriptions state their position and dependency.

## Maintain and merge

Use:

```bash
gh stack sync
gh stack rebase
gh stack view
```

Merge from the bottom toward the top. After a lower PR merges, synchronize or rebase before merging the next PR.

## Failure handling

- Stop on conflicts and report the affected branches and files.
- Never force-push manually when `gh stack` can perform the operation.
- Never bypass failed tests to submit a stack.
- Do not silently convert a conventional PR into multiple remote PRs.

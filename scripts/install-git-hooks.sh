#!/bin/sh

set -eu

repository_root=$(git rev-parse --show-toplevel)
git -C "$repository_root" config core.hooksPath .githooks

echo "Installed repository Git hooks from .githooks."
echo "Set GH_STACK_HOOK_ENFORCE=1 to block oversized non-stacked pushes."

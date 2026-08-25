# AUREN — Repository Hygiene Contract

This document operationalizes the repository rules in `docs/product/AUREN_MASTER_PLAN.md`. The Master Plan always wins if the two conflict.

## Day Zero principles

1. **Git history is the archive.** The working tree should represent the current product, not a museum of backups.
2. **Keep root clean.** Only project-level files and runtime entry points belong at root.
3. **Every file has one home.** Product docs, handoff, design, architecture, engineering, QA, source, assets, tests and scripts stay separated by role.
4. **No junk naming.** Never create `final-final`, `backup-old`, `copy-2`, dated duplicates, or ad-hoc scratch files in the repository.
5. **Delete obsolete files.** Recover history from Git instead of keeping dead copies.
6. **No secrets.** Credentials, API keys, tokens, `.env`, private keys and local account data must never be committed.
7. **No build-package clutter.** ZIP/release packages belong in GitHub Releases when milestones exist, not in the source tree.
8. **Temporary `.gitkeep` only.** It exists solely to preserve an empty foundation folder in Git; remove it as soon as that folder contains a real tracked file.
9. **Stable `main`.** Use short-lived `feature/*` and `fix/*` branches only when they materially reduce risk; delete after merge.
10. **Master Plan coherence.** Durable product/architecture decisions that change the foundation must update the canonical Master Plan with the same body of work.

## Required workflow for substantial changes

`Master Plan → inspect current HEAD → isolate scope → changed-file allowlist → implement → test target + neighbors → real-device acceptance when relevant → merge/release`

Repository cleanliness is an engineering quality requirement. A cluttered tree, conflicting canonical files, or unrecoverable handoff is a defect.

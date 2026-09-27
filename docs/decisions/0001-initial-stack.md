# 0001 — Initial stack

Date: 2026-09-28

## Context

ToBS is a public index of terms people already accepted. It must be editable by strangers and reviewable before those edits go live. It must not hoard full contracts.

## Decision

Vite and React for the interface. CSS by hand. The index is JavaScript data in git. Firebase Hosting project `tobs-terms` serves the build. Pull requests are the quality gate.

## Consequences

A change to a clause is a commit, not a live form. That is slower and harder to fake. Hosting still updates only when someone deploys.

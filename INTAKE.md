# Intake — ToBS

Date: 2026-09-28

## Answers

Inferred from the brief, not re-asked.

- Nature: venture / public product. Brand trust around Lebz Miya's name.
- Shape: web app.
- Repo: public. The brief says open source and publicly editable.
- Foundation: build the first version, capture sources while building.
- Deploy: Firebase Hosting, new project `tobs-terms`.
- Design: playful, colorful, modern and spare. New palette (paper, ink, lemon, hot pink, mint). Not an existing brand bible.
- Philosophy: working product, first version in the browser.
- Cadence: push the repo, first changelog entry, deploy.
- Mobile: required at 390, 768, and 1280.
- How-to wizard: included. Dismiss with X, Esc, backdrop, or Skip, plus "Don't show again" in localStorage (`tobs.tour.v1`).

## Stack

- Vite + React
- Hand-rolled CSS
- Firebase Hosting (`tobs-terms`)
- Index in git, not a database. Public edits are pull requests. That is the quality control.

## Undo

- Hosting: `firebase hosting:disable --project tobs-terms`
- Repo: delete the GitHub repository if it should not be public
- Wizard: clear `tobs.tour.v1` in localStorage

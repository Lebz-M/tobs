# ToBS

Terms of BullShit. An open index of the clauses people actually agree to.

Search a company or product name. After three characters, ToBS lists the company or the specific platform — not a dump of the whole contract. Open a result and read each bite as: what it is, tags, plain English, a source pointer (and a verbatim outtake when one was captured), what it means in a dispute, and a predatory rating out of 10.

The site does not store full terms of service. It stores an index taken at a date, and a counter of days since that ingestion.

## Status

v0.1.0 — first public index. Live at https://tobs-terms.web.app. Source at https://github.com/Lebz-M/tobs.

## Getting started

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npx firebase deploy --only hosting --project tobs-terms
```

## Where things live

- `src/` — the interface
- `src/data/` — the index
- `docs/decisions/` — why the stack looks like this
- `CONTRIBUTING.md` — how a public edit gets merged

## Who to ask

Lebz Miya.

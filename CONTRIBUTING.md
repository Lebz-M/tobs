# Contributing to ToBS

The index is public. Merges are reviewed.

## What belongs here

A row for a company or a single product instrument: terms of service, a device EULA, a payments agreement, a privacy policy when that is the only public instrument. If a group has several products, add several rows. Do not flatten YouTube into "Google."

## Quality bar

1. Source URL opens, and you include the date you opened it.
2. Section pointer is something a reader can find (heading, clause number).
3. Verbatim outtakes are short quotes you copied. No excerpt unless you copied it. Paraphrase stays `kind: "orientation"` with `excerpt: null`.
4. Predatory score is 1–10, 10 most extractive, with a reason in the plain-English or implications text. Use `gap()` when there is nothing to score.
5. Say which court story you mean: the contract's chosen forum, and the local statute that may ignore it (CPA, POPIA, GDPR, consumer arbitration limits).

## How

Branch, edit `src/data`, open a pull request. A maintainer checks the URL and the quote before merge. That review is the quality control. The live site only changes when the pull request lands and hosting is redeployed.

Do not commit secrets.

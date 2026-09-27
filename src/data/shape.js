export const INGESTED_AT = "2026-09-28T00:40:00+02:00";

export function clause(row) {
  return {
    kind: "orientation",
    excerpt: null,
    ...row,
  };
}

export function verbatim(row) {
  return clause({ ...row, kind: "verbatim" });
}

export function gap(row) {
  return clause({
    ...row,
    kind: "gap",
    score: null,
    excerpt: null,
  });
}

export function product(row) {
  return {
    aliases: [],
    ingestedAt: INGESTED_AT,
    ...row,
  };
}

export function org(row) {
  return {
    aliases: [],
    umbrella: null,
    ...row,
  };
}

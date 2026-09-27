import { named } from "./named.js";
import { named2 } from "./named2.js";
import { wildcards } from "./wildcards.js";
import { INGESTED_AT } from "./shape.js";

export { INGESTED_AT };

export const orgs = [...named, ...named2, ...wildcards];

export function daysSince(iso) {
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return null;
  return Math.max(0, Math.floor((Date.now() - t) / 86400000));
}

export function heat(score) {
  if (score == null || Number.isNaN(score)) return "#d9d3c7";
  if (score <= 2) return "#1f8a4c";
  if (score <= 4) return "#8bc34a";
  if (score <= 6) return "#f0c419";
  if (score <= 8) return "#f08a24";
  return "#e23b3b";
}

export function productScore(p) {
  const scores = p.clauses.map((c) => c.score).filter((s) => typeof s === "number");
  if (!scores.length) return null;
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  return Math.round(avg * 10) / 10;
}

export function findOrg(id) {
  return orgs.find((o) => o.id === id) || null;
}

export function findProduct(orgId, productId) {
  const org = findOrg(orgId);
  if (!org) return null;
  const product = org.products.find((p) => p.id === productId);
  if (!product) return null;
  return { org, product };
}

export function search(raw) {
  const query = raw.trim().toLowerCase();
  if (query.length < 3) return [];
  const hits = [];

  const has = (values) =>
    values.filter(Boolean).some((v) => String(v).toLowerCase().includes(query));

  for (const org of orgs) {
    const orgMatch = has([org.name, org.legal, org.parent, ...org.aliases]);
    if (orgMatch) {
      const starts = org.name.toLowerCase().startsWith(query);
      hits.push({ type: "org", org, rank: starts ? 0 : 1, via: "name" });
    }
    for (const product of org.products) {
      const nameMatch = has([product.name, ...product.aliases]);
      const header = product.clauses.some((c) => c.title.toLowerCase().includes(query));
      if (nameMatch || header || orgMatch) {
        let rank = 4;
        let via = "family";
        if (product.name.toLowerCase().startsWith(query)) {
          rank = 0;
          via = "name";
        } else if (nameMatch) {
          rank = 1;
          via = "name";
        } else if (header) {
          rank = 2;
          via = "header";
        }
        hits.push({ type: "product", org, product, rank, via });
      }
    }
  }

  hits.sort((a, b) => a.rank - b.rank || a.type.localeCompare(b.type) || a.org.name.localeCompare(b.org.name));
  const seen = new Set();
  const out = [];
  for (const hit of hits) {
    const key = hit.type === "org" ? `o:${hit.org.id}` : `p:${hit.org.id}:${hit.product.id}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(hit);
    if (out.length === 20) break;
  }
  return out;
}

export const counts = {
  orgs: orgs.length,
  products: orgs.reduce((n, o) => n + o.products.length, 0),
};

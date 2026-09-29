import { useEffect, useMemo, useState } from "react";
import {
  counts,
  daysSince,
  findOrg,
  findProduct,
  heat,
  productScore,
  search,
} from "./data/corpus.js";

const TOUR_KEY = "tobs.tour.v2";

const tourSteps = [
  {
    title: "Type three letters",
    body: "Search starts at the third character. It looks at company names, product names, and clause headers — not the whole legal novel.",
  },
  {
    title: "Open what you actually use",
    body: "Google is not one agreement. YouTube is not Gmail. Pick the product. The parent company is there when the name on the tin and the name on the contract differ.",
  },
  {
    title: "Five bites, across the page",
    body: "Every instrument carries at least five different things. Each one is a row: the clause, plain English, the document pointer, what a court might do with it, and a rating out of 10. Ten is the worst.",
  },
  {
    title: "Quotes are quotes. Readings are readings.",
    body: "A yellow passage was copied from the document on the ingestion date. Everything else is an orientation until someone captures the sentence. This is not legal advice.",
  },
];

function parseHash() {
  const raw = window.location.hash.replace(/^#/, "") || "/";
  const parts = raw.split("/").filter(Boolean);
  if (parts[0] === "org" && parts[1]) return { name: "org", id: decodeURIComponent(parts[1]) };
  if (parts[0] === "p" && parts[1] && parts[2]) {
    return { name: "product", orgId: decodeURIComponent(parts[1]), productId: decodeURIComponent(parts[2]) };
  }
  if (parts[0] === "contribute") return { name: "contribute" };
  if (parts[0] === "log") return { name: "log" };
  return { name: "home" };
}

function go(hash) {
  window.location.hash = hash;
}

export default function App() {
  const [route, setRoute] = useState(parseHash);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [tourOn, setTourOn] = useState(false);
  const [step, setStep] = useState(0);
  const [dont, setDont] = useState(false);

  useEffect(() => {
    const onHash = () => setRoute(parseHash());
    window.addEventListener("hashchange", onHash);
    if (!localStorage.getItem(TOUR_KEY)) setTourOn(true);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    if (!tourOn) return undefined;
    const onEsc = (e) => {
      if (e.key === "Escape") closeTour(false);
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [tourOn, dont]);

  const hits = useMemo(() => search(q), [q]);

  useEffect(() => {
    setActive(0);
  }, [q]);

  function closeTour(persist) {
    if (persist || dont) localStorage.setItem(TOUR_KEY, "1");
    setTourOn(false);
  }

  function onKey(e) {
    if (!open || q.trim().length < 3) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((n) => Math.min(hits.length - 1, n + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((n) => Math.max(0, n - 1));
    } else if (e.key === "Enter" && hits[active]) {
      e.preventDefault();
      openHit(hits[active]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  function openHit(hit) {
    setOpen(false);
    setQ("");
    if (hit.type === "org") go(`#/org/${hit.org.id}`);
    else go(`#/p/${hit.org.id}/${hit.product.id}`);
  }

  return (
    <div className="app">
      <header className="top">
        <button className="brand" onClick={() => go("#/")}>
          <p className="logo">To<span>BS</span></p>
          <small>Terms of BullShit</small>
        </button>
        <nav className="nav">
          <button onClick={() => go("#/contribute")}>How it works</button>
          <button onClick={() => go("#/log")}>Changelog</button>
          <button onClick={() => { setStep(0); setDont(false); setTourOn(true); }}>How to</button>
        </nav>
      </header>

      <main className="wrap">
        {route.name === "home" && (
          <Home
            q={q}
            setQ={setQ}
            hits={hits}
            open={open}
            setOpen={setOpen}
            active={active}
            onKey={onKey}
            openHit={openHit}
          />
        )}
        {route.name === "org" && <OrgPage id={route.id} />}
        {route.name === "product" && <ProductPage orgId={route.orgId} productId={route.productId} />}
        {route.name === "contribute" && <Contribute />}
        {route.name === "log" && <Log />}
      </main>

      <footer className="foot">
        <div>
          <strong>ToBS</strong> is an open index, not a law firm. {counts.orgs} names, {counts.products} instruments in v1.
        </div>
        <div>
          Built in public by Lebz Miya.{" "}
          <a href="https://github.com/Lebz-M/tobs">Source</a>
          {" · "}
          <a href="https://tobs-terms.web.app">Live</a>
        </div>
      </footer>

      {tourOn && (
        <div className="tour" onClick={() => closeTour(false)} role="presentation">
          <div
            className="tour-card"
            role="dialog"
            aria-labelledby="tour-title"
            onClick={(e) => e.stopPropagation()}
          >
            <header>
              <strong>First time on ToBS</strong>
              <button className="x" aria-label="Close" onClick={() => closeTour(false)}>×</button>
            </header>
            <div className="steps" aria-hidden="true">
              {tourSteps.map((_, i) => <i key={i} className={i === step ? "on" : ""} />)}
            </div>
            <h3 id="tour-title">{tourSteps[step].title}</h3>
            <p>{tourSteps[step].body}</p>
            <div className="tour-actions">
              <label className="check">
                <input type="checkbox" checked={dont} onChange={(e) => setDont(e.target.checked)} />
                Don’t show again
              </label>
              <span>
                <button className="quiet" onClick={() => closeTour(true)}>Skip</button>{" "}
                {step < tourSteps.length - 1 ? (
                  <button className="primary" onClick={() => setStep((s) => s + 1)}>Next</button>
                ) : (
                  <button className="primary" onClick={() => closeTour(true)}>Done</button>
                )}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Home({ q, setQ, hits, open, setOpen, active, onKey, openHit }) {
  const ready = q.trim().length >= 3;
  const samples = ["Google", "WhatsApp", "Claude", "SHEIN", "CIPC", "Flock"];
  return (
    <section className="hero">
      <div className="home-grid">
        <div>
      <span className="kicker">open index</span>
      <h1 className="display">You clicked I agree. We read it.</h1>
      <p className="lede">
        Search a company or a product. ToBS opens that instrument into at least five separate bites — money, privacy, ownership, shutdown, and the courtroom — with a pointer back to the document.
      </p>
      <div className="search-wrap">
        <input
          className="search"
          placeholder="Try a name. Three letters wakes it up."
          value={q}
          aria-label="Search companies and products"
          onChange={(e) => { setQ(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKey}
        />
        <p className="hint">
          {q.trim().length > 0 && q.trim().length < 3
            ? `${3 - q.trim().length} more character${q.trim().length === 2 ? "" : "s"} before results.`
            : "Names, brands, and clause headers. Not the full agreement text."}
        </p>
        {open && ready && (
          <div className="results" role="listbox">
            {hits.length === 0 && <div className="empty-hit">No results found.</div>}
            {hits.map((hit, i) => (
              <button
                key={hit.type === "org" ? hit.org.id : `${hit.org.id}-${hit.product.id}`}
                className={`result${i === active ? " active" : ""}`}
                onMouseEnter={() => {}}
                onClick={() => openHit(hit)}
              >
                <span className={`pill${hit.type === "org" ? " org" : ""}`}>{hit.type === "org" ? "Company" : "Product"}</span>
                <span>
                  <strong>{hit.type === "org" ? hit.org.name : hit.product.name}</strong>
                  <em>
                    {hit.type === "org"
                      ? hit.org.legal
                      : `${hit.org.name} · ${hit.via === "header" ? "matched a clause header" : hit.via === "family" ? "part of this family" : hit.product.instrument}`}
                  </em>
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="chips">
        {samples.map((name) => (
          <button key={name} onClick={() => { setQ(name); setOpen(true); }}>{name}</button>
        ))}
      </div>
        </div>
        <aside className="anatomy">
          <span className="kicker">How a row works</span>
          <h2>One thing. Five columns.</h2>
          <ol>
            <li><strong>Thing.</strong> The clause, named as a person would say it. Not the heading the lawyers used.</li>
            <li><strong>Tags.</strong> Privacy, license, payout, court, gap. So you can see the kind of bite before the paragraph.</li>
            <li><strong>Plain English.</strong> What the sentence does to you. A reading, unless the next column says otherwise.</li>
            <li><strong>The document.</strong> A yellow block is a verbatim outtake captured on the ingestion date. Otherwise we refuse to invent a quote, and we point at the section instead.</li>
            <li><strong>Court.</strong> The contract’s chosen forum, and the local statute that may ignore it — CPA, POPIA, GDPR, a ban on forced arbitration.</li>
            <li><strong>Rating.</strong> Predatory score out of 10. Ten takes the most from the person who did not write the contract. The big number on a product is the average.</li>
          </ol>
          <p className="sub">We do not store the whole terms of service. We store an index taken on a date, and the days since.</p>
        </aside>
      </div>
    </section>
  );
}

function OrgPage({ id }) {
  const org = findOrg(id);
  if (!org) return <Missing />;
  return (
    <article className="panel">
      <div className="crumb">
        <button onClick={() => go("#/")}>Index</button>
        <span>/</span>
        <span>{org.name}</span>
      </div>
      <h2>{org.name}</h2>
      <p className="sub">{org.legal}{org.parent && org.parent !== org.legal ? ` · ${org.parent}` : ""}</p>
      <p>{org.blurb}</p>
      {org.umbrella && <div className="umbrella">{org.umbrella}</div>}
      <div className="cards">
        {org.products.map((p) => {
          const score = productScore(p);
          return (
            <button key={p.id} className="card" onClick={() => go(`#/p/${org.id}/${p.id}`)}>
              <strong>{p.name}</strong>
              <div className="who">{p.instrument}</div>
              <div style={{ marginTop: 8, fontWeight: 650, color: heat(score) }}>
                {score == null ? "No rating yet" : `${score} / 10`}
              </div>
            </button>
          );
        })}
      </div>
    </article>
  );
}

function ProductPage({ orgId, productId }) {
  const found = findProduct(orgId, productId);
  if (!found) return <Missing />;
  const { org, product } = found;
  const score = productScore(product);
  const days = daysSince(product.ingestedAt);
  return (
    <article>
      <div className="panel">
        <div className="crumb">
          <button onClick={() => go("#/")}>Index</button>
          <span>/</span>
          <button onClick={() => go(`#/org/${org.id}`)}>{org.name}</button>
          <span>/</span>
          <span>{product.name}</span>
        </div>
        <div className="head-grid">
          <div>
            <h2>{product.name}</h2>
            <p className="sub">{product.instrument}</p>
            <div className="meta-row" style={{ marginTop: 12 }}>
              <span className="timer">{days} {days === 1 ? "day" : "days"} since this index was taken</span>
              {product.effective && <span className="tag">Document date: {product.effective}</span>}
            </div>
          </div>
          <div className="score-blob" style={{ background: heat(score) }} title="Average predatory rating">
            {score == null ? "—" : score}
          </div>
        </div>
        {org.umbrella && <div className="umbrella">{org.umbrella}</div>}
        <div className="stats">
          <div className="stat"><b>{product.clauses.length}</b><span>things in this instrument</span></div>
          <div className="stat"><b>{score == null ? "—" : score}</b><span>average predatory rating</span></div>
          <div className="stat"><b>{days}</b><span>{days === 1 ? "day" : "days"} since ingestion</span></div>
          <div className="stat"><b>{product.clauses.filter((c) => c.kind === "verbatim").length}</b><span>verbatim outtakes</span></div>
        </div>
      </div>
      <div className="ledger-head">
        <span>Thing</span>
        <span>Plain English</span>
        <span>From the document</span>
        <span>If this sees a court</span>
        <span>Rating</span>
      </div>
      {product.clauses.map((c) => (
        <section key={c.title} className="clause ledger-row">
          <div className="cell">
            <h3>{c.title}</h3>
            <div className="tags">
              {c.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
            </div>
          </div>
          <div className="cell">
            <p className="cell-label">Plain English</p>
            <p>{c.plain}</p>
          </div>
          <div className="cell">
            <p className="cell-label">From the document</p>
            <div className="kind">
              {c.kind === "verbatim" ? "Verbatim outtake" : c.kind === "gap" ? "Nothing to quote" : "Orientation — not a quote"}
            </div>
            {c.excerpt ? <blockquote className="quote">{c.excerpt}</blockquote> : <p>No verbatim sentence captured at ingestion. Open the source before you repeat one.</p>}
            <p className="pointer">
              {c.pointer}
              <br />
              <a href={c.sourceUrl} target="_blank" rel="noreferrer">Source</a>
            </p>
          </div>
          <div className="cell">
            <p className="cell-label">If this sees a court</p>
            <p>{c.implications}</p>
            <p className="pointer">{c.courts}</p>
          </div>
          <div className="rate" style={{ background: heat(c.score) }}>
            <b>{c.score == null ? "—" : c.score}</b>
            <span>out of 10</span>
          </div>
        </section>
      ))}
    </article>
  );
}

function Missing() {
  return (
    <article className="panel">
      <h2>That page is not in the index.</h2>
      <button className="primary" onClick={() => go("#/")}>Back to search</button>
    </article>
  );
}

function Contribute() {
  return (
    <div className="how-grid">
      <article className="panel prose">
        <h2>How ToBS works</h2>
        <p>
          A person searches a name they already know — a brand, a product, a clause header. The index does not search the body of the contract, so “arbitration” will not dump every agreement that mentions a courtroom. It dumps the companies and products whose names or headers match.
        </p>
        <p>
          Open a product and you get that instrument, not the whole corporate group. YouTube is not Gmail. The API is not the chatbot. Each instrument is at least five things, because one spicy clause is not the deal.
        </p>
        <ol>
          <li><strong>Ingest.</strong> Someone opens the live terms on a date. ToBS stores the URL, the section pointer, and that timestamp. It does not keep a private copy of the full document.</li>
          <li><strong>Separate the bites.</strong> Parties, license, data, money, shutdown, changes, and the forum. If a bite is not in the document, the row says so.</li>
          <li><strong>Quote or don’t.</strong> A verbatim outtake is a short sentence copied that day. An orientation is a reading. A gap means we looked and the instrument was not public.</li>
          <li><strong>Score.</strong> The rating is editorial. Ten is the most extractive toward the person who did not draft it. The product number is the average of the scored rows.</li>
          <li><strong>Age the index.</strong> The day counter is only “days since this row was taken.” When the company rewrites the terms, the row is stale on purpose until someone re-ingests it.</li>
        </ol>
      </article>
      <article className="panel prose">
        <h2>How a public edit lands</h2>
        <p>Anyone can propose a better row. A maintainer merges it. That review is the quality control. The live site does not take silent edits.</p>
        <ol>
          <li>Fork the repo and edit <code>src/data</code>.</li>
          <li>Keep subsidiaries as their own instruments. Do not fold Quest into “Meta” and call it done.</li>
          <li>Every new thing needs a source URL, the date you opened it, and a section a reader can find.</li>
          <li>No excerpt unless you copied it. Invented quotes get rejected.</li>
          <li>A predatory score needs a reason in the row. Open a pull request.</li>
        </ol>
        <p>Local law still sits on top of a foreign forum clause. The row is supposed to say both.</p>
      </article>
    </div>
  );
}

function Log() {
  return (
    <article className="panel prose">
      <h2>Changelog</h2>
      <p><strong>0.2.0</strong> — 29 September 2026</p>
      <ul>
        <li>The index uses the width of the screen. Each instrument is a full-width ledger: thing, plain English, document, court, rating.</li>
        <li>Every terms document now carries at least five distinct things.</li>
        <li>How it works is spelled out on the home page and on Edit the index: ingest, separate, quote or don’t, score, age.</li>
      </ul>
      <p><strong>0.1.0</strong> — 28 September 2026</p>
      <ul>
        <li>First public index. Search after three characters, company and product results, clause breakdowns, days-since-ingestion.</li>
        <li>Starter set: the named list, plus twenty wildcards (Amazon through Equifax).</li>
        <li>Verbatim outtakes captured for the Google Terms of Service (effective 30 July 2026), the YouTube Terms (15 December 2023), and the Anthropic Consumer Terms (8 October 2025). Other rows are orientations until a quote is captured.</li>
      </ul>
    </article>
  );
}

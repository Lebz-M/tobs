import { clause, org, product } from "./shape.js";

function one(id, name, aliases, legal, parent, blurb, prod) {
  return org({
    id,
    name,
    legal,
    parent,
    aliases,
    blurb,
    products: [product(prod)],
  });
}

export const wildcards = [
  org({
    id: "amazon",
    name: "Amazon",
    legal: "Amazon.com, Inc. and local affiliates",
    parent: "Amazon.com, Inc.",
    aliases: ["amazon", "aws"],
    blurb: "The shop, the video app, and the cloud are different contracts that share a login.",
    products: [
      product({
        id: "amazon-retail",
        name: "Amazon",
        aliases: ["amazon.com", "amazon marketplace"],
        instrument: "Amazon Conditions of Use",
        sourceUrl: "https://www.amazon.com/gp/help/customer/display.html?nodeId=508088",
        effective: "see live page",
        clauses: [
          clause({
            title: "Marketplace buyers and sellers live under different rules",
            tags: ["retail", "arbitration"],
            plain: "The conditions of use cover the storefront. A third-party seller's return rules can differ from Amazon's own. US conditions have long included an arbitration and class-waiver structure. Read the version for your country — the .co.za and .de sites are not the US text.",
            pointer: "Conditions of Use → disputes",
            sourceUrl: "https://www.amazon.com/gp/help/customer/display.html?nodeId=508088",
            implications: "A US account can be pushed into private arbitration. A South African consumer buying on a local site should read that site's conditions and still has the CPA in the background.",
            courts: "US: arbitration clause is the thing to find. Elsewhere: the local Amazon entity's courts clause, plus mandatory consumer law.",
            score: 7,
          }),
        ],
      }),
      product({
        id: "prime-video",
        name: "Prime Video",
        aliases: ["amazon prime"],
        instrument: "Prime Video Terms of Use",
        sourceUrl: "https://www.primevideo.com/help?nodeId=202095500",
        effective: "see live page",
        clauses: [
          clause({
            title: "Prime shipping and Prime Video are bundled and separable",
            tags: ["subscription"],
            plain: "Prime is a membership with video as one benefit. Video terms license a personal stream. Downloads expire. Buying or renting a title is yet another little contract inside the same app.",
            pointer: "Prime Video Terms of Use",
            sourceUrl: "https://www.primevideo.com/help?nodeId=202095500",
            implications: "Canceling Prime can drop video and shipping on different dates. 'Bought' digital titles are licensed and can be region-locked.",
            courts: "Local consumer cancellation rules.",
            score: 5,
          }),
        ],
      }),
      product({
        id: "aws",
        name: "AWS",
        aliases: ["amazon web services"],
        instrument: "AWS Customer Agreement",
        sourceUrl: "https://aws.amazon.com/agreement/",
        effective: "see live page",
        clauses: [
          clause({
            title: "The cloud agreement is not the shop agreement",
            tags: ["b2b", "data"],
            plain: "AWS customers sign a business agreement and a data-processing addendum. Liability caps, suspension for non-payment, and acceptable use are the operative bites. Your end users did not agree to AWS.",
            pointer: "AWS Customer Agreement",
            sourceUrl: "https://aws.amazon.com/agreement/",
            implications: "A startup that put user data in S3 is the responsible party under POPIA. AWS is the operator. The DPA is the document a regulator will ask for.",
            courts: "Business venue in the AWS agreement, often Washington state law for the US version.",
            score: 5,
          }),
        ],
      }),
    ],
  }),

  org({
    id: "microsoft",
    name: "Microsoft",
    legal: "Microsoft Corporation",
    parent: "Microsoft Corporation",
    aliases: ["microsoft", "msft"],
    blurb: "Windows, Xbox, LinkedIn, GitHub, and Copilot do not share one privacy story, even though one company can see across several of them.",
    products: [
      product({
        id: "windows",
        name: "Windows",
        aliases: ["windows 11"],
        instrument: "Microsoft Services Agreement",
        sourceUrl: "https://www.microsoft.com/servicesagreement",
        effective: "see live page",
        clauses: [
          clause({
            title: "The PC license is a services agreement",
            tags: ["device", "account"],
            plain: "Using Windows with a Microsoft account pulls in the Services Agreement: updates, store purchases, and diagnostic data. Local accounts reduce the surface. They do not delete telemetry choices you still have to set.",
            pointer: "Microsoft Services Agreement",
            sourceUrl: "https://www.microsoft.com/servicesagreement",
            implications: "A work PC joined to Entra ID is your employer's tenant. Personal files in a work profile are visible to that admin.",
            courts: "Microsoft publishes region-specific agreements.",
            score: 5,
          }),
        ],
      }),
      product({
        id: "xbox",
        name: "Xbox",
        aliases: ["xbox live"],
        instrument: "Xbox / Microsoft Store terms",
        sourceUrl: "https://www.microsoft.com/servicesagreement",
        effective: "see live page",
        clauses: [
          clause({
            title: "Digital games are account-bound",
            tags: ["license", "account"],
            plain: "Xbox purchases sit on the Microsoft account. A ban or a lost account is a lost library. Game Pass is a rental that ends when the subscription ends.",
            pointer: "Microsoft Services Agreement and Xbox community standards",
            sourceUrl: "https://www.xbox.com/legal",
            implications: "Family sharing and home-console rules are easy to break without noticing, and the remedy is account-level.",
            courts: "Services agreement venue for your region.",
            score: 6,
          }),
        ],
      }),
      product({
        id: "linkedin",
        name: "LinkedIn",
        aliases: ["linkedin"],
        instrument: "LinkedIn User Agreement",
        sourceUrl: "https://www.linkedin.com/legal/user-agreement",
        effective: "see live page",
        clauses: [
          clause({
            title: "Your résumé is the training and the ad graph",
            tags: ["work", "privacy", "ai"],
            plain: "LinkedIn's user agreement licenses the profile you chose to publish and forbids scraping. Off-platform uses of member data for AI have been a live fight. Read the current AI and privacy sections rather than a 2024 headline.",
            pointer: "LinkedIn User Agreement",
            sourceUrl: "https://www.linkedin.com/legal/user-agreement",
            implications: "A public profile is a publication. Employers and courts already treat it that way. Scraping it 'because it was public' still breaches the contract and has lost in court.",
            courts: "LinkedIn has litigated scraping under the US CFAA and contract. Other countries use their own data-protection law.",
            score: 6,
          }),
        ],
      }),
      product({
        id: "github",
        name: "GitHub",
        aliases: ["github", "copilot"],
        instrument: "GitHub Terms of Service",
        sourceUrl: "https://docs.github.com/en/site-policy/github-terms/github-terms-of-service",
        effective: "see live page",
        clauses: [
          clause({
            title: "Public repos are a license you chose, plus theirs",
            tags: ["code", "license", "ai"],
            plain: "GitHub's terms let them host your code. The open-source license you pick (MIT, GPL, none) is what other humans get. Copilot is an extra product with extra terms. 'Public' does not mean 'train whatever you want' and it also does not mean 'all rights reserved' if you attached a license.",
            pointer: "GitHub Terms of Service; Copilot terms",
            sourceUrl: "https://docs.github.com/en/site-policy/github-terms/github-terms-of-service",
            implications: "Putting client code in a public repo is a confidentiality breach before it is a GitHub-terms issue. Private repos are still on Microsoft's infrastructure.",
            courts: "Copyright license for the code. GitHub's venue for a fight with GitHub.",
            score: 5,
          }),
        ],
      }),
    ],
  }),

  one("tiktok", "TikTok", ["tiktok", "bytedance"], "TikTok entities vary by region", "ByteDance", "The app people mean when they say the algorithm knows them too well.", {
    id: "tiktok",
    name: "TikTok",
    instrument: "TikTok Terms of Service",
    sourceUrl: "https://www.tiktok.com/legal/terms-of-service",
    effective: "see live page",
    clauses: [
      clause({
        title: "The soundtrack and your face, licensed wide",
        tags: ["license", "privacy", "minors"],
        plain: "TikTok's terms take a broad license over videos you upload and incorporate music under their deals, not yours. Personalized ads and the recommendation system are the privacy product. Age rules exist and are widely ignored, which does not make them optional.",
        pointer: "TikTok Terms of Service and Privacy Policy",
        sourceUrl: "https://www.tiktok.com/legal/terms-of-service",
        implications: "A video of a child, uploaded by a parent, is still the child's personal information. Governments have banned or threatened the app on national-security grounds that the terms do not mention and cannot waive.",
        courts: "Region-specific entities (US, EU, UK). Local bans are statute, not contract.",
        score: 8,
      }),
    ],
  }),

  one("spotify", "Spotify", ["spotify"], "Spotify AB and local entities", "Spotify", "Music rental with a podcast and audiobook aisle.", {
    id: "spotify",
    name: "Spotify",
    instrument: "Spotify Terms of Use",
    sourceUrl: "https://www.spotify.com/legal/end-user-agreement/",
    effective: "see live page",
    clauses: [
      clause({
        title: "You license listening. You do not buy the track.",
        tags: ["subscription", "copyright"],
        plain: "The end-user agreement is a personal, non-commercial, revocable license. Offline downloads expire. Podcast ads and data sharing with labels are described more honestly in the privacy policy than in the marketing.",
        pointer: "Spotify Terms and Conditions of Use",
        sourceUrl: "https://www.spotify.com/legal/end-user-agreement/",
        implications: "A creator's royalties are not in this contract. A café playing Spotify is outside the personal license and needs a public-performance license.",
        courts: "Country terms. Consumer auto-renew law locally.",
        score: 4,
      }),
    ],
  }),

  one("netflix", "Netflix", ["netflix"], "Netflix, Inc. and local entities", "Netflix", "The reference shape for 'you bought access, not a copy.'", {
    id: "netflix",
    name: "Netflix",
    instrument: "Netflix Terms of Use",
    sourceUrl: "https://help.netflix.com/legal/termsofuse",
    effective: "see live page",
    clauses: [
      clause({
        title: "Household rules are the contract",
        tags: ["subscription", "sharing"],
        plain: "Terms limit sharing to a household as they define it, and they license a personal stream. Profiles are not separate legal persons. Downloads are temporary.",
        pointer: "Netflix Terms of Use",
        sourceUrl: "https://help.netflix.com/legal/termsofuse",
        implications: "Password sharing crackdowns are them enforcing this clause, not a new law. Price-change and cancellation rights still come from consumer statutes.",
        courts: "Local consumer protection. The terms' venue is secondary when a statute gives you a home forum.",
        score: 4,
      }),
    ],
  }),

  one("uber", "Uber", ["uber"], "Uber Technologies, Inc. and local subsidiaries", "Uber", "The rider terms and the driver terms are opposites wearing one logo.", {
    id: "uber-rider",
    name: "Uber",
    aliases: ["uber rider"],
    instrument: "Uber Terms of Use",
    sourceUrl: "https://www.uber.com/legal/en/document/?name=general-terms-of-use",
    effective: "see live page",
    clauses: [
      clause({
        title: "Arbitration has been the whole ballgame",
        tags: ["arbitration", "liability"],
        plain: "Uber's terms have pushed rider and driver disputes into individual arbitration, with class waivers. Courts in various countries have refused pieces of that, especially for workers. The live clause for your country is the only one that counts.",
        pointer: "Uber general terms → dispute resolution",
        sourceUrl: "https://www.uber.com/legal/en/document/?name=general-terms-of-use",
        implications: "A crash, a ban, or a worker-status fight may or may not be allowed in open court. In South Africa, driver classification and the CPA are local questions the California text does not settle.",
        courts: "Arbitration clause versus mandatory local rights. Several high-profile judgments already split this.",
        score: 8,
      }),
    ],
  }),

  one("discord", "Discord", ["discord"], "Discord Inc.", "Discord", "A chat app that became infrastructure for communities and games.", {
    id: "discord",
    name: "Discord",
    instrument: "Discord Terms of Service",
    sourceUrl: "https://discord.com/terms",
    effective: "see live page",
    clauses: [
      clause({
        title: "Server owners are not Discord, and Discord can still nuke the server",
        tags: ["content", "moderation"],
        plain: "You own your message copyright subject to a license that lets Discord operate. Server owners moderate locally. Discord can still remove a server for its own rules. Paid Nitro does not buy immunity.",
        pointer: "Discord Terms of Service and Community Guidelines",
        sourceUrl: "https://discord.com/terms",
        implications: "A community that lives only on Discord can vanish in an afternoon. Export matters. Illegal content on a server you run can be your problem as well as Discord's.",
        courts: "Platform contract plus local criminal law for the actual content.",
        score: 5,
      }),
    ],
  }),

  one("reddit", "Reddit", ["reddit"], "Reddit, Inc.", "Reddit", "The forum that periodically reminds everyone the posts were licensed all along.", {
    id: "reddit",
    name: "Reddit",
    instrument: "Reddit User Agreement",
    sourceUrl: "https://www.redditinc.com/policies/user-agreement",
    effective: "see live page",
    clauses: [
      clause({
        title: "Public posts can be licensed to train",
        tags: ["license", "ai"],
        plain: "Reddit's user agreement gives the company a broad license over public content, and Reddit has sold API access and training deals. Deleting a post does not pull it back from a dataset already shipped. Moderator tools are not ownership of the community.",
        pointer: "Reddit User Agreement",
        sourceUrl: "https://www.redditinc.com/policies/user-agreement",
        implications: "Writing under a pseudonym is not anonymity if the account is tied to an email a court can reach. Public posts are publications.",
        courts: "US company. Defamation law follows the place of harm. The license governs reuse, not whether your words were unlawful.",
        score: 7,
      }),
    ],
  }),

  one("samsung", "Samsung", ["samsung"], "Samsung Electronics", "Samsung", "Phones, TVs, and accounts. Bixby and SmartThings are the quiet data products.", {
    id: "samsung-account",
    name: "Samsung account",
    aliases: ["galaxy", "smartthings"],
    instrument: "Samsung Terms and Conditions",
    sourceUrl: "https://www.samsung.com/us/apps/samsung-account/terms/",
    effective: "see live page",
    clauses: [
      clause({
        title: "The phone vendor and Google are both in the room",
        tags: ["device", "privacy"],
        plain: "A Galaxy phone runs Google's Android terms and Samsung's account terms. SmartThings brings the home onto Samsung's cloud. Two privacy policies apply. Neither cancels the other.",
        pointer: "Samsung account terms and the Google Terms",
        sourceUrl: "https://www.samsung.com/us/apps/samsung-account/terms/",
        implications: "Factory reset does not delete the cloud account. Find-my-mobile is a theft tool and a coercion tool.",
        courts: "Country Samsung entity plus Google's forum for the Google half.",
        score: 5,
      }),
    ],
  }),

  one("tesla", "Tesla", ["tesla"], "Tesla, Inc.", "Tesla", "A car company whose software terms keep moving after delivery.", {
    id: "tesla",
    name: "Tesla",
    instrument: "Tesla vehicle and app terms",
    sourceUrl: "https://www.tesla.com/legal",
    effective: "see live page",
    clauses: [
      clause({
        title: "Autopilot is a driver-assist contract",
        tags: ["car", "liability", "data"],
        plain: "Tesla's terms and in-car agreements describe Autopilot and Full Self-Driving as assistance that needs a human driver. Cabin cameras and telemetry are disclosed in the privacy notice. Software features can be added or removed by update, including features that were marketed at purchase — that fight is both contract and consumer law.",
        pointer: "Tesla legal page, vehicle agreements, and privacy notice",
        sourceUrl: "https://www.tesla.com/legal",
        implications: "After a crash, the car's log is evidence, and the terms tried to keep responsibility with the driver. A feature you paid for that disappears is a CPA / consumer-guarantee problem, not just a patch note.",
        courts: "Product liability is local and hard to waive. The contract's driver-responsibility line is not a shield against a statute.",
        score: 8,
      }),
    ],
  }),

  one("paypal", "PayPal", ["paypal"], "PayPal, Inc. and local PayPal entities", "PayPal", "A balance that feels like a bank account and is often a contractual claim.", {
    id: "paypal",
    name: "PayPal",
    instrument: "PayPal User Agreement",
    sourceUrl: "https://www.paypal.com/us/legalhub/useragreement-full",
    effective: "see live page",
    clauses: [
      clause({
        title: "Holds, reversals, and 'we may limit your account'",
        tags: ["payments", "hold"],
        plain: "The user agreement lets PayPal limit an account, hold a balance, and reverse a payment. Buyer-protection and seller-protection are narrower than the ads. A PayPal balance is not automatically deposit insurance.",
        pointer: "PayPal User Agreement → restricted activities and holds",
        sourceUrl: "https://www.paypal.com/us/legalhub/useragreement-full",
        implications: "A limited account can trap working capital. In South Africa, check which PayPal entity you actually have — availability and protections differ. The CPA may still police unfair surprise.",
        courts: "PayPal's agreement has used arbitration in the US. Other countries get other clauses. Financial-regulator complaints are sometimes the faster door.",
        score: 8,
      }),
    ],
  }),

  one("duolingo", "Duolingo", ["duolingo", "duo"], "Duolingo, Inc.", "Duolingo", "The owl is a streak machine. The terms are a data and subscription machine.", {
    id: "duolingo",
    name: "Duolingo",
    instrument: "Duolingo Terms",
    sourceUrl: "https://www.duolingo.com/terms",
    effective: "see live page",
    clauses: [
      clause({
        title: "The streak is free. Super is a subscription.",
        tags: ["subscription", "privacy"],
        plain: "Free use is ad-supported. Super Duolingo auto-renews. Learning activity is the product's dataset. The terms will say the course content is theirs and your answers can be used to operate and improve the service.",
        pointer: "Duolingo Terms and Privacy Policy",
        sourceUrl: "https://www.duolingo.com/terms",
        implications: "A forgotten Super trial is the ordinary consumer harm. The quieter one is a detailed record of when and how you study, tied to an account.",
        courts: "Auto-renew statutes (and app-store rules) govern the trial. Privacy law governs the activity log.",
        score: 5,
      }),
    ],
  }),

  one("roblox", "Roblox", ["roblox"], "Roblox Corporation", "Roblox", "A game platform for children that talks like a platform for developers.", {
    id: "roblox",
    name: "Roblox",
    instrument: "Roblox Terms of Use",
    sourceUrl: "https://en.help.roblox.com/hc/en-us/articles/115004647846",
    effective: "see live page",
    clauses: [
      clause({
        title: "Robux are not money, until a regulator says they are",
        tags: ["minors", "virtual goods"],
        plain: "Terms say virtual items and Robux are licensed, revocable, and not your property. Children are the user base. Parents are often the ones who never read the terms. Developer exchange (real money out) is a separate, discretionary program.",
        pointer: "Roblox Terms of Use",
        sourceUrl: "https://en.help.roblox.com/hc/en-us/articles/115004647846",
        implications: "A deleted account can delete a child's purchases. Consumer and children's-privacy law (COPPA in the US, POPIA for SA children, GDPR-K) can be stricter than the 'you own nothing' sentence.",
        courts: "Children's contracts are voidable in many places. That is the clause the terms hope you do not know.",
        score: 8,
      }),
    ],
  }),

  one("shein", "SHEIN", ["shein"], "SHEIN entities vary by site", "SHEIN", "Fast fashion. The terms are ordinary. The data and the returns maze are the product.", {
    id: "shein",
    name: "SHEIN",
    instrument: "SHEIN Terms and Conditions",
    sourceUrl: "https://www.shein.com/",
    effective: "see live page",
    clauses: [
      clause({
        title: "A cheap shirt with a heavy privacy policy",
        tags: ["retail", "privacy", "arbitration"],
        plain: "SHEIN's terms cover returns, IP complaints, and usually a strict dispute clause on the US site. The app is known for aggressive tracking. The country site you checked out on is the contract, and the entity named there is who you would sue.",
        pointer: "SHEIN terms for your region, linked from the footer",
        sourceUrl: "https://www.shein.com/",
        implications: "US arbitration and class waivers are the legal bite. Tracking across apps is the privacy bite. Garment quality claims for SA buyers lean on the CPA, which does not care that the footer named a foreign company.",
        courts: "Split: their chosen forum versus mandatory consumer courts.",
        score: 8,
      }),
    ],
  }),

  one("temu", "Temu", ["temu"], "Whaleco entities, part of the PDD group — confirm on the site", "PDD", "The other ultra-cheap marketplace. Same shape as SHEIN, louder gamification.", {
    id: "temu",
    name: "Temu",
    instrument: "Temu Terms of Use",
    sourceUrl: "https://www.temu.com/terms-of-use.html",
    effective: "see live page",
    clauses: [
      clause({
        title: "Games, coupons, and a dispute clause",
        tags: ["retail", "arbitration", "privacy"],
        plain: "Temu's terms bind checkout, promotional games, and account bans. US terms have included arbitration. The app asks for a lot of device access relative to 'buy a cable.'",
        pointer: "Temu Terms of Use and Privacy Policy",
        sourceUrl: "https://www.temu.com/terms-of-use.html",
        implications: "A promo credit is not a bank balance. Device permissions are the privacy event. Import duties and product safety are outside the terms and still yours at the border.",
        courts: "Their arbitration clause versus local consumer courts. Customs law is the state's.",
        score: 8,
      }),
    ],
  }),

  one("23andme", "23andMe", ["23andme", "twenty three and me"], "23andMe Holding Co. — confirm current entity", "23andMe", "A genetic test. The specimen outlives the mood in which you sent it.", {
    id: "23andme",
    name: "23andMe",
    instrument: "23andMe Terms of Service and Privacy Statement",
    sourceUrl: "https://www.23andme.com/legal/terms-of-service/",
    effective: "see live page",
    clauses: [
      clause({
        title: "Your genome is a special category, and a company asset",
        tags: ["genetics", "privacy", "insolvency"],
        plain: "The terms and consent cover testing, research participation, and what happens to samples and data. Genetic data is special personal information under POPIA and similar laws. Company distress changes who might buy a database. Read the current change-of-control and research-consent sections before you spit in a tube.",
        pointer: "23andMe Terms of Service and research consent",
        sourceUrl: "https://www.23andme.com/legal/terms-of-service/",
        implications: "Relatives who never tested can be identified from a relative who did. That is the scientific fact the contract cannot put back in the tube. A sale of the company is the legal fact to watch.",
        courts: "US genetic-privacy statutes in some states; POPIA special personal information; GINA does not cover every use people fear.",
        score: 9,
      }),
    ],
  }),

  one("ticketmaster", "Ticketmaster", ["ticketmaster", "live nation"], "Ticketmaster / Live Nation", "Live Nation Entertainment", "The fee stack, and the arbitration clause under it.", {
    id: "ticketmaster",
    name: "Ticketmaster",
    instrument: "Ticketmaster Terms of Use",
    sourceUrl: "https://www.ticketmaster.com/h/terms.html",
    effective: "see live page",
    clauses: [
      clause({
        title: "The ticket is a revocable license",
        tags: ["arbitration", "license"],
        plain: "Terms treat a ticket as a license the venue can revoke, restrict transfer, and load with fees. US terms have pushed disputes into arbitration. All-in pricing rules are statutory in some places and do not live inside the terms.",
        pointer: "Ticketmaster Terms of Use",
        sourceUrl: "https://www.ticketmaster.com/h/terms.html",
        implications: "Being denied entry with a valid barcode is a consumer and contract fight. The terms try to make it a small one, in private.",
        courts: "Arbitration versus consumer regulators, who do not sign the terms.",
        score: 8,
      }),
    ],
  }),

  one("zoom", "Zoom", ["zoom"], "Zoom Communications, Inc.", "Zoom", "The meeting tool that taught a planet to ask what the host can record.", {
    id: "zoom",
    name: "Zoom",
    instrument: "Zoom Terms of Service",
    sourceUrl: "https://www.zoom.com/en/trust/terms/",
    effective: "see live page",
    clauses: [
      clause({
        title: "The host pressed record. The guest did not read the terms.",
        tags: ["recording", "privacy", "ai"],
        plain: "Zoom's terms bind the account holder. Guests are dropped into a meeting under the host's settings: recording, transcripts, AI companions. Those features have their own notices. A guest who never created an account still has privacy rights.",
        pointer: "Zoom Terms of Service and AI companion disclosures",
        sourceUrl: "https://www.zoom.com/en/trust/terms/",
        implications: "Recording a person without consent is a crime or a delict in many places, including possible wiretap exposure in US states, and a POPIA problem in South Africa. The host's acceptance does not consent the guest.",
        courts: "Local recording statutes govern guests. Zoom's contract governs the subscriber.",
        score: 7,
      }),
    ],
  }),

  one("unity", "Unity", ["unity"], "Unity Technologies", "Unity", "A game engine. The 2023 runtime-fee announcement is the trust scar, not the current invoice.", {
    id: "unity",
    name: "Unity",
    instrument: "Unity Terms of Service",
    sourceUrl: "https://unity.com/legal/terms-of-service",
    effective: "see live page",
    clauses: [
      clause({
        title: "Read the current runtime terms, not the 2023 panic",
        tags: ["software", "fees"],
        plain: "In September 2023 Unity announced a per-install runtime fee that developers reasonably read as a change to the deal after they had shipped games. Unity later walked the structure back. The live terms of service are what you are under now. The episode is why this row exists: engine terms can try to move under a shipped product.",
        pointer: "Unity Terms of Service — current page",
        sourceUrl: "https://unity.com/legal/terms-of-service",
        implications: "If you ship on an engine, pin the contract version in your own records. A future change is a negotiation only if you can show what you accepted.",
        courts: "Business terms. Consumer law rarely helps a studio. Reliance and good faith are the doctrines people reached for in 2023.",
        score: 6,
      }),
    ],
  }),

  one("equifax", "Equifax", ["equifax"], "Equifax Inc. and local bureaus", "Equifax", "A credit bureau. You did not sign up. Your bank did, and the law let it.", {
    id: "equifax",
    name: "Equifax",
    instrument: "Equifax privacy notice and bureau terms",
    sourceUrl: "https://www.equifax.com/privacy/",
    effective: "see live page",
    clauses: [
      clause({
        title: "The file exists whether you agree or not",
        tags: ["credit", "privacy", "bystander"],
        plain: "Credit bureaus compile files because credit laws allow furnishers to report. The 'terms' a consumer clicks are for a monitoring product, not for the existence of the file. Errors, freezes, and data breaches are statutory processes.",
        pointer: "Equifax privacy notice; in South Africa the National Credit Act and credit-bureau regulations",
        sourceUrl: "https://www.equifax.com/privacy/",
        implications: "You cannot opt out of having a credit file by rejecting a website. You can dispute, and in some countries freeze. The 2017 Equifax breach is the reminder that this file is a target. South Africa's main bureaus are local; Equifax is the pattern, not always the holder.",
        courts: "Credit-reporting statutes. A website terms page is the wrong document.",
        score: 8,
      }),
    ],
  }),
];

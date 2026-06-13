// ─────────────────────────────────────────────────────────────────────────────
// SACAR Website — Single Source of Truth for All Text Content
//
// WORKFLOW: Edit page-contents.md → give to LLM → LLM updates this file.
// Components import from here. Icons and animation config stay in component
// files / data files. Only human-readable strings live here.
// ─────────────────────────────────────────────────────────────────────────────

// ── Navigation ───────────────────────────────────────────────────────────────

export const nav = {
  brand: "SACAR",
  items: [
    { label: "About", href: "#about" },
    { label: "Who We Serve", href: "#audience" },
    { label: "Contact", href: "#contact" },
  ],
  cta: "Request a Briefing",
};

// ── Hero ─────────────────────────────────────────────────────────────────────

export const hero = {
  headline: "Space Affairs Consultancy for Advanced Research",
  pills: ["Space Diplomacy", "Space Power", "Space Governance"],
  subtitle:
    "Providing strategic foresight in a rapidly evolving space landscape to empower sharper and more confident calls.",
  badge: "",
  primaryCta: "Book a session",
  secondaryCta: "Request a Consultation",
};

// ── Positioning Strip ─────────────────────────────────────────────────────────

export const positioning = {
  tagline: "Geopolitical research on the space domain.",
};

// ── Diplomacy Framework (scroll-animated flow diagram) ───────────────────────

export const diplomacyFramework = {
  heading: "What we do",
  subtitle: "We offer diplomatic consultancy on Space affairs.",
  nodes: {
    technical: "Technical",
    legal: "Legal",
    affairs: "Space Affairs",
    governance: "Space Governance",
    geopolitics: "Geopolitics",
    power: "Space Power",
    diplomacy: "Space Diplomacy",
    ir: "International Relations",
    irMobile: "Intl Relations",
    irSub: "Building Goodwill",
    govMobile: "Governance",
    powerMobile: "Space Power",
  },
};

// ── Differentiator ───────────────────────────────────────────────────────────

export const differentiator = {
  differenceLabel: "What Sets SACAR Apart",
  differenceHeading: "Strategic and diplomatic, not technical or legal",
  ourFocusLabel: "Our Lens",
  positioningStatement:
    "While a technical consultancy addresses applied sciences and a legal consultancy handles regulatory frameworks, our diplomacy consultancy navigates the politico-administrative imperatives of their cross-border flows.",
  cards: [
    {
      id: "technical",
      title: "Technical Consultancy",
      description:
        "Engineering, systems, launch architecture, payloads, and ground infrastructure.",
      domains: ["Propulsion", "Launch Systems", "Payloads", "Subsystems", "Ground Infrastructure"],
    },
    {
      id: "legal",
      title: "Legal Consultancy",
      description:
        "Compliance, regulation, licensing, and legal frameworks around orbital activity.",
      domains: ["Space Law", "Licensing", "Compliance", "Regulation", "Liability", "Orbital Frameworks"],
    },
    {
      id: "diplomatic",
      title: "Diplomatic Consultancy",
      description:
        "Treaties, coalition behavior, and negotiation strategy. Advises state and non-state actors on multilateral forums and geopolitical shifts.",
      featured: true,
      domains: ["Treaties & Accords", "Coalition Behavior", "Negotiation", "Multilateral Forums", "Norm-Setting", "Geopolitics"],
    },
  ],
};

// ── Perspective (Dyaus) ───────────────────────────────────────────────────────

export const perspective = {
  label: "Our Perspective",
  name: "Dyaus",
  heading: "The Inflection point of Earth and Space.",
  body: "Embracing a geocentric lens for space-based activities and a space-centric viewpoint for the analysis of global affairs.",
};

// ── Services ──────────────────────────────────────────────────────────────────
// Kept in file but removed from homepage

export const services = {
  label: "Core Advisory Services",
  heading: "Three Core Advisory Practices",
  subtitle:
    "We translate space-affairs complexity into decision-relevant guidance for negotiations, partnerships, and long-range strategy.",
  cta: "Request a Briefing",
  pillars: [
    {
      id: "diplomatic-strategy",
      title: "Diplomatic Strategy & Norm-Building",
      summary:
        "Supporting institutions that need to navigate multilateral processes, coalition politics, and the formation of norms that shape behavior in space.",
      subServices: [
        {
          title: "Delegation & Multilateral Forum Support",
          description:
            "Briefing support for forums such as UN COPUOS and related diplomatic processes, including proposal analysis, negotiation context, and coalition positioning.",
        },
        {
          title: "Track II & Stakeholder Dialogue",
          description:
            "Design and support for informal or mixed-channel dialogue among governments, agencies, experts, and other stakeholders working through contested space issues.",
        },
        {
          title: "Space Policy Alignment",
          description:
            "Assessment of how national or organizational objectives align with emerging diplomatic trends, coalition structures, and governance expectations.",
        },
      ],
    },
    {
      id: "geopolitical-risk",
      title: "Geopolitical Risk & Macro-Forecasting",
      summary:
        "Interpreting how strategic competition, alliance shifts, and geopolitical spillover are reshaping the space domain and its decision environment.",
      subServices: [
        {
          title: "Alliance Mapping",
          description:
            "Analysis of coalition formation, dual alignment, and bloc competition across frameworks such as the Artemis Accords and the ILRS.",
        },
        {
          title: "Geopolitical Impact Reports",
          description:
            "Research on how terrestrial tensions, sanctions, and strategic competition affect space policy, partnerships, market access, and institutional behavior.",
        },
        {
          title: "Strategic Foresight & Alternative Futures",
          description:
            "Scenario-based outlooks on governance fragmentation, post-ISS diplomacy, and long-term shifts in the space economy and international order.",
        },
      ],
    },
    {
      id: "policy-research",
      title: "Space Policy & Governance Research",
      summary:
        "Researching how governance structures are interpreted, contested, and operationalized across the international system.",
      subServices: [
        {
          title: "Comparative Policy Analysis",
          description:
            "Comparison of how established and emerging space actors approach orbital coordination, resource governance, peaceful use, and sustainability.",
        },
        {
          title: "Incentive Structure Analysis",
          description:
            "Assessment of which governance designs encourage transparency, coordination, and durable international cooperation while discouraging unilateral escalation.",
        },
        {
          title: "Policy Papers & Position Support",
          description:
            "Support for white papers, issue briefs, and institutional position statements grounded in rigorous evidence and policy context.",
        },
      ],
    },
  ],
};

// ── Audience ──────────────────────────────────────────────────────────────────

export const audience = {
  label: "Who We Serve",
  heading: "Designed for entities involved in space-based decision making",
  subtitle:
    "Our work supports actors that need diplomatic and geopolitical interpretation — whether they operate in space directly or are increasingly affected by space governance.",
  segments: [
    {
      id: "ministries",
      title: "Foreign Ministries & Diplomatic Corps",
      descriptor:
        "Preparing for multilateral negotiations, bilateral engagement, and policy positioning in space affairs.",
    },
    {
      id: "agencies",
      title: "Space Agencies & Public Institutions",
      descriptor:
        "Seeking governance and geopolitical context for international partnerships, coordination, and long-term program strategy.",
    },
    {
      id: "corporate",
      title: "Corporate Strategy Units & Space-Sector Firms",
      descriptor:
        "Assessing geopolitical risk, alliance exposure, and governance shifts before making long-horizon investments or partnerships.",
    },
    {
      id: "academic",
      title: "Academic Institutions",
      descriptor:
        "Researching the political, diplomatic, and governance dimensions of space activity at the intersection of IR and space studies.",
    },
    {
      id: "ngos",
      title: "NGOs & Policy Networks",
      descriptor:
        "Needing credible research on peaceful use, sustainability, equitable access, and emerging governance norms.",
    },
    {
      id: "independent",
      title: "Independent Professionals & Practitioners",
      descriptor:
        "Analysts, advisors, and domain experts working at the frontier of space policy and diplomatic practice.",
    },
  ],
  sectors: {
    label: "Sectors We Advise",
    tiers: [
      {
        label: "Space Based",
        items: [
          { id: "launch", title: "Launch Services", image: "/new-assets/Launch_services.png" },
          { id: "payload", title: "Payload Services", image: "/new-assets/Payload-Services.png" },
          { id: "ground", title: "Ground Station Networks", image: "/new-assets/Ground-Station-Network.png" },
        ],
      },
      {
        label: "Space Enabled",
        items: [
          { id: "energy", title: "Energy", image: "/new-assets/Energy-Sector.png" },
          { id: "shipping", title: "Shipping & Logistics", image: "/new-assets/Shipping-and-Logistics.png" },
          { id: "security", title: "Space Security", image: "/new-assets/Space-security.png" },
        ],
      },
      {
        label: "Space Frontier",
        items: [
          { id: "aviation", title: "Aviation", image: "/new-assets/Aviation.png" },
          { id: "tourism", title: "Space Tourism", image: "/new-assets/Space-tourism.png" },
          { id: "entertainment", title: "Entertainment", image: "/new-assets/Space-Entertainment.png" },
        ],
      },
    ],
  },
};

// ── Engagement (CTA section) ──────────────────────────────────────────────────

export const engagement = {
  heading: "Engage SACAR",
  subtitle:
    "A trusted partner with a multi-disciplinary team of experts, committed to provide quality deliverables, on time.",
  primaryCta: "Request a Briefing",
  secondaryCta: "Start a Conversation",
  newsletterLabel: "Receive analysis on space diplomacy and governance",
  emailPlaceholder: "Work email address",
  subscribeCta: "Join the List",
};

// ── Contact Us ────────────────────────────────────────────────────────────────

export const contactUs = {
  heading: "Contact Us",
  cta: "Contact Us",
};

// ── Footer ────────────────────────────────────────────────────────────────────

export const footer = {
  brand: "SACAR",
  tagline: "Space Affairs Consultancy for Advanced Research",
  copyright: "SACAR. Interpreting the politics of space.",
  socials: ["twitter", "linkedin"],
  legal: ["Privacy", "Terms"],
};

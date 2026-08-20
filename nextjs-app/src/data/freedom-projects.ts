/**
 * Freedom Payment Plan — Project data
 *
 * Auto-consumed by /the-freedom-plan/projects/[slug].tsx via
 * getStaticPaths/getStaticProps.
 *
 * SOURCE OF TRUTH RULE
 * ────────────────────
 * Every field below is copied verbatim from the sales-office source
 * document (e.g. "(GEO) - Godrej Lakeside Orchard Project Details
 * (7th August 2026).docx"). Do NOT round figures, do NOT invent
 * themes, do NOT extrapolate compass directions or nearby projects.
 * When the source doc contradicts itself, keep an inline
 * `sourceConflicts` entry so it renders as a visible flag.
 */

export interface FreedomPricingRow {
  configuration: string;                // e.g. "3 BHK Luxe"
  area: string;                         // "1790-2260 sq. ft."
  agreementValue: string;               // e.g. "2.37 Cr."
  agreementValuePlusGst: string;        // "2.37 Cr. + 5 %"
  agreementValuePlusGstSdr: string;     // "2.37 Cr. + 5 % + 7.7%"
}

export interface FreedomMilestone {
  stage: string;                        // "Booking Amount", "Within 21 days of Booking"
  percentage: string;                   // "5%"
  amount: string;                       // "12,44,412.59"
  logic: string;                        // "5% of Agreement Value + additional 5% GST of that value"
}

export interface FreedomPaymentExample {
  configurationLabel: string;           // "3 BHK Luxe – 1,790 sq.ft. Sample Calculation"
  totalAgreementValue: string;          // "₹2,37,03,097"
  totalCostForCustomer: string;         // "₹2,51,69,211"
  milestones: FreedomMilestone[];
  additionalSdrNote?: string;
  notes: string;                        // representation caveat
}

export interface FreedomFaqItem {
  question: string;
  answer: string;
  conflict?: string;                    // if set, renders inline [CONFLICT: …] flag
}

export interface FreedomFaqGroup {
  category: string;
  items: FreedomFaqItem[];
}

export interface FreedomLocationGroup {
  category: string;                     // "Connectivity", "Tech Parks & Employment Hubs"
  items: string[];                      // one bullet per line, verbatim from doc
}

export interface FreedomMicroMarketSection {
  heading: string;                      // "Market Overview", "Growth Story"
  paragraphs?: string[];
  bullets?: string[];
  subsections?: { heading: string; bullets?: string[]; paragraphs?: string[]; takeaway?: string }[];
  takeaway?: string;
}

export interface FreedomFloorPlanImage {
  label: string;
  src: string;
  alt: string;
  carpetArea?: string;
  saleableArea?: string;
}

export interface FreedomProject {
  id: string;
  slug: string;
  name: string;
  city: string;
  state: string;
  microLocation: string;                // exactly as doc names it — do not infer
  zone: string;                         // exactly as doc names it — e.g. "East Bangalore"
  developer: string;
  type: string;
  informationCurrentAsOf: string;       // e.g. "7 August 2026"

  // Section 1 — Project Summary
  salesStatus: string;
  constructionStatus: string;

  // Section 2 — Configurations & Pricing
  pricing: FreedomPricingRow[];

  // Section 3 — RERA
  rera: string;
  reraCertificateLink: string;
  reraPortal: string;
  possessionRera: string;
  possessionGpl: string;

  // Section 4 — Payment plan (verbatim from each project's source doc:
  // may be 20:80 Freedom, 20:20:60 Freedom, Construction Linked, 1% etc.)
  paymentPlanName: string;              // full name, e.g. "20:80 Freedom Payment Plan" | "Construction Linked Payment Plan" | "1% Payment Plan"
  paymentPlanShort: string;             // short tag, e.g. "20:80" | "20:20:60" | "Construction Linked" | "1%"
  paymentPlanFormula: string;           // one-line structure summary, e.g. "20% in the first 60 days of booking, 70% on Application of the Occupation Certificate, 10% on Notice of Possession"
  paymentPlanUpfrontDescription: string; // for FAQ/sr-only paraphrase, e.g. "20% of the Agreement Value in the first 60 days of booking"
  paymentPlanExample: FreedomPaymentExample;

  // Section 5 — Location advantages (grouped by category, per doc)
  locationAdvantages: FreedomLocationGroup[];

  // Section 6 — Micro-market understanding
  microMarketSections: FreedomMicroMarketSection[];

  // Section 7 — FAQs (grouped by category, per doc)
  faqs: FreedomFaqGroup[];

  // Section 8 — Floor plans
  floorPlans?: FreedomFloorPlanImage[];
  floorPlansSummary?: string;

  // Section 9 — Legal disclaimers
  legalDisclaimers: string;

  // Section 10 — Source-doc self-contradictions (rendered as inline flags)
  sourceConflicts?: { location: string; description: string }[];

  // Ancillary
  liveProjectUrl?: string;
  salesPhone?: string;
  // Campaign lead-gen credentials. adCode is the GPL channel-partner
  // attribution code that must accompany any enquiry captured on this page.
  leadGen?: {
    adCode: string;
    projectId?: string;
  };
}

// ────────────────────────────────────────────────────────────────
// GODREJ LAKESIDE ORCHARD — Sarjapur, East Bangalore
// Source: "Generative Engine Optimisation (GEO) - Godrej Lakeside
//          Orchard Project Details (7th August 2026).docx"
//          — revised copy: FAQ conflicts on upfront % (20%) and
//          booking amount (5%) explicitly resolved in this revision.
// Every figure below is copied verbatim from the source doc.
// ────────────────────────────────────────────────────────────────

const godrejLakesideOrchard: FreedomProject = {
  id: 'GP-BLR-LSO',
  slug: 'godrej-lakeside-orchard',
  name: 'Godrej Lakeside Orchard',
  city: 'Bengaluru',
  state: 'Karnataka',
  microLocation: 'Sarjapur',
  zone: 'East Bangalore',
  developer: 'Godrej Properties',
  type: 'Group housing',
  informationCurrentAsOf: '7 August 2026',

  salesStatus: 'Sustenance',
  constructionStatus: 'Under Construction, 7th /12th floor',

  pricing: [
    {
      configuration: '3 BHK Luxe',
      area: '1790-2260 sq. ft.',
      agreementValue: '2.37 Cr.',
      agreementValuePlusGst: '2.37 Cr. + 5 %',
      agreementValuePlusGstSdr: '2.37 Cr. + 5 % + 7.7%',
    },
    {
      configuration: '3.5 BHK Luxe',
      area: '2214-2257 sq. ft.',
      agreementValue: '2.75 Cr.',
      agreementValuePlusGst: '2.75 Cr. + 5 %',
      agreementValuePlusGstSdr: '2.75 Cr. + 5 % + 7.7%',
    },
  ],

  rera: 'PRM/KA/RERA/1251/446/PR/300924/007105',
  reraCertificateLink: 'PRM/KA/RERA/1251/446/PR/300924/007105',
  reraPortal: 'http://rera.karnataka.gov.in',
  possessionRera: '30-09-2030',
  possessionGpl: '07-2028',

  paymentPlanName: '20:80 Freedom Payment Plan',
  paymentPlanShort: '20:80',
  paymentPlanFormula: '20% in the first 60 days of booking (5% at booking + 5% within 21 days + 10% within 60 days), 70% on Application of the Occupation Certificate, 10% on Notice of Possession',
  paymentPlanUpfrontDescription: '20% of the Agreement Value in the first 60 days of booking (5% at booking + 5% within 21 days + 10% within 60 days)',

  paymentPlanExample: {
    configurationLabel: '3 BHK Luxe – 1,790 sq.ft. Sample Calculation',
    totalAgreementValue: '₹2,37,03,097',
    totalCostForCustomer: '₹2,51,69,211',
    milestones: [
      {
        stage: 'Booking Amount',
        percentage: '5%',
        amount: '₹12,44,412.59',
        logic: '5% of Agreement Value + additional 5% GST of that value',
      },
      {
        stage: 'Within 21 days of Booking',
        percentage: '5%',
        amount: '₹12,44,412.59',
        logic: '5% of Agreement Value + additional 5% GST of that value',
      },
      {
        stage: 'Within 60 days of Booking',
        percentage: '10%',
        amount: '₹24,88,825.18',
        logic: '10% of Agreement Value + additional 5% GST of that value',
      },
      {
        stage: 'On Application of OC',
        percentage: '70%',
        amount: '₹1,74,21,776.29',
        logic: '70% of Agreement Value + additional 5% GST of that value',
      },
      {
        stage: 'On Notice of Possession',
        percentage: '10%',
        amount: '₹24,88,825.18',
        logic: '10% of Agreement Value + additional 5% GST of that value',
      },
      {
        stage: 'On Notice of Possession: Advance Maintenance & Sinking Fund Charges',
        percentage: '0%',
        amount: '₹2,80,959.67',
        logic: 'Advanced Maintenance & Sinking Fund Charges + 18% GST of Advanced Maintenance Value',
      },
      {
        stage: 'Total Cost',
        percentage: '100%',
        amount: '₹2,51,69,211',
        logic: '',
      },
    ],
    additionalSdrNote: 'Additional SDR charges of 7.7%* at the time of possession.',
    notes:
      'This illustration is for representation purposes only. The actual calculation and monthly payout may vary depending on (i) the unit selected, (ii) associated charges for that unit, and (iii) the offers available at the project marketing office.',
  },

  locationAdvantages: [
    {
      category: 'Connectivity',
      items: [
        'Outer Ring Road: 15 min*',
        'Marathahalli: 30–35 min*',
        'Bellandur: 26 min*',
        'Electronic City: 30–35 min*',
        'S.H. 35: 12 min*',
      ],
    },
    {
      category: 'Commute & Transport',
      items: [
        'Proposed Iblur Metro Station: 15 min*',
        'Proposed Carmelaram Metro Station: 6 min*',
        'Carmelaram Railway Station: 7 min*',
      ],
    },
    {
      category: 'Recreational & Lifestyle Hubs',
      items: [
        'DoubleTree Suites by Hilton Hotel: 13 min*',
        'Rural Blues: 8 min*',
        'Fairfield by Marriott: 16 min*',
        'Soul Space Spirit Centro Mall: 15 min*',
        'Bier Library: 8 min*',
        'Byg Brewski: 10 min*',
      ],
    },
    {
      category: 'Tech Parks & Employment Hubs',
      items: [
        'Global Technology Park: 16 min*',
        'RGA Tech Park: 6 min*',
        'Cessna Business Park: 20 min*',
        'RMZ Ecospace: 15 min*',
        'Embassy Tech Village: 20 min*',
        'Wipro: 8 min*',
      ],
    },
    {
      category: 'Schools & Colleges',
      items: [
        'CMR Gandhi Public School: 4 min*',
        'DPS EAST: 8 min*',
        'Harvest International School: 15 min*',
        'Primus Public School: 12 min*',
        'Inventure Academy: 14 min*',
        'Oakridge International School: 13 min*',
        'GEAR Innovative International School: 14 min*',
        'The International School: 14 min*',
      ],
    },
    {
      category: 'Healthcare Facilities',
      items: [
        'Belenus Champion Hospital: 7 min*',
        'Natus Women & Children Hospital: 7 min*',
        'Motherhood Hospital: 11 min*',
        'Cloudnine Hospital: 10 min*',
        'Sakra World Hospital: 18 min*',
        'Manipal Hospital: 15 min*',
      ],
    },
  ],

  microMarketSections: [
    {
      heading: 'Market Overview',
      paragraphs: [
        'Sarjapur has emerged as one of Bengaluru’s fastest-growing residential and IT hubs, driven by its strategic connectivity to Whitefield, Electronic City, Outer Ring Road (ORR) and Bellandur.',
        'With the presence of leading IT parks, reputed international schools and social infrastructure, the location continues to attract both end-users and long-term investors.',
        'Ongoing infrastructure developments, including the Peripheral Ring Road (PRR), Satellite Town Ring Road (STRR), and the proposed Metro connectivity, are expected to further enhance accessibility and support sustained property value appreciation.',
      ],
    },
    {
      heading: 'Growth Story',
      paragraphs: ['The growth of Sarjapur is anchored on three key pillars.'],
      subsections: [
        {
          heading: 'IT & Employment Hub Advantage',
          bullets: [
            'Outer Ring Road (ORR), Whitefield, Electronic City and Bellandur are among Bengaluru’s largest IT corridors.',
            'Strong demand from IT professionals working in nearby tech parks.',
            'Excellent connectivity to major employment hubs within 20–40 minutes.*',
            'High demand for both end-use and rental housing.',
          ],
          takeaway: 'This creates a strong and sustainable residential demand pipeline.',
        },
        {
          heading: 'Infrastructure-Led Growth',
          bullets: [
            'Proposed Metro connectivity, Peripheral Ring Road (PRR), and Satellite Town Ring Road (STRR) will significantly improve accessibility.',
            'Continuous road upgrades are reducing travel time across East Bengaluru.',
            'Improved infrastructure is expected to drive long-term capital appreciation.',
          ],
          takeaway: 'This enhances connectivity and boosts future property values.',
        },
        {
          heading: 'Premium Social Infrastructure',
          bullets: [
            'Home to reputed international schools, hospitals, retail hubs, and lifestyle destinations.',
            'Well-developed social infrastructure makes Sarjapur ideal for families and professionals.',
            'Presence of premium residential communities continues to attract quality end-users.',
          ],
          takeaway: 'This positions Sarjapur as one of Bengaluru’s most preferred residential destinations.',
        },
      ],
    },
    {
      heading: 'Price Positioning Advantage',
      bullets: [
        'Sarjapur offers strong appreciation potential driven by IT growth and infrastructure development.',
        'Provides a wide range of premium apartments and villas across different budget segments.',
        'Preferred by IT professionals, first-time homebuyers and upgrade seekers due to its excellent connectivity and lifestyle ecosystem.',
      ],
      takeaway: 'Positioned as a high-growth residential corridor with strong end-user demand and long-term investment potential.',
    },
    {
      heading: 'Buyer Profile',
      bullets: [
        'IT professionals working in Outer Ring Road (ORR), Electronic City, Whitefield, Bellandur, and Marathahalli.',
        'First-time homebuyers and young salaried professionals.',
        'Mid-to-senior management executives seeking premium lifestyle homes.',
        'NRIs and long-term investors looking for capital appreciation and rental income.',
        'Families preferring reputed international schools, healthcare, and modern social infrastructure.',
      ],
    },
    {
      heading: 'Developer Activity & Market Maturity',
      bullets: [
        'Strong presence of branded developers such as Godrej Properties, Prestige Group, Sobha, Assetz, Birla Estates, Nambiar Builders, and Puravankara.',
        'Rapid growth of premium integrated townships and high-rise residential communities catering to end-users and investors.',
        'Well-established social infrastructure with reputed international schools, hospitals, retail malls, and commercial hubs.',
      ],
      takeaway: 'A well-established, high-growth residential corridor backed by strong developer confidence and robust infrastructure.',
    },
    {
      heading: 'Competitive Landscape',
      subsections: [
        {
          heading: 'Compared to Whitefield',
          bullets: [
            'Better connectivity to the Sarjapur–ORR IT corridor.',
            'Lower inventory levels, supporting stronger price appreciation.',
            'Preferred by IT professionals working along ORR and Sarjapur Road.',
          ],
        },
        {
          heading: 'Compared to Electronic City',
          bullets: [
            'Superior social infrastructure with reputed schools, hospitals, and retail.',
            'Better access to major IT hubs such as ORR, Bellandur, and Marathahalli.',
            'Stronger demand from both end-users and investors, driving higher appreciation potential.',
          ],
        },
      ],
    },
  ],

  faqs: [
    {
      category: 'General Project FAQs',
      items: [
        {
          question: 'Where exactly is Godrej Lakeside Orchard located?',
          answer:
            'Godrej Lakeside Orchard is in Sarjapur, East Bangalore, next to RGA Tech Park, offering easy access to major IT hubs.',
        },
        {
          question: 'Who is the developer of Godrej Lakeside Orchard?',
          answer:
            'Godrej Lakeside Orchard is developed by Godrej Properties, one of India’s most trusted real estate brands.',
        },
        {
          question: 'Is Godrej Lakeside Orchard RERA approved?',
          answer:
            'Yes. Godrej Lakeside Orchard is RERA-registered under RERA number PRM/KA/RERA/1251/446/PR/300924/007105 on the Karnataka RERA portal (http://rera.karnataka.gov.in).',
        },
        {
          question: 'What is the possession timeline for Godrej Lakeside Orchard?',
          answer:
            'The RERA possession timeline for Godrej Lakeside Orchard is 30 September 2030. Godrej Properties’ internal (GPL) target possession is July 2028.',
        },
        {
          question: 'What configurations are available at Godrej Lakeside Orchard?',
          answer:
            'Godrej Lakeside Orchard offers 3 BHK Luxe and 3.5 BHK Luxe configurations. Saleable area for 3 BHK Luxe is 1,790–2,260 sq. ft. and for 3.5 BHK Luxe is 2,214–2,257 sq. ft.',
        },
      ],
    },
    {
      category: 'Pricing & Costing FAQs',
      items: [
        {
          question: 'What is the starting price at Godrej Lakeside Orchard?',
          answer:
            'The Agreement Value at Godrej Lakeside Orchard starts at ₹2.37 Cr. (3 BHK Luxe). 3.5 BHK Luxe starts at ₹2.75 Cr. (Agreement Value).',
        },
        {
          question: 'What are the additional charges over and above the Agreement Value?',
          answer:
            'Additional charges over the Agreement Value at Godrej Lakeside Orchard include GST, PLC, FRC, AM (Advance Maintenance) and SDR (Stamp Duty & Registration).',
        },
        {
          question: 'Are there any hidden costs at Godrej Lakeside Orchard?',
          answer: 'No. There are no hidden charges at Godrej Lakeside Orchard.',
        },
      ],
    },
    {
      category: '20:80 Freedom Payment Plan FAQs',
      items: [
        {
          question: 'What is the Godrej Freedom Plan concept, and how does it apply at Godrej Lakeside Orchard?',
          answer:
            'The Godrej Freedom Plan is a payment structuring concept: the buyer pays 20% of the Agreement Value upfront (across the first 60 days of booking) and then enjoys approximately one year of freedom — no further payments due — before the remaining milestone cycle resumes. Different Godrej projects deliver this concept with different milestone schedules. At Godrej Lakeside Orchard the concept is applied through the 20:80 Freedom Payment Plan, where the balance 80% is due later as 70% on Application of Occupation Certificate and 10% on Notice of Possession. Refer to the milestone table on this page for the exact schedule.',
        },
        {
          question: 'What is the 20:80 Freedom Payment Plan at Godrej Lakeside Orchard?',
          answer:
            'The 20:80 Freedom Payment Plan at Godrej Lakeside Orchard is a payment structure where the buyer pays approximately 20% during the first 60 days of booking and the remaining 80% on possession (70% on Application of Occupation Certificate and 10% on Notice of Possession). Refer to the milestone table on this page for the exact schedule.',
        },
        {
          question: 'Does the 20:80 Freedom Payment Plan include GST and registration?',
          answer:
            'The 20:80 Freedom Payment Plan at Godrej Lakeside Orchard includes GST but excludes registration. Stamp Duty and Registration (SDR), 7.7%, are payable additionally at the time of possession.',
        },
        {
          question: 'How much do I need to pay upfront under the 20:80 Freedom Payment Plan at Godrej Lakeside Orchard?',
          answer:
            'Twenty percent of the property value is paid upfront under the 20:80 Freedom Payment Plan at Godrej Lakeside Orchard. This is structured across the first 60 days as 5% at booking, 5% within 21 days of booking, and 10% within 60 days of booking (per the milestone table on this page).',
        },
        {
          question: 'When does the home-loan EMI start under the 20:80 Freedom Payment Plan?',
          answer:
            'After 10% of the initial payment is made, the home loan can start at Godrej Lakeside Orchard.',
        },
        {
          question: 'Can I prepay or exit the 20:80 Freedom Payment Plan at Godrej Lakeside Orchard?',
          answer: 'No. The 20:80 Freedom Payment Plan does not permit prepayment or exit.',
        },
      ],
    },
    {
      category: 'Location & Connectivity FAQs',
      items: [
        {
          question: 'How far is Whitefield from Godrej Lakeside Orchard?',
          answer: 'Godrej Lakeside Orchard is approximately 45 minutes from Whitefield.',
        },
        {
          question: 'Is metro connectivity available near Godrej Lakeside Orchard?',
          answer:
            'Yes. The Proposed Carmelaram Metro Station is approximately 6 minutes* and the Proposed Iblur Metro Station is approximately 15 minutes* from Godrej Lakeside Orchard.',
        },
        {
          question: 'How far is the airport from Godrej Lakeside Orchard?',
          answer: 'Godrej Lakeside Orchard is approximately 2 hours from Kempegowda International Airport.',
        },
      ],
    },
    {
      category: 'Investment & Decision-Making FAQs',
      items: [
        {
          question: 'Is Godrej Lakeside Orchard a good investment?',
          answer:
            'Godrej Lakeside Orchard is positioned as a strong investment due to its proximity to IT hubs (ORR, Sarjapur Road, Electronic City, Whitefield) and upcoming Metro expansion in Sarjapur.',
        },
        {
          question: 'Who is Godrej Lakeside Orchard ideal for?',
          answer:
            'Godrej Lakeside Orchard is positioned for: IT professionals working in the Outer Ring Road (ORR), Sarjapur Road, Electronic City and Whitefield corridors; families seeking premium schools, hospitals, and everyday conveniences; end-users seeking a well-connected location with strong social infrastructure; and long-term investors targeting capital appreciation and rental demand in East Bengaluru.',
        },
      ],
    },
    {
      category: 'Construction & Quality FAQs',
      items: [
        {
          question: 'What is the current construction status of Godrej Lakeside Orchard?',
          answer: 'Godrej Lakeside Orchard is currently Under Construction, 7th/12th floor.',
        },
      ],
    },
    {
      category: 'Conflict-Handling FAQs',
      items: [
        {
          question: 'Why should I buy at Godrej Lakeside Orchard in Sarjapur instead of Whitefield?',
          answer:
            'Sarjapur offers stronger long-term appreciation potential than Whitefield, excellent connectivity to major IT hubs, and a well-developed social infrastructure with relatively lower traffic congestion.',
        },
        {
          question: 'What if Godrej Lakeside Orchard gets delayed?',
          answer:
            'Godrej Properties is a reputed developer and delays are rare. RERA ensures accountability and compensation clauses if timelines slip beyond the RERA-declared possession date (30 September 2030 for Godrej Lakeside Orchard).',
        },
        {
          question: 'Is the 20:80 Freedom Payment Plan at Godrej Lakeside Orchard really beneficial?',
          answer:
            'The 20:80 Freedom Payment Plan reduces the financial burden during the construction period and improves cash-flow flexibility, as the majority of payment (80%) is deferred to possession stages.',
        },
      ],
    },
    {
      category: 'Closing-Oriented FAQs',
      items: [
        {
          question: 'What is the best unit available now at Godrej Lakeside Orchard?',
          answer:
            'Premium-facing units (lake-view / corner units) at Godrej Lakeside Orchard are currently in high demand and offer better long-term value.',
        },
        {
          question: 'Are there any current offers at Godrej Lakeside Orchard?',
          answer: 'The 20:80 Freedom Payment Plan is the current offer at Godrej Lakeside Orchard.',
        },
        {
          question: 'How do I block a unit at Godrej Lakeside Orchard?',
          answer:
            'A unit at Godrej Lakeside Orchard can be blocked by paying the booking amount of 5% of the Agreement Value.',
        },
      ],
    },
  ],

  floorPlans: [
    {
      label: '3 BHK Luxe',
      src: '/assets/lake_side_orchard_3.5_luxe.jpg',
      alt: 'Godrej Lakeside Orchard 3 BHK Luxe Floor Plan (Tower G, floors 02-19, 21-25)',
      saleableArea: '1,790–2,260 sq. ft.',
    },
    {
      label: '3.5 BHK Luxe',
      src: '/assets/lake_side_orchard_3.5.jpg',
      alt: 'Godrej Lakeside Orchard 3.5 BHK Luxe Floor Plan (Tower A, floors 02-25)',
      saleableArea: '2,214–2,257 sq. ft.',
    },
  ],

  legalDisclaimers:
    'RERA Registered. RERA No. PRM/KA/RERA/1251/446/PR/300924/007105. Project is registered as Godrej Lakeside Orchard, available at website http://rera.karnataka.gov.in. Site address: Godrej Lakeside Orchard, Survey Nos. 77, 174/1B, 175/P, 175/2A, 175/2B, 176/2A, 176/2B, 177, 73, 78/1A, 78/2A1(P), 78/2B, 78/3A, 78/4, 79/1C2, 178 of Kodathi Village, Varthur Hobli, Bengaluru East, Bengaluru Urban, Karnataka – 560035. Stock images are for representation purposes only and contain artist’s impressions. The information is presented as general information and no warranty is expressly or impliedly given that the completed development will comply in any degree with such artist’s impression or anticipated appearance. The sale is subject to the terms of the Application Form and the Agreement for Sale. The prices mentioned are an indicative Agreement Value; Stamp Duty & Registration, GST and other charges are over and above the Agreement Value. All specifications of the unit shall be as per the final agreement between the parties. Customers are advised to apprise themselves of the necessary and relevant information of the project(s)/offer(s) prior to making any purchase decision. The official website of Godrej Properties Ltd. is www.godrejproperties.com. Please do not rely on the information provided on any other website. *T&C apply.',

  sourceConflicts: [],

  liveProjectUrl:
    'https://www.godrejproperties.com/bengaluru/godrej-lakeside-orchard-sarjapur-bangalore',
  salesPhone: '+91 85304 93095',
  leadGen: {
    adCode: '145371',
  },
};

// ────────────────────────────────────────────────────────────────
// GODREJ WOODS — Kogilu Village, Yelahanka, North Bengaluru
// Source: "Generative Engine Optimisation (GEO) - Godrej Woods
//          Project Details (7th August 2026).docx" (revised copy)
//          — the revised copy resolves all five prior source-doc
//          contradictions (construction status wording, tranche
//          timings, upfront percentage, OC timelines).
// Every figure below is copied verbatim from the revised doc.
// ────────────────────────────────────────────────────────────────

const godrejWoods: FreedomProject = {
  id: 'GP-BLR-WDS',
  slug: 'godrej-woods',
  name: 'Godrej Woods',
  city: 'Bengaluru',
  state: 'Karnataka',
  microLocation: 'Thanisandra',
  zone: 'North Bengaluru',
  developer: 'Godrej Properties',
  type: 'Group housing',
  informationCurrentAsOf: '7 August 2026',

  salesStatus: 'Sustenance',
  constructionStatus:
    'For Tower A, B, C & D excavation has been completed and foundation work has commenced. For rest of the towers commencement of upper basement.',

  pricing: [
    {
      configuration: '2 BHK',
      area: '1193 - 1242 sq. ft.',
      agreementValue: '1.70 Cr.',
      agreementValuePlusGst: '1.70 Cr. + 5%',
      agreementValuePlusGstSdr: '1.70 Cr. + 5% + 7.6%',
    },
    {
      configuration: '3 BHK Premium',
      area: '1888 sq. ft.',
      agreementValue: '2.50 Cr.',
      agreementValuePlusGst: '2.50 Cr. + 5%',
      agreementValuePlusGstSdr: '2.50 Cr. + 5% + 7.6%',
    },
    {
      configuration: '3 BHK Lux',
      area: '2143 - 2305 sq. ft.',
      agreementValue: '2.80 Cr.',
      agreementValuePlusGst: '2.80 Cr. + 5%',
      agreementValuePlusGstSdr: '2.80 Cr. + 5% + 7.6%',
    },
  ],

  rera: 'PRM/KA/RERA/1251/472/PR/121125/008248',
  reraCertificateLink: 'PRM/KA/RERA/1251/472/PR/121125/008248',
  reraPortal: 'https://rera.karnataka.gov.in/',
  possessionRera: 'Nov 2030',
  possessionGpl: 'Dec 2029',

  paymentPlanName: '20:80 Freedom Payment Plan',
  paymentPlanShort: '20:80',
  paymentPlanFormula: '20% in the first 60 days of booking (5% at booking + 5% within 15 days + 10% within 60 days), 70% on Application of the Occupation Certificate, 10% on Notice of Possession',
  paymentPlanUpfrontDescription: '20% of the Agreement Value in the first 60 days of booking (5% at booking + 5% within 15 days + 10% within 60 days)',

  paymentPlanExample: {
    configurationLabel: '2 BHK Cost Sheet: Sample Calculation',
    totalAgreementValue: '₹1,70,77,227',
    totalCostForCustomer: '₹1,81,39,173',
    milestones: [
      {
        stage: 'On Booking',
        percentage: '5%',
        amount: '₹8,96,554',
        logic: '5% of Agreement Value + additional 5% GST of that value',
      },
      {
        stage: 'Within 15 Days from the Date of Booking',
        percentage: '5%',
        amount: '₹8,96,554',
        logic: '5% of Agreement Value + additional 5% GST of that value',
      },
      {
        stage: 'Within 60 Days from the Date of Booking',
        percentage: '10%',
        amount: '₹17,93,109',
        logic: '10% of Agreement Value + additional 5% GST of that value',
      },
      {
        stage: 'On Application of Occupancy Certificate',
        percentage: '70%',
        amount: '₹1,25,51,762',
        logic: '70% of Agreement Value + additional 5% GST of that value',
      },
      {
        stage: 'On Notice of Possession',
        percentage: '10%',
        amount: '₹17,93,109',
        logic: '10% of Agreement Value + additional 5% GST of that value',
      },
      {
        stage: 'On Notice of Possession: Advance Maintenance & Sinking Fund Charges',
        percentage: '0%',
        amount: '₹2,08,085',
        logic: 'Advanced Maintenance & Sinking Fund Charges + 18% GST of Advanced Maintenance Value',
      },
      {
        stage: 'Total Cost',
        percentage: '100%',
        amount: '₹1,81,39,173',
        logic: '',
      },
    ],
    additionalSdrNote:
      'Additional SDR Charges* (changes during handover from year to year; starting from 7%) at the time of possession.',
    notes:
      'This illustration is for representation purposes only. The actual calculation and monthly payout may vary depending on (i) the unit selected, (ii) associated charges for that unit, and (iii) the offers available at the project marketing office.',
  },

  locationAdvantages: [
    {
      category: 'Educational Institutes',
      items: [
        'REVA University: 2 min*',
        'EuroSchool North Campus: 6 min*',
        'Delhi Public School: 7 minutes*',
        'Canadian International School: 10 min*',
        'Mallya Aditi: 12 min*',
        'CMR University: 12 min*',
        'Stonehill International School: 18 min*',
        'Vidyashilp University: 22 min*',
      ],
    },
    {
      category: 'Hospitals',
      items: [
        'Cytecare Hospital: 7 min*',
        'Sparsh Hospital Yelahanka: 9 min*',
        'Cratis Hospital: 16 min*',
        'Aster CMI Hospital: 16 min*',
        'Manipal Hospital, Hebbal: 30 min*',
      ],
    },
    {
      category: 'IT & Tech Parks',
      items: [
        'Bhartiya Centre of Information Technology: 7 min*',
        'Manyata Tech Park: 12 min*',
        'L&T Tech Park: 12 min*',
        'KIADB Aerospace Park: 15 min*',
        'Kirloskar Business Park: 18 min*',
      ],
    },
    {
      category: 'Entertainment & Leisure',
      items: [
        'Bhartiya Mall Of Bengaluru: 8 min*',
        'Oia: 10 min*',
        'Byg Brewski: 12 min*',
        'Elements Mall: 12 min*',
        'Decathlon: 12 min*',
        'The Galleria Mall: 14 min*',
        'Phoenix Mall Of Asia: 15 min*',
        'Padukone-Dravid Centre For Sports Excellence: 18 min*',
      ],
    },
  ],

  microMarketSections: [
    {
      heading: 'Location Overview',
      paragraphs: [
        'Thanisandra is one of North Bengaluru’s fastest-growing residential corridors.',
      ],
      bullets: [
        'Proximity to Manyata Tech Park',
        'Connectivity to Hebbal, Airport Road & Outer Ring Road',
        'Rapid infrastructure growth',
        'Demand from IT professionals and investors',
        'Emergence of premium residential developments',
      ],
      takeaway: 'It has evolved from a peripheral location into a mid-to-premium housing market.',
    },
    {
      heading: 'Employment Catchment',
      paragraphs: ['Major demand comes from employees working in:'],
      bullets: [
        'Manyata Tech Park',
        'Kirloskar Tech Park',
        'Hebbal business district',
        'Airport corridor offices',
        'Upcoming tech and commercial hubs in North Bengaluru',
      ],
    },
    {
      heading: 'Infrastructure Growth',
      bullets: [
        'Wider roads and flyover developments',
        'Retail growth (malls, supermarkets, entertainment)',
        'International schools and hospitals nearby',
        'Strong social infrastructure supporting family buyers',
      ],
    },
  ],

  faqs: [
    {
      category: 'General Project FAQs',
      items: [
        {
          question: 'Where exactly is Godrej Woods located?',
          answer:
            'Godrej Woods is at Khatha No. 323/106/9&10, E PID No. 2254233335, Sy No 106/9 & 106/10, Kogilu Village, Yelahanka Hobli, Yelahanka, Bengaluru Urban, Karnataka, 560064. The project sits in the Thanisandra corridor of North Bengaluru.',
        },
        {
          question: 'Who is the developer of Godrej Woods?',
          answer: 'Godrej Woods is developed by Godrej Properties Limited.',
        },
        {
          question: 'Is Godrej Woods RERA approved?',
          answer:
            'Yes. Godrej Woods is RERA-registered under RERA No. PRM/KA/RERA/1251/472/PR/121125/008248 on the Karnataka RERA portal (https://rera.karnataka.gov.in/).',
        },
        {
          question: 'What is the possession timeline for Godrej Woods?',
          answer:
            'The RERA possession timeline for Godrej Woods is November 2030. Godrej Properties’ internal (GPL) target possession is December 2029.',
        },
        {
          question: 'What configurations are available at Godrej Woods?',
          answer:
            'Godrej Woods offers 2 BHK (1,193–1,242 sq. ft.), 3 BHK Premium (1,888 sq. ft.), and 3 BHK Lux (2,143–2,305 sq. ft.).',
        },
      ],
    },
    {
      category: 'Pricing & Costing FAQs',
      items: [
        {
          question: 'What is the starting price at Godrej Woods?',
          answer:
            'The Agreement Value at Godrej Woods starts at ₹1.70 Cr. for 2 BHK, ₹2.50 Cr. for 3 BHK Premium, and ₹2.80 Cr. for 3 BHK Lux.',
        },
        {
          question: 'What are the additional charges over and above the Agreement Value at Godrej Woods?',
          answer:
            'Additional charges over the Agreement Value at Godrej Woods include 5% GST and Stamp Duty & Registration (SDR) starting from approximately 7.6% at the time of possession.',
        },
      ],
    },
    {
      category: '20:80 Freedom Payment Plan FAQs',
      items: [
        {
          question: 'What is the Godrej Freedom Plan concept, and how does it apply at Godrej Woods?',
          answer:
            'The Godrej Freedom Plan is a payment structuring concept: the buyer pays 20% of the Agreement Value upfront (across the first 60 days of booking) and then enjoys approximately one year of freedom — no further payments due — before the remaining milestone cycle resumes. Different Godrej projects deliver this concept with different milestone schedules. At Godrej Woods the concept is applied through the 20:80 Freedom Payment Plan, where the balance 80% is due later as 70% on Application of Occupation Certificate and 10% on Notice of Possession. Refer to the milestone table on this page for the exact schedule.',
        },
        {
          question: 'What is the 20:80 Freedom Payment Plan at Godrej Woods?',
          answer:
            'The 20:80 Freedom Payment Plan at Godrej Woods is a payment structure where the buyer pays 20% of the Agreement Value across the initial booking window and the remaining 80% at possession stages (70% on Application of the Occupancy Certificate + 10% on Notice of Possession). See the milestone table on this page for the exact schedule.',
        },
        {
          question: 'How much do I pay upfront under the 20:80 Freedom Payment Plan at Godrej Woods?',
          answer:
            'The upfront payment is 20% of the Agreement Value, structured as 5% on booking, 5% within 15 days of booking, and 10% within 60 days of booking (as per the 2 BHK Cost Sheet milestone table).',
        },
        {
          question: 'When does the home-loan EMI start under the 20:80 Freedom Payment Plan at Godrej Woods?',
          answer:
            'The home loan can start after the initial 10% payment has been made.',
        },
        {
          question: 'Does the 20:80 Freedom Payment Plan at Godrej Woods include GST and registration?',
          answer:
            'The 20:80 Freedom Payment Plan at Godrej Woods includes GST (5% on each milestone value) but excludes Stamp Duty & Registration (SDR). SDR of approximately 7.6% is payable additionally at the time of possession.',
        },
      ],
    },
    {
      category: 'Location & Connectivity FAQs',
      items: [
        {
          question: 'How close is Manyata Tech Park to Godrej Woods?',
          answer: 'Manyata Tech Park is approximately 12 minutes* from Godrej Woods.',
        },
        {
          question: 'How close is the airport corridor to Godrej Woods?',
          answer:
            'Godrej Woods sits in the Thanisandra corridor with direct connectivity to Hebbal, Airport Road and Outer Ring Road. Refer to the Location Advantages section of this page for exact drive-time distances.',
        },
        {
          question: 'Which schools are near Godrej Woods?',
          answer:
            'Educational institutes near Godrej Woods include REVA University (2 min*), EuroSchool North Campus (6 min*), Delhi Public School (7 min*), Canadian International School (10 min*), Mallya Aditi (12 min*), CMR University (12 min*), Stonehill International School (18 min*) and Vidyashilp University (22 min*).',
        },
      ],
    },
    {
      category: 'Design, Amenities & Specifications FAQs',
      items: [
        {
          question: 'What is the theme of Godrej Woods?',
          answer:
            'Godrej Woods is a Forest-Themed development with approximately 350 fully grown trees on site, a 76% open space ratio, and a 20,000 sq. ft. clubhouse.',
        },
        {
          question: 'What amenities are available at Godrej Woods?',
          answer:
            'Amenities at Godrej Woods include a Clubhouse, Swimming pool and Kids play area. Solar panels, rainwater harvesting and waste-management systems are also included.',
        },
        {
          question: 'Does Godrej Woods have smart home features?',
          answer: 'No, Godrej Woods does not include smart home features.',
        },
        {
          question: 'What is the electric backup at Godrej Woods?',
          answer: 'Electric backup at Godrej Woods is 0.8 kW for 2 BHK and 1 kW for 3 BHK.',
        },
        {
          question: 'What is the construction type at Godrej Woods?',
          answer:
            'Godrej Woods uses an RCC frame structure with foundation concrete grade M35, column concrete grade M45, and Fe 550 steel for reinforcement.',
        },
        {
          question: 'What is the water source at Godrej Woods?',
          answer: 'The water source at Godrej Woods is Borewell and BWSSB.',
        },
      ],
    },
  ],

  floorPlans: [
    {
      label: '2 BHK',
      src: '/assets/godrej_woods_2_bhk.jpg',
      alt: 'Godrej Woods 2 BHK Floor Plan (Saleable Area 1,193–1,242 sq. ft.)',
      saleableArea: '1,193–1,242 sq. ft.',
    },
    {
      label: '3 BHK Premium',
      src: '/assets/godrej_woods_3_bhk_premium.jpg',
      alt: 'Godrej Woods 3 BHK Premium Floor Plan (Saleable Area 1,888 sq. ft.)',
      saleableArea: '1,888 sq. ft.',
    },
    {
      label: '3 BHK Lux',
      src: '/assets/godrej_woods_3_bhk_lux.jpg',
      alt: 'Godrej Woods 3 BHK Lux Floor Plan (Saleable Area 2,143–2,305 sq. ft.)',
      saleableArea: '2,143–2,305 sq. ft.',
    },
  ],

  legalDisclaimers:
    'The Project is registered as " GODREJ WOODS " with Karnataka RERA bearing Registration No. PRM/KA/RERA/1251/472/PR/121125/008248 at https://rera.karnataka.gov.in/. This Project is being developed by Godrej Properties Limited. Site Address: GODREJ WOODS, KHATHA NO. 323/106/9&10, E PID NO. 2254233335, SY NO 106/9 & 106/10 KOGILU VILLAGE, YELAHANKA HOBLI, YELAHANKA, BENGALURU URBAN, KARNATAKA – 560064. The images contain artist’s impressions. No warranty is expressly or impliedly given that the completed development will comply in any degree with such artist’s impression as depicted. The sale is subject to terms of application form & agreement for sale. All specifications of the unit shall be as per the sale agreement between the parties. *The prices mentioned are an indicative agreement value. Stamp duty registration, GST & other charges over and above the agreement value. Customers are advised to apprise themselves of the necessary and relevant information of the project(s)/offer(s) prior to making any purchase decision. The official website of Godrej Properties Ltd. is www.godrejproperties.com. Please do not rely on the information provided on any other website. *T&C Apply.',

  sourceConflicts: [],

  liveProjectUrl:
    'https://www.godrejproperties.com/bengaluru/godrej-woods-yelahanka-bangalore',
  salesPhone: '+91 85060 54547',
  leadGen: {
    adCode: '145366',
  },
};

// ────────────────────────────────────────────────────────────────
// PROJECT 3 — GODREJ PARKSHIRE (Hoskote, East Bengaluru)
// Source: "Generative Engine Optimisation (GEO) - Godrej Parkshire
// Project Details (7th August 2026)" — verbatim.
// ────────────────────────────────────────────────────────────────

const godrejParkshire: FreedomProject = {
  id: 'GP-BLR-PKS',
  slug: 'godrej-parkshire',
  name: 'Godrej Parkshire',
  city: 'Bengaluru',
  state: 'Karnataka',
  microLocation: 'Hoskote',
  zone: 'East Bengaluru',
  developer: 'Godrej Properties',
  type: 'Group housing',
  informationCurrentAsOf: '7 August 2026',

  salesStatus: 'Sustenance',
  constructionStatus: 'Under Construction, Foundation Stage',

  pricing: [
    {
      configuration: '2 BHK Luxe',
      area: '1224 - 1228 sq. ft.',
      agreementValue: '1.35 Cr.',
      agreementValuePlusGst: '1.35 Cr. + 5%',
      agreementValuePlusGstSdr: '1.35 Cr. + 5% + 7.7%',
    },
    {
      configuration: '3 BHK Premium',
      area: '1615 - 1634 sq. ft.',
      agreementValue: '1.75 Cr.',
      agreementValuePlusGst: '1.75 Cr. + 5%',
      agreementValuePlusGstSdr: '1.75 Cr. + 5% + 7.7%',
    },
    {
      configuration: '3 BHK Luxe',
      area: '1750 - 1803 sq. ft.',
      agreementValue: '1.95 Cr.',
      agreementValuePlusGst: '1.95 Cr. + 5%',
      agreementValuePlusGstSdr: '1.95 Cr. + 5% + 7.7%',
    },
  ],

  rera: 'PRM/KA/RERA/1250/304/PR/090126/008393',
  reraCertificateLink:
    'https://rera.karnataka.gov.in/certificate?CER_NO=PRM/KA/RERA/1250/304/PR/090126/008393',
  reraPortal: 'https://rera.karnataka.gov.in/',
  possessionRera: 'December 2030',
  possessionGpl: 'December 2029',

  paymentPlanName: '20:20:60 Freedom Payment Plan',
  paymentPlanShort: '20:20:60',
  paymentPlanFormula:
    '20% in the first 60 days of booking (5% at booking + 5% within 21 days + 10% within 60 days), 20% on completion of Terrace + 40% on completion of flooring in the purchaser’s unit, 10% on Receipt of Occupancy Certificate and 10% on Notice of Possession',
  paymentPlanUpfrontDescription:
    '20% of the Agreement Value in the first 60 days of booking (5% at booking + 5% within 21 days + 10% within 60 days)',

  paymentPlanExample: {
    configurationLabel: '2 BHK Luxe – 1,223 sq. ft. Sample Calculation',
    totalAgreementValue: '₹1,35,09,521',
    totalCostForCustomer: '₹1,44,81,192',
    milestones: [
      {
        stage: 'Booking Amount',
        percentage: '5%',
        amount: '₹7,09,250',
        logic: '5% of Agreement Value + additional 5% GST of that value',
      },
      {
        stage: 'Within 21 days of Booking',
        percentage: '5%',
        amount: '₹7,09,250',
        logic: '5% of Agreement Value + additional 5% GST of that value',
      },
      {
        stage: 'Within 60 days of Booking',
        percentage: '10%',
        amount: '₹14,18,500',
        logic: '10% of Agreement Value + additional 5% GST of that value',
      },
      {
        stage: 'On Completion of Terrace',
        percentage: '20%',
        amount: '₹28,36,999',
        logic: '20% of Agreement Value + additional 5% GST of that value',
      },
      {
        stage: 'On Completion of Flooring in the Purchaser’s Apartment/Unit',
        percentage: '40%',
        amount: '₹56,73,999',
        logic: '40% of Agreement Value + additional 5% GST of that value',
      },
      {
        stage: 'On Receipt of Occupancy Certificate',
        percentage: '10%',
        amount: '₹14,18,500',
        logic: '10% of Agreement Value + additional 5% GST of that value',
      },
      {
        stage: 'On Notice of Possession',
        percentage: '10%',
        amount: '₹14,18,500',
        logic: '10% of Agreement Value + additional 5% GST of that value',
      },
      {
        stage: 'On Notice of Possession: Advance Maintenance & Sinking Fund Charges',
        percentage: '0%',
        amount: '₹2,94,121',
        logic: 'Advanced Maintenance & Sinking Fund Charges + 18% GST of Advanced Maintenance Value',
      },
      {
        stage: 'Total Cost',
        percentage: '100%',
        amount: '₹1,44,81,192',
        logic: '',
      },
    ],
    additionalSdrNote:
      'Additional SDR Charges* (changes during handover from year to year; starting from 7.7%) at the time of possession.',
    notes:
      'This illustration is for representation purposes only. The actual calculation and monthly payout may vary depending on (i) the unit selected, (ii) associated charges for that unit, and (iii) the offers available at the project marketing office.',
  },

  locationAdvantages: [
    {
      category: 'Connectivity',
      items: [
        'Old Madras Road – 7 min*',
        'Hoskote Industrial Area – 16 min*',
        'Hope Farm Junction – 20 min*',
        'Whitefield Main Road – 22 min*',
        'KIADB Aerospace Park – 35 min*',
      ],
    },
    {
      category: 'Commute & Transport',
      items: [
        'Satellite Town Ring Road (STRR) – 10 min*',
        'Whitefield Metro Station (Namma Metro) – 22 min*',
        'Whitefield Railway Station – 22 min*',
        'Kempegowda International Airport – 40 min*',
      ],
    },
    {
      category: 'Tech Parks & Employment Hubs',
      items: [
        'Bearys Global Research Triangle – 15 min*',
        'Brigade Signature Towers – 16 min*',
        'International Tech Park Bangalore – 24 min*',
        'ITPL – 25 min*',
        'RMZ Infinity – 28 min*',
        'Bagmane World Technology Centre – 30 min*',
        'EPIP Zone – 30 min*',
      ],
    },
    {
      category: 'Schools & Colleges',
      items: [
        'Delhi Public School – 8 min*',
        'Winmore Academy – 9 min*',
        'The Polaris International School – 10 min*',
        'One World International School – 14 min*',
        'MVJ Engineering College – 18 min*',
        'VIBGYOR High School – 20 min*',
        'Jain Heritage School – 20 min*',
        'New Baldwin School – 20 min*',
        'National Public School – 22 min*',
        'Orchids International School – 30 min*',
      ],
    },
    {
      category: 'Healthcare Facilities',
      items: [
        'Siliconcity Hospital – 7 min*',
        'MVJ Medical College & Research Hospital – 10 min*',
        'Sathya Sai Orthopedic & Multispecialty Hospital – 16 min*',
        'East Point Hospital – 20 min*',
        'Manipal Hospital Whitefield – 24 min*',
        'Vydehi Hospital – 24 min*',
        'Aster Whitefield Hospital – 24 min*',
      ],
    },
    {
      category: 'Recreational & Lifestyle Hubs',
      items: [
        'Orion Uptown Mall – 12 min*',
        'Decathlon OMR – 16 min*',
        'INOX SBR Horizon – 18 min*',
        'Vivanta Bengaluru Whitefield – 24 min*',
        'Nexus Shantiniketan Mall – 28 min*',
        'Phoenix Marketcity – 28 min*',
      ],
    },
  ],

  microMarketSections: [
    {
      heading: 'Market Overview',
      paragraphs: [
        'Hoskote is emerging as a high-potential residential corridor in East Bangalore, driven by its strategic location between Whitefield and key industrial zones. Traditionally known as an industrial hub, Hoskote is now witnessing a shift towards organised residential development, making it attractive for both end-users and long-term investors.',
      ],
    },
    {
      heading: 'Growth Story',
      paragraphs: ['The growth of Hoskote is anchored on three pillars.'],
      subsections: [
        {
          heading: 'Whitefield Spillover Effect',
          bullets: [
            'Buyers are moving outward in search of affordable alternatives as Whitefield reaches saturation in pricing and density.',
            'Hoskote offers significantly lower entry prices.',
            'Travel time remains within 20–25 minutes, making it a viable residential option.',
          ],
          takeaway: 'This creates a strong end-user demand pipeline.',
        },
        {
          heading: 'Industrial & Employment Backbone',
          bullets: [
            'Presence of Hoskote Industrial Area.',
            'Proximity to KIADB zones and logistics hubs.',
            'Growing warehousing and manufacturing activity.',
          ],
          takeaway: 'This ensures consistent rental demand and workforce-driven housing needs.',
        },
        {
          heading: 'Infrastructure-Led Appreciation',
          bullets: [
            'Satellite Town Ring Road (STRR) improving regional connectivity.',
            'Access to Old Madras Road (NH-75).',
            'Connectivity to Namma Metro via Whitefield.',
            'Improved access to Kempegowda International Airport.',
          ],
          takeaway: 'Infrastructure expansion is expected to unlock land value appreciation over the next 5–10 years.',
        },
      ],
    },
    {
      heading: 'Price Positioning Advantage',
      bullets: [
        'Hoskote is currently 30–40% more affordable than core Whitefield.',
        'Offers larger homes at lower ticket sizes.',
        'Ideal for first-time homebuyers and budget-conscious IT professionals.',
      ],
      takeaway: 'Positioned as an early-entry market with future upside potential.',
    },
    {
      heading: 'Buyer Profile',
      bullets: [
        'First-time homebuyers.',
        'Salaried professionals working in Whitefield / ITPL.',
        'Industrial workforce (mid-management & above).',
        'Long-term investors looking for appreciation.',
      ],
    },
    {
      heading: 'Developer Activity & Market Maturity',
      bullets: [
        'Increasing entry of branded developers like Godrej Properties.',
        'Shift from plotted developments to integrated apartment communities.',
        'Gradual improvement in social infrastructure (schools, hospitals, retail).',
      ],
      takeaway: 'Indicates a transition from an “emerging” to an “establishing” micro-market.',
    },
    {
      heading: 'Competitive Landscape',
      subsections: [
        {
          heading: 'Compared to Whitefield',
          bullets: ['Lower price.', 'Slightly longer commute.', 'Higher appreciation potential.'],
        },
        {
          heading: 'Compared to Budigere / Old Madras Road belt',
          bullets: ['More industrial demand.', 'Better price entry.', 'Faster land absorption.'],
        },
      ],
    },
  ],

  faqs: [
    {
      category: 'General Project FAQs',
      items: [
        {
          question: 'Where exactly is Godrej Parkshire located?',
          answer:
            'Godrej Parkshire is located in Hoskote, East Bangalore, adjacent to NH-648, offering easy access to major IT hubs. Site address: Sarkariguttahalli Village, Kasaba Hobli, Hoskote, Bengaluru Rural, Karnataka – 562114.',
        },
        {
          question: 'Who is the developer of Godrej Parkshire?',
          answer: 'Godrej Parkshire is developed by Godrej Properties Limited.',
        },
        {
          question: 'Is Godrej Parkshire RERA approved?',
          answer:
            'Yes. Godrej Parkshire is RERA-registered under RERA No. PRM/KA/RERA/1250/304/PR/090126/008393 on the Karnataka RERA portal (https://rera.karnataka.gov.in/).',
        },
        {
          question: 'What is the possession timeline for Godrej Parkshire?',
          answer:
            'The RERA possession timeline for Godrej Parkshire is December 2030. Godrej Properties’ internal (GPL) target possession is December 2029.',
        },
        {
          question: 'What configurations are available at Godrej Parkshire?',
          answer:
            'Godrej Parkshire offers 2 BHK Luxe (1,224–1,228 sq. ft.), 3 BHK Premium (1,615–1,634 sq. ft.), and 3 BHK Luxe (1,750–1,803 sq. ft.).',
        },
      ],
    },
    {
      category: 'Pricing & Costing FAQs',
      items: [
        {
          question: 'What is the starting price at Godrej Parkshire?',
          answer:
            'The Agreement Value at Godrej Parkshire starts at ₹1.35 Cr. for 2 BHK Luxe, ₹1.75 Cr. for 3 BHK Premium, and ₹1.95 Cr. for 3 BHK Luxe.',
        },
        {
          question: 'What are the additional charges at Godrej Parkshire?',
          answer:
            'Additional charges over the Agreement Value at Godrej Parkshire include GST, PLC, FRC, Advance Maintenance (AM), and Stamp Duty & Registration (SDR ~7.7% at the time of possession).',
        },
        {
          question: 'Are there any hidden costs at Godrej Parkshire?',
          answer: 'No. There are no hidden charges at Godrej Parkshire.',
        },
      ],
    },
    {
      category: '20:20:60 Freedom Payment Plan FAQs',
      items: [
        {
          question: 'What is the Godrej Freedom Plan concept, and how does it apply at Godrej Parkshire?',
          answer:
            'The Godrej Freedom Plan is a payment structuring concept: the buyer pays 20% of the Agreement Value upfront (across the first 60 days of booking) and then enjoys approximately one year of freedom — no further payments due — before the remaining milestone cycle resumes. Different Godrej projects deliver this concept with different milestone schedules. At Godrej Parkshire the concept is applied through the 20:20:60 Freedom Payment Plan, where the balance 80% is due later as 20% on completion of Terrace + 40% on completion of flooring in the purchaser’s unit + 10% on Receipt of Occupancy Certificate + 10% on Notice of Possession. Refer to the milestone table on this page for the exact schedule.',
        },
        {
          question: 'What is the 20:20:60 Freedom Payment Plan at Godrej Parkshire?',
          answer:
            'The 20:20:60 Freedom Payment Plan at Godrej Parkshire lets the buyer pay 20% in the first 60 days of booking, another 20% on completion of Terrace, and the remaining 60% across flooring, Occupancy Certificate and Notice of Possession stages. See the milestone table on this page for the exact schedule.',
        },
        {
          question: 'Does the 20:20:60 Freedom Payment Plan at Godrej Parkshire include GST and registration?',
          answer:
            'The 20:20:60 Freedom Payment Plan at Godrej Parkshire includes GST (5% on each milestone value) but excludes Stamp Duty & Registration (SDR). SDR of approximately 7.7% is payable additionally at the time of possession.',
        },
        {
          question: 'How much do I need to pay upfront at Godrej Parkshire?',
          answer:
            'The upfront payment at Godrej Parkshire is 10% of the Agreement Value: 5% on booking and 5% within 21 days of booking.',
        },
        {
          question: 'When does the home loan EMI start at Godrej Parkshire?',
          answer: 'The home loan can start after the initial 10% payment has been made at Godrej Parkshire.',
        },
        {
          question: 'Can I prepay or exit the 20:20:60 Freedom Payment Plan at Godrej Parkshire?',
          answer: 'No. Prepayment/exit is not available under the 20:20:60 Freedom Payment Plan at Godrej Parkshire.',
        },
      ],
    },
    {
      category: 'Location & Connectivity FAQs',
      items: [
        {
          question: 'How far is Whitefield from Godrej Parkshire?',
          answer: 'Whitefield is approximately 20 minutes* from Godrej Parkshire.',
        },
        {
          question: 'Is metro connectivity available near Godrej Parkshire?',
          answer:
            'Yes. Whitefield Metro Station on the Namma Metro network is approximately 22 minutes* from Godrej Parkshire.',
        },
        {
          question: 'How far is the airport from Godrej Parkshire?',
          answer: 'Kempegowda International Airport is approximately 40 minutes* from Godrej Parkshire.',
        },
      ],
    },
    {
      category: 'Investment & Decision-Making FAQs',
      items: [
        {
          question: 'Is Godrej Parkshire a good investment?',
          answer:
            'Godrej Parkshire is positioned for long-term investment due to rapid infrastructure growth in East Bangalore, proximity to IT corridors like Whitefield and ITPL, and upcoming metro expansion.',
        },
        {
          question: 'Who is Godrej Parkshire ideal for?',
          answer:
            'Godrej Parkshire is ideal for first-time homebuyers, IT professionals working in Whitefield and long-term investors.',
        },
      ],
    },
    {
      category: 'Construction & Quality FAQs',
      items: [
        {
          question: 'What is the current construction status of Godrej Parkshire?',
          answer: 'The current construction status of Godrej Parkshire is Under Construction, Foundation Stage.',
        },
      ],
    },
    {
      category: 'Conflict Handling FAQs',
      items: [
        {
          question: 'Why should I buy in Hoskote instead of Whitefield?',
          answer:
            'At Godrej Parkshire in Hoskote, you get larger homes at lower prices with future appreciation potential, while still being close to Whitefield (~20 minutes*).',
        },
        {
          question: 'Isn’t Hoskote too far or underdeveloped?',
          answer:
            'Not anymore. Hoskote is seeing rapid infrastructure growth, highway upgrades and planned metro connectivity, which is why branded developers like Godrej Properties have entered the market.',
        },
        {
          question: 'Why is Godrej Parkshire priced higher than nearby local builders?',
          answer:
            'Godrej Parkshire commands its price because of a trusted brand (Godrej Properties), better construction quality and modern amenities & community living.',
        },
        {
          question: 'What if Godrej Parkshire gets delayed?',
          answer:
            'Being a reputed developer, delays are rare at Godrej Parkshire — and RERA ensures accountability and compensation clauses.',
        },
        {
          question: 'Is the 20:20:60 Freedom Payment Plan really beneficial at Godrej Parkshire?',
          answer:
            'Yes. The 20:20:60 Freedom Payment Plan at Godrej Parkshire reduces the financial burden during construction and improves cash-flow flexibility.',
        },
      ],
    },
    {
      category: 'Closing-Oriented FAQs',
      items: [
        {
          question: 'What is the best unit available now at Godrej Parkshire?',
          answer:
            'Premium-facing units (park view / corner units) at Godrej Parkshire are currently in high demand and offer better long-term value.',
        },
        {
          question: 'Are there any current offers at Godrej Parkshire?',
          answer: 'Yes — the 20:20:60 Freedom Payment Plan is the current offer at Godrej Parkshire.',
        },
        {
          question: 'How do I block a unit at Godrej Parkshire?',
          answer: 'A unit at Godrej Parkshire can be blocked with a token amount of 5% of the property value.',
        },
      ],
    },
  ],

  floorPlans: [
    {
      label: '2 BHK Luxe',
      src: '/assets_one_percent/godrej_parkshire_2luxe_plan.jpg',
      alt: 'Godrej Parkshire 2 BHK Luxe Floor Plan (Saleable Area 1,224–1,228 sq. ft.)',
      saleableArea: '1,224–1,228 sq. ft.',
    },
    {
      label: '3 BHK Premium',
      src: '/assets_one_percent/godrej_parkshire_3pre_plan.jpg',
      alt: 'Godrej Parkshire 3 BHK Premium Floor Plan (Saleable Area 1,615–1,634 sq. ft.)',
      saleableArea: '1,615–1,634 sq. ft.',
    },
    {
      label: '3 BHK Luxe',
      src: '/assets_one_percent/godrej_parkshire_3luxe_plan.jpg',
      alt: 'Godrej Parkshire 3 BHK Luxe Floor Plan (Saleable Area 1,750–1,803 sq. ft.)',
      saleableArea: '1,750–1,803 sq. ft.',
    },
  ],

  legalDisclaimers:
    'The project is registered as Godrej Parkshire with Karnataka RERA bearing Registration No. PRM/KA/RERA/1250/304/PR/090126/008393, available at website: http://rera.karnataka.gov.in. Site Address: Godrej Parkshire, SY NO 36/1, 36/2, 36/3, 36/4A1, 36/4A2, 36/4B1, 36/4B2, 36/5, 36/6, 36/7, 36/8, 36/9, 66/1, 66/2, 66/3, 67/1A1, 67/1A2, 67/1A3, 67/1B1, 67/1B2, 67/1B3, 67/2, 67/3, 67/4, 68/1, 68/2, 68/3, 68/4 AND 68/5 Sarkariguttahalli Village, Kasaba Hobli, Hosakote, Bengaluru Rural, Karnataka - 562114. The images contain artist’s impressions. No warranty is expressly or impliedly given that the completed development will comply in any degree with such artist’s impression as depicted. The furniture, accessories, paintings, plantations, landscaping, items, electronic goods, additional fittings/fixtures, decorative items, false ceiling including finishing materials, specifications, shades, sizes and colour of the tiles, etc. shown in the image are only indicative in nature and are only for the purpose of illustrating/indicating a conceived layout and do not form part of the standard specifications/amenities/services to be provided in the unit and/or the Project. The Sale is subject to terms of Application Form and Agreement for Sale. All specifications of the unit shall be as per the final agreement between the Parties. *The prices mentioned are an indicative Agreement Value. Stamp Duty Registration, GST and Other Charges over and above the Agreement Value. Customers are advised to apprise themselves of the necessary and relevant information of the project prior to making any purchase decisions. The official website of Godrej Properties Ltd. is www.godrejproperties.com. Please do not rely on the information provided on any other website. *T&C Apply.',

  sourceConflicts: [],

  salesPhone: '+91 85304 92711',
  leadGen: {
    adCode: '145366',
  },
};

// ────────────────────────────────────────────────────────────────
// PROJECT 4 — GODREJ AVELINE (Yelahanka, North Bengaluru)
// Source: "Generative Engine Optimisation (GEO) - Godrej Aveline
// Project Details (7th August 2026)" — verbatim.
// NOTE: Aveline uses a Construction Linked Payment Plan, NOT a
// Freedom Plan. Per business direction, the word "Freedom" is NOT
// used anywhere on this project page.
// ────────────────────────────────────────────────────────────────

const godrejAveline: FreedomProject = {
  id: 'GP-BLR-AVL',
  slug: 'godrej-aveline',
  name: 'Godrej Aveline',
  city: 'Bengaluru',
  state: 'Karnataka',
  microLocation: 'Yelahanka',
  zone: 'North Bengaluru',
  developer: 'Godrej Properties',
  type: 'Group housing',
  informationCurrentAsOf: '7 August 2026',

  salesStatus: 'Sustenance',
  constructionStatus: 'Excavation',

  pricing: [
    { configuration: '2 BHK Premium', area: '1288.11 sq. ft.', agreementValue: '2.20 Cr.', agreementValuePlusGst: '2.20 Cr. + 5%', agreementValuePlusGstSdr: '2.20 Cr. + 5% + 7%' },
    { configuration: '2 BHK Lux', area: '1437.63 sq. ft.', agreementValue: '2.35 Cr.', agreementValuePlusGst: '2.35 Cr. + 5%', agreementValuePlusGstSdr: '2.35 Cr. + 5% + 7%' },
    { configuration: '2.5 BHK Lux', area: '1663.63 sq. ft.', agreementValue: '2.61 Cr.', agreementValuePlusGst: '2.61 Cr. + 5%', agreementValuePlusGstSdr: '2.61 Cr. + 5% + 7%' },
    { configuration: '3 BHK Premium', area: '1593.87 sq. ft.', agreementValue: '2.89 Cr.', agreementValuePlusGst: '2.89 Cr. + 5%', agreementValuePlusGstSdr: '2.89 Cr. + 5% + 7%' },
    { configuration: '3 BHK Lux', area: '1908.05 sq. ft.', agreementValue: '3.30 Cr.', agreementValuePlusGst: '3.30 Cr. + 5%', agreementValuePlusGstSdr: '3.30 Cr. + 5% + 7%' },
    { configuration: '3.5 BHK Lux', area: '2195.39 sq. ft.', agreementValue: '3.80 Cr.', agreementValuePlusGst: '3.80 Cr. + 5%', agreementValuePlusGstSdr: '3.80 Cr. + 5% + 7%' },
    { configuration: '4.5 BHK Lux', area: '2491.16 sq. ft.', agreementValue: '4.20 Cr.', agreementValuePlusGst: '4.20 Cr. + 5%', agreementValuePlusGstSdr: '4.20 Cr. + 5% + 7%' },
  ],

  rera: 'PRM/KA/RERA/1251/309/PR/020326/008501',
  reraCertificateLink: 'https://rera.karnataka.gov.in/',
  reraPortal: 'https://rera.karnataka.gov.in/',
  possessionRera: 'March 2031',
  possessionGpl: 'March 2030',

  paymentPlanName: 'Construction Linked Payment Plan',
  paymentPlanShort: 'Construction Linked',
  paymentPlanFormula:
    '5% at booking + 5% within 21 days of booking + 10% within 90 days of booking + progressive slab-linked instalments (Basement, 3rd/5th/7th/10th/12th/14th Floor Slabs, Terrace Slab, Flooring) + 10% on Application of Occupancy Certificate + 10% on Notice of Possession',
  paymentPlanUpfrontDescription:
    '10% of the Agreement Value in the first 21 days of booking (5% at booking + 5% within 21 days), followed by 10% within 90 days of booking',

  paymentPlanExample: {
    configurationLabel: '3.5 BHK Lux – 2,195.39 sq. ft. Cost Sheet',
    totalAgreementValue: '₹3,78,15,799',
    totalCostForCustomer: '₹4,02,59,827',
    milestones: [
      { stage: 'On Booking', percentage: '5%', amount: '₹19,85,329', logic: '5% of Agreement Value + applicable 5% GST' },
      { stage: 'Within 21 days from Booking', percentage: '5%', amount: '₹19,85,329', logic: '5% of Agreement Value + applicable 5% GST' },
      { stage: 'Within 90 days from Booking', percentage: '10%', amount: '₹39,70,659', logic: '10% of Agreement Value + applicable 5% GST' },
      { stage: 'On Completion of 1st Basement Floor Slab', percentage: '10%', amount: '₹39,70,659', logic: '10% of Agreement Value + applicable 5% GST' },
      { stage: 'On Completion of 3rd Floor Slab', percentage: '5%', amount: '₹19,85,329', logic: '5% of Agreement Value + applicable 5% GST' },
      { stage: 'On Completion of 5th Floor Slab', percentage: '5%', amount: '₹19,85,329', logic: '5% of Agreement Value + applicable 5% GST' },
      { stage: 'On Completion of 7th Floor Slab', percentage: '5%', amount: '₹19,85,329', logic: '5% of Agreement Value + applicable 5% GST' },
      { stage: 'On Completion of 10th Floor Slab', percentage: '5%', amount: '₹19,85,329', logic: '5% of Agreement Value + applicable 5% GST' },
      { stage: 'On Completion of 12th Floor Slab', percentage: '5%', amount: '₹19,85,329', logic: '5% of Agreement Value + applicable 5% GST' },
      { stage: 'On Completion of 14th Floor Slab', percentage: '5%', amount: '₹19,85,329', logic: '5% of Agreement Value + applicable 5% GST' },
      { stage: 'On Completion of Terrace Floor Slab', percentage: '10%', amount: '₹39,70,659', logic: '10% of Agreement Value + applicable 5% GST' },
      { stage: "On Completion of Flooring in Purchaser's Apartment", percentage: '10%', amount: '₹39,70,659', logic: '10% of Agreement Value + applicable 5% GST' },
      { stage: 'On Application of Occupancy Certificate (OC)', percentage: '10%', amount: '₹39,70,659', logic: '10% of Agreement Value + applicable 5% GST' },
      { stage: 'On Notice of Possession', percentage: '10%', amount: '₹39,70,659', logic: '10% of Agreement Value + applicable 5% GST' },
      { stage: 'On Notice of Possession: Advance Maintenance & Sinking Fund Charges', percentage: '0%', amount: '₹5,53,238', logic: 'Advanced Maintenance & Sinking Fund Charges + 18% GST of Advanced Maintenance Value' },
      { stage: 'Total Cost', percentage: '100%', amount: '₹4,02,59,827', logic: '' },
    ],
    additionalSdrNote:
      'Additional SDR Charges* (changes during handover from year to year; starting from 7%) at the time of possession.',
    notes:
      'This illustration is for representation purposes only. The actual calculation and monthly payout may vary depending on (i) the unit selected, (ii) associated charges for that unit, and (iii) the offers available at the project marketing office.',
  },

  locationAdvantages: [
    {
      category: 'Connectivity',
      items: [
        'Kempegowda International Airport – 17 km',
        'Upcoming Peripheral Ring Road – 0.1 km',
        'NH-44 Bellary Road – 0.5 km',
        'Upcoming Bagaluru Cross Metro Station – 0.5 km',
        'Upcoming Yelahanka Metro Station – 1 km',
        'Satellite Town Ring Road – 26 km',
      ],
    },
    {
      category: 'Tech Parks',
      items: [
        'Amazon Office – 800 m',
        'Ecopolis Tech Park – 1.6 km',
        'North Gate – 1.6 km',
        'Embassy Business Hub – 1.6 km',
        'Bagmane Sierra Business District – 5 km',
        'Brigade Opus – 6.9 km',
        'L&T Tech Park – 7.7 km',
        'Purva Aerocit – 7.8 km',
      ],
    },
    {
      category: 'Schools & Colleges',
      items: [
        'Canadian International School – 2.5 km',
        'Ryan International School – 2.5 km',
        'Millennium World School – 3.7 km',
        'National Public School, North – 4.4 km',
        'Vidyashilp Academy – 4.8 km',
      ],
    },
    {
      category: 'Hospitals',
      items: [
        'Manipal Hospital, Yelahanka – 1 km',
        'Cytecare Hospital – 1.5 km',
        'Manipal Hospital, Hebbal – 7.8 km',
        'Aster CMI Hospital – 9 km',
        'Bangalore Baptist Hospital – 9.3 km',
      ],
    },
    {
      category: 'Malls',
      items: [
        'RMZ Galleria Mall – 3 km',
        'Garuda Mall, Yelahanka – 4.5 km',
        'Phoenix Mall of Asia – 7.1 km',
        'Bhartiya Mall of Bengaluru – 8.4 km',
        'Forum 13 Degree North – 9.5 km',
        'Elements Mall – 12 km',
      ],
    },
  ],

  microMarketSections: [
    {
      heading: 'Location Overview',
      paragraphs: [
        'Godrej Aveline is strategically located bang on NH-44 in Yelahanka, offering seamless connectivity to Hebbal, the Airport, and North Bangalore’s key IT hubs. The project sits at Kogilu Cross / Palanahalli on Airport Road (NH-44), Yelahanka — the pivot point between established North Bengaluru commercial zones and future economic hubs.',
      ],
    },
    {
      heading: 'Commercial Proximity',
      paragraphs: [
        'Godrej Aveline sits directly adjacent to the new Amazon Head Office and opposite the Philips Innovation Campus and Oracle Office spaces. It acts as a primary residential feeder for Manyata Tech Park (Hebbal) and the KIADB Aerospace/Hardware Park near Devanahalli.',
      ],
    },
    {
      heading: 'Transit Infrastructure',
      paragraphs: [
        'Godrej Aveline boasts a 415–450 metre direct frontage on NH-44. It is located less than 500 metres (roughly a 1-minute walk) from the upcoming Bagalur Cross Metro Station on the under-construction Blue Line Airport Metro extension.',
      ],
    },
    {
      heading: 'Social Fabric',
      paragraphs: [
        'Within a 10–20 minute drive from Godrej Aveline, residents can access top-tier civic infrastructure, including international schools (Mallya Aditi, Vidyashilp), multi-specialty healthcare (Sparsh, Manipal, Brains Hospital), and retail hubs like The Galleria Mall.',
      ],
    },
  ],

  faqs: [
    {
      category: 'General Project FAQs',
      items: [
        {
          question: 'Where exactly is Godrej Aveline located?',
          answer:
            'Godrej Aveline is located at SY. NO. 58/1, 64, 65/2 of Venkatala Village, Yelahanka Hobli, Yelahanka Taluk, Bangalore Urban, Bengaluru North, Bengaluru Urban, Karnataka – 560064, on NH-44 Bellary Road.',
        },
        {
          question: 'Who is the developer of Godrej Aveline?',
          answer: 'Godrej Aveline is developed by Godrej Properties Limited.',
        },
        {
          question: 'Is Godrej Aveline RERA approved?',
          answer:
            'Yes. Godrej Aveline is RERA-registered under RERA No. PRM/KA/RERA/1251/309/PR/020326/008501 on the Karnataka RERA portal (https://rera.karnataka.gov.in/).',
        },
        {
          question: 'What is the possession timeline for Godrej Aveline?',
          answer:
            'The RERA possession timeline for Godrej Aveline is March 2031. Godrej Properties’ internal (GPL) target possession is March 2030.',
        },
        {
          question: 'What configurations are available at Godrej Aveline?',
          answer:
            'Godrej Aveline offers 2 BHK Premium (1,288 sq. ft.), 2 BHK Lux (1,438 sq. ft.), 2.5 BHK Lux (1,664 sq. ft.), 3 BHK Premium (1,594 sq. ft.), 3 BHK Lux (1,908 sq. ft.), 3.5 BHK Lux (2,195 sq. ft.), and 4.5 BHK Lux (2,491 sq. ft.).',
        },
      ],
    },
    {
      category: 'Pricing & Costing FAQs',
      items: [
        {
          question: 'What is the starting price at Godrej Aveline?',
          answer:
            'The Agreement Value at Godrej Aveline starts at ₹2.20 Cr. for 2 BHK Premium and goes up to ₹4.20 Cr. for 4.5 BHK Lux.',
        },
        {
          question: 'What are the additional charges at Godrej Aveline?',
          answer:
            'Additional charges over the Agreement Value at Godrej Aveline include 5% GST on each milestone value, Stamp Duty & Registration (SDR) starting from approximately 7% at the time of possession, and Advance Maintenance & Sinking Fund Charges plus 18% GST at Notice of Possession.',
        },
      ],
    },
    {
      category: 'Construction Linked Payment Plan FAQs',
      items: [
        {
          question: 'What is the Construction Linked Payment Plan at Godrej Aveline?',
          answer:
            'The Construction Linked Payment Plan at Godrej Aveline is a milestone-driven payment structure. Payments are linked to construction progress: 5% on booking, 5% within 21 days, 10% within 90 days, then instalments on completion of the 1st Basement Floor Slab, 3rd, 5th, 7th, 10th, 12th & 14th Floor Slabs, Terrace Slab, Flooring in the purchaser’s apartment, followed by 10% on Application of Occupancy Certificate and 10% on Notice of Possession.',
        },
        {
          question: 'How much will my initial booking amount be at Godrej Aveline?',
          answer:
            'The initial booking amount at Godrej Aveline is 5% of the Agreement Value, payable at the time of booking, along with the applicable 5% GST on the instalment. A balance 5% is payable within 21 days from the booking date.',
        },
        {
          question: 'How are the remaining payments scheduled at Godrej Aveline?',
          answer:
            'After paying 10% at booking, the next 10% at Godrej Aveline is due within 90 days of booking. Thereafter, payments are linked to construction milestones (1st Basement Slab, 3rd/5th/7th/10th/12th/14th Floor Slabs, Terrace Slab, Flooring), followed by Occupancy Certificate (OC) and Notice of Possession. This ensures buyers pay progressively as the project advances.',
        },
        {
          question: 'Are there any additional charges payable apart from the instalments at Godrej Aveline?',
          answer:
            'Yes. Apart from the construction-linked instalments, buyers pay GST as applicable on each milestone at Godrej Aveline. At the time of possession, Advance Maintenance Charges and Sinking Fund Deposit are payable along with applicable 18% GST.',
        },
      ],
    },
    {
      category: 'About Godrej’s Freedom Plan Concept',
      items: [
        {
          question: 'Does Godrej Aveline offer the Godrej Freedom Plan?',
          answer:
            'Godrej Aveline is offered under the Construction Linked Payment Plan, not the Freedom Plan. The Godrej Freedom Plan is a separate payment structuring concept available on select Godrej Properties projects — where the buyer pays 20% of the Agreement Value upfront and then enjoys approximately one year of freedom (no further payments due) before the milestone cycle resumes. For Freedom Plan projects, refer to Godrej Woods, Godrej Lakeside Orchard and Godrej Parkshire on this hub.',
        },
      ],
    },
    {
      category: 'Location & Connectivity FAQs',
      items: [
        {
          question: 'How close is Kempegowda International Airport to Godrej Aveline?',
          answer: 'Kempegowda International Airport is approximately 17 km from Godrej Aveline via NH-44.',
        },
        {
          question: 'Is metro connectivity available near Godrej Aveline?',
          answer:
            'Yes. The upcoming Bagaluru Cross Metro Station is approximately 0.5 km from Godrej Aveline, and the upcoming Yelahanka Metro Station is approximately 1 km away.',
        },
        {
          question: 'Which tech parks are near Godrej Aveline?',
          answer:
            'Amazon Office is 800 m from Godrej Aveline, Ecopolis Tech Park 1.6 km, Embassy Business Hub 1.6 km, Bagmane Sierra Business District 5 km, Brigade Opus 6.9 km, and L&T Tech Park 7.7 km.',
        },
      ],
    },
    {
      category: 'Design, Amenities & Specifications FAQs',
      items: [
        {
          question: 'What is the Open Space Ratio (OSR) at Godrej Aveline?',
          answer: 'The Open Space Ratio at Godrej Aveline is 70%; the construction area is 30%.',
        },
        {
          question: 'What is the setback from the boundary at Godrej Aveline?',
          answer:
            'The average setback at Godrej Aveline is 14 m on the sides, 20 m on the front and 45 m near the Peripheral Ring Road.',
        },
        {
          question: 'What is the clubhouse size at Godrej Aveline?',
          answer:
            'The clubhouse at Godrej Aveline is approximately 30,000 sq. ft. and is G+3 storeys tall.',
        },
        {
          question: 'Does Godrej Aveline have swimming pools?',
          answer:
            'Godrej Aveline has an adults’ swimming pool (80 ft × 20 ft) and a kids’ pool (20 ft × 15 ft); pools are not heated.',
        },
        {
          question: 'What is the parking arrangement at Godrej Aveline?',
          answer:
            'Godrej Aveline provides covered parking (tandem, stack and parallel), each parking space measuring 8.5 ft × 15 ft (2.5 × 5.5 m). Approximately 30% of parking spots include EV charging provisions. Parking is allotted by lucky draw at handover.',
        },
      ],
    },
  ],

  floorPlans: [
    { label: 'Floor Plan Layout — Sheet 1', src: '/assets_freedom/godrej_aveline_layout_1.png', alt: 'Godrej Aveline Floor Plan Layout — Sheet 1' },
    { label: 'Floor Plan Layout — Sheet 2', src: '/assets_freedom/godrej_aveline_layout_2.png', alt: 'Godrej Aveline Floor Plan Layout — Sheet 2' },
    { label: 'Floor Plan Layout — Sheet 3', src: '/assets_freedom/godrej_aveline_layout_3.png', alt: 'Godrej Aveline Floor Plan Layout — Sheet 3' },
    { label: 'Floor Plan Layout — Sheet 4', src: '/assets_freedom/godrej_aveline_layout_4.png', alt: 'Godrej Aveline Floor Plan Layout — Sheet 4' },
  ],

  legalDisclaimers:
    'The Project is registered as " GODREJ AVELINE " with Karnataka RERA bearing Registration No. PRM/KA/RERA/1251/309/PR/020326/008501 at https://rera.karnataka.gov.in/. This Project is being developed by Godrej Properties Limited. Site Address: GODREJ AVELINE, SY. NO. 58/1, 64, 65/2 OF VENKATALA VILLAGE, YELAHANKA HOBLI, YELAHANKA TALUK, BANGALORE URBAN, BENGALURU NORTH, BENGALURU URBAN, KARNATAKA – 560064. The official website of Godrej Properties Ltd. is www.godrejproperties.com. Please do not rely on the information provided on any other website. T&C apply.',

  sourceConflicts: [],

  salesPhone: '+91 85060 51399',
  leadGen: {
    adCode: '145366',
  },
};

// ────────────────────────────────────────────────────────────────
// PROJECT 5 — GODREJ REGAL PAVILION (Rajendranagar, Hyderabad)
// Source: "Generative Engine Optimisation (GEO) - Godrej Regal
// Pavilion Project Details (7th August 2026)" — verbatim.
// NOTE: Uses Construction Linked Payment Plan. Per business
// direction, the word "Freedom" is NOT used on this project page.
// ────────────────────────────────────────────────────────────────

const godrejRegalPavilion: FreedomProject = {
  id: 'GP-HYD-RGP',
  slug: 'godrej-regal-pavilion',
  name: 'Godrej Regal Pavilion',
  city: 'Hyderabad',
  state: 'Telangana',
  microLocation: 'Rajendranagar',
  zone: 'West Hyderabad',
  developer: 'Godrej Properties',
  type: 'Group housing',
  informationCurrentAsOf: '7 August 2026',

  salesStatus: 'Sustenance',
  constructionStatus: 'Excavation',

  pricing: [
    { configuration: '2 BHK', area: '1307 - 1429 sq. ft.', agreementValue: '1.25 Cr. – 1.46 Cr.', agreementValuePlusGst: '1.25 Cr. + 5%', agreementValuePlusGstSdr: '1.25 Cr. + 5% + 8.15%' },
    { configuration: '3 BHK Premium', area: '1642 - 1784 sq. ft.', agreementValue: '1.58 Cr. – 1.72 Cr.', agreementValuePlusGst: '1.58 Cr. + 5%', agreementValuePlusGstSdr: '1.58 Cr. + 5% + 8.15%' },
    { configuration: '3 BHK Lux', area: '1872 - 2428 sq. ft.', agreementValue: '1.80 Cr. – 2.41 Cr.', agreementValuePlusGst: '1.80 Cr. + 5%', agreementValuePlusGstSdr: '1.80 Cr. + 5% + 8.15%' },
    { configuration: '3.5 BHK', area: '2673 sq. ft.', agreementValue: '2.49 Cr. – 2.73 Cr.', agreementValuePlusGst: '2.49 Cr. + 5%', agreementValuePlusGstSdr: '2.49 Cr. + 5% + 8.15%' },
    { configuration: '4 BHK Premium', area: '2883 - 2904 sq. ft.', agreementValue: '2.59 Cr. – 2.92 Cr.', agreementValuePlusGst: '2.59 Cr. + 5%', agreementValuePlusGstSdr: '2.59 Cr. + 5% + 8.15%' },
    { configuration: '4 BHK Lux', area: '3444 - 3571 sq. ft.', agreementValue: '3.18 Cr. – 3.52 Cr.', agreementValuePlusGst: '3.18 Cr. + 5%', agreementValuePlusGstSdr: '3.18 Cr. + 5% + 8.15%' },
  ],

  rera: 'P02400009910',
  reraCertificateLink: 'https://rera.telangana.gov.in/',
  reraPortal: 'https://rera.telangana.gov.in/',
  possessionRera: 'August 2030',
  possessionGpl: 'August 2029',

  paymentPlanName: 'Construction Linked Payment Plan',
  paymentPlanShort: 'Construction Linked',
  paymentPlanFormula:
    '5% at booking + 5% within 15 days + 10% within 60 days of booking, followed by tower-linked instalments (Commencement of Excavation, Completion of Excavation, 4th/9th/14th/19th/24th Floor Slabs, Terrace Slab, Flooring of the unit) + 10% on Notice of Possession',
  paymentPlanUpfrontDescription:
    '10% of the Agreement Value in the first 15 days of booking (5% at booking + 5% within 15 days), followed by 10% within 60 days of booking',

  paymentPlanExample: {
    configurationLabel: '3 BHK Premium – 1,782 sq. ft. Cost Sheet',
    totalAgreementValue: '₹1,68,58,298',
    totalCostForCustomer: '₹1,79,81,030',
    milestones: [
      { stage: 'Advance towards Booking Amount', percentage: '5%', amount: '₹8,85,061', logic: '5% of Agreement Value + 5% GST Value' },
      { stage: 'Balance booking amount payable within 15 days of booking', percentage: '5%', amount: '₹8,85,061', logic: '5% of Agreement Value + 5% GST Value' },
      { stage: 'Within 60 days from the date of booking', percentage: '10%', amount: '₹17,70,121', logic: '10% of Agreement Value + 5% GST Value' },
      { stage: 'Commencement of Excavation or 1st Feb 2026, whichever is later', percentage: '5%', amount: '₹8,85,061', logic: '5% of Agreement Value + 5% GST Value' },
      { stage: 'Completion of Excavation for respective tower', percentage: '10%', amount: '₹17,70,121', logic: '10% of Agreement Value + 5% GST Value' },
      { stage: 'Completion of 4th floor slab for respective tower', percentage: '5%', amount: '₹8,85,061', logic: '5% of Agreement Value + 5% GST Value' },
      { stage: 'Completion of 9th floor slab for respective tower', percentage: '5%', amount: '₹8,85,061', logic: '5% of Agreement Value + 5% GST Value' },
      { stage: 'Completion of 14th floor slab for respective tower', percentage: '10%', amount: '₹17,70,121', logic: '10% of Agreement Value + 5% GST Value' },
      { stage: 'Completion of 19th floor slab for respective tower', percentage: '5%', amount: '₹8,85,061', logic: '5% of Agreement Value + 5% GST Value' },
      { stage: 'Completion of 24th floor slab for respective tower', percentage: '10%', amount: '₹17,70,121', logic: '10% of Agreement Value + 5% GST Value' },
      { stage: 'Completion of Terrace floor slab for respective tower', percentage: '10%', amount: '₹17,70,121', logic: '10% of Agreement Value + 5% GST Value' },
      { stage: 'Completion of flooring of the respective unit', percentage: '10%', amount: '₹17,70,121', logic: '10% of Agreement Value + 5% GST Value' },
      { stage: 'On Notice of Possession', percentage: '10%', amount: '₹17,70,121', logic: '10% of Agreement Value + 5% GST Value' },
      { stage: 'On Notice of Possession: Advance Maintenance & Sinking Fund Charges', percentage: '0%', amount: '₹2,79,817', logic: 'Advanced Maintenance & Sinking Fund Charges + 18% GST of Advanced Maintenance Value' },
      { stage: 'Total Cost', percentage: '100%', amount: '₹1,79,81,030', logic: '' },
    ],
    additionalSdrNote:
      'Additional 0.5% (Agreement of Sale) after initial 10% payment and additional 7.65% SDR later at the time of possession.',
    notes:
      'This illustration is for representation purposes only. The actual calculation and monthly payout may vary depending on (i) the unit selected in which tower, (ii) associated charges for that unit, and (iii) the offers available at the project marketing office.',
  },

  locationAdvantages: [
    {
      category: 'Schools & Colleges',
      items: [
        'Rockwell School – 10 min*',
        'Basil Wood School – 15 min*',
        'Edify World School – 15 min*',
        'Delhi Public School – 25 min*',
        'Glendale Academy – 25 min*',
      ],
    },
    {
      category: 'Entertainment',
      items: [
        'Forum Mall (Upcoming) – 5 min*',
        'Neo Mall (Upcoming) – 5 min*',
        'Mantra Mall – 15 min*',
        'Asian Mall – 15 min*',
        'GMR Aero Plaza – 15 min*',
        'GVK One Mall – 30 min*',
      ],
    },
    {
      category: 'Healthcare Facilities',
      items: [
        'Trident Hospital – 10 min*',
        'Sunrise Hospital – 10 min*',
        'Olive Hospital – 25 min*',
        'Premier Hospital – 25 min*',
        'KIMS Hospital – 25 min*',
        'Care Hospital – 30 min*',
      ],
    },
    {
      category: 'Social Infrastructure',
      items: [
        'Rajiv Gandhi International Airport – 15 min*',
        'Proposed Metro – 5 min*',
      ],
    },
  ],

  microMarketSections: [
    {
      heading: 'Market Overview',
      paragraphs: [
        'Rajendranagar has transformed from a predominantly institutional and residential suburb into one of Hyderabad’s fastest-growing real estate corridors. Its strategic location between the Financial District and Rajiv Gandhi International Airport positions it as the natural growth extension of West Hyderabad.',
        'The locality is transitioning from an emerging suburb into Hyderabad’s next major premium residential micro-market. Recent market estimates place average residential pricing around ₹7,000–₹9,500 per sq. ft., with 30–45% appreciation over the past five years.',
      ],
    },
    {
      heading: 'Key Facts',
      bullets: [
        'Located approximately 12–15 km from Gachibowli & Financial District.',
        '15–20 km from Rajiv Gandhi International Airport via the Outer Ring Road (ORR).',
        'Residential property prices have appreciated by approximately 30–45% over the last five years, depending on the micro-location and project.',
        'The locality is evolving from an affordable market into a mid-premium residential destination due to branded developer participation.',
      ],
    },
    {
      heading: 'Growth Drivers',
      bullets: [
        'Expansion of Hyderabad’s western IT corridor.',
        'Excellent ORR connectivity.',
        'Availability of large land parcels.',
        'Planned commercial and institutional developments.',
      ],
    },
    {
      heading: 'Major Employment Hubs',
      bullets: [
        'Financial District',
        'Gachibowli IT Corridor',
        'HITEC City',
        'Shamshabad Airport Ecosystem',
        'Budwel IT & Commercial Corridor (proposed)',
        'Logistics & Warehousing along NH-44',
      ],
    },
    {
      heading: 'Existing Infrastructure',
      bullets: [
        'Outer Ring Road (ORR)',
        'PV Narasimha Rao Expressway',
        'NH-44 Connectivity',
        'Airport connectivity within 20–25 minutes',
      ],
    },
    {
      heading: 'Upcoming Growth Catalysts',
      bullets: [
        'Proposed 350-acre IT Cluster between Budwel and Kismatpur.',
        'Budwel Growth Corridor.',
        'Expansion of commercial developments around Rajendranagar.',
        'Continued infrastructure investments along the ORR growth corridor.',
      ],
    },
    {
      heading: 'Buyer Profile',
      subsections: [
        {
          heading: 'End Users (≈60–70%)',
          bullets: [
            'IT professionals',
            'Government employees',
            'Airport professionals',
            'Families upgrading to gated communities',
          ],
        },
        {
          heading: 'Investors (≈30–40%)',
          bullets: [
            'NRIs',
            'High-income salaried professionals',
            'Long-term capital appreciation investors',
            'Buyers priced out of Kokapet and Financial District',
          ],
        },
      ],
      takeaway: 'Typical budget: ₹1.10 Crores – ₹2.5 Crores. Demand is shifting from first-time buyers to aspirational premium homebuyers seeking branded developments.',
    },
    {
      heading: 'Developer Activity & Market Maturity',
      paragraphs: [
        'Rajendranagar has entered the Branded Developer Phase, typically a sign of market maturity and confidence. Leading developers active in the corridor other than Godrej Properties include Prestige Group, Ramky Estates, Provident Housing, and Aparna Constructions.',
      ],
    },
  ],

  faqs: [
    {
      category: 'General Project FAQs',
      items: [
        {
          question: 'Where exactly is Godrej Regal Pavilion located?',
          answer:
            'Godrej Regal Pavilion is located in Rajendranagar, Hyderabad, adjacent to NH-44. Site address: Survey No. 253/P, 254, 255, 256/P, 259/P at Gagan Pahad, Rajendranagar, Ranga Reddy – 500052.',
        },
        {
          question: 'Who is the developer of Godrej Regal Pavilion?',
          answer: 'Godrej Regal Pavilion is developed by Godrej Properties Limited.',
        },
        {
          question: 'Is Godrej Regal Pavilion RERA approved?',
          answer:
            'Yes. Godrej Regal Pavilion is RERA-registered under RERA No. P02400009910 on the Telangana RERA portal (https://rera.telangana.gov.in/).',
        },
        {
          question: 'What is the possession timeline for Godrej Regal Pavilion?',
          answer:
            'The RERA possession timeline for Godrej Regal Pavilion is August 2030. Godrej Properties’ internal (GPL) target possession is August 2029.',
        },
        {
          question: 'What configurations are available at Godrej Regal Pavilion?',
          answer:
            'Godrej Regal Pavilion offers 2 BHK (1,307–1,429 sq. ft.), 3 BHK Premium (1,642–1,784 sq. ft.), 3 BHK Lux (1,872–2,428 sq. ft.), 3.5 BHK (2,673 sq. ft.), 4 BHK Premium (2,883–2,904 sq. ft.), and 4 BHK Lux (3,444–3,571 sq. ft.).',
        },
      ],
    },
    {
      category: 'Pricing & Costing FAQs',
      items: [
        {
          question: 'What is the starting price at Godrej Regal Pavilion?',
          answer:
            'The Agreement Value at Godrej Regal Pavilion starts at ₹1.25 Cr. for 2 BHK and goes up to ₹3.52 Cr. for 4 BHK Lux.',
        },
        {
          question: 'What are the additional charges at Godrej Regal Pavilion?',
          answer:
            'Additional charges over the Agreement Value at Godrej Regal Pavilion include 5% GST on each milestone value, 0.5% Agreement of Sale after the initial 10% payment, and Stamp Duty & Registration (SDR) of approximately 7.65% at the time of possession.',
        },
      ],
    },
    {
      category: 'Construction Linked Payment Plan FAQs',
      items: [
        {
          question: 'What is the Construction Linked Payment Plan at Godrej Regal Pavilion?',
          answer:
            'The Construction Linked Payment Plan at Godrej Regal Pavilion links payments to construction milestones: 5% on booking, 5% within 15 days of booking, 10% within 60 days of booking, then tower-linked instalments on Commencement of Excavation, Completion of Excavation, 4th, 9th, 14th, 19th, 24th and Terrace Floor Slabs, Flooring of the respective unit, followed by 10% on Notice of Possession. See the milestone table on this page for the exact schedule.',
        },
        {
          question: 'How much do I pay upfront at Godrej Regal Pavilion?',
          answer:
            'The upfront payment at Godrej Regal Pavilion is 10% of the Agreement Value across the first 15 days: 5% on booking + 5% within 15 days.',
        },
        {
          question: 'Are there any additional charges at Godrej Regal Pavilion beyond the milestone payments?',
          answer:
            'Yes. Apart from the milestone instalments, 5% GST is applied on each milestone value. An additional 0.5% Agreement of Sale is payable after the initial 10% payment. At the time of possession, buyers pay Stamp Duty & Registration (SDR) starting from approximately 7.65% and Advance Maintenance & Sinking Fund Charges plus 18% GST.',
        },
      ],
    },
    {
      category: 'About Godrej’s Freedom Plan Concept',
      items: [
        {
          question: 'Does Godrej Regal Pavilion offer the Godrej Freedom Plan?',
          answer:
            'Godrej Regal Pavilion is offered under the Construction Linked Payment Plan, not the Freedom Plan. The Godrej Freedom Plan is a separate payment structuring concept available on select Godrej Properties projects — where the buyer pays 20% of the Agreement Value upfront and then enjoys approximately one year of freedom (no further payments due) before the milestone cycle resumes. For Freedom Plan projects, refer to Godrej Woods, Godrej Lakeside Orchard and Godrej Parkshire on this hub.',
        },
      ],
    },
    {
      category: 'Location & Connectivity FAQs',
      items: [
        {
          question: 'How far is the airport from Godrej Regal Pavilion?',
          answer:
            'Rajiv Gandhi International Airport is approximately 15 minutes* from Godrej Regal Pavilion.',
        },
        {
          question: 'How far is Gachibowli from Godrej Regal Pavilion?',
          answer:
            'Gachibowli and the Financial District are approximately 12–15 km from Godrej Regal Pavilion.',
        },
        {
          question: 'Is metro connectivity available near Godrej Regal Pavilion?',
          answer:
            'Yes. A proposed Metro line is approximately 5 minutes* from Godrej Regal Pavilion.',
        },
      ],
    },
    {
      category: 'Investment & Decision-Making FAQs',
      items: [
        {
          question: 'Is Godrej Regal Pavilion a good investment?',
          answer:
            'Godrej Regal Pavilion is positioned for long-term investment due to airport expansion, proximity to India’s biggest high court, and the 1,500-acre GMR Aerocity development.',
        },
      ],
    },
  ],

  floorPlans: [
    { label: '2 BHK Luxe', src: '/assets_one_percent/godrej_regal_pavillion_2bhk_luxe.jpg', alt: 'Godrej Regal Pavilion 2 BHK Luxe Floor Plan (Saleable Area 1,307–1,429 sq. ft.)', saleableArea: '1,307–1,429 sq. ft.' },
    { label: '3 BHK Premium', src: '/assets_one_percent/godrej_regal_pavillion_3bhk_premium.jpg', alt: 'Godrej Regal Pavilion 3 BHK Premium Floor Plan (Saleable Area 1,642–1,784 sq. ft.)', saleableArea: '1,642–1,784 sq. ft.' },
    { label: '3 BHK / 3.5 BHK Luxe', src: '/assets_one_percent/godrej_regal_pavillion_3bhk_3.5bhk_luxe.jpg', alt: 'Godrej Regal Pavilion 3 BHK / 3.5 BHK Luxe Floor Plan' },
    { label: '4 BHK', src: '/assets_one_percent/godrej_regal_pavillion_4bhk.jpg', alt: 'Godrej Regal Pavilion 4 BHK Floor Plan (Saleable Area 2,883–3,571 sq. ft.)', saleableArea: '2,883–3,571 sq. ft.' },
  ],

  legalDisclaimers:
    'RERA Registered. RERA No: P02400009910; Project: Godrej Regal Pavilion, Survey No: 253/P, 254, 255, 256/P, 259/P, at Gagan Pahad, Rajendranagar, Ranga Reddy, 500052; Website: https://rera.telangana.gov.in/. Stock images for representation purpose only. The images contain artist’s impressions. No warranty is expressly or impliedly given that the completed development will comply in any degree with such artist’s impression as depicted. The furniture, accessories, paintings, plantations, landscaping, items, electronic goods, additional fittings/fixtures, decorative items, false ceiling including finishing materials, specifications, shades, sizes and colour of the tiles, etc. shown in the image are only indicative in nature and are only for the purpose of illustrating/indicating a conceived layout and do not form part of the standard specifications/amenities/services to be provided in the unit and/or the Project. The Sale is subject to terms of Application Form and Agreement for Sale. All specifications of the unit shall be as per the final agreement between the Parties. Recipients are advised to apprise themselves of the necessary and relevant information of the project prior to making any purchase decisions. The official website of Godrej Properties Ltd. is www.godrejproperties.com. Please do not rely on the information provided on any other website. *T&C Apply.',

  sourceConflicts: [],

  salesPhone: '+91 99867 91629',
  leadGen: {
    adCode: '145366',
  },
};

// ────────────────────────────────────────────────────────────────
// PROJECT 6 — GODREJ AZURE (Padur, OMR, Chennai)
// Source: "Generative Engine Optimisation (GEO) - Godrej Azure
// Project Details (7th August 2026)" — verbatim.
// NOTE: Uses 1% Payment Plan. Per business direction, the word
// "Freedom" is NOT used on this project page.
// ────────────────────────────────────────────────────────────────

const godrejAzure: FreedomProject = {
  id: 'GP-CHN-AZR',
  slug: 'godrej-azure',
  name: 'Godrej Azure',
  city: 'Chennai',
  state: 'Tamil Nadu',
  microLocation: 'Padur (OMR)',
  zone: 'South Chennai',
  developer: 'Godrej Properties',
  type: 'Group housing',
  informationCurrentAsOf: '7 August 2026',

  salesStatus: 'Ongoing',
  constructionStatus: 'Under Construction, Basement Stage',

  pricing: [
    { configuration: '2 BHK Royale', area: '1020 - 1050 sq. ft.', agreementValue: '₹78.49 lakhs', agreementValuePlusGst: '₹78.49 lakhs + 5%', agreementValuePlusGstSdr: '₹78.49 lakhs + 5% + 7%' },
    { configuration: '3 BHK Elite', area: '1250 sq. ft.', agreementValue: '₹96.49 lakhs', agreementValuePlusGst: '₹96.49 lakhs + 5%', agreementValuePlusGstSdr: '₹96.49 lakhs + 5% + 7%' },
    { configuration: '3 BHK Royale', area: '1470 sq. ft.', agreementValue: '1.11 Cr.', agreementValuePlusGst: '1.11 Cr. + 5%', agreementValuePlusGstSdr: '1.11 Cr. + 5% + 7%' },
    { configuration: '3 BHK Grandeur', area: '1950 sq. ft.', agreementValue: '1.47 Cr.', agreementValuePlusGst: '1.47 Cr. + 5%', agreementValuePlusGstSdr: '1.47 Cr. + 5% + 7%' },
    { configuration: '4 BHK Duplex', area: '2722 sq. ft.', agreementValue: '2.10 Cr.', agreementValuePlusGst: '2.10 Cr. + 5%', agreementValuePlusGstSdr: '2.10 Cr. + 5% + 7%' },
  ],

  rera: 'TNRERA/35/BLG/0354/2025',
  reraCertificateLink: 'https://rera.tn.gov.in/formcqr/f0bc5860-6641-11f0-82dc-1ff5a34f029d',
  reraPortal: 'https://rera.tn.gov.in/',
  possessionRera: 'May 2030',
  possessionGpl: 'December 2027',

  paymentPlanName: '1% Payment Plan',
  paymentPlanShort: '1%',
  paymentPlanFormula:
    '5% at booking + 5% within 15 days + 10% within 60 days of booking, then 1% per month across a sequence of monthly instalments (Sept 2026 – Sept 2027, with a 23% catch-up in March 2027), followed by 35% on Receipt of Completion Certificate and 10% on Notice of Possession',
  paymentPlanUpfrontDescription:
    '10% of the Agreement Value in the first 15 days of booking (5% at booking + 5% within 15 days), followed by 10% within 60 days of booking',

  paymentPlanExample: {
    configurationLabel: '2 BHK Royale – 1,050.17 sq. ft. Cost Sheet',
    totalAgreementValue: '₹79,04,115',
    totalCostForCustomer: '₹84,24,320',
    milestones: [
      { stage: 'Advance towards booking amount', percentage: '5%', amount: '₹4,14,966', logic: '5% of Agreement Value + additional 5% GST of that value' },
      { stage: 'Balance booking amount payable within 15 days', percentage: '5%', amount: '₹4,14,966', logic: '5% of Agreement Value + additional 5% GST of that value' },
      { stage: 'Within 60 days of booking or before 30th June, whichever is earlier', percentage: '10%', amount: '₹8,29,932', logic: '10% of Agreement Value + additional 5% GST of that value' },
      { stage: 'On or before 5th Sept 2026', percentage: '1%', amount: '₹82,993', logic: '1% of Agreement Value + additional 5% GST of that value' },
      { stage: 'On or before 5th Oct 2026', percentage: '1%', amount: '₹82,993', logic: '1% of Agreement Value + additional 5% GST of that value' },
      { stage: 'On or before 5th Nov 2026', percentage: '1%', amount: '₹82,993', logic: '1% of Agreement Value + additional 5% GST of that value' },
      { stage: 'On or before 5th Dec 2026', percentage: '1%', amount: '₹82,993', logic: '1% of Agreement Value + additional 5% GST of that value' },
      { stage: 'On or before 5th Jan 2027', percentage: '1%', amount: '₹82,993', logic: '1% of Agreement Value + additional 5% GST of that value' },
      { stage: 'On or before 5th Feb 2027', percentage: '1%', amount: '₹82,993', logic: '1% of Agreement Value + additional 5% GST of that value' },
      { stage: 'On or before 5th March 2027', percentage: '23%', amount: '₹19,08,844', logic: '23% of Agreement Value + additional 5% GST of that value' },
      { stage: 'On or before 5th April 2027', percentage: '1%', amount: '₹82,993', logic: '1% of Agreement Value + additional 5% GST of that value' },
      { stage: 'On or before 5th May 2027', percentage: '1%', amount: '₹82,993', logic: '1% of Agreement Value + additional 5% GST of that value' },
      { stage: 'On or before 5th June 2027', percentage: '1%', amount: '₹82,993', logic: '1% of Agreement Value + additional 5% GST of that value' },
      { stage: 'On or before 5th July 2027', percentage: '1%', amount: '₹82,993', logic: '1% of Agreement Value + additional 5% GST of that value' },
      { stage: 'On or before 5th Aug 2027', percentage: '1%', amount: '₹82,993', logic: '1% of Agreement Value + additional 5% GST of that value' },
      { stage: 'On or before 5th Sept 2027', percentage: '1%', amount: '₹82,993', logic: '1% of Agreement Value + additional 5% GST of that value' },
      { stage: 'On Receipt of Completion Certificate', percentage: '35%', amount: '₹29,04,762', logic: '35% of Agreement Value + additional 5% GST of that value' },
      { stage: 'On Notice of Possession', percentage: '10%', amount: '₹8,29,932', logic: '10% of Agreement Value + additional 5% GST of that value' },
      { stage: 'On Notice of Possession: Advance Maintenance & Sinking Fund Charges', percentage: '0%', amount: '₹1,24,999', logic: 'Advanced Maintenance & Sinking Fund Charges + 18% GST of Advanced Maintenance Value' },
      { stage: 'Total Cost', percentage: '100%', amount: '₹84,24,320', logic: '' },
    ],
    additionalSdrNote: 'Additional SDR Charges of 7% at the time of possession.',
    notes:
      'This illustration is for representation purposes only. The actual calculation and monthly payout may vary depending on (i) the unit selected, (ii) associated charges for that unit, and (iii) the offers available at the project marketing office.',
  },

  locationAdvantages: [
    {
      category: 'Schools & Colleges',
      items: [
        'Hindustan University (0.95 km) – 4 min* drive',
        'Sri Chaitanya School (1.9 km) – 5 min* drive',
        'Gateway International School (1.4 km) – 6 min* drive',
        'Hindustan International School (2 km) – 6 min* drive',
        'Chettinad Sarvalokaa International School (3.9 km) – 11 min* drive',
        'Jeppiaar Engineering College (7.3 km) – 16 min* drive',
        'Satyabhama University (8.3 km) – 17 min* drive',
      ],
    },
    {
      category: 'Hospitals',
      items: [
        'Supreme Specialty Hospital (0.5 km) – 2 min* drive',
        'Unittas Hospital OMR (1.5 km) – 5 min* drive',
        'Dr. Kamakshi Memorial Hospital (3.0 km) – 6 min* drive',
        'Chettinad Hospital (3.8 km) – 16 min* drive',
        'Rainbow Children’s Hospital (15.4 km) – 36 min* drive',
        'Apollo Specialty Hospital (20.5 km) – 45 min* drive',
      ],
    },
    {
      category: 'Offices / IT Hubs',
      items: [
        'FL Smith Private Limited (2.9 km) – 6 min* drive',
        'SIPCOT IT Park (3 km) – 6 min* drive',
        'Virtusa Consulting Services Private Limited (4.4 km) – 10 min* drive',
        'Pacifica Tech Park (4.6 km) – 10 min* drive',
        'ETA Techno Park (5.1 km) – 11 min* drive',
        'HCL Technologies (5.4 km) – 12 min* drive',
        'The Times of India (7.5 km) – 14 min* drive',
        'TCS (9.3 km) – 20 min* drive',
      ],
    },
    {
      category: 'Malls / Supermarkets',
      items: [
        'Reliance Smart Bazaar (0.3 km) – 3 min* walk',
        'Aysha Hypermart (0.3 km) – 3 min* walk',
        'Nilgiris Supermarket (0.8 km) – 5 min* drive',
        'KPN (Kovai Pazhamuthir Nilayam) (1.3 km) – 5 min* drive',
        'Grand Marina Mall (2.3 km) – 7 min* drive',
        'Decathlon (3.5 km) – 8 min* drive',
        'OMR Food Street (5.8 km) – 12 min* drive',
        'Vivira Mall (6.9 km) – 14 min* drive',
        'PVR Cinemas ECR (14 km) – 20 min* drive',
      ],
    },
  ],

  microMarketSections: [
    {
      heading: 'Location Overview',
      paragraphs: [
        'Godrej Azure Phase 1, launched in 2015, has seen appreciation of approximately 100%, owing to infrastructure developments and the rapid establishment of Chennai’s IT corridor on OMR. Major developments in Siruseri and ELCOT, with Siruseri roughly 2.5 km from the project location, anchor demand.',
      ],
    },
    {
      heading: 'Cosmopolitan Demand Base',
      paragraphs: [
        'The influx of a cosmopolitan crowd, ranging from IT professionals to students pursuing higher studies from across the country, has ensured a consistent need for group housing for accommodation as well as investment opportunities.',
      ],
    },
    {
      heading: 'Metro Connectivity',
      paragraphs: [
        'The upcoming Phase 2 Corridor 3 metro line will run parallel to OMR and ensure connectivity to key locations inside Chennai city — further improving connectivity for Godrej Azure residents.',
      ],
    },
  ],

  faqs: [
    {
      category: 'General Project FAQs',
      items: [
        {
          question: 'Where exactly is Godrej Azure located?',
          answer:
            'Godrej Azure is located at Survey Nos. 282, 283/1, 284/1, 284/2A, 281/1B1A, 281/1B2, 283/2 and 284/2B, Padur Village, Tiruporur Taluk, Kancheepuram District, and Survey Nos. 222/2, 224/1, 224/2, 227/1A, 227/1B, 227/1C, 227/2A, 227/2B, 227/2C, 227/3, 225/1, 225/2, 226/1 and 226/2, Kazhipattur Village, Muttukadu Panchayat Union, Kancheepuram District — on the Old Mahabalipuram Road (OMR).',
        },
        {
          question: 'Who is the developer of Godrej Azure?',
          answer: 'Godrej Azure is developed by Godrej Properties Limited.',
        },
        {
          question: 'Is Godrej Azure RERA approved?',
          answer:
            'Yes. Godrej Azure is RERA-registered under RERA No. TNRERA/35/BLG/0354/2025 on the Tamil Nadu RERA portal (https://rera.tn.gov.in/).',
        },
        {
          question: 'What is the possession timeline for Godrej Azure?',
          answer:
            'The RERA possession timeline for Godrej Azure is May 2030. Godrej Properties’ internal (GPL) target possession is December 2027. The OC timeline is December 2027.',
        },
        {
          question: 'What configurations are available at Godrej Azure?',
          answer:
            'Godrej Azure offers 2 BHK Royale (1,020–1,050 sq. ft.), 3 BHK Elite (1,250 sq. ft.), 3 BHK Royale (1,470 sq. ft.), 3 BHK Grandeur (1,950 sq. ft.), and 4 BHK Duplex (2,722 sq. ft.).',
        },
      ],
    },
    {
      category: 'Pricing & Costing FAQs',
      items: [
        {
          question: 'What is the starting price at Godrej Azure?',
          answer:
            'The Agreement Value at Godrej Azure starts at ₹78.49 lakhs for 2 BHK Royale and goes up to ₹2.10 Cr. for 4 BHK Duplex.',
        },
        {
          question: 'What are the additional charges at Godrej Azure?',
          answer:
            'Additional charges over the Agreement Value at Godrej Azure include 5% GST on each milestone value and Stamp Duty & Registration (SDR) of 7% at the time of possession.',
        },
      ],
    },
    {
      category: '1% Payment Plan FAQs',
      items: [
        {
          question: 'What is the 1% Payment Plan at Godrej Azure?',
          answer:
            'The 1% Payment Plan at Godrej Azure lets the buyer pay 10% of the Agreement Value in the first 15 days of booking, 10% within 60 days, then 1% per month across a sequence of monthly instalments (Sept 2026 – Sept 2027, with a 23% catch-up in March 2027), followed by 35% on Receipt of Completion Certificate and 10% on Notice of Possession.',
        },
        {
          question: 'How much will my initial booking amount be at Godrej Azure?',
          answer:
            'The initial booking amount at Godrej Azure is 5% of the property cost, with a balance 5% payable within 15 days.',
        },
        {
          question: 'How much am I paying till possession at Godrej Azure?',
          answer:
            'By the time of actual terrace completion at Godrej Azure, the buyer will have paid approximately 55% of the property cost. The balance 45% is payable at possession stages (35% on Receipt of Completion Certificate + 10% on Notice of Possession + Advance Maintenance & Sinking Fund).',
        },
        {
          question: 'Can I pay 100% upfront at Godrej Azure? What benefit do I get?',
          answer:
            'Yes. If a customer opts to pay 100% upfront at Godrej Azure, a PACE interest rebate is passed on at 7.5% per annum.',
        },
      ],
    },
    {
      category: 'About Godrej’s Freedom Plan Concept',
      items: [
        {
          question: 'Does Godrej Azure offer the Godrej Freedom Plan?',
          answer:
            'Godrej Azure is offered under the 1% Payment Plan, not the Freedom Plan. The Godrej Freedom Plan is a separate payment structuring concept available on select Godrej Properties projects — where the buyer pays 20% of the Agreement Value upfront and then enjoys approximately one year of freedom (no further payments due) before the milestone cycle resumes. For Freedom Plan projects, refer to Godrej Woods, Godrej Lakeside Orchard and Godrej Parkshire on this hub.',
        },
      ],
    },
    {
      category: 'Location & Connectivity FAQs',
      items: [
        {
          question: 'How far is the metro from Godrej Azure?',
          answer: 'The nearest metro station (Siruseri metro station) is approximately 2.5 km from Godrej Azure.',
        },
        {
          question: 'Which IT hubs are near Godrej Azure?',
          answer:
            'SIPCOT IT Park is 3 km from Godrej Azure, Pacifica Tech Park 4.6 km, ETA Techno Park 5.1 km, HCL Technologies 5.4 km, and TCS 9.3 km.',
        },
      ],
    },
    {
      category: 'Design, Amenities & Specifications FAQs',
      items: [
        {
          question: 'What is the clubhouse size at Godrej Azure?',
          answer: 'The clubhouse at Godrej Azure is 11,330 sq. ft. and has centralised AC.',
        },
        {
          question: 'Does Godrej Azure have a swimming pool?',
          answer:
            'Godrej Azure has one swimming pool of 17 m × 11 m × 4 ft (not heated), with 6 changing rooms.',
        },
        {
          question: 'What is the parking arrangement at Godrej Azure?',
          answer:
            '2 BHK units at Godrej Azure get open parking, 3 BHK and 3 BHK Large units get covered parking, and 4 BHK Duplex gets tandem parking (1:1 for all). Each parking space is 8 ft × 16 ft.',
        },
        {
          question: 'Does Godrej Azure provide EV charging?',
          answer: 'Yes. Godrej Azure has EV charging points in designated parking spaces.',
        },
        {
          question: 'How many trees does Godrej Azure have on site?',
          answer:
            'Godrej Azure has 120 trees on site, 58 in the OSR (Open Space Reserved), plus 2,532 shrubs in the OSR across 27 variants.',
        },
        {
          question: 'What is the construction type at Godrej Azure?',
          answer:
            'Godrej Azure uses Mivan construction (no block work). External walls are 160 mm thick and internal walls 90 mm thick. Floor-to-ceiling height is 2,950 mm (9.6 ft). The building is designed under Seismic Zone 3.',
        },
        {
          question: 'What is the electric backup at Godrej Azure?',
          answer:
            'Electric backup at Godrej Azure: 4 BHK — 86 kW EB and 3 kW DG; 3 BHK & 3 BHK Large — 6 kW EB and 1.53 kW DG; Compact 3 BHK — 5 kW EB and 1.5 kW DG; 2 BHK — 5 kW EB and 1 kW DG.',
        },
        {
          question: 'What is the source of water at Godrej Azure?',
          answer:
            'The water source at Godrej Azure is groundwater and tanker; 3 borewells are functional. Rainwater harvesting is provided in the project.',
        },
      ],
    },
    {
      category: 'Legal & Ownership FAQs',
      items: [
        {
          question: 'Is the title of the property clear at Godrej Azure?',
          answer: 'Yes. The title of the property at Godrej Azure is clear. The property is freehold.',
        },
        {
          question: 'Are there any pending legal cases against Godrej Azure?',
          answer: 'No. There are no pending legal cases at Godrej Azure.',
        },
        {
          question: 'Under which development authority does Godrej Azure come?',
          answer: 'Godrej Azure comes under the DTCP (Directorate of Town and Country Planning).',
        },
        {
          question: 'Where does registration take place for Godrej Azure?',
          answer: 'Registration for Godrej Azure takes place at Navallur.',
        },
        {
          question: 'What is the booking cancellation clause at Godrej Azure?',
          answer:
            'The booking cancellation clause at Godrej Azure is 10% deduction on the amount paid.',
        },
      ],
    },
  ],

  floorPlans: [
    { label: '2 BHK Royale', src: '/assets_freedom/godrej_azure_2bhk_royal.png', alt: 'Godrej Azure 2 BHK Royale Floor Plan (Saleable Area 1,020–1,050 sq. ft.)', saleableArea: '1,020–1,050 sq. ft.' },
    { label: '3 BHK Elite', src: '/assets_freedom/godrej_azure_3bhk_elite.png', alt: 'Godrej Azure 3 BHK Elite Floor Plan (Saleable Area 1,250 sq. ft.)', saleableArea: '1,250 sq. ft.' },
    { label: '3 BHK Royale', src: '/assets_freedom/godrej_azure_3bhk_royal.png', alt: 'Godrej Azure 3 BHK Royale Floor Plan (Saleable Area 1,470 sq. ft.)', saleableArea: '1,470 sq. ft.' },
    { label: '3 BHK Grandeur', src: '/assets_freedom/godrej_azure_3bhk_grand.png', alt: 'Godrej Azure 3 BHK Grandeur Floor Plan (Saleable Area 1,950 sq. ft.)', saleableArea: '1,950 sq. ft.' },
    { label: '4 BHK Duplex (Lower)', src: '/assets_freedom/godrej_azure_4bhk_grand_lower.png', alt: 'Godrej Azure 4 BHK Duplex Lower Floor Plan (Saleable Area 2,722 sq. ft.)', saleableArea: '2,722 sq. ft.' },
    { label: '4 BHK Duplex (Upper)', src: '/assets_freedom/godrej_azure_4bhk_grand_upper.png', alt: 'Godrej Azure 4 BHK Duplex Upper Floor Plan (Saleable Area 2,722 sq. ft.)', saleableArea: '2,722 sq. ft.' },
  ],

  legalDisclaimers:
    'RERA Registered. RERA No: TNRERA/35/BLG/0354/2025; Project: Godrej Azure, Survey Nos. 282, 283/1, 284/1, 284/2A, 281/1B1A, 281/1B2, 283/2 and 284/2B Padur Village, Tiruporur Taluk, Kancheepuram District and Survey Nos. 222/2, 224/1, 224/2, 227/1A, 227/1B, 227/1C, 227/2A, 227/2B, 227/2C, 227/3, 225/1, 225/2, 226/1 and 226/2 Kazhipattur Village, Muttukadu Panchayat Union, Kancheepuram District. Website: https://rera.tn.gov.in. The official website of Godrej Properties Ltd. is www.godrejproperties.com. Please do not rely on the information provided on any other website. The sale will be subject to the terms of the application form, allotment letter and Agreement for Sale. The specifications/amenities mentioned in the Agreement for Sale and/or uploaded on the RERA website shall be final and binding on the Developer and Purchaser. Recipients are advised to apprise themselves of the necessary and relevant information of the Project prior to making any purchase decisions. *This refers to the payment plan offer. Please refer to payment terms as mentioned in the AFS. Basis sole discretion of the developer. Limited time period offer.',

  sourceConflicts: [],

  salesPhone: '+91 95132 37734',
  leadGen: {
    adCode: '145366',
  },
};

// ────────────────────────────────────────────────────────────────
// EXPORTS
// ────────────────────────────────────────────────────────────────

export const freedomProjects: FreedomProject[] = [
  godrejLakesideOrchard,
  godrejWoods,
  godrejParkshire,
  godrejAveline,
  godrejRegalPavilion,
  godrejAzure,
];

export const getAllFreedomSlugs = () => freedomProjects.map((p) => p.slug);

export const getFreedomProjectBySlug = (slug: string): FreedomProject | undefined =>
  freedomProjects.find((p) => p.slug === slug);

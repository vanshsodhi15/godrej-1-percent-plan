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

  // Section 4 — Payment plan (Freedom / 20:80)
  paymentPlanName: string;              // exactly as doc names it — e.g. "20:80 Freedom Payment Plan"
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
    {
      heading: 'Project Land & Design Facts',
      bullets: [
        'Total land area except the buffer zone: 6 acres & 37 Gunthas',
        'Open space ratio: 76%',
        'Construction area: 6,099 sq. m.',
        'UDS of the project: approximately 26%',
        'Civic amenities area: 5% of plot area',
        'Theme: Forest Theme',
        'Amenities: Clubhouse, Swimming pool, Kids play area',
        'Clubhouse area: 20,000 sq. ft.',
        'Fully grown trees on site: approximately 350',
        'Entry / exit: Single entry/exit portal',
        'Main road width: 24 m (proposed to be widened to 30 m)',
        'Khata: A khata',
        'Land zoning: Residential',
        'Tower Height: 41.45 / 44.4 metres; FSI: 2.98',
        'Gap between units: Differs as per tower layout',
        'Gap between towers: Differs as per tower layout',
        'Construction type: RCC Frame structure',
        'Water source: Borewell, BWSSB',
      ],
    },
    {
      heading: 'Project Specifications & Distinctions',
      bullets: [
        'What makes Godrej Woods unique: Limited apartments, lavish balconies, forest-themed development.',
        'Smart home features (video door phone, home automation): No',
        'Additional parking or storage space available for purchase: No',
        'Visitor parking: 60',
        'Sewage Treatment Plant (STP) type: SBR',
        'Electric backup: 2 BHK is 0.8 kW, 3 BHK is 1 kW',
        'Concrete grade: Foundation M35, Column M45',
        'Steel grade for reinforcement: Fe 550',
        'Solar panels, rainwater harvesting and waste-management systems included: Yes',
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
// EXPORTS
// ────────────────────────────────────────────────────────────────

export const freedomProjects: FreedomProject[] = [godrejLakesideOrchard, godrejWoods];

export const getAllFreedomSlugs = () => freedomProjects.map((p) => p.slug);

export const getFreedomProjectBySlug = (slug: string): FreedomProject | undefined =>
  freedomProjects.find((p) => p.slug === slug);

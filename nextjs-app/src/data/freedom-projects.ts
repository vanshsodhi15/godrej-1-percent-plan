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
}

// ────────────────────────────────────────────────────────────────
// GODREJ LAKESIDE ORCHARD — Sarjapur, East Bangalore
// Source: "(GEO) - Godrej Lakeside Orchard Project Details
//          (7th August 2026).docx"
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
    additionalSdrNote: 'Additional SDR charges of 7.7% at the time of possession.',
    notes:
      'This illustration is for representation purposes only. The actual calculation and monthly payout may vary depending on (i) the unit selected, (ii) associated charges for that unit, and (iii) the offers available at the project marketing office.',
  },

  locationAdvantages: [
    {
      category: 'Connectivity',
      items: [
        'Outer Ring Road — 15 min*',
        'Marathahalli — 30–35 min*',
        'Bellandur — 26 min*',
        'Electronic City — 30–35 min*',
        'S.H. 35 — 12 min*',
      ],
    },
    {
      category: 'Commute & Transport',
      items: [
        'Proposed Iblur Metro Station — 15 min*',
        'Proposed Carmelaram Metro Station — 6 min*',
        'Carmelaram Railway Station — 7 min*',
      ],
    },
    {
      category: 'Recreational & Lifestyle Hubs',
      items: [
        'DoubleTree Suites by Hilton Hotel — 13 min*',
        'Rural Blues — 8 min*',
        'Fairfield by Marriott — 16 min*',
        'Soul Space Spirit Centro Mall — 15 min*',
        'Bier Library — 8 min*',
        'Byg Brewski — 10 min*',
      ],
    },
    {
      category: 'Tech Parks & Employment Hubs',
      items: [
        'Global Technology Park — 16 min*',
        'RGA Tech Park — 6 min*',
        'Cessna Business Park — 20 min*',
        'RMZ Ecospace — 15 min*',
        'Embassy Tech Village — 20 min*',
        'Wipro — 8 min*',
      ],
    },
    {
      category: 'Schools & Colleges',
      items: [
        'CMR Gandhi Public School — 4 min*',
        'DPS EAST — 8 min*',
        'Harvest International School — 15 min*',
        'Primus Public School — 12 min*',
        'Inventure Academy — 14 min*',
        'Oakridge International School — 13 min*',
        'GEAR Innovative International School — 14 min*',
        'The International School — 14 min*',
      ],
    },
    {
      category: 'Healthcare Facilities',
      items: [
        'Belenus Champion Hospital — 7 min*',
        'Natus Women & Children Hospital — 7 min*',
        'Motherhood Hospital — 11 min*',
        'Cloudnine Hospital — 10 min*',
        'Sakra World Hospital — 18 min*',
        'Manipal Hospital — 15 min*',
      ],
    },
  ],

  microMarketSections: [
    {
      heading: 'Market Overview',
      paragraphs: [
        'Sarjapur has emerged as one of Bengaluru’s fastest-growing residential and IT hubs, driven by its strategic connectivity to Whitefield, Electronic City, Outer Ring Road (ORR) and Bellandur.',
        'With the presence of leading IT parks, reputed international schools and social infrastructure, the location continues to attract both end-users and long-term investors.',
        'Ongoing infrastructure developments — including the Peripheral Ring Road (PRR), Satellite Town Ring Road (STRR), and the proposed Metro connectivity — are expected to further enhance accessibility and support sustained property value appreciation.',
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
            'The 20:80 Freedom Payment Plan at Godrej Lakeside Orchard includes GST but excludes registration. Stamp Duty and Registration (SDR) — 7.7% — are payable additionally at the time of possession.',
        },
        {
          question: 'How much do I need to pay upfront under the 20:80 Freedom Payment Plan at Godrej Lakeside Orchard?',
          answer:
            'Per the milestone table in the source document, the upfront payment is 20% of the Agreement Value across the first 60 days: 5% at booking, 5% within 21 days of booking, and 10% within 60 days of booking.',
          conflict:
            'The FAQ section of the source document states "10 percent of property value" as the upfront amount, but the milestone table shows 5% + 5% + 10% = 20%. The milestone table is treated as authoritative on this page.',
        },
        {
          question: 'When does the home-loan EMI start under the 20:80 Freedom Payment Plan?',
          answer:
            'Per the source document, after the initial 10% payment has been made, the home loan can start.',
        },
        {
          question: 'Can I prepay or exit the 20:80 Freedom Payment Plan at Godrej Lakeside Orchard?',
          answer: 'No. Per the source document, the 20:80 Freedom Payment Plan does not permit prepayment or exit.',
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
            'Per the source document, Godrej Lakeside Orchard is positioned as a strong investment due to its proximity to IT hubs (ORR, Sarjapur Road, Electronic City, Whitefield) and upcoming Metro expansion in Sarjapur.',
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
          answer: 'Godrej Lakeside Orchard is currently Under Construction — 7th/12th floor.',
        },
      ],
    },
    {
      category: 'Conflict-Handling FAQs',
      items: [
        {
          question: 'Why should I buy at Godrej Lakeside Orchard in Sarjapur instead of Whitefield?',
          answer:
            'Per the source document, Sarjapur offers stronger long-term appreciation potential than Whitefield, excellent connectivity to major IT hubs, and a well-developed social infrastructure with relatively lower traffic congestion.',
        },
        {
          question: 'What if Godrej Lakeside Orchard gets delayed?',
          answer:
            'Godrej Properties is a reputed developer and delays are rare. RERA ensures accountability and compensation clauses if timelines slip beyond the RERA-declared possession date (30 September 2030 for Godrej Lakeside Orchard).',
        },
        {
          question: 'Is the 20:80 Freedom Payment Plan at Godrej Lakeside Orchard really beneficial?',
          answer:
            'Per the source document, the 20:80 Freedom Payment Plan reduces the financial burden during the construction period and improves cash-flow flexibility, as the majority of payment (80%) is deferred to possession stages.',
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
            'A unit at Godrej Lakeside Orchard can be blocked by paying the booking amount, which is 5% of the Agreement Value per the milestone table on this page.',
          conflict:
            'The source-document FAQ states "10 percent" as the booking amount, but the milestone table shows the booking amount as 5% of Agreement Value.',
        },
      ],
    },
  ],

  floorPlans: [
    {
      label: '3.5 BHK Luxe',
      src: '/assets/lake_side_orchard_3.5_luxe.jpg',
      alt: 'Godrej Lakeside Orchard 3.5 BHK Luxe Floor Plan',
      saleableArea: '2,214–2,257 sq. ft.',
    },
    {
      label: '3.5 BHK',
      src: '/assets/lake_side_orchard_3.5.jpg',
      alt: 'Godrej Lakeside Orchard 3.5 BHK Floor Plan',
    },
  ],

  legalDisclaimers:
    'RERA Registered. RERA No. PRM/KA/RERA/1251/446/PR/300924/007105. Project is registered as Godrej Lakeside Orchard, available at website http://rera.karnataka.gov.in. Site address: Godrej Lakeside Orchard, Survey Nos. 77, 174/1B, 175/P, 175/2A, 175/2B, 176/2A, 176/2B, 177, 73, 78/1A, 78/2A1(P), 78/2B, 78/3A, 78/4, 79/1C2, 178 of Kodathi Village, Varthur Hobli, Bengaluru East, Bengaluru Urban, Karnataka – 560035. Stock images are for representation purposes only and contain artist’s impressions. The information is presented as general information and no warranty is expressly or impliedly given that the completed development will comply in any degree with such artist’s impression or anticipated appearance. The sale is subject to the terms of the Application Form and the Agreement for Sale. The prices mentioned are an indicative Agreement Value; Stamp Duty & Registration, GST and other charges are over and above the Agreement Value. All specifications of the unit shall be as per the final agreement between the parties. Customers are advised to apprise themselves of the necessary and relevant information of the project(s)/offer(s) prior to making any purchase decision. The official website of Godrej Properties Ltd. is www.godrejproperties.com. Please do not rely on the information provided on any other website. *T&C apply.',

  sourceConflicts: [
    {
      location: 'Payment plan name',
      description:
        'The source document header calls this the "20:80 Payment Plan"; the campaign brief calls it the "20:20:60 Freedom Payment Plan". This page uses "20:80 Freedom Payment Plan" per the source document. Business to confirm.',
    },
    {
      location: 'Upfront percentage',
      description:
        'The source-document FAQ says "How much do I need to pay upfront? 10 percent". The source-document milestone table shows 5% + 5% + 10% = 20% upfront across the first 60 days. This page treats the milestone table as authoritative (20%). Business to confirm.',
    },
    {
      location: 'Booking amount',
      description:
        'The source-document Closing FAQ says "Booking amount of 10 percent". The milestone table shows the booking amount as 5% of Agreement Value. This page follows the milestone table (5%). Business to confirm.',
    },
  ],

  liveProjectUrl:
    'https://www.godrejproperties.com/bengaluru/godrej-lakeside-orchard-sarjapur-bangalore',
};

// ────────────────────────────────────────────────────────────────
// EXPORTS
// ────────────────────────────────────────────────────────────────

export const freedomProjects: FreedomProject[] = [godrejLakesideOrchard];

export const getAllFreedomSlugs = () => freedomProjects.map((p) => p.slug);

export const getFreedomProjectBySlug = (slug: string): FreedomProject | undefined =>
  freedomProjects.find((p) => p.slug === slug);

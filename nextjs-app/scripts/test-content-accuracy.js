
const fs = require('fs');
const path = require('path');

function loadProjects() {
  const dataPath = path.join(__dirname, '../src/data/projects.ts');
  let src = fs.readFileSync(dataPath, 'utf8');
  src = src
    .replace(/^import\s.+$/gm, '')
    .replace(/export\s+const\s+/g, 'const ')
    .replace(/export\s+function\s+/g, 'function ')
    .replace(/export\s+type\b[^;]+;/g, '')
    .replace(/export\s+interface\b[\s\S]+?^}/gm, '')
    .replace(/\)\s*:\s*[\w\[\]| ]+(?=\s*\{)/g, ')')
    .replace(/:\s*Record<[^>]+>(\[\])?/g, '')
    .replace(/:\s*string(\[\])?(?=[,;\s=\)])/g, '')
    .replace(/:\s*number(\[\])?(?=[,;\s=\)])/g, '')
    .replace(/:\s*boolean(?=[,;\s=\)])/g, '')
    .replace(/:\s*(FaqItem|FaqGroup|PricingRow|FloorPlanImage|MicroMarketSection|LocationAdvantageGroup|PaymentPlanExample|ProjectPaymentExample|Project)(\[\])?(?=[,;\s=\)])/g, '')
    .replace(/<[A-Za-z\[\]| ]+>/g, '')
    .replace(/^\s*\/\/.+$/gm, '');
  try {
    const fn = new Function('require', src + '\nreturn projects;');
    return fn(require);
  } catch (e) {
    console.error('Could not parse projects.ts:', e.message.split('\n')[0]);
    process.exit(1);
  }
}

function norm(str) {
  return (str || '')
    .replace(/[\u{1F300}-\u{1FFFF}\u{2600}-\u{27FF}]/gu, '')
    .replace(/\u2019/g, "'").replace(/\u2018/g, "'")
    .replace(/\u201C/g, '"').replace(/\u201D/g, '"')
    .replace(/\u2013/g, '-').replace(/\u2014/g, '-')
    .replace(/\u00A0/g, ' ').replace(/\s+/g, ' ')
    .trim().toLowerCase();
}

let passed = 0, failed = 0;
const failures = [];

function check(label, expected, haystack) {
  if (norm(haystack).includes(norm(expected))) {
    console.log('    ok  ' + label);
    passed++;
  } else {
    console.log('    FAIL  ' + label);
    failures.push({ label, expected: expected.slice(0, 110), actual: haystack.slice(0, 110) });
    failed++;
  }
}

function getMicroText(project) {
  const parts = [];
  if (project.microMarketSections) {
    for (const s of project.microMarketSections) {
      [s.heading, s.intro, s.takeaway, s.quote].forEach(x => x && parts.push(x));
      (s.bullets || []).forEach(b => parts.push(b));
      (s.subsections || []).forEach(sub => {
        [sub.heading, sub.intro, sub.takeaway].forEach(x => x && parts.push(x));
        (sub.bullets || []).forEach(b => parts.push(b));
      });
      (s.comparisons || []).forEach(comp => {
        comp.label && parts.push(comp.label);
        (comp.bullets || []).forEach(b => parts.push(b));
      });
    }
  }
  if (project.microMarketNotes) parts.push(project.microMarketNotes);
  return parts.join(' ');
}

function getAllFaqs(project) {
  const items = [];
  if (project.faqsByCategory) for (const g of project.faqsByCategory) for (const i of (g.items || [])) items.push(i);
  if (project.faqs) for (const i of project.faqs) items.push(i);
  return items;
}

function findFaq(faqs, question) {
  return faqs.find(f => norm(f.question).includes(norm(question)) || norm(question).includes(norm(f.question)));
}

const MICRO_PHRASES = {
  parkshire: [
    'Hoskote is emerging as a high-potential residential corridor in East Bangalore',
    'Traditionally known as an industrial hub, Hoskote is now witnessing a shift towards organized residential development',
    'making it attractive for both end-users and long-term investors',
    'The growth of Hoskote is anchored on three key pillars',
    'Whitefield Spillover Effect',
    'With Whitefield reaching saturation in terms of pricing and density',
    'Buyers are moving outward in search of affordable alternatives',
    'Hoskote offers significantly lower entry prices',
    'Travel time remains within 20-25 minutes',
    'This creates a strong end-user demand pipeline',
    'Industrial & Employment Backbone',
    'Presence of Hoskote Industrial Area',
    'Proximity to KIADB zones and logistics hubs',
    'Growing warehousing and manufacturing activity',
    'This ensures consistent rental demand and workforce-driven housing needs',
    'Infrastructure-Led Appreciation',
    'Satellite Town Ring Road (STRR) improving regional connectivity',
    'Access to Old Madras Road (NH 75)',
    'Connectivity to Namma Metro via Whitefield',
    'Improved access to Kempegowda International Airport',
    'Infrastructure expansion is expected to unlock land value appreciation over the next 5-10 years',
    'Hoskote is currently 30-40% more affordable than core Whitefield',
    'Offers larger homes at lower ticket sizes',
    'Ideal for first-time homebuyers and budget-conscious IT professionals',
    'Early-entry market with future upside potential',
    'First-time homebuyers',
    'Salaried professionals working in Whitefield / ITPL',
    'Industrial workforce (mid-management & above)',
    'Long-term investors looking for appreciation',
    'Increasing entry of branded developers like Godrej Properties',
    'Shift from plotted developments to integrated apartment communities',
    'Gradual improvement in social infrastructure (schools, hospitals, retail)',
    'Compared to Whitefield',
    'Lower price',
    'Slightly longer commute',
    'Higher appreciation potential',
    'Compared to Budigere / Old Madras Road belt',
    'More industrial demand',
    'Better price entry',
    'Faster land absorption',
  ],
  azure: [
    'Phase 1 for the project, launched in 2015, has seen appreciation of ~100%',
    'infrastructure developments and rapid establishment of IT corridor for Chennai city on OMR',
    'major developments in Siruseri and ELCOT',
    'roughly 2.5 km from our project location',
    'Influx of cosmopolitan crowd, ranging from IT professionals to students pursuing higher studies from across the country',
    'consistent need for group housing for accommodation as well as investment opportunities',
    'Upcoming Phase 2 Corridor 3',
    'metro line which will run parallel to OMR ensures connectivity to key locations inside Chennai city',
  ],
  lakeside: [
    'Location advantage for customers & Investors',
    'Easily connected to multiple corners of the city, making it central point in east Bengaluru',
    'New projects are coming in far exterior from the city center & ORR, hence GLO can be a better choice',
  ],
  regal: [
    'The Rajendra Nagar micro market is one of the fastest-growing residential corridors in South Hyderabad',
    'primarily driven by its strategic connectivity through NH-44, Outer Ring Road, and seamless access to the airport and major employment hubs',
    'Connectivity remains the core strength of this location',
    'making it highly accessible from key parts of the city',
    'The micro market is currently in a developing-to-growth stage',
    'large-scale residential projects by reputed developers are shaping it into a structured residential zone',
    'With improving infrastructure, upcoming metro connectivity, and continuous civic upgrades',
    'the area is witnessing strong real estate activity and increasing buyer interest',
    'Compared to already saturated locations like Gachibowli or Kokapet, Rajendra Nagar offers better entry pricing with higher appreciation potential',
    'supported by consistent price growth and increasing demand from both end-users and investors',
    'Overall, the micro market is transitioning from a peripheral location to a preferred residential destination',
    'backed by connectivity, upcoming developments, and long-term growth prospects',
  ],
};

const FAQ_CHECKS = {
  parkshire: [
    { q: 'Where exactly is the project located?', a: 'Godrej Parkshire is located in Hoskote, East Bangalore, next to NH-648' },
    { q: 'Who is the developer?', a: "The project is developed by Godrej Properties, one of India's most trusted real estate brands." },
    { q: 'Is the project RERA approved?', a: 'Yes' },
    { q: 'What is the possession timeline?', a: 'December 2030' },
    { q: 'What configurations are available?', a: '2BHK and 3BHK' },
    { q: 'What is the starting price?', a: '1.32cr on wards' },
    { q: 'What are the additional charges?', a: 'GST, PLC, FRC, AM, SDR' },
    { q: 'Are there any hidden costs?', a: 'No there are no hidden charges' },
    { q: 'What is the 1% payment plan?', a: 'Pay monthly one percent of the property value after initial booking amount.' },
    { q: 'Does the 1% include GST and registration?', a: 'No Those are not included.' },
    { q: 'How much do I need to pay upfront?', a: '10 percent of property value.' },
    { q: 'When does the home loan EMI start?', a: 'After 10 percent of initial payment home loan can start.' },
    { q: 'Can I prepay or exit the 1% plan?', a: 'NO' },
    { q: 'How far is Whitefield?', a: '20 min from whitefield' },
    { q: 'Is metro connectivity available?', a: 'Yes its available' },
    { q: 'How far is the airport?', a: '50 min from airport' },
    { q: 'What is the current construction status?', a: 'Under Construction, Basement' },
    { q: 'Why should I buy in Hoskote instead of Whitefield?', a: 'You get larger homes at lower prices with future appreciation potential' },
    { q: "Isn't Hoskote too far or underdeveloped?", a: 'Not anymore' },
    { q: 'What if the project gets delayed?', a: 'Being a reputed developer, delays are rare' },
    { q: 'Is the 1% plan really beneficial?', a: 'Yes, it reduces financial burden during construction and improves cash flow flexibility.' },
    { q: 'What is the best unit available now?', a: 'Premium-facing units (park view / corner units) are currently in high demand and offer better long-term value.' },
    { q: 'Are there any current offers?', a: '1 percent payment plan' },
    { q: 'How do I block a unit?', a: 'Token amount of 5 percent' },
  ],
  azure: [
    { q: 'What is the distance from metro station?', a: '2.5 Km (Siruseri metro station)' },
    { q: 'What is the OSR (Open Space Reserved)?', a: '1 Acre' },
    { q: 'What is the staircases measurement?', a: 'Staircases have a width of 1250mm.' },
    { q: 'What is the elevator capacity and who is the service provider?', a: '10pax Jhonson' },
    { q: 'What type of doors are we using?', a: 'Engg door' },
    { q: 'Is there any provision for mosquito mesh?', a: 'No' },
    { q: 'Are the doors facing each other?', a: 'Yes' },
    { q: 'Number of Lifts?', a: '2 Nos' },
    { q: 'Is there a glass partition in the toilet?', a: 'No' },
    { q: 'What is the source of water?', a: 'Ground water & Tanker' },
    { q: 'Is rainwater harvesting provided in the project?', a: 'Yes' },
    { q: 'Width of the roads in the project?', a: '12m' },
    { q: 'What is the paint finish provided in the apartment?', a: 'Texture Paint' },
    { q: 'Does the club house have centralised AC?', a: 'Yes' },
    { q: 'Can a customer pay 100% down payment upfront? If yes, what is the benefit he can get?', a: 'PACE interest rebate will be passed to the customer at 7.5% per annum' },
    { q: 'Are modifications permitted in the apartments?', a: 'No' },
    { q: 'Is the title of the property clear?', a: 'Yes' },
    { q: 'Is the property freehold or leasehold?', a: 'Freehold' },
    { q: 'What is the UDS percentage?', a: '27%' },
    { q: 'Under which development authority does the location comes in?', a: 'DTCP' },
    { q: 'Where will the registration take place?', a: 'Navallur' },
    { q: 'FSI?', a: '2.3' },
    { q: 'Construction type?', a: 'Maivan (No Block work)' },
    { q: 'Floor to ceiling height?', a: '2950mm' },
    { q: 'Architect?', a: 'RSP' },
    { q: 'Grade of concrete?', a: 'M30/M40' },
    { q: 'Are solar options provided in project?', a: 'Yes - Top most 2 floors in each tower' },
    { q: 'Is there a provision for piped gas?', a: 'NO' },
    { q: 'Do we have a gas leak detector in the kitchen?', a: 'Yes' },
    { q: 'Will there be 100% percent power backup/ Capacity?', a: 'Yes' },
  ],
  lakeside: [
    { q: 'What is salable area?', a: 'Salable area is basically super built up area.' },
    { q: 'What is built up area?', a: 'Built Up area includes your thickness of internal walls & ceilings and carpet area.' },
    { q: 'What is carpet area?', a: 'Carpet area is your usable area / area which you can use' },
    { q: 'What is sinking fund?', a: 'Its basically corpus fund.' },
    { q: 'What is GST?', a: "Goods and service tax its govt. charge (It'll be 5%)" },
    { q: 'What is SDR?', a: "Stamp Duty and Registration its govt. charge (It'll be 7% approx together)" },
    { q: "Can you give developer's possession time to me in written", a: "We'll give you RERA possession in written" },
  ],
  regal: [
    { q: 'Where is the proposed development?', a: 'Godrej Rajendra Nagar, located near the Outer Ring Road (ORR) and the PV Narasimha Rao Expressway' },
    { q: 'What is the landmark', a: 'Professor Jayashankar Telangana Agricultural University' },
    { q: 'Is the title of the property clear?', a: 'Yes' },
    { q: 'What is the current status of the litigations?', a: 'No litigations' },
    { q: 'Is the property freehold (no encroachment)?', a: 'Yes' },
    { q: 'How big is the overall project?', a: '12.5 Acres' },
    { q: 'How many towers are there', a: '9 Residential Towers + Clubhouse' },
    { q: 'How many 2 BHK are there', a: '365' },
    { q: 'How many 3 BHK + 2T are there', a: '334' },
    { q: 'How many 3 BHK + 3', a: '331' },
    { q: 'How many 4 BHK are there', a: '53' },
    { q: 'When is the possession timeline?', a: 'May' },
    { q: 'What is the type of construction?', a: 'Aluminium formwork' },
    { q: 'Are modifications permitted in the apartments?', a: 'No' },
    { q: 'What is the floor-to-floor height?', a: '3.05 m (10 ft)' },
    { q: 'What is the DG capacity?', a: '12,250 KVA' },
    { q: 'What is the parking system?', a: 'Tandem Parking' },
    { q: 'What is the project-level USP?', a: 'Royal Retreat' },
  ],
};

const SLUGS = { parkshire: 'godrej-parkshire', azure: 'godrej-azure', lakeside: 'godrej-lakeside-orchard', regal: 'godrej-regal-pavilion' };

const projects = loadProjects();

for (const key of ['parkshire', 'azure', 'lakeside', 'regal']) {
  const slug = SLUGS[key];
  const project = projects.find(p => p.slug === slug);
  console.log('\n' + '='.repeat(64));
  console.log(' ' + key.toUpperCase() + ' — ' + slug);
  console.log('='.repeat(64));
  if (!project) { console.log('  MISSING: ' + slug); failed++; continue; }
  const microText = getMicroText(project);
  const faqs = getAllFaqs(project);
  console.log('\n  -- MICRO-MARKET --');
  for (const phrase of MICRO_PHRASES[key]) check('"' + phrase.slice(0, 65) + '"', phrase, microText);
  console.log('\n  -- FAQs --');
  for (const { q, a } of FAQ_CHECKS[key]) {
    const found = findFaq(faqs, q);
    if (!found) { console.log('    FAIL  Q not found: "' + q.slice(0, 55) + '"'); failures.push({ label: 'Q: ' + q, expected: q, actual: '(not found)' }); failed++; }
    else check('"' + q.slice(0, 55) + '" -> answer', a, found.answer);
  }
}

console.log('\n' + '='.repeat(64));
console.log(' TOTAL: ' + (passed + failed) + ' checks — ' + passed + ' passed, ' + failed + ' failed');
console.log('='.repeat(64));
if (failures.length > 0) {
  console.log('\nFAILURES:\n');
  for (const f of failures) { console.log('  FAIL: ' + f.label); console.log('    EXPECTED: "' + f.expected + '"'); console.log('    IN DATA : "' + f.actual + '"'); console.log(); }
  process.exit(1);
} else { console.log('\n  All checks passed\n'); process.exit(0); }

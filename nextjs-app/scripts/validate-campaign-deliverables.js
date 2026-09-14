const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

const checks = [
  {
    name: 'Godrej Skyshore Freedom campaign classification',
    file: path.join(root, 'Deliverables_Flat', 'freedom-godrej-skyshore', 'index.html'),
    required: [
      'Godrej 20:80 Freedom Payment Plan',
      '20:80 Freedom Payment Plan',
      'https://www.godrejproperties.com/freedom-campaign/projects/godrej-skyshore/',
      'https://www.godrejproperties.com/freedom-campaign/imgs/freedom_og_image.jpg',
    ],
    forbidden: [
      'Godrej Construction Linked Payment Plan',
      'Construction Linked Payment Plan at Godrej Skyshore',
      'Godrej Construction Linked Payment Plan: Godrej Skyshore',
      'construction-linked-plan/projects/godrej-skyshore',
    ],
  },
];

const failures = [];

for (const check of checks) {
  if (!fs.existsSync(check.file)) {
    failures.push(`${check.name}: missing ${path.relative(root, check.file)}`);
    continue;
  }

  const html = fs.readFileSync(check.file, 'utf8');

  for (const phrase of check.required) {
    if (!html.includes(phrase)) {
      failures.push(`${check.name}: missing required phrase "${phrase}"`);
    }
  }

  for (const phrase of check.forbidden) {
    if (html.includes(phrase)) {
      failures.push(`${check.name}: found forbidden phrase "${phrase}"`);
    }
  }
}

if (failures.length > 0) {
  console.error('Campaign deliverable validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Campaign deliverable validation passed.');
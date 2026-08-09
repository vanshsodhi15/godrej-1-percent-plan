const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../out');
const deliverDir = path.join(__dirname, '../Deliverables');
const globalsCssPath = path.join(__dirname, '../src/styles/globals.css');

// Read globals.css once — will be inlined into every deliverable
const globalsCss = fs.existsSync(globalsCssPath)
  ? fs.readFileSync(globalsCssPath, 'utf8')
  : '';

console.log('📦 Starting individual page packaging...');

if (!fs.existsSync(outDir)) {
  console.error('❌ out directory not found. Did the build fail?');
  process.exit(1);
}

// Clean previous deliverables
if (fs.existsSync(deliverDir)) {
  fs.rmSync(deliverDir, { recursive: true, force: true });
}
fs.mkdirSync(deliverDir);

// Recursively find all HTML files
function getAllHtmlFiles(dirPath, arrayOfFiles) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles || [];
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function (file) {
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfFiles = getAllHtmlFiles(dirPath + '/' + file, arrayOfFiles);
    } else if (file.endsWith('.html')) {
      arrayOfFiles.push(path.join(dirPath, file));
    }
  });
  return arrayOfFiles;
}

// Recursively find all files in a directory
function getAllFiles(dirPath, arrayOfFiles) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles || [];
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function (file) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });
  return arrayOfFiles;
}

// Get all pages inside the-1-percent-plan
const htmlFiles = getAllHtmlFiles(path.join(outDir, 'the-1-percent-plan'));

// Also add the main hub page (the-1-percent-plan.html) if it exists
const mainPagePath = path.join(outDir, 'the-1-percent-plan.html');
if (fs.existsSync(mainPagePath)) {
  htmlFiles.push(mainPagePath);
}

// Get all pages inside the-freedom-plan (20:80 Freedom Payment Plan)
const freedomFiles = getAllHtmlFiles(path.join(outDir, 'the-freedom-plan'));
freedomFiles.forEach((f) => htmlFiles.push(f));

// Also add the freedom-plan hub page (the-freedom-plan.html) if it exists
const freedomHubPath = path.join(outDir, 'the-freedom-plan.html');
if (fs.existsSync(freedomHubPath)) {
  htmlFiles.push(freedomHubPath);
}

console.log(`Found ${htmlFiles.length} pages to package...`);

// Build a lookup of all files in _next
const nextDir = path.join(outDir, '_next');
const allNextFiles = getAllFiles(nextDir);

// Build a lookup: filename -> absolute path (for resolving references)
const nextFileLookup = {};
allNextFiles.forEach((f) => {
  const relFromOut = '/' + path.relative(outDir, f).split(path.sep).join('/');
  nextFileLookup[relFromOut] = f;
});

htmlFiles.forEach((htmlPath) => {
  let baseName = path.basename(htmlPath, '.html');
  // Namespace freedom-plan pages so slugs shared with 1% Plan (e.g.
  // godrej-lakeside-orchard) do not collide in the output folder.
  if (htmlPath.includes(`${path.sep}the-freedom-plan${path.sep}`) || htmlPath.endsWith(`${path.sep}the-freedom-plan.html`)) {
    baseName = `freedom-${baseName}`;
  }
  const pageDir = path.join(deliverDir, baseName);

  // Create clean folder structure
  fs.mkdirSync(path.join(pageDir, 'css'), { recursive: true });
  fs.mkdirSync(path.join(pageDir, 'js'), { recursive: true });
  fs.mkdirSync(path.join(pageDir, 'imgs'), { recursive: true });

  let html = fs.readFileSync(htmlPath, 'utf8');

  // --- 1. Extract and copy CSS files, rewrite paths ---
  const cssRefs = new Set();
  html = html.replace(/href="(\/_next\/[^"]+\.css)"/g, (match, ref) => {
    const fileName = path.basename(ref);
    cssRefs.add(ref);
    return `href="css/${fileName}"`;
  });
  cssRefs.forEach((ref) => {
    const src = nextFileLookup[ref] || path.join(outDir, ref);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(pageDir, 'css', path.basename(ref)));
    }
  });

  // --- 1b. Inline globals.css so styles work when opened as file:// ---
  if (globalsCss) {
    html = html.replace('</head>', `<style>${globalsCss}</style>\n</head>`);
  }

  // --- 2. Extract and copy JS files, rewrite paths ---
  const jsRefs = new Set();
  html = html.replace(/src="(\/_next\/[^"]+\.js)"/g, (match, ref) => {
    const fileName = path.basename(ref);
    jsRefs.add(ref);
    return `src="js/${fileName}"`;
  });
  jsRefs.forEach((ref) => {
    const src = nextFileLookup[ref] || path.join(outDir, ref);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(pageDir, 'js', path.basename(ref)));
    }
  });

  // --- 3. Copy images from /assets/ AND /assets_one_percent/ to imgs/, rewrite paths ---
  const imgRefs = new Set();
  html = html.replace(/(src|href)="(\/(assets|assets_one_percent)\/([^"]+))"/g, (match, attr, fullRef, _dir, fileName) => {
    imgRefs.add({ fullRef, fileName });
    return `${attr}="imgs/${fileName}"`;
  });
  imgRefs.forEach(({ fullRef, fileName }) => {
    const src = path.join(outDir, fullRef);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(pageDir, 'imgs', fileName));
    }
  });

  // --- 3b. Copy favicon.ico and rewrite path ---
  const faviconSrc = path.join(outDir, 'favicon.ico');
  if (fs.existsSync(faviconSrc)) {
    fs.copyFileSync(faviconSrc, path.join(pageDir, 'imgs', 'favicon.ico'));
  }
  html = html.replace(/href="\/favicon\.ico"/g, 'href="imgs/favicon.ico"');

  // --- 4. Write index.html ---
  fs.writeFileSync(path.join(pageDir, 'index.html'), html, 'utf8');

  // Clean up empty folders
  ['css', 'js', 'imgs'].forEach((dir) => {
    const d = path.join(pageDir, dir);
    if (fs.existsSync(d) && fs.readdirSync(d).length === 0) {
      fs.rmdirSync(d);
    }
  });

  console.log(`  ✓ ${baseName}/`);
});

console.log(`\n✅ Successfully packaged ${htmlFiles.length} pages into /Deliverables (css/ + js/ + imgs/ + index.html)!`);

const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../out');
const deliverDir = path.join(__dirname, '../Deliverables');

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

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllHtmlFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith('.html')) {
        arrayOfFiles.push(path.join(dirPath, file));
      }
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

console.log(`Found ${htmlFiles.length} pages to package...`);

htmlFiles.forEach(htmlPath => {
  // Get relative path from outDir (e.g. "the-1-percent-plan/projects/godrej-parkshire.html")
  const relativePath = path.relative(outDir, htmlPath);
  // Folder name based on file name (e.g. "godrej-parkshire")
  const baseName = path.basename(htmlPath, '.html');
  
  // Create an isolated folder for this specific page
  const pageDeliverDir = path.join(deliverDir, baseName);
  fs.mkdirSync(pageDeliverDir);
  
  // Create target directory structure for the HTML file inside the isolated folder
  const targetHtmlPath = path.join(pageDeliverDir, relativePath);
  fs.mkdirSync(path.dirname(targetHtmlPath), { recursive: true });
  
  // Copy the specific HTML file
  fs.copyFileSync(htmlPath, targetHtmlPath);
  
  // Copy the required global assets (_next and assets)
  if (fs.existsSync(path.join(outDir, '_next'))) {
    fs.cpSync(path.join(outDir, '_next'), path.join(pageDeliverDir, '_next'), { recursive: true });
  }
  if (fs.existsSync(path.join(outDir, 'assets'))) {
    fs.cpSync(path.join(outDir, 'assets'), path.join(pageDeliverDir, 'assets'), { recursive: true });
  }
});

console.log(`\n✅ Successfully packaged ${htmlFiles.length} isolated pages into the /Deliverables directory!`);

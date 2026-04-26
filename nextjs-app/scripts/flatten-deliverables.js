const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../out');
const deliverDir = path.join(__dirname, '../Deliverables_Flat');

console.log('📦 Starting robust flat page packaging...');

if (!fs.existsSync(outDir)) {
  console.error('❌ out directory not found. Run npm run build first.');
  process.exit(1);
}

if (fs.existsSync(deliverDir)) {
  fs.rmSync(deliverDir, { recursive: true, force: true });
}
fs.mkdirSync(deliverDir);

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

const htmlFiles = getAllHtmlFiles(path.join(outDir, 'the-1-percent-plan'));
const mainPagePath = path.join(outDir, 'the-1-percent-plan.html');
if (fs.existsSync(mainPagePath)) htmlFiles.push(mainPagePath);

console.log(`Found ${htmlFiles.length} pages to flatten...`);

htmlFiles.forEach(htmlPath => {
  let baseName = path.basename(htmlPath, '.html');
  const pageDir = path.join(deliverDir, baseName);
  fs.mkdirSync(pageDir, { recursive: true });
  
  const cssDir = path.join(pageDir, 'css');
  const jsDir = path.join(pageDir, 'js');
  const imgsDir = path.join(pageDir, 'imgs');
  
  fs.mkdirSync(cssDir);
  fs.mkdirSync(jsDir);
  fs.mkdirSync(imgsDir);
  
  let htmlContent = fs.readFileSync(htmlPath, 'utf8');

  // Unified asset processing
  const assetRegex = /(href|src|content)="(\/(_next\/static|assets)\/[^"]+)"/g;
  let match;
  const replacements = [];

  while ((match = assetRegex.exec(htmlContent)) !== null) {
    const fullMatch = match[0];
    const attr = match[1];
    const originalPath = match[2];
    
    let sourceFilePath = path.join(outDir, originalPath);
    sourceFilePath = sourceFilePath.split('?')[0]; // strip query strings
    
    if (fs.existsSync(sourceFilePath)) {
      const fileName = path.basename(sourceFilePath);
      let targetSubDir = 'imgs';
      let relDir = 'imgs';
      
      if (fileName.endsWith('.css')) {
        targetSubDir = 'css'; relDir = 'css';
      } else if (fileName.endsWith('.js')) {
        targetSubDir = 'js'; relDir = 'js';
      }
      
      const destPath = path.join(pageDir, targetSubDir, fileName);
      fs.copyFileSync(sourceFilePath, destPath);
      
      replacements.push({
        old: fullMatch,
        new: `${attr}="./${relDir}/${fileName}"`
      });
    }
  }

  // Apply asset replacements
  replacements.forEach(r => {
    htmlContent = htmlContent.split(r.old).join(r.new);
  });

  // Handle favicon and other root-level icons
  const rootIconRegex = /(href|src)="(\/([^"\/]+\.(ico|svg|png)))"/g;
  while ((match = rootIconRegex.exec(htmlContent)) !== null) {
    const fullMatch = match[0];
    const attr = match[1];
    const fileName = match[3];
    const srcPath = path.join(outDir, fileName);
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, path.join(imgsDir, fileName));
      htmlContent = htmlContent.split(fullMatch).join(`${attr}="./imgs/${fileName}"`);
    }
  }

  // Cleanup Next.js overhead for static viewing
  htmlContent = htmlContent.replace(/<script id="__NEXT_DATA__" type="application\/json">.*?<\/script>/, '');
  htmlContent = htmlContent.replace(/<link rel="preload" href="\/_next\/static\/[^"]+" as="(script|style)"\/?>/g, '');
  
  // Final fix for any remaining /_next links that might have escaped
  htmlContent = htmlContent.replace(/href="\/_next\/static\/chunks\/[^"]+\.css"/g, (m) => m.replace('/_next/static/chunks/', './css/'));
  htmlContent = htmlContent.replace(/src="\/_next\/static\/chunks\/[^"]+\.js"/g, (m) => m.replace('/_next/static/chunks/', './js/'));

  fs.writeFileSync(path.join(pageDir, 'index.html'), htmlContent);
});

console.log(`\n✅ Successfully flattened ${htmlFiles.length} pages!`);

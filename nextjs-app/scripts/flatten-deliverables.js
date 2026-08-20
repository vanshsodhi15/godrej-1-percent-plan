const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../out');
const deliverDir = path.join(__dirname, '../Deliverables_Flat');

// Lead-gen credentials for the 5 active projects
const LEAD_GEN = {
  'godrej-woods':           { projectId: 'a1le200000004y5AAA', adCode: '137714', name: 'Godrej Woods' },
  'godrej-regal-pavilion':  { projectId: 'a1lId000000TOqGIAW', adCode: '137713', name: 'Godrej Regal Pavilion' },
  'godrej-parkshire':       { projectId: 'a1le2000000AOHBAA4', adCode: '137716', name: 'Godrej Parkshire' },
  'godrej-lakeside-orchard':{ projectId: 'a1lId000000TNV0IAO', adCode: '137717', name: 'Godrej Lakeside Orchard' },
  'godrej-azure':           { projectId: 'a1le20000000NflAAE', adCode: '137715', name: 'Godrej Azure' },
};

// Self-contained vanilla JS lead-gen modal — no React/Next.js dependency
// Submission / validation handled by IT
function buildLeadGenScript(lg, projectUrl) {
  return `<script>
(function(){
  var PROJ_ID="${lg.projectId}", AD_CODE="${lg.adCode}", PROJ_URL="${projectUrl}", PROJ_NAME="${lg.name.replace(/"/g,'&quot;')}";
  var shown=false, open=false;

  function injectStyles(){
    var s=document.createElement('style');
    s.textContent=[
      '#lgf-pill{position:fixed;bottom:1.5rem;right:1.5rem;z-index:9998;background:#27262e;color:#fff;border:none;border-radius:999px;padding:.75rem 1.25rem;cursor:pointer;font-size:.875rem;font-weight:600;font-family:inherit;box-shadow:0 4px 16px rgba(0,0,0,.25);display:none;align-items:center;gap:.5rem;letter-spacing:.02em;}',
      '#lgf-modal{position:fixed;bottom:0;right:0;z-index:9999;width:100%;max-width:420px;background:#fff;box-shadow:0 -4px 40px rgba(0,0,0,.18);border-radius:16px 16px 0 0;padding:1.5rem;box-sizing:border-box;font-family:inherit;display:none;}',
      '@media(max-width:480px){#lgf-modal{max-width:100%!important;}}',
      '#lgf-modal label{display:block;font-size:.75rem;font-weight:600;color:#27262e;margin-bottom:.3rem;letter-spacing:.02em;}',
      '#lgf-modal input,#lgf-modal select{width:100%;border:1px solid #e7e7e7;border-radius:4px;padding:.5rem .75rem;font-size:.9375rem;font-family:inherit;color:#141414;background:#fff;box-sizing:border-box;margin-bottom:.75rem;}',
      '#lgf-modal .phone-row{display:flex;gap:.5rem;}',
      '#lgf-modal .phone-row select{width:90px;flex:none;margin-bottom:0;height:2.4375rem;box-sizing:border-box;}',
      '#lgf-modal .phone-row input{flex:1;margin-bottom:.75rem;height:2.4375rem;box-sizing:border-box;}',
      '#lgf-modal .phone-row input[type=tel]{margin-bottom:.75rem;}',
      '#lgf-ferr{color:#c0392b;font-size:.75rem;margin:.0rem 0 .6rem;display:none;}',
      /* field error styles kept for IT to reuse if needed */
      '#lgf-submit{width:100%;background:#27262e;color:#fff;border:none;border-radius:4px;padding:.75rem;font-size:.9375rem;font-weight:600;font-family:inherit;cursor:pointer;letter-spacing:.03em;}',
      '#lgf-submit:disabled{background:#828282;cursor:not-allowed;}',
      '#lgf-success{text-align:center;padding:1.5rem 0;}',
      '#lgf-tag{font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:#948058;margin:0 0 .2rem;}',
      '#lgf-title{font-size:1.0625rem;font-weight:600;color:#27262e;margin:0;line-height:1.3;}',
      '#lgf-sub{font-size:.8125rem;color:#828282;margin:.25rem 0 1rem;}',
      '#lgf-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1rem;}',
      '#lgf-close{background:none;border:none;font-size:1.25rem;cursor:pointer;color:#828282;line-height:1;padding:.25rem;margin-top:-.25rem;}',
      '#lgf-note{font-size:.7rem;color:#828282;margin-top:.6rem;text-align:center;line-height:1.5;}'
    ].join('');
    document.head.appendChild(s);
  }

  function buildModal(){
    var el=document.createElement('div');
    el.id='lgf-modal';
    el.setAttribute('role','dialog');
    el.setAttribute('aria-modal','true');
    el.setAttribute('aria-label','Enquiry form for '+PROJ_NAME);
    el.innerHTML=
      '<div id="lgf-header">'+
        '<div>'+
          '<p id="lgf-tag">Godrej Properties</p>'+
          '<h2 id="lgf-title">'+PROJ_NAME+'</h2>'+
          '<p id="lgf-sub">Get details, pricing &amp; callback</p>'+
        '</div>'+
        '<button id="lgf-close" aria-label="Close enquiry form">\u2715</button>'+
      '</div>'+
      '<div id="lgf-body">'+
        '<label for="lgf-name">Full Name *</label>'+
        '<input id="lgf-name" type="text" placeholder="e.g. Rahul Sharma" autocomplete="name"/>'+
        '<label for="lgf-em">Email *</label>'+
        '<input id="lgf-em" type="email" placeholder="name@example.com" autocomplete="email"/>'+
        '<div id="lgf-em-err" class="lgf-fe"></div>'+
        /* field error divs kept for IT to wire up */
        '<label for="lgf-ph">Mobile *</label>'+
        '<div class="phone-row">'+
          '<select id="lgf-cc" aria-label="Country code">'+
            '<option value="+91">\ud83c\uddee\ud83c\uddf3 +91</option>'+
            '<option value="+1">\ud83c\uddfa\ud83c\uddf8 +1</option>'+
            '<option value="+44">\ud83c\uddec\ud83c\udde7 +44</option>'+
            '<option value="+971">\ud83c\udde6\ud83c\uddea +971</option>'+
            '<option value="+65">\ud83c\uddf8\ud83c\uddec +65</option>'+
          '</select>'+
          '<input id="lgf-ph" type="tel" inputmode="numeric" placeholder="9876543210" autocomplete="tel-national"/>'+
        '</div>'+
        '<div id="lgf-ph-err" class="lgf-fe"></div>'+
        /* error banner kept for IT */
        '<button id="lgf-submit" type="button">Get a Callback</button>'+
        '<p id="lgf-note">By submitting, you agree to be contacted by Godrej Properties. T&amp;C apply.</p>'+
      '</div>'+
      '<div id="lgf-success" style="display:none">'+
        '<div style="font-size:2.5rem;margin-bottom:.75rem">\u2705</div>'+
        '<h3 style="color:#27262e;margin:0 0 .5rem">Thank you!</h3>'+
        '<p style="color:#828282;font-size:.9375rem;margin:0">A Godrej Properties advisor will reach out shortly.</p>'+
        '<button onclick="closeModal()" style="margin-top:1.25rem;background:#27262e;color:#fff;border:none;border-radius:4px;padding:.6rem 1.5rem;cursor:pointer;font-family:inherit;font-weight:600;font-size:.875rem;">Close</button>'+
      '</div>';
    document.body.appendChild(el);

    document.getElementById('lgf-close').addEventListener('click', closeModal);
    document.getElementById('lgf-submit').addEventListener('click', submitForm);
  }

  function buildPill(){
    var el=document.createElement('button');
    el.id='lgf-pill';
    el.setAttribute('aria-label','Open enquiry form');
    el.innerHTML='\ud83d\udcac Enquire';
    el.addEventListener('click', openModal);
    document.body.appendChild(el);
  }

  function openModal(){
    document.getElementById('lgf-modal').style.display='block';
    document.getElementById('lgf-pill').style.display='none';
    open=true;
    var n=document.getElementById('lgf-name');
    if(n) setTimeout(function(){n.focus();},50);
  }

  function closeModal(){
    document.getElementById('lgf-modal').style.display='none';
    if(shown){
      var pill=document.getElementById('lgf-pill');
      pill.style.display='flex';
    }
    open=false;
  }

  function submitForm(){
    // Submission / validation handled by IT
    document.getElementById('lgf-body').style.display='none';
    document.getElementById('lgf-success').style.display='block';
  }

  // Expose closeModal globally for the success button onclick
  window.closeModal=closeModal;

  injectStyles();
  buildModal();
  buildPill();

  // Show after 5 s
  setTimeout(function(){
    shown=true;
    openModal();
  }, 5000);
})();
</script>`;
}


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

// Also include Freedom Payment Plan (20:80) pages
const freedomFiles = getAllHtmlFiles(path.join(outDir, 'the-freedom-plan'));
freedomFiles.forEach((f) => htmlFiles.push(f));
const freedomHubPath = path.join(outDir, 'the-freedom-plan.html');
if (fs.existsSync(freedomHubPath)) htmlFiles.push(freedomHubPath);

console.log(`Found ${htmlFiles.length} pages to flatten...`);

htmlFiles.forEach(htmlPath => {
  let baseName = path.basename(htmlPath, '.html');
  // Namespace freedom-plan pages so their slug (e.g. godrej-lakeside-orchard)
  // does not collide with an identically-slugged 1% plan page.
  if (htmlPath.includes(`${path.sep}the-freedom-plan${path.sep}`) || htmlPath.endsWith(`${path.sep}the-freedom-plan.html`)) {
    baseName = `freedom-${baseName}`;
  }
  const pageDir = path.join(deliverDir, baseName);
  fs.mkdirSync(pageDir, { recursive: true });
  
  const cssDir = path.join(pageDir, 'css');
  const jsDir = path.join(pageDir, 'js');
  const imgsDir = path.join(pageDir, 'imgs');
  
  fs.mkdirSync(cssDir, { recursive: true });
  fs.mkdirSync(jsDir, { recursive: true });
  fs.mkdirSync(imgsDir, { recursive: true });
  
  let htmlContent = fs.readFileSync(htmlPath, 'utf8');

  // Unified asset processing
  const assetRegex = /(href|src|content)="(\/(_next\/static|assets|assets_one_percent|assets_freedom)\/[^"]+)"/g;
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

  // Inject self-contained vanilla JS lead-gen form for the 5 active projects
  if (LEAD_GEN[baseName]) {
    const projectUrl = 'https://www.godrejproperties.com/the-1-percent-plan/projects/' + baseName;
    const script = buildLeadGenScript(LEAD_GEN[baseName], projectUrl);
    htmlContent = htmlContent.replace('</body>', script + '\n</body>');
  }

  fs.writeFileSync(path.join(pageDir, 'index.html'), htmlContent);
});

console.log(`\n✅ Successfully flattened ${htmlFiles.length} pages!`);

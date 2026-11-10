const articleUrl = document.querySelector('link[rel="canonical"]').href;
const articleTitle = document.querySelector('h1').textContent;
const shareStatus = document.querySelector('article output');

async function shareArticle(copyOnly) {
  try {
    if (!copyOnly && navigator.share) await navigator.share({ title: articleTitle, url: articleUrl });
    else {
      await navigator.clipboard.writeText(articleUrl);
      shareStatus.textContent = 'Link copied';
    }
  } catch (error) {
    if (error.name !== 'AbortError') shareStatus.textContent = 'Sharing unavailable. Please use the email link.';
  }
}

document.querySelector('button[aria-label="Share article"]').addEventListener('click', () => shareArticle(false));
document.querySelector('button[aria-label="Copy article link"]').addEventListener('click', () => shareArticle(true));
function openFaq(id) {
  const element = document.getElementById(id);
  if (element instanceof HTMLDetailsElement) element.open = true;
}
for (const link of document.querySelectorAll('nav[aria-label="Article contents"] a[href^="#faq"]')) {
  link.addEventListener('click', () => openFaq(link.hash.slice(1)));
}
window.addEventListener('hashchange', () => openFaq(window.location.hash.slice(1)));
openFaq(window.location.hash.slice(1));
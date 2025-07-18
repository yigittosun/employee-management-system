import { translations } from './translations.js';

let currentLang = detectLang();
const listeners = new Set();

function detectLang() {
  const raw = (document.documentElement.lang || navigator.language || 'en').toLowerCase();
  return raw.startsWith('tr') ? 'tr' : 'en';
}

export function getLang() {
  return currentLang;
}

export function setLang(lang) {
  const next = lang === 'tr' ? 'tr' : 'en';
  if (next !== currentLang) {
    currentLang = next;
    listeners.forEach(fn => fn(currentLang));
  }
}

export function subscribeLang(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function t(path, vars) {
  const parts = path.split('.');
  let node = translations[currentLang] || translations.en;
  for (const p of parts) {
    node = node?.[p];
    if (node == null) break;
  }
  if (node == null) {
    node = parts.reduce((n, p) => n?.[p], translations.en);
  }
  if (typeof node !== 'string') return path; 
  if (vars) {
    return node.replace(/\{(\\w+)\\}/g, (_, k) => (k in vars ? vars[k] : `{${k}}`));
  }
  return node;
}

const mo = new MutationObserver(muts => {
  for (const m of muts) {
    if (m.attributeName === 'lang') setLang(detectLang());
  }
});
mo.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

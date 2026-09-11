function inferModule(cat) {
  const c = String(cat || '').toLowerCase();
  if (c.includes('dos')) return 'dos';
  if (c.includes('rgpd')) return 'rgpd';
  if (c.includes('hash')) return 'cyber';
  if (c.includes('php')) return 'php';
  if (c.includes('java')) return 'java';
  if (c.includes('mcd')) return 'mcd';
  if (c.includes('cejm')) return 'cejm';
  if (c.includes('réseau') || c.includes('reseau') || c.includes('dns')) return 'reseau';
  if (c.includes('maths')) return 'maths';
  if (c.includes('anglais')) return 'english';
  return 'other';
}

const FIRST_SAFE = Array.isArray(window.FIRST_YEAR_ORIGINAL) ? window.FIRST_YEAR_ORIGINAL : [];
const CEJM_SAFE = Array.isArray(window.CEJM_DETAILED) ? window.CEJM_DETAILED : [];
const EXTRA_SAFE = Array.isArray(window.EXTRA_QUESTIONS) ? window.EXTRA_QUESTIONS : [];
const SQL1_SAFE = Array.isArray(window.SQL_FIRST_YEAR_QUESTIONS) ? window.SQL_FIRST_YEAR_QUESTIONS : [];
const SECOND_SAFE = Array.isArray(window.SECOND_YEAR_QUESTIONS) ? window.SECOND_YEAR_QUESTIONS : [];
const SQL2_SAFE = Array.isArray(window.SQL_SECOND_YEAR_QUESTIONS) ? window.SQL_SECOND_YEAR_QUESTIONS : [];

const ORIGINAL_NORMALIZED = FIRST_SAFE.map((q) => ({
  year: 1,
  module: inferModule(q.cat),
  cat: q.cat,
  type: 'mcq',
  q: q.q,
  opts: q.opts,
  answer: q.a,
  exp: q.exp,
}));

const CEJM_NORMALIZED = CEJM_SAFE.map((q) => ({
  ...q,
  year: 1,
  module: 'cejm',
  cat: '📊 CEJM — chapitre ' + q.chapter,
}));

window.QUIZ_DATA = [
  ...ORIGINAL_NORMALIZED,
  ...CEJM_NORMALIZED,
  ...EXTRA_SAFE,
  ...SQL1_SAFE,
  ...SECOND_SAFE,
  ...SQL2_SAFE,
];

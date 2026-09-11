function inferModule(cat){
 const c=String(cat||'').toLowerCase();
 if(c.includes('dos'))return'dos'; if(c.includes('rgpd'))return'rgpd'; if(c.includes('hash'))return'cyber';
 if(c.includes('php'))return'php'; if(c.includes('java'))return'java'; if(c.includes('mcd'))return'mcd';
 if(c.includes('cejm'))return'cejm'; if(c.includes('réseau')||c.includes('reseau')||c.includes('dns'))return'reseau';
 if(c.includes('maths'))return'maths'; if(c.includes('anglais'))return'english'; return'other';
}

/*
 * Chargement défensif : une banque défectueuse ne doit jamais rendre
 * l'intégralité du quiz inutilisable. Les autres séries restent disponibles.
 */
const FIRST_SAFE = typeof FIRST_YEAR_ORIGINAL !== 'undefined' && Array.isArray(FIRST_YEAR_ORIGINAL) ? FIRST_YEAR_ORIGINAL : [];
const CEJM_SAFE = typeof CEJM_DETAILED !== 'undefined' && Array.isArray(CEJM_DETAILED) ? CEJM_DETAILED : [];
const EXTRA_SAFE = typeof EXTRA_QUESTIONS !== 'undefined' && Array.isArray(EXTRA_QUESTIONS) ? EXTRA_QUESTIONS : [];
const SQL1_SAFE = typeof SQL_FIRST_YEAR_QUESTIONS !== 'undefined' && Array.isArray(SQL_FIRST_YEAR_QUESTIONS) ? SQL_FIRST_YEAR_QUESTIONS : [];
const SECOND_SAFE = typeof SECOND_YEAR_QUESTIONS !== 'undefined' && Array.isArray(SECOND_YEAR_QUESTIONS) ? SECOND_YEAR_QUESTIONS : [];
const SQL2_SAFE = typeof SQL_SECOND_YEAR_QUESTIONS !== 'undefined' && Array.isArray(SQL_SECOND_YEAR_QUESTIONS) ? SQL_SECOND_YEAR_QUESTIONS : [];

const ORIGINAL_NORMALIZED = FIRST_SAFE.map(q=>({year:1,module:inferModule(q.cat),cat:q.cat,type:'mcq',q:q.q,opts:q.opts,answer:q.a,exp:q.exp}));
const CEJM_NORMALIZED = CEJM_SAFE.map(q=>({...q,year:1,module:'cejm',cat:'📊 CEJM — chapitre '+q.chapter}));
const QUIZ_DATA = window.QUIZ_DATA = [...ORIGINAL_NORMALIZED,...CEJM_NORMALIZED,...EXTRA_SAFE,...SQL1_SAFE,...SECOND_SAFE,...SQL2_SAFE];

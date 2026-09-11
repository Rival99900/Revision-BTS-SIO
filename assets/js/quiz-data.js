function inferModule(cat){
 const c=String(cat||'').toLowerCase();
 if(c.includes('dos'))return'dos'; if(c.includes('rgpd'))return'rgpd'; if(c.includes('hash'))return'cyber';
 if(c.includes('php'))return'php'; if(c.includes('java'))return'java'; if(c.includes('mcd'))return'mcd';
 if(c.includes('cejm'))return'cejm'; if(c.includes('réseau')||c.includes('reseau')||c.includes('dns'))return'reseau';
 if(c.includes('maths'))return'maths'; if(c.includes('anglais'))return'english'; return'other';
}
const ORIGINAL_NORMALIZED = FIRST_YEAR_ORIGINAL.map(q=>({year:1,module:inferModule(q.cat),cat:q.cat,type:'mcq',q:q.q,opts:q.opts,answer:q.a,exp:q.exp}));
const CEJM_NORMALIZED = CEJM_DETAILED.map(q=>({...q,year:1,module:'cejm',cat:'📊 CEJM — chapitre '+q.chapter}));
const QUIZ_DATA = [...ORIGINAL_NORMALIZED,...CEJM_NORMALIZED,...EXTRA_QUESTIONS,...SQL_FIRST_YEAR_QUESTIONS,...SECOND_YEAR_QUESTIONS,...SQL_SECOND_YEAR_QUESTIONS];

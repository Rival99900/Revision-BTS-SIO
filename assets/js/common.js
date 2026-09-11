function goChapter(sel){if(sel&&sel.value)location.href=sel.value}

function showSub(mod,id,btn){
  const pref=mod+'-';
  document.querySelectorAll('[id^="'+pref+'"]').forEach(e=>e.classList.remove('a'));
  document.querySelectorAll('.sb').forEach(b=>b.classList.remove('a'));
  const target=document.getElementById(pref+id); if(target) target.classList.add('a');
  if(btn) btn.classList.add('a');
}
function printPage(){window.print()}
function setReviewed(id){
  const k='bts-review-'+id, done=localStorage.getItem(k)==='1';
  localStorage.setItem(k,done?'0':'1'); refreshReview(id);
}
function refreshReview(id){
  const b=document.getElementById('reviewBtn'); if(!b)return;
  const done=localStorage.getItem('bts-review-'+id)==='1';
  b.textContent=done?'✓ Révisé':'○ Marquer révisé';
  b.classList.toggle('done',done);
}
function filterYear(year,btn){
  document.querySelectorAll('.yearbtn').forEach(b=>b.classList.remove('active')); btn.classList.add('active');
  document.querySelectorAll('[data-year-section]').forEach(s=>{s.style.display=(year==='all'||s.dataset.yearSection===year)?'block':'none'});
}
document.addEventListener('DOMContentLoaded',()=>{const bodyId=document.body.dataset.reviewId||document.body.dataset.chapter;if(bodyId)refreshReview(bodyId)});

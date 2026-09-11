function goChapter(sel) {
  if (sel && sel.value) {
    location.href = sel.value;
  }
}

function showSub(mod, id, btn) {
  const prefix = `${mod}-`;

  document.querySelectorAll(`[id^="${prefix}"]`).forEach((element) => {
    element.classList.remove('a');
  });

  document.querySelectorAll('.sb').forEach((button) => {
    button.classList.remove('a');
  });

  const target = document.getElementById(prefix + id);
  if (target) {
    target.classList.add('a');
  }

  if (btn) {
    btn.classList.add('a');
  }
}

function printPage() {
  window.print();
}

function setReviewed(id) {
  const key = `bts-review-${id}`;
  const done = localStorage.getItem(key) === '1';
  localStorage.setItem(key, done ? '0' : '1');
  refreshReview(id);
}

function refreshReview(id) {
  const button = document.getElementById('reviewBtn');
  if (!button) return;

  const done = localStorage.getItem(`bts-review-${id}`) === '1';
  button.textContent = done ? '✓ Révisé' : '○ Marquer révisé';
  button.classList.toggle('done', done);
}

function filterYear(year, btn) {
  document.querySelectorAll('.yearbtn').forEach((button) => {
    button.classList.remove('active');
  });

  if (btn) {
    btn.classList.add('active');
  }

  document.querySelectorAll('[data-year-section]').forEach((section) => {
    section.style.display = year === 'all' || section.dataset.yearSection === year
      ? 'block'
      : 'none';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const bodyId = document.body.dataset.reviewId || document.body.dataset.chapter;
  if (bodyId) {
    refreshReview(bodyId);
  }
});

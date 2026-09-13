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

function enhanceResponsiveTables() {
  document.querySelectorAll('table').forEach((table) => {
    if (table.dataset.responsiveReady === '1') return;
    table.dataset.responsiveReady = '1';

    const rows = Array.from(table.rows || []);
    if (!rows.length) return;

    const maxColumns = rows.reduce((max, row) => {
      const count = Array.from(row.cells || []).reduce((sum, cell) => sum + (Number(cell.colSpan) || 1), 0);
      return Math.max(max, count);
    }, 0);

    table.classList.add('responsive-table');

    let wrapper = table.closest('.table-scroll');
    if (!wrapper && !table.classList.contains('truth-table')) {
      wrapper = document.createElement('div');
      wrapper.className = 'table-scroll';
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    }

    const compact = maxColumns <= 3 && !table.classList.contains('truth-table');
    if (wrapper) {
      wrapper.classList.toggle('is-compact', compact);
      wrapper.classList.toggle('is-wide', !compact);
    }

    if (!compact) return;

    const headerRow = rows.find((row) => row.querySelector('th')) || rows[0];
    const headers = Array.from(headerRow.cells || []).map((cell, index) => {
      const label = cell.textContent.replace(/\s+/g, ' ').trim();
      return label || `Colonne ${index + 1}`;
    });

    headerRow.classList.add('responsive-header-row');

    rows.forEach((row) => {
      if (row === headerRow) return;
      Array.from(row.cells || []).forEach((cell, index) => {
        if (cell.tagName === 'TD' && !cell.dataset.label) {
          cell.dataset.label = headers[index] || `Colonne ${index + 1}`;
        }
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', enhanceResponsiveTables);

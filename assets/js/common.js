function goChapter(sel) {
  if (sel && sel.value) {
    location.href = sel.value;
  }
}

function parseShowSubButton(button) {
  const source = button?.getAttribute('onclick') || '';
  const match = source.match(/showSub\(\s*['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]/);
  return match ? { prefix: match[1], id: match[2] } : null;
}

function tabButtonForSection(prefix, id, stepper = null) {
  const buttons = Array.from(document.querySelectorAll('.stabs .sb'));
  const direct = buttons.find((button) => {
    const parsed = parseShowSubButton(button);
    return parsed?.prefix === prefix && parsed.id === id;
  });
  if (direct) return direct;

  const parentId = stepper?.dataset.parentSection || '';
  if (parentId) {
    return buttons.find((button) => {
      const parsed = parseShowSubButton(button);
      return parsed?.prefix === prefix && parsed.id === parentId;
    }) || null;
  }
  return null;
}

function activeSectionId(prefix, ids = []) {
  const known = ids.find((id) => document.getElementById(`${prefix}-${id}`)?.classList.contains('a'));
  if (known) return known;
  const active = Array.from(document.querySelectorAll(`[id^="${prefix}-"].sc.a`))[0];
  return active ? active.id.slice(prefix.length + 1) : '';
}

function placeSectionStepper(prefix) {
  const stepper = document.querySelector(`.section-stepper[data-prefix="${prefix}"]`);
  if (!stepper) return;
  const ids = (stepper.dataset.sections || '').split(',').map((value) => value.trim()).filter(Boolean);
  const id = activeSectionId(prefix, ids);
  const target = id ? document.getElementById(`${prefix}-${id}`) : null;
  if (!target || target.nextElementSibling === stepper) return;
  target.insertAdjacentElement('afterend', stepper);
}

function updateSectionSteppers(prefix) {
  document.querySelectorAll(`.section-stepper[data-prefix="${prefix}"]`).forEach((stepper) => {
    const ids = (stepper.dataset.sections || '').split(',').map((value) => value.trim()).filter(Boolean);
    if (!ids.length) return;

    const currentId = activeSectionId(prefix, ids) || ids[0];
    let index = ids.indexOf(currentId);
    if (index < 0) index = 0;

    const status = stepper.querySelector('.step-status');
    if (status) status.textContent = `${index + 1} / ${ids.length}`;

    const prev = stepper.querySelector('.step-prev');
    const next = stepper.querySelector('.step-next');
    if (prev) prev.disabled = index === 0;
    if (next) next.disabled = index === ids.length - 1 && !stepper.dataset.endTarget;

    placeSectionStepper(prefix);
  });
}

function showSub(mod, id, btn) {
  const prefix = `${mod}-`;

  document.querySelectorAll(`[id^="${prefix}"]`).forEach((element) => {
    if (element.classList.contains('sc')) element.classList.remove('a');
  });

  document.querySelectorAll('.stabs .sb').forEach((button) => {
    const parsed = parseShowSubButton(button);
    if (parsed?.prefix === mod) button.classList.remove('a');
  });

  const target = document.getElementById(prefix + id);
  if (target) target.classList.add('a');

  const stepper = document.querySelector(`.section-stepper[data-prefix="${mod}"]`);
  const activeButton = btn || tabButtonForSection(mod, id, stepper);
  if (activeButton) activeButton.classList.add('a');

  updateSectionSteppers(mod);
}

function buildSectionStepper(prefix, ids) {
  const wrapper = document.createElement('div');
  wrapper.className = 'section-stepper section-stepper-auto';
  wrapper.dataset.prefix = prefix;
  wrapper.dataset.sections = ids.join(',');

  const prev = document.createElement('button');
  prev.className = 'smallbtn step-prev';
  prev.type = 'button';
  prev.textContent = '← Précédent';
  prev.addEventListener('click', () => stepSection(prev, -1));

  const status = document.createElement('span');
  status.className = 'step-status';
  status.setAttribute('aria-live', 'polite');
  status.textContent = `1 / ${ids.length}`;

  const next = document.createElement('button');
  next.className = 'smallbtn alt step-next';
  next.type = 'button';
  next.textContent = 'Suivant →';
  next.addEventListener('click', () => stepSection(next, 1));

  wrapper.append(prev, status, next);
  return wrapper;
}

function initSectionSteppers() {
  document.querySelectorAll('.stabs').forEach((tabs) => {
    const groups = new Map();
    tabs.querySelectorAll('.sb').forEach((button) => {
      const parsed = parseShowSubButton(button);
      if (!parsed) return;
      if (!groups.has(parsed.prefix)) groups.set(parsed.prefix, []);
      const ids = groups.get(parsed.prefix);
      if (!ids.includes(parsed.id)) ids.push(parsed.id);
    });

    groups.forEach((ids, prefix) => {
      if (ids.length < 2) return;
      let stepper = document.querySelector(`.section-stepper[data-prefix="${prefix}"]`);
      if (!stepper) {
        stepper = buildSectionStepper(prefix, ids);
        tabs.insertAdjacentElement('afterend', stepper);
      } else if (!stepper.dataset.sections) {
        stepper.dataset.sections = ids.join(',');
      }
      updateSectionSteppers(prefix);
    });
  });
}

function stepSection(button, direction) {
  const stepper = button?.closest('.section-stepper');
  if (!stepper) return;

  const prefix = stepper.dataset.prefix;
  const ids = (stepper.dataset.sections || '').split(',').map((value) => value.trim()).filter(Boolean);
  if (!prefix || !ids.length) return;

  const currentId = activeSectionId(prefix, ids) || ids[0];
  let index = ids.indexOf(currentId);
  if (index < 0) index = 0;

  let targetId = '';
  if (direction > 0 && index === ids.length - 1 && stepper.dataset.endTarget) {
    targetId = stepper.dataset.endTarget;
  } else {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= ids.length) return;
    targetId = ids[nextIndex];
  }

  const tabButton = tabButtonForSection(prefix, targetId, stepper);
  showSub(prefix, targetId, tabButton);

  window.requestAnimationFrame(() => {
    document.getElementById(`${prefix}-${targetId}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
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

  if (btn) btn.classList.add('active');

  document.querySelectorAll('[data-year-section]').forEach((section) => {
    section.style.display = year === 'all' || section.dataset.yearSection === year ? 'block' : 'none';
  });
}

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

    const hasMergedCells = rows.some((row) =>
      Array.from(row.cells || []).some((cell) =>
        (Number(cell.colSpan) || 1) > 1 || (Number(cell.rowSpan) || 1) > 1
      )
    );

    const headerCellCount = (rows.find((row) => row.querySelector('th')) || rows[0]).cells.length;
    const compact = maxColumns <= 3
      && !hasMergedCells
      && headerCellCount === maxColumns
      && !table.classList.contains('truth-table');

    if (wrapper) {
      wrapper.classList.toggle('is-compact', compact);
      wrapper.classList.toggle('is-wide', !compact);

      if (!compact) {
        const minWidth = Math.max(560, Math.min(980, maxColumns * 150));
        wrapper.style.setProperty('--responsive-table-min', `${minWidth}px`);
      } else {
        wrapper.style.removeProperty('--responsive-table-min');
      }
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

/*
 * Certaines anciennes fiches contiennent encore un libellé de section en texte
 * brut juste avant le panneau correspondant (ex. "ENTREPRISE", "DHCP").
 * Ces libellés provenaient de l'ancien HTML monolithique et s'affichaient hors
 * du système d'onglets. On ne supprime que les nœuds texte qui correspondent à
 * ce cas précis afin de ne toucher à aucun contenu pédagogique normal.
 */
function removeStraySectionLabels() {
  document.querySelectorAll('main.panel, main.page-panel').forEach((main) => {
    Array.from(main.childNodes).forEach((node) => {
      if (node.nodeType !== Node.TEXT_NODE) return;

      const label = String(node.textContent || '').replace(/\s+/g, ' ').trim();
      if (!label) return;

      const next = node.nextElementSibling;
      if (!next?.classList.contains('sc')) return;

      const looksLikeSectionLabel = label.length <= 80
        && /^[A-ZÀ-ÖØ-Þ0-9][A-ZÀ-ÖØ-Þ0-9 &/'’+\-]*$/.test(label);

      if (looksLikeSectionLabel) node.remove();
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const bodyId = document.body.dataset.reviewId || document.body.dataset.chapter;
  if (bodyId) refreshReview(bodyId);
  removeStraySectionLabels();
  enhanceResponsiveTables();
  initSectionSteppers();
});

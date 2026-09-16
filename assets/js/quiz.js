let activeQ = [];
let cur = 0;
let score = 0;
let answered = false;
let yearFilter = 'all';
let moduleFilter = 'all';
let typeFilter = 'all';
let chapterFilter = 'all';

function norm(s) {
  return String(s ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/[^a-z0-9%+\- ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function shuffle(a) {
  return [...a].sort(() => Math.random() - 0.5);
}

function getQuizData() {
  return Array.isArray(window.QUIZ_DATA) ? window.QUIZ_DATA : [];
}

function updateModuleFilterVisibility() {
  const available = new Set(
    getQuizData()
      .filter((q) => yearFilter === 'all' || String(q.year) === String(yearFilter))
      .map((q) => q.module)
  );

  document.querySelectorAll('[data-filter-module]').forEach((button) => {
    const value = button.dataset.filterModule;
    button.hidden = !(value === 'all' || available.has(value));
  });

  if (moduleFilter !== 'all' && !available.has(moduleFilter)) {
    moduleFilter = 'all';
    document.querySelectorAll('[data-filter-module]').forEach((button) => {
      button.classList.toggle('active', button.dataset.filterModule === 'all');
    });
  }
}

function setFilter(kind, value, btn) {
  if (kind === 'year') {
    yearFilter = value;
    updateModuleFilterVisibility();
  } else if (kind === 'module') {
    moduleFilter = value;
  } else {
    typeFilter = value;
  }

  const selector = kind === 'year'
    ? '[data-filter-year]'
    : kind === 'module'
      ? '[data-filter-module]'
      : '[data-filter-type]';

  document.querySelectorAll(selector).forEach((item) => item.classList.remove('active'));
  if (btn) btn.classList.add('active');
  restart();
}

function buildActive() {
  activeQ = getQuizData().filter((q) => (
    (yearFilter === 'all' || String(q.year) === String(yearFilter))
    && (moduleFilter === 'all' || q.module === moduleFilter)
    && (typeFilter === 'all' || q.type === typeFilter)
    && (chapterFilter === 'all' || String(q.chapter) === String(chapterFilter))
  ));

  activeQ = shuffle(activeQ);
}

function updateStats() {
  document.getElementById('sv').textContent = score;
  document.getElementById('tv').textContent = cur;

  const pct = cur ? Math.round((score / cur) * 100) : 0;
  document.getElementById('pctv').textContent = cur ? `${pct}%` : '-';
  document.getElementById('plb').textContent = `PROGRESSION : ${cur} / ${activeQ.length}`;
  document.getElementById('pfb').style.width = `${activeQ.length ? (cur / activeQ.length) * 100 : 0}%`;
  document.getElementById('count').textContent = `${activeQ.length} questions`;
}

function render() {
  if (cur >= activeQ.length) {
    showResults();
    return;
  }

  answered = false;
  const q = activeQ[cur];

  document.getElementById('qno').textContent = `QUESTION ${String(cur + 1).padStart(2, '0')} / ${activeQ.length}`;
  document.getElementById('qcat').textContent = `${q.year === 1 ? '1RE' : '2E'} • ${q.cat}`;
  document.getElementById('qtype').textContent = q.type === 'mcq'
    ? 'QCM — CLIQUEZ'
    : 'SAISIE — TAPEZ LA RÉPONSE';
  document.getElementById('qtxt').innerHTML = q.q;

  const area = document.getElementById('answerArea');
  area.innerHTML = '';

  if (q.type === 'mcq') {
    const opts = document.createElement('div');
    opts.className = 'opts';
    const letters = ['A', 'B', 'C', 'D'];

    q.opts.forEach((option, index) => {
      const button = document.createElement('button');
      button.className = 'ob';
      button.innerHTML = `<span class="ol">${letters[index]}.</span><span>${option}</span>`;
      button.onclick = () => answerMCQ(index, button);
      opts.appendChild(button);
    });

    area.appendChild(opts);
  } else {
    const wrap = document.createElement('div');
    wrap.className = 'text-answer';

    const isSentenceExample = q.validator?.type === 'exampleSentence';
    const input = document.createElement(isSentenceExample ? 'textarea' : 'input');
    input.id = 'textInput';
    input.autocomplete = 'off';
    if (isSentenceExample) {
      input.rows = 4;
      input.placeholder = `Écrivez une phrase d’au moins ${q.validator.minWords || 10} mots avec « ${q.validator.label || 'le mot demandé'} »…`;
      input.setAttribute('aria-label', 'Phrase d’exemple');
    } else {
      input.placeholder = 'Tapez votre réponse ici…';
    }

    const button = document.createElement('button');
    button.className = 'validate';
    button.textContent = 'VALIDER';
    button.onclick = () => answerText(input.value);

    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') answerText(input.value);
    });

    wrap.append(input, button);
    area.appendChild(wrap);

    if (isSentenceExample) {
      const helper = document.createElement('div');
      helper.className = 'text-answer-hint';
      helper.textContent = `Minimum ${q.validator.minWords || 10} mots • utilisez le mot demandé dans une phrase complète.`;
      area.appendChild(helper);
    }

    setTimeout(() => input.focus(), 50);
  }

  const fb = document.getElementById('fb');
  fb.className = 'fb';
  fb.innerHTML = '';
  document.getElementById('next').classList.remove('show');
}

function feedback(ok, exp) {
  const fb = document.getElementById('fb');
  const explanation = String(exp ?? '').trim();
  fb.className = `fb ${ok ? 'good' : 'bad'} show`;
  fb.innerHTML = `
    <div class="fb-result">
      <span class="fb-icon" aria-hidden="true">${ok ? '✓' : '!'}</span>
      <strong>${ok ? 'Bonne réponse' : 'Réponse à revoir'}</strong>
    </div>
    <div class="fb-course">
      <span class="fb-course-label">EXPLICATION</span>
      <div class="fb-course-text">${explanation}</div>
    </div>
  `;
  document.getElementById('next').classList.add('show');
  updateStats();
}

function answerMCQ(index, button) {
  if (answered) return;

  answered = true;
  const q = activeQ[cur];
  document.querySelectorAll('.ob').forEach((item) => {
    item.disabled = true;
  });

  const ok = index === q.answer;
  if (ok) {
    score += 1;
    button.classList.add('correct');
  } else {
    button.classList.add('wrong');
    document.querySelectorAll('.ob')[q.answer]?.classList.add('correct');
  }

  feedback(ok, q.exp);
}

function textCorrect(q, value) {
  const normalizedValue = norm(value);
  if (!normalizedValue) return false;

  if (q.validator?.type === 'exampleSentence') {
    const minWords = Number(q.validator.minWords || 10);
    const wordCount = normalizedValue.split(' ').filter(Boolean).length;
    const roots = Array.isArray(q.validator.roots) ? q.validator.roots.map(norm).filter(Boolean) : [];
    const hasRequestedWord = roots.some((root) => normalizedValue.split(' ').some((word) => word.startsWith(root)));
    return wordCount >= minWords && hasRequestedWord;
  }

  if (q.answers && q.answers.some((answer) => norm(answer) === normalizedValue)) {
    return true;
  }

  if (q.keywords) {
    return q.keywords.every((keyword) => normalizedValue.includes(norm(keyword)));
  }

  return false;
}

function answerText(value) {
  if (answered) return;

  const q = activeQ[cur];
  const input = document.getElementById('textInput');

  if (!value.trim()) {
    input.focus();
    return;
  }

  answered = true;
  input.disabled = true;
  document.querySelector('.validate').disabled = true;

  const ok = textCorrect(q, value);
  if (ok) {
    score += 1;
    input.style.borderColor = 'var(--green)';
    input.style.color = 'var(--green)';
  } else {
    input.style.borderColor = 'var(--red)';
    input.style.color = 'var(--red)';
  }

  feedback(ok, q.exp);
}

function nextQ() {
  cur += 1;
  updateStats();
  render();
}

function showResults() {
  document.getElementById('qbox').style.display = 'none';
  const results = document.getElementById('results');
  results.classList.add('show');

  const pct = activeQ.length ? Math.round((score / activeQ.length) * 100) : 0;
  document.getElementById('rs').textContent = `${score} / ${activeQ.length}`;
  document.getElementById('rs').style.color = pct >= 75
    ? 'var(--green)'
    : pct >= 50
      ? 'var(--amber)'
      : 'var(--red)';

  document.getElementById('rmsg').textContent = activeQ.length === 0
    ? 'Aucune question pour ce filtre.'
    : pct >= 85
      ? `${pct}% — Très bonne maîtrise.`
      : pct >= 65
        ? `${pct}% — Bon niveau, revoyez les erreurs.`
        : pct >= 45
          ? `${pct}% — Reprenez les fiches ciblées.`
          : `${pct}% — Recommencez matière par matière.`;
}

function restart() {
  cur = 0;
  score = 0;
  answered = false;
  buildActive();

  document.getElementById('qbox').style.display = 'block';
  document.getElementById('results').classList.remove('show');
  updateStats();

  if (activeQ.length) {
    render();
  } else {
    showResults();
  }
}

function activateFromQuery() {
  const params = new URLSearchParams(location.search);
  const year = params.get('year');
  const module = params.get('module');
  const type = params.get('type');
  const chapter = params.get('chapter');

  if (year) {
    yearFilter = year;
    document.querySelectorAll('[data-filter-year]').forEach((button) => {
      button.classList.toggle('active', button.dataset.filterYear === year);
    });
  }

  if (module) {
    moduleFilter = module;
    document.querySelectorAll('[data-filter-module]').forEach((button) => {
      button.classList.toggle('active', button.dataset.filterModule === module);
    });
  }

  if (type) {
    typeFilter = type;
    document.querySelectorAll('[data-filter-type]').forEach((button) => {
      button.classList.toggle('active', button.dataset.filterType === type);
    });
  }

  if (chapter) chapterFilter = chapter;
}

function showQuizLoadError(error) {
  console.error('Erreur de chargement du quiz :', error);
  const qtxt = document.getElementById('qtxt');
  const count = document.getElementById('count');

  if (qtxt) {
    qtxt.textContent = 'Le quiz n’a pas pu être chargé. Vérifiez les fichiers JavaScript du dossier assets/js.';
  }
  if (count) {
    count.textContent = 'Erreur de chargement';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  try {
    activateFromQuery();
    updateModuleFilterVisibility();
    restart();
  } catch (error) {
    showQuizLoadError(error);
  }
});

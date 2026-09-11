/* Code Lab — configuration, projet, interface et terminal */

const LANGUAGE_CONFIG = {
  python: { label: 'Python', filename: 'main.py', fallbackJudgeId: 71 },
  php: { label: 'PHP', filename: 'main.php', fallbackJudgeId: 68 },
  java: { label: 'Java', filename: 'Main.java', fallbackJudgeId: 62 },
};

const SYNTAX_CONFIG = {
  python: {
    keywords: new Set([
      'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else',
      'except', 'False', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'None',
      'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'True', 'try', 'while', 'with', 'yield', 'match', 'case',
    ]),
    builtins: new Set([
      'print', 'input', 'int', 'float', 'str', 'bool', 'list', 'dict', 'set', 'tuple', 'range', 'len', 'sum', 'max',
      'min', 'abs', 'round', 'enumerate', 'zip', 'sorted', 'reversed', 'open', 'type', 'isinstance', 'map', 'filter',
    ]),
  },
  php: {
    keywords: new Set([
      'abstract', 'and', 'array', 'as', 'break', 'callable', 'case', 'catch', 'class', 'clone', 'const', 'continue',
      'declare', 'default', 'do', 'echo', 'else', 'elseif', 'empty', 'endfor', 'endforeach', 'endif', 'endswitch',
      'endwhile', 'extends', 'final', 'finally', 'fn', 'for', 'foreach', 'function', 'global', 'if', 'implements',
      'include', 'include_once', 'instanceof', 'interface', 'isset', 'match', 'namespace', 'new', 'null', 'or',
      'print', 'private', 'protected', 'public', 'readonly', 'require', 'require_once', 'return', 'static', 'switch',
      'throw', 'trait', 'try', 'unset', 'use', 'while', 'xor', 'yield', 'true', 'false',
    ]),
    builtins: new Set([
      'count', 'strlen', 'trim', 'fgets', 'explode', 'implode', 'array_sum', 'array_map', 'array_filter', 'max', 'min',
      'sort', 'rsort', 'in_array', 'isset', 'empty', 'intval', 'floatval', 'strtolower', 'strtoupper', 'round', 'sqrt',
    ]),
  },
  java: {
    keywords: new Set([
      'abstract', 'assert', 'boolean', 'break', 'byte', 'case', 'catch', 'char', 'class', 'const', 'continue',
      'default', 'do', 'double', 'else', 'enum', 'extends', 'final', 'finally', 'float', 'for', 'goto', 'if',
      'implements', 'import', 'instanceof', 'int', 'interface', 'long', 'native', 'new', 'package', 'private',
      'protected', 'public', 'return', 'short', 'static', 'strictfp', 'super', 'switch', 'synchronized', 'this',
      'throw', 'throws', 'transient', 'try', 'void', 'volatile', 'while', 'true', 'false', 'null', 'record', 'sealed',
    ]),
    builtins: new Set([
      'System', 'String', 'Scanner', 'Math', 'Integer', 'Double', 'Float', 'Long', 'Boolean', 'Character', 'Object',
      'ArrayList', 'List', 'HashMap', 'Map', 'Arrays', 'Collections', 'StringBuilder', 'Exception', 'RuntimeException',
    ]),
  },
};

const PROJECT_STORAGE_KEY = 'bts-code-lab-v6-project';
const PROJECT_VERSION = 6;
const MAX_HISTORY = 120;
const INDENT_UNIT = '    ';

const EXTENSION_LANGUAGE = {
  py: 'python',
  php: 'php',
  java: 'java',
};

const state = {
  project: null,
  activeFileId: null,
  pyodide: null,
  pyodideLoading: null,
  judgeLanguages: null,
  running: false,
  history: new Map(),
  fileModalMode: 'create',
  stdinRequirement: null,
  stdinReturnScrollY: 0,
  stdinReturnSelection: null,
};

const dom = {};

function byId(id) {
  return document.getElementById(id);
}

function uid(prefix = 'file') {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

function extensionOf(filename) {
  const match = String(filename || '').trim().toLowerCase().match(/\.([a-z0-9]+)$/);
  return match ? match[1] : '';
}

function languageFromFilename(filename) {
  return EXTENSION_LANGUAGE[extensionOf(filename)] || 'text';
}

function languageLabel(language) {
  return LANGUAGE_CONFIG[language]?.label || 'Texte';
}

function activeFile() {
  return state.project?.files.find((file) => file.id === state.activeFileId) || null;
}

function activeLanguage() {
  return languageFromFilename(activeFile()?.name || '');
}

function exercisesForLanguage(language = activeLanguage()) {
  return (CODE_LAB_EXERCISES[language] || []).filter((item) => !item.sandbox);
}

function currentExercise() {
  const file = activeFile();
  if (!file?.exerciseId) return null;
  return exercisesForLanguage().find((exercise) => exercise.id === file.exerciseId) || null;
}

function solvedKey(language, exercise) {
  return `bts-code-lab-v2-solved:${language}:${exercise.id}`;
}

function normalizeOutput(value) {
  return String(value ?? '')
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]+$/gm, '')
    .trim();
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function tokenSpan(type, value) {
  return `<span class="syn-${type}">${escapeHtml(value)}</span>`;
}

function isIdentifierStart(char) {
  return /[A-Za-z_À-ÿ]/.test(char || '');
}

function isIdentifierPart(char) {
  return /[A-Za-z0-9_À-ÿ]/.test(char || '');
}

function highlightCode(code, language) {
  const config = SYNTAX_CONFIG[language];
  if (!config) return escapeHtml(code);

  let output = '';
  let index = 0;
  let blockComment = false;
  let expectedDefinition = '';

  while (index < code.length) {
    const char = code[index];
    const next = code[index + 1] || '';

    if (language === 'php' && code.startsWith('<?php', index)) {
      output += tokenSpan('keyword', '<?php');
      index += 5;
      continue;
    }
    if (language === 'php' && code.startsWith('?>', index)) {
      output += tokenSpan('keyword', '?>');
      index += 2;
      continue;
    }

    if (blockComment) {
      const end = code.indexOf('*/', index);
      if (end === -1) {
        output += tokenSpan('comment', code.slice(index));
        break;
      }
      output += tokenSpan('comment', code.slice(index, end + 2));
      index = end + 2;
      blockComment = false;
      continue;
    }

    if ((language === 'java' || language === 'php') && char === '/' && next === '*') {
      const end = code.indexOf('*/', index + 2);
      if (end === -1) {
        output += tokenSpan('comment', code.slice(index));
        break;
      }
      output += tokenSpan('comment', code.slice(index, end + 2));
      index = end + 2;
      continue;
    }

    const lineComment = language === 'python'
      ? char === '#'
      : (char === '/' && next === '/') || (language === 'php' && char === '#');

    if (lineComment) {
      const end = code.indexOf('\n', index);
      const finish = end === -1 ? code.length : end;
      output += tokenSpan('comment', code.slice(index, finish));
      index = finish;
      continue;
    }

    if (char === '"' || char === "'" || (language === 'php' && char === '`')) {
      const quote = char;
      let cursor = index + 1;
      let escaped = false;
      while (cursor < code.length) {
        const current = code[cursor];
        if (!escaped && current === quote) {
          cursor += 1;
          break;
        }
        if (!escaped && current === '\\') escaped = true;
        else escaped = false;
        cursor += 1;
      }
      output += tokenSpan('string', code.slice(index, cursor));
      index = cursor;
      continue;
    }

    if (language === 'php' && char === '$') {
      let cursor = index + 1;
      while (cursor < code.length && isIdentifierPart(code[cursor])) cursor += 1;
      output += tokenSpan('variable', code.slice(index, cursor));
      index = cursor;
      continue;
    }

    if (/\d/.test(char)) {
      let cursor = index + 1;
      while (cursor < code.length && /[0-9A-Fa-fxXbB._]/.test(code[cursor])) cursor += 1;
      output += tokenSpan('number', code.slice(index, cursor));
      index = cursor;
      continue;
    }

    if (isIdentifierStart(char)) {
      let cursor = index + 1;
      while (cursor < code.length && isIdentifierPart(code[cursor])) cursor += 1;
      const word = code.slice(index, cursor);
      const rest = code.slice(cursor);
      const followedByCall = /^\s*\(/.test(rest);
      let type = '';

      if (expectedDefinition) {
        type = expectedDefinition;
        expectedDefinition = '';
      } else if (config.keywords.has(word)) {
        type = 'keyword';
        if (['def', 'function'].includes(word)) expectedDefinition = 'function';
        if (['class', 'interface', 'enum', 'record'].includes(word)) expectedDefinition = 'class';
      } else if (config.builtins.has(word)) {
        type = 'builtin';
      } else if (followedByCall) {
        type = 'function';
      } else if (language === 'java' && /^[A-Z]/.test(word)) {
        type = 'class';
      }

      output += type ? tokenSpan(type, word) : escapeHtml(word);
      index = cursor;
      continue;
    }

    if ('+-*/%=!<>&|?:.'.includes(char)) {
      const pair = `${char}${next}`;
      const doubleOperators = new Set(['==', '!=', '<=', '>=', '&&', '||', '++', '--', '+=', '-=', '*=', '/=', '%=', '->', '=>', '::', '**', '//']);
      const operator = doubleOperators.has(pair) ? pair : char;
      if (operator.length === 2) index += 1;
      output += tokenSpan('operator', operator);
      index += 1;
      continue;
    }

    output += escapeHtml(char);
    index += 1;
  }

  return output + (code.endsWith('\n') ? ' ' : '');
}

function createStarterForFilename(name) {
  const language = languageFromFilename(name);
  if (language === 'python') return '# Nouveau fichier Python\n';
  if (language === 'php') return '<?php\n\n?>\n';
  if (language === 'java') {
    const className = javaClassNameFromFilename(name);
    return `public class ${className} {\n    public static void main(String[] args) {\n        \n    }\n}\n`;
  }
  return '';
}

function javaClassNameFromFilename(name) {
  const raw = String(name || 'Main.java').replace(/\.java$/i, '');
  const cleaned = raw.replace(/[^A-Za-z0-9_$]/g, '_');
  return /^[A-Za-z_$]/.test(cleaned) ? cleaned : `Main_${cleaned}`;
}

function validateFilename(rawName, ignoreFileId = null) {
  const name = String(rawName || '').trim();
  if (!name) return { ok: false, message: 'Le nom du fichier est obligatoire.' };
  if (name.length > 100) return { ok: false, message: 'Le nom est trop long (100 caractères maximum).' };
  if (/[\\/:*?"<>|]/.test(name)) return { ok: false, message: 'Le nom contient un caractère interdit.' };
  if (name === '.' || name === '..') return { ok: false, message: 'Ce nom de fichier n’est pas valide.' };
  if (!/\.[A-Za-z0-9]+$/.test(name)) return { ok: false, message: 'Ajoutez une extension, par exemple .py, .php ou .java.' };
  if (state.project?.files.some((file) => file.id !== ignoreFileId && file.name.toLowerCase() === name.toLowerCase())) {
    return { ok: false, message: 'Un fichier portant ce nom existe déjà.' };
  }
  if (/\.java$/i.test(name) && !/^[A-Za-z_$][A-Za-z0-9_$]*\.java$/i.test(name)) {
    return { ok: false, message: 'Pour Java, utilisez un nom compatible avec une classe (ex. Main.java ou Calcul.java).' };
  }
  return { ok: true, name };
}

function persistProject() {
  localStorage.setItem(PROJECT_STORAGE_KEY, JSON.stringify(state.project));
}

function createFileObject(name, content = null, exerciseId = null) {
  const initial = content ?? createStarterForFilename(name);
  return {
    id: uid('file'),
    name,
    content: initial,
    savedContent: initial,
    exerciseId,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}

function loadProject() {
  let parsed = null;
  try {
    parsed = JSON.parse(localStorage.getItem(PROJECT_STORAGE_KEY) || 'null');
  } catch (_) {
    parsed = null;
  }

  if (!parsed || !Array.isArray(parsed.files) || !parsed.files.length) {
    const first = createFileObject('main.py', '# Sandbox Python\nprint("Bonjour BTS SIO")\n');
    state.project = { version: PROJECT_VERSION, files: [first], activeFileId: first.id };
    state.activeFileId = first.id;
    persistProject();
    return;
  }

  state.project = {
    version: PROJECT_VERSION,
    files: parsed.files.map((file) => ({
      id: file.id || uid('file'),
      name: file.name || 'fichier.txt',
      content: String(file.content ?? ''),
      savedContent: String(file.savedContent ?? file.content ?? ''),
      exerciseId: file.exerciseId || null,
      createdAt: file.createdAt || Date.now(),
      updatedAt: file.updatedAt || Date.now(),
    })),
    activeFileId: parsed.activeFileId,
  };

  state.activeFileId = state.project.files.some((file) => file.id === parsed.activeFileId)
    ? parsed.activeFileId
    : state.project.files[0].id;
  state.project.activeFileId = state.activeFileId;
  persistProject();
}

function fileDirty(file = activeFile()) {
  return Boolean(file && file.content !== file.savedContent);
}

function anyDirtyFiles() {
  return Boolean(state.project?.files.some(fileDirty));
}

function historyFor(fileId = state.activeFileId) {
  if (!state.history.has(fileId)) state.history.set(fileId, { undo: [], redo: [] });
  return state.history.get(fileId);
}

function pushHistory(previousValue) {
  const history = historyFor();
  if (history.undo.at(-1) !== previousValue) history.undo.push(previousValue);
  if (history.undo.length > MAX_HISTORY) history.undo.shift();
  history.redo.length = 0;
}

function setActiveFileContent(value, { history = true } = {}) {
  const file = activeFile();
  if (!file) return;
  const next = String(value ?? '');
  if (history && file.content !== next) pushHistory(file.content);
  file.content = next;
  file.updatedAt = Date.now();
  persistProject();
  updateSaveState();
}

function saveActiveFile() {
  const file = activeFile();
  if (!file) return;
  file.content = dom.codeEditor.value;
  file.savedContent = file.content;
  file.updatedAt = Date.now();
  persistProject();
  updateSaveState('sauvegardé');
  renderFileList();
  window.clearTimeout(saveActiveFile.timer);
  saveActiveFile.timer = window.setTimeout(() => updateSaveState(), 900);
}

function updateSaveState(forcedText = '') {
  const file = activeFile();
  if (!file || !dom.saveState) return;
  const dirty = fileDirty(file);
  dom.saveState.textContent = forcedText || (dirty ? '● non enregistré' : 'enregistré');
  dom.saveState.classList.toggle('dirty', dirty);
  if (dom.saveFileButton) dom.saveFileButton.disabled = !dirty;
}

function renderFileList() {
  dom.fileList.innerHTML = '';
  dom.fileCount.textContent = state.project.files.length;

  state.project.files.forEach((file) => {
    const language = languageFromFilename(file.name);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'file-entry';
    button.classList.toggle('active', file.id === state.activeFileId);
    button.classList.toggle('dirty', fileDirty(file));
    button.innerHTML = `
      <span class="file-icon ${language}">${extensionOf(file.name).toUpperCase().slice(0, 4) || 'TXT'}</span>
      <span class="file-name">${escapeHtml(file.name)}</span>
      <span class="file-dirty" aria-label="${fileDirty(file) ? 'Modifications non enregistrées' : 'Enregistré'}">${fileDirty(file) ? '●' : ''}</span>
    `;
    button.addEventListener('click', () => activateFile(file.id));
    dom.fileList.appendChild(button);
  });
}

function renderExerciseList() {
  const language = activeLanguage();
  const exercises = exercisesForLanguage(language);
  dom.exerciseCount.textContent = exercises.length;
  dom.exerciseList.innerHTML = '';
  dom.exerciseEmpty.hidden = exercises.length > 0;

  exercises.forEach((exercise, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'exercise-button';
    if (activeFile()?.exerciseId === exercise.id) button.classList.add('active');
    if (localStorage.getItem(solvedKey(language, exercise)) === '1') button.classList.add('solved');
    const status = localStorage.getItem(solvedKey(language, exercise)) === '1' ? '✓ réussi' : exercise.difficulty;
    button.innerHTML = `
      <span class="exercise-index">${String(index + 1).padStart(2, '0')}</span>
      <span class="exercise-name">${escapeHtml(exercise.title)}<span class="exercise-status">${escapeHtml(status)}</span></span>
    `;
    button.addEventListener('click', () => openExerciseInFile(exercise, index));
    dom.exerciseList.appendChild(button);
  });
}

function exerciseFilename(language, exerciseIndex, title) {
  const number = String(exerciseIndex + 1).padStart(2, '0');
  if (language === 'java') return `Exercice${number}.java`;
  const slug = title
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 34);
  return `${number}-${slug || 'exercice'}.${language === 'python' ? 'py' : 'php'}`;
}

function adaptJavaStarterForFilename(starter, filename) {
  if (!/\.java$/i.test(filename)) return starter;
  const className = javaClassNameFromFilename(filename);
  return String(starter || '').replace(/\bpublic\s+class\s+Main\b/, `public class ${className}`);
}

function openExerciseInFile(exercise, exerciseIndex) {
  const language = activeLanguage();
  const existing = state.project.files.find((file) => file.exerciseId === exercise.id && languageFromFilename(file.name) === language);
  if (existing) {
    activateFile(existing.id);
    return;
  }

  let name = exerciseFilename(language, exerciseIndex, exercise.title);
  let suffix = 2;
  while (state.project.files.some((file) => file.name.toLowerCase() === name.toLowerCase())) {
    const ext = `.${extensionOf(name)}`;
    name = `${name.slice(0, -ext.length)}-${suffix}${ext}`;
    suffix += 1;
  }

  let starter = exercise.starter || '';
  if (language === 'java') starter = adaptJavaStarterForFilename(starter, name);
  const file = createFileObject(name, starter, exercise.id);
  state.project.files.push(file);
  state.activeFileId = file.id;
  state.project.activeFileId = file.id;
  persistProject();
  renderActiveFile();
}

function renderExerciseBrief() {
  const exercise = currentExercise();
  const language = activeLanguage();
  if (!exercise) {
    dom.exerciseBrief.classList.add('sandbox-brief');
    dom.exerciseDifficulty.textContent = language === 'text' ? 'Fichier texte' : 'Fichier libre';
    dom.exercisePosition.textContent = language === 'text' ? 'Édition uniquement' : 'Sandbox';
    dom.exerciseTitle.textContent = language === 'text' ? 'Éditeur de texte' : `Sandbox ${languageLabel(language)}`;
    dom.exerciseDescription.textContent = language === 'text'
      ? 'Ce type de fichier peut être édité, sauvegardé et téléchargé. L’exécution est disponible pour .py, .php et .java.'
      : 'Écrivez librement votre code. La fenêtre de saisie ne s’ouvrira que si une instruction d’entrée utilisateur est détectée.';
    dom.exerciseInput.textContent = 'Détection automatique';
    dom.exerciseExpected.textContent = 'Aucun test imposé';
    dom.hintBox.hidden = true;
    dom.testButton.disabled = true;
    dom.hintButton.disabled = true;
    dom.testButton.textContent = '✓ Pas de test';
    dom.hintButton.textContent = '? Aucun indice';
    return;
  }

  dom.exerciseBrief.classList.remove('sandbox-brief');
  const exercises = exercisesForLanguage(language);
  const index = exercises.findIndex((item) => item.id === exercise.id);
  dom.exerciseDifficulty.textContent = exercise.difficulty;
  dom.exercisePosition.textContent = `Exercice ${index + 1} / ${exercises.length}`;
  dom.exerciseTitle.textContent = exercise.title;
  dom.exerciseDescription.textContent = exercise.description;
  dom.exerciseInput.textContent = exercise.stdin || 'Aucune';
  dom.exerciseExpected.textContent = exercise.expected || 'Aucune';
  dom.hintText.textContent = exercise.hint || '';
  dom.hintLevel.textContent = exercise.hintCode ? 'piste + squelette' : 'piste';
  dom.insertHintButton.hidden = !exercise.hintCode;
  dom.testButton.disabled = false;
  dom.hintButton.disabled = !exercise.hint;
  dom.testButton.textContent = '✓ Tester l’exercice';
  dom.hintButton.textContent = exercise.hint ? '? Indice' : '? Aucun indice';
}

function renderActiveFile() {
  const file = activeFile();
  if (!file) return;
  const language = activeLanguage();

  dom.editorFilename.textContent = file.name;
  dom.codeEditor.value = file.content;
  dom.editorShell.dataset.language = language;
  renderFileList();
  renderExerciseList();
  renderExerciseBrief();
  updateEditorDecorations();
  updateSaveState();
  clearTerminal();
  updateRunAvailability();

  const exercise = currentExercise();
  appendTerminal(`$ open ${file.name}`);
  if (exercise) appendTerminal(`${languageLabel(language)} // ${exercise.title}`);
  else if (language === 'text') appendTerminal('Fichier ouvert en mode édition. Exécution non disponible pour cette extension.');
  else appendTerminal(`${languageLabel(language)} // fichier libre`);
}

function activateFile(fileId) {
  const file = state.project.files.find((item) => item.id === fileId);
  if (!file || file.id === state.activeFileId) return;
  syncEditorToActiveFile();
  state.activeFileId = file.id;
  state.project.activeFileId = file.id;
  persistProject();
  renderActiveFile();
}

function syncEditorToActiveFile() {
  const file = activeFile();
  if (!file || !dom.codeEditor) return;
  file.content = dom.codeEditor.value;
  file.updatedAt = Date.now();
  persistProject();
}

function openFileModal(mode) {
  state.fileModalMode = mode;
  const file = activeFile();
  dom.fileModalTitle.textContent = mode === 'rename' ? 'Renommer le fichier' : 'Nouveau fichier';
  dom.fileModalDescription.innerHTML = mode === 'rename'
    ? 'Modifiez le nom ou l’extension. Le langage actif sera recalculé automatiquement.'
    : 'Entrez un nom avec son extension, par exemple <code>calcul.py</code>, <code>index.php</code> ou <code>Main.java</code>.';
  dom.fileModalConfirm.textContent = mode === 'rename' ? 'Renommer' : 'Créer';
  dom.fileNameInput.value = mode === 'rename' && file ? file.name : '';
  dom.fileModalError.hidden = true;
  dom.fileModal.hidden = false;
  document.body.classList.add('modal-open');
  window.setTimeout(() => {
    dom.fileNameInput.focus();
    dom.fileNameInput.select();
  }, 20);
}

function closeFileModal() {
  dom.fileModal.hidden = true;
  if (dom.stdinModal.hidden) document.body.classList.remove('modal-open');
}

function confirmFileModal() {
  const file = activeFile();
  const validation = validateFilename(dom.fileNameInput.value, state.fileModalMode === 'rename' ? file?.id : null);
  if (!validation.ok) {
    dom.fileModalError.textContent = validation.message;
    dom.fileModalError.hidden = false;
    return;
  }

  if (state.fileModalMode === 'rename') {
    if (!file) return;
    const oldLanguage = languageFromFilename(file.name);
    const newLanguage = languageFromFilename(validation.name);
    const oldName = file.name;
    file.name = validation.name;
    if (oldLanguage === 'java' && newLanguage === 'java') {
      const oldClass = javaClassNameFromFilename(oldName);
      const newClass = javaClassNameFromFilename(validation.name);
      if (oldClass !== newClass) {
        file.content = file.content.replace(new RegExp(`\\b${escapeRegExp(oldClass)}\\b`, 'g'), newClass);
        file.savedContent = file.savedContent.replace(new RegExp(`\\b${escapeRegExp(oldClass)}\\b`, 'g'), newClass);
      }
    }
    if (oldLanguage !== newLanguage) file.exerciseId = null;
    persistProject();
    closeFileModal();
    renderActiveFile();
    return;
  }

  const created = createFileObject(validation.name);
  state.project.files.push(created);
  state.activeFileId = created.id;
  state.project.activeFileId = created.id;
  persistProject();
  closeFileModal();
  renderActiveFile();
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function deleteActiveFile() {
  const file = activeFile();
  if (!file) return;
  if (state.project.files.length === 1) {
    window.alert('Le projet doit conserver au moins un fichier. Créez un autre fichier avant de supprimer celui-ci.');
    return;
  }
  const warning = fileDirty(file) ? '\nLes modifications non enregistrées seront perdues.' : '';
  if (!window.confirm(`Supprimer « ${file.name} » ?${warning}`)) return;
  const index = state.project.files.findIndex((item) => item.id === file.id);
  state.project.files.splice(index, 1);
  state.history.delete(file.id);
  const next = state.project.files[Math.min(index, state.project.files.length - 1)];
  state.activeFileId = next.id;
  state.project.activeFileId = next.id;
  persistProject();
  renderActiveFile();
}

function downloadActiveFile() {
  const file = activeFile();
  if (!file) return;
  const blob = new Blob([dom.codeEditor.value], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = file.name;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  appendTerminal(`Téléchargement : ${file.name}`, 'success');
}

function undoActiveFile() {
  const file = activeFile();
  const history = historyFor();
  if (!file || !history.undo.length) return;
  history.redo.push(file.content);
  const previous = history.undo.pop();
  file.content = previous;
  file.updatedAt = Date.now();
  persistProject();
  dom.codeEditor.value = previous;
  updateEditorDecorations();
  updateSaveState();
}

function redoActiveFile() {
  const file = activeFile();
  const history = historyFor();
  if (!file || !history.redo.length) return;
  history.undo.push(file.content);
  const next = history.redo.pop();
  file.content = next;
  file.updatedAt = Date.now();
  persistProject();
  dom.codeEditor.value = next;
  updateEditorDecorations();
  updateSaveState();
}

function updateHighlight() {
  if (!dom.highlightLayer || !dom.codeEditor) return;
  dom.highlightLayer.innerHTML = highlightCode(dom.codeEditor.value, activeLanguage());
  syncEditorScroll();
}

function syncEditorScroll() {
  dom.lineNumbers.scrollTop = dom.codeEditor.scrollTop;
  dom.highlightLayer.scrollTop = dom.codeEditor.scrollTop;
  dom.highlightLayer.scrollLeft = dom.codeEditor.scrollLeft;
}

function updateLineNumbers() {
  const lineCount = Math.max(1, dom.codeEditor.value.split('\n').length);
  dom.lineNumbers.textContent = Array.from({ length: lineCount }, (_, index) => index + 1).join('\n');
  syncEditorScroll();
}

function updateEditorDecorations() {
  updateLineNumbers();
  updateHighlight();
}

function appendTerminal(text, kind = 'normal') {
  const prefix = kind === 'error' ? '[ERREUR] ' : kind === 'success' ? '[OK] ' : '';
  dom.terminalOutput.textContent += `${prefix}${text}\n`;
  dom.terminalOutput.scrollTop = dom.terminalOutput.scrollHeight;
}

function clearTerminal() {
  if (!dom.terminalOutput) return;
  dom.terminalOutput.textContent = '';
  clearTestReport();
  setTerminalState(activeLanguage() === 'text' ? 'édition' : 'prêt');
}

function scrollTerminalIntoView() {
  const target = dom.terminalPanel || dom.terminalOutput;
  if (!target) return;
  window.requestAnimationFrame(() => {
    target.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  });
}

function restoreEditorView() {
  const selection = state.stdinReturnSelection;
  const scrollY = Number.isFinite(state.stdinReturnScrollY) ? state.stdinReturnScrollY : window.scrollY;
  window.requestAnimationFrame(() => {
    window.scrollTo({ top: scrollY, left: 0, behavior: 'auto' });
    if (selection && dom.codeEditor) {
      try { dom.codeEditor.setSelectionRange(selection.start, selection.end); } catch (_) {}
      try { dom.codeEditor.focus({ preventScroll: true }); } catch (_) { dom.codeEditor.focus(); }
    }
  });
}

function clearTestReport() {
  if (!dom.testReport || !dom.testReportList) return;
  dom.testReport.hidden = true;
  dom.testReportList.innerHTML = '';
  if (dom.testReportSummary) dom.testReportSummary.textContent = 'échec détecté';
}

function printableTestValue(value) {
  const text = String(value ?? '').replace(/\r\n/g, '\n');
  return text.length ? text : '(vide)';
}

function addTestFailureReport({ index, total, stdin, output, expected, title = 'Sortie différente' }) {
  if (!dom.testReport || !dom.testReportList) return;
  dom.testReport.hidden = false;
  const card = document.createElement('article');
  card.className = 'test-failure-card';
  const heading = document.createElement('div');
  heading.className = 'test-failure-title';
  heading.innerHTML = `<strong>CAS ${index + 1}/${total}</strong><span>${escapeHtml(title)}</span>`;
  card.appendChild(heading);
  [['INPUT', printableTestValue(stdin)], ['OUTPUT', printableTestValue(output)], ['EXPECTED OUTPUT', printableTestValue(expected)]].forEach(([label, value]) => {
    const field = document.createElement('div');
    field.className = 'test-failure-field';
    const fieldLabel = document.createElement('span');
    fieldLabel.className = 'test-failure-label';
    fieldLabel.textContent = label;
    const pre = document.createElement('pre');
    pre.textContent = value;
    field.append(fieldLabel, pre);
    card.appendChild(field);
  });
  dom.testReportList.appendChild(card);
  dom.testReportSummary.textContent = `${dom.testReportList.children.length} cas en échec`;
}

function setTerminalState(text, mode = '') {
  dom.terminalState.textContent = text;
  dom.terminalState.style.color = mode === 'error' ? 'var(--red)' : mode === 'success' ? 'var(--green)' : 'var(--text-dim)';
}

function setRuntimeStatus(language, text, mode = '') {
  const label = byId(`runtime${language.charAt(0).toUpperCase()}${language.slice(1)}`);
  const chip = document.querySelector(`[data-runtime-chip="${language}"]`);
  if (label) label.textContent = text;
  if (chip) {
    chip.classList.toggle('ready', mode === 'ready');
    chip.classList.toggle('error', mode === 'error');
  }
}

function updateRunAvailability() {
  const supported = ['python', 'php', 'java'].includes(activeLanguage());
  dom.runButton.disabled = state.running || !supported;
  if (!state.running) dom.runButton.textContent = supported ? '▶ Exécuter' : '▶ Non exécutable';
  const exercise = currentExercise();
  dom.testButton.disabled = state.running || !exercise;
  dom.hintButton.disabled = state.running || !exercise?.hint;
}

function resetCurrentFile() {
  const file = activeFile();
  if (!file) return;
  const exercise = currentExercise();
  if (exercise) {
    let starter = exercise.starter || '';
    if (activeLanguage() === 'java') starter = adaptJavaStarterForFilename(starter, file.name);
    if (!window.confirm('Réinitialiser le code de cet exercice ?')) return;
    applyEditorContent(starter, 0, 0, true);
    return;
  }
  if (!fileDirty(file)) {
    appendTerminal('Aucune modification non enregistrée à annuler.');
    return;
  }
  if (!window.confirm('Revenir à la dernière version sauvegardée de ce fichier ?')) return;
  applyEditorContent(file.savedContent, 0, 0, true);
}

function insertHintSnippet() {
  const exercise = currentExercise();
  if (!exercise?.hintCode) return;
  let code = dom.codeEditor.value;
  if (code.includes(exercise.hintCode.trim())) {
    appendTerminal('L’aide de code est déjà présente dans l’éditeur.');
    return;
  }
  if (exercise.hintMarker && code.includes(exercise.hintMarker)) {
    code = code.replace(exercise.hintMarker, exercise.hintCode);
    applyEditorContent(code, 0, 0, true);
  } else {
    const start = dom.codeEditor.selectionStart;
    const end = dom.codeEditor.selectionEnd;
    const prefix = start > 0 && code[start - 1] !== '\n' ? '\n' : '';
    const insertion = `${prefix}${exercise.hintCode}`;
    const value = `${code.slice(0, start)}${insertion}${code.slice(end)}`;
    applyEditorContent(value, start + insertion.length, start + insertion.length, true);
  }
  dom.codeEditor.focus();
  appendTerminal('Aide de code insérée. Complétez-la sans recopier une solution toute faite.');
}


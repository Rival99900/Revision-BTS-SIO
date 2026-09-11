/* Code Lab — moteurs d’exécution et détection des entrées */

function setRunning(value) {
  state.running = value;
  updateRunAvailability();
  if (value) dom.runButton.textContent = '… Exécution';
}

async function loadPyodideRuntime() {
  if (state.pyodide) return state.pyodide;
  if (state.pyodideLoading) return state.pyodideLoading;
  setRuntimeStatus('python', 'chargement…');
  setTerminalState('chargement Python');
  state.pyodideLoading = new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-pyodide-loader]');
    if (existing && typeof window.loadPyodide === 'function') return resolve();
    const script = document.createElement('script');
    script.dataset.pyodideLoader = '1';
    script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js';
    script.onload = resolve;
    script.onerror = () => reject(new Error('Impossible de charger Pyodide. Vérifiez la connexion Internet.'));
    document.head.appendChild(script);
  }).then(async () => {
    if (typeof window.loadPyodide !== 'function') throw new Error('Pyodide est chargé mais loadPyodide() est indisponible.');
    state.pyodide = await window.loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/' });
    setRuntimeStatus('python', 'prêt', 'ready');
    return state.pyodide;
  }).catch((error) => {
    setRuntimeStatus('python', 'indisponible', 'error');
    state.pyodideLoading = null;
    throw error;
  });
  return state.pyodideLoading;
}

async function runPython(code, stdin) {
  const pyodide = await loadPyodideRuntime();
  pyodide.globals.set('__bts_user_code', code);
  pyodide.globals.set('__bts_stdin', stdin || '');
  return pyodide.runPythonAsync(`
import sys, io, traceback, builtins
_bts_stdout = io.StringIO()
_bts_old_stdout = sys.stdout
_bts_old_stderr = sys.stderr
_bts_old_stdin = sys.stdin
_bts_old_input = builtins.input
_bts_buffer = io.StringIO(__bts_stdin)
_bts_inputs = iter(__bts_stdin.splitlines())
def _bts_input(prompt=''):
    if prompt:
        print(prompt, end='')
    try:
        return next(_bts_inputs)
    except StopIteration:
        return ''
sys.stdout = _bts_stdout
sys.stderr = _bts_stdout
sys.stdin = _bts_buffer
builtins.input = _bts_input
try:
    exec(__bts_user_code, {'__name__': '__main__'})
except Exception:
    traceback.print_exc()
finally:
    sys.stdout = _bts_old_stdout
    sys.stderr = _bts_old_stderr
    sys.stdin = _bts_old_stdin
    builtins.input = _bts_old_input
_bts_stdout.getvalue()
  `);
}

async function getJudgeLanguages() {
  if (state.judgeLanguages) return state.judgeLanguages;
  const response = await fetch('https://ce.judge0.com/languages');
  if (!response.ok) throw new Error(`Judge0 indisponible (HTTP ${response.status}).`);
  state.judgeLanguages = await response.json();
  return state.judgeLanguages;
}

function findJudgeLanguageId(languages, language) {
  const fallback = LANGUAGE_CONFIG[language].fallbackJudgeId;
  const patterns = language === 'php' ? [/^PHP\b/i] : [/^Java\b/i, /OpenJDK/i];
  const match = languages.find((item) => patterns.some((pattern) => pattern.test(item.name || '')));
  return match?.id || fallback;
}

async function runJudge0(language, code, stdin) {
  setRuntimeStatus(language, 'connexion…');
  const languages = await getJudgeLanguages();
  const languageId = findJudgeLanguageId(languages, language);
  const createResponse = await fetch('https://ce.judge0.com/submissions?base64_encoded=false&wait=false', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ language_id: languageId, source_code: code, stdin: stdin || '', cpu_time_limit: 4, wall_time_limit: 8 }),
  });
  if (!createResponse.ok) throw new Error(`Impossible d’envoyer le code à Judge0 (HTTP ${createResponse.status}).`);
  const created = await createResponse.json();
  if (!created.token) throw new Error('Judge0 n’a pas renvoyé de jeton d’exécution.');
  let result = null;
  for (let attempt = 0; attempt < 24; attempt += 1) {
    await new Promise((resolve) => window.setTimeout(resolve, 350));
    const resultResponse = await fetch(`https://ce.judge0.com/submissions/${created.token}?base64_encoded=false&fields=stdout,stderr,compile_output,message,status,time,memory`);
    if (!resultResponse.ok) throw new Error(`Impossible de lire le résultat Judge0 (HTTP ${resultResponse.status}).`);
    result = await resultResponse.json();
    if (result?.status?.id && result.status.id > 2) break;
  }
  if (!result || !result.status || result.status.id <= 2) throw new Error('Le moteur distant n’a pas terminé dans le délai prévu.');
  setRuntimeStatus(language, 'prêt', 'ready');
  const details = [result.compile_output, result.stderr, result.message].filter(Boolean).join('\n');
  const stdout = result.stdout || '';
  if (result.status.id !== 3) {
    const error = new Error(details || `Exécution terminée : ${result.status.description}.`);
    error.runtimeOutput = stdout;
    throw error;
  }
  return `${stdout}${details ? `\n${details}` : ''}`;
}

function parsePhpPostInput(stdin) {
  const result = {};
  String(stdin || '').split(/\r?\n/).forEach((line) => {
    if (!line.trim()) return;
    const separator = line.indexOf('=');
    if (separator === -1) return;
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();
    if (key) result[key] = value;
  });
  return result;
}

function phpLiteral(value) {
  return String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function injectPhpPost(source, stdin) {
  const pairs = parsePhpPostInput(stdin);
  const entries = Object.entries(pairs).map(([key, value]) => `'${phpLiteral(key)}' => '${phpLiteral(value)}'`).join(', ');
  const injection = `$_POST = [${entries}];\n`;
  if (/<\?php\b/i.test(source)) return source.replace(/<\?php\b/i, (match) => `${match}\n${injection}`);
  return `<?php\n${injection}${source}\n`;
}

function prepareJavaSource(source, filename) {
  let code = String(source ?? '');
  const declaresType = /\b(?:class|record|interface|enum)\s+[A-Za-z_$][\w$]*/.test(code);
  const hasImportOrPackage = /^\s*(?:import|package)\s+/m.test(code);
  if (!declaresType && !hasImportOrPackage) {
    const body = code.split('\n').map((line) => `        ${line}`).join('\n');
    return `public class Main {\n    public static void main(String[] args) throws Exception {\n${body}\n    }\n}\n`;
  }
  if (/\bclass\s+Main\b/.test(code)) return code;
  const preferred = javaClassNameFromFilename(filename);
  let className = '';
  const preferredPattern = new RegExp(`\\bclass\\s+${escapeRegExp(preferred)}\\b`);
  if (preferredPattern.test(code)) className = preferred;
  else className = code.match(/\bpublic\s+class\s+([A-Za-z_$][\w$]*)/)?.[1] || code.match(/\bclass\s+([A-Za-z_$][\w$]*)/)?.[1] || '';
  if (className && className !== 'Main') code = code.replace(new RegExp(`\\b${escapeRegExp(className)}\\b`, 'g'), 'Main');
  return code;
}

function prepareSource(language, code, stdin = '', requirement = null, filename = '') {
  let source = String(code ?? '');
  if (language === 'php') {
    if (!/<\?(?:php\b|=)/i.test(source)) source = `<?php\n${source}\n`;
    if (requirement?.mode === 'php-post') source = injectPhpPost(source, stdin);
  }
  if (language === 'java') source = prepareJavaSource(source, filename);
  return source;
}

async function runSource(language, code, stdin, requirement = null, filename = '') {
  const prepared = prepareSource(language, code, stdin, requirement, filename);
  return language === 'python' ? runPython(prepared, stdin) : runJudge0(language, prepared, stdin);
}

function stripStringsAndComments(code, language) {
  let source = String(code || '');
  const preserveLines = (match) => match.replace(/[^\n]/g, ' ');

  if (language === 'python') {
    source = source.replace(/(?:\"\"\"[\s\S]*?\"\"\"|'''[\s\S]*?'''|\"(?:\\.|[^\"\\])*\"|'(?:\\.|[^'\\])*')/g, preserveLines);
    source = source.replace(/#.*$/gm, preserveLines);
    return source;
  }

  source = source.replace(/\/\*[\s\S]*?\*\//g, preserveLines);
  source = source.replace(/\"(?:\\.|[^\"\\])*\"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`/g, preserveLines);
  source = source.replace(language === 'php' ? /(?:\/\/|#).*$/gm : /\/\/.*$/gm, preserveLines);
  return source;
}

function detectInputRequirement(language, code) {
  const originalSource = String(code || '');
  const source = stripStringsAndComments(originalSource, language);
  if (language === 'python') {
    const inputCount = (source.match(/\binput\s*\(/g) || []).length;
    const stdinRead = /\bsys\.stdin\b|\bstdin\.(?:read|readline|readlines)\s*\(/.test(source);
    if (inputCount || stdinRead) return { needsInput: true, mode: 'stdin', count: Math.max(inputCount, 1), label: 'input() / sys.stdin détecté' };
  }
  if (language === 'java') {
    const scanner = /\bScanner\s*\(|new\s+Scanner\s*\(\s*System\.in\s*\)/.test(source);
    const reads = (source.match(/\.(?:next|nextLine|nextInt|nextDouble|nextFloat|nextLong|nextBoolean)\s*\(/g) || []).length;
    const buffered = /BufferedReader[\s\S]*System\.in|\.readLine\s*\(/.test(source);
    const consoleRead = /System\.console\s*\(\s*\)\s*\.readLine\s*\(/.test(source);
    if (scanner || reads || buffered || consoleRead) return { needsInput: true, mode: 'stdin', count: Math.max(reads, buffered || consoleRead ? 1 : 0, 1), label: 'lecture console Java détectée' };
  }
  if (language === 'php') {
    const post = /\$_POST\s*\[|filter_input\s*\(\s*INPUT_POST/i.test(source);
    if (post) {
      const keys = [...originalSource.matchAll(/\$_POST\s*\[\s*['"]([^'"]+)['"]\s*\]/g)].map((match) => match[1]);
      return { needsInput: true, mode: 'php-post', count: Math.max(new Set(keys).size, 1), keys: [...new Set(keys)], label: '$_POST détecté' };
    }
    const fgetsCount = (source.match(/fgets\s*\(\s*STDIN\s*\)/gi) || []).length;
    const readlineCount = (source.match(/\breadline\s*\(/gi) || []).length;
    const stdinRead = /stream_get_contents\s*\(\s*STDIN\s*\)|\$argv\b/i.test(source);
    if (fgetsCount || readlineCount || stdinRead) return { needsInput: true, mode: 'stdin', count: Math.max(fgetsCount + readlineCount, 1), label: 'entrée CLI PHP détectée' };
  }
  return { needsInput: false, mode: 'none', count: 0, label: 'aucune entrée détectée' };
}

function stdinStorageKey(file = activeFile()) {
  return `bts-code-lab-v6-stdin:${file?.id || 'unknown'}`;
}

function openStdinModal(requirement) {
  const file = activeFile();
  const exercise = currentExercise();
  state.stdinRequirement = requirement;
  state.stdinReturnScrollY = window.scrollY;
  state.stdinReturnSelection = dom.codeEditor
    ? { start: dom.codeEditor.selectionStart, end: dom.codeEditor.selectionEnd }
    : null;
  const saved = localStorage.getItem(stdinStorageKey(file));
  let suggested = saved ?? exercise?.stdin ?? '';
  if (requirement.mode === 'php-post' && requirement.keys?.length && !saved) suggested = requirement.keys.map((key) => `${key}=`).join('\n');
  dom.stdinModalInput.value = suggested;
  dom.stdinModalContext.textContent = `${file.name} • ${requirement.label}${requirement.count ? ` • ${requirement.count} lecture(s) estimée(s)` : ''}`;
  dom.stdinModalHelp.textContent = requirement.mode === 'php-post' ? 'Format : une ligne clé=valeur pour simuler $_POST' : 'Utilisez une ligne par valeur lue par le programme';
  dom.stdinModal.hidden = false;
  document.body.classList.add('modal-open');
  window.setTimeout(() => {
    dom.stdinModalInput.focus();
    dom.stdinModalInput.setSelectionRange(dom.stdinModalInput.value.length, dom.stdinModalInput.value.length);
  }, 20);
}

function closeStdinModal({ restoreView = true } = {}) {
  dom.stdinModal.hidden = true;
  if (dom.fileModal.hidden) document.body.classList.remove('modal-open');
  state.stdinRequirement = null;
  if (restoreView) restoreEditorView();
}

function launchFromStdinModal(forceEmpty = false) {
  const file = activeFile();
  const requirement = state.stdinRequirement;
  const stdin = forceEmpty ? '' : dom.stdinModalInput.value;
  localStorage.setItem(stdinStorageKey(file), stdin);
  closeStdinModal({ restoreView: false });
  executeCode(stdin, requirement);
}

function requestExecution() {
  const language = activeLanguage();
  if (!['python', 'php', 'java'].includes(language)) {
    clearTerminal();
    appendTerminal(`L’extension .${extensionOf(activeFile()?.name)} n’a pas de moteur d’exécution dans ce Code Lab.`, 'error');
    scrollTerminalIntoView();
    return;
  }
  const code = dom.codeEditor.value;
  if (!code.trim()) {
    clearTerminal();
    appendTerminal('Le code est vide. Écrivez quelques lignes avant d’exécuter.', 'error');
    scrollTerminalIntoView();
    return;
  }
  const requirement = detectInputRequirement(language, code);
  if (requirement.needsInput) openStdinModal(requirement);
  else executeCode('', requirement);
}

async function executeCode(stdin = '', requirement = null) {
  const file = activeFile();
  const language = activeLanguage();
  const code = dom.codeEditor.value;
  if (!file || !code.trim()) return '';
  setRunning(true);
  clearTerminal();
  setTerminalState('exécution…');
  appendTerminal(`$ run ${file.name}`);
  scrollTerminalIntoView();
  try {
    const output = await runSource(language, code, stdin, requirement, file.name);
    const cleanOutput = String(output ?? '');
    if (cleanOutput.trim()) dom.terminalOutput.textContent += cleanOutput.endsWith('\n') ? cleanOutput : `${cleanOutput}\n`;
    else appendTerminal('Aucune sortie produite. Ajoutez un print(), echo ou System.out.println() si vous voulez afficher un résultat.');
    setTerminalState('terminé', 'success');
    return cleanOutput;
  } catch (error) {
    if (error.runtimeOutput) dom.terminalOutput.textContent += error.runtimeOutput;
    appendTerminal(error.message || String(error), 'error');
    setTerminalState('erreur', 'error');
    if (language !== 'python') setRuntimeStatus(language, 'indisponible', 'error');
    return null;
  } finally {
    setRunning(false);
    dom.terminalOutput.scrollTop = dom.terminalOutput.scrollHeight;
  }
}

async function testExercise() {
  const exercise = currentExercise();
  const file = activeFile();
  const language = activeLanguage();
  if (!exercise || !file) return;
  const code = dom.codeEditor.value;
  const cases = Array.isArray(exercise.tests) && exercise.tests.length ? exercise.tests : [{ stdin: exercise.stdin || '', expected: exercise.expected || '' }];
  if (!code.trim()) {
    clearTerminal();
    appendTerminal('Le code est vide. Complétez l’exercice avant de le tester.', 'error');
    return;
  }
  setRunning(true);
  clearTerminal();
  setTerminalState('tests…');
  appendTerminal(`$ test ${file.name} // ${cases.length} cas`);
  scrollTerminalIntoView();
  let failureCount = 0;
  try {
    for (let index = 0; index < cases.length; index += 1) {
      const testCase = cases[index];
      const expected = normalizeOutput(testCase.expected);
      const requirement = detectInputRequirement(language, code);
      try {
        const output = await runSource(language, code, testCase.stdin || '', requirement, file.name);
        const actual = normalizeOutput(output);
        if (actual !== expected) {
          failureCount += 1;
          addTestFailureReport({ index, total: cases.length, stdin: testCase.stdin || '', output: actual, expected, title: actual ? 'Sortie différente' : 'Aucune sortie produite' });
          appendTerminal(`Cas ${index + 1}/${cases.length} non validé.`, 'error');
        } else appendTerminal(`Cas ${index + 1}/${cases.length} validé.`, 'success');
      } catch (error) {
        failureCount += 1;
        const runtimeDetails = [error.runtimeOutput, error.message || String(error)].filter(Boolean).join('\n');
        addTestFailureReport({ index, total: cases.length, stdin: testCase.stdin || '', output: runtimeDetails, expected, title: 'Erreur d’exécution' });
        appendTerminal(`Cas ${index + 1}/${cases.length} : erreur d’exécution.`, 'error');
        break;
      }
    }
    if (failureCount === 0) {
      localStorage.setItem(solvedKey(language, exercise), '1');
      renderExerciseList();
      appendTerminal('Tous les cas de test sont validés.', 'success');
      setTerminalState('réussi', 'success');
      clearTestReport();
    } else {
      appendTerminal(`${failureCount} cas de test en échec. Consultez le rapport détaillé.`, 'error');
      setTerminalState('test échoué', 'error');
      dom.testReport?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  } finally {
    setRunning(false);
    dom.terminalOutput.scrollTop = dom.terminalOutput.scrollHeight;
  }
}

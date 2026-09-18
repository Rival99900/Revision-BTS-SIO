async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try { return await fetch(url, { ...options, signal: controller.signal }); }
  catch (error) {
    if (error.name === 'AbortError') throw markEngineError(new Error('Le moteur distant ne répond pas. Réessayez dans quelques instants.'));
    throw error;
  } finally { clearTimeout(timer); }
}

/* Code Lab — moteurs d’exécution et détection des entrées */

function setRunning(value) {
  state.running = value;
  updateRunAvailability();
  if (value) dom.runButton.textContent = '… Exécution';
}

function runPythonWorker(code, inputs) {
  return new Promise((resolve, reject) => {
    let timer;
    const fail = (message) => {
      clearTimeout(timer);
      state.pythonWorker?.terminate();
      state.pythonWorker = null;
      setRuntimeStatus('python', 'indisponible', 'error');
      reject(new Error(message));
    };
    try {
      if (!state.pythonWorker) {
        state.pythonWorker = new Worker(new URL('code-lab-python-worker.js', pythonRuntimeScriptURL));
        setRuntimeStatus('python', 'chargement…');
      }
      // Initial download gets more time than execution itself.
      timer = setTimeout(() => fail('Le chargement Python prend trop de temps. Vérifiez votre connexion puis réessayez.'), 60000);
      state.pythonWorker.onerror = () => fail('Impossible de démarrer Python. Vérifiez votre connexion puis réessayez.');
      state.pythonWorker.onmessage = ({ data }) => {
        clearTimeout(timer);
        if (data.ready) {
          setRuntimeStatus('python', 'prêt', 'ready');
          timer = setTimeout(() => fail('Exécution arrêtée après 10 secondes. Vérifiez vos boucles puis réessayez.'), 10000);
        } else if (data.error) fail(data.error);
        else resolve(data.results.map((item) => {
          if (!item.error) return { output: item.output };
          const error = new Error(item.error);
          error.runtimeOutput = item.output;
          return { error };
        }));
      };
      state.pythonWorker.postMessage({ code, inputs });
    } catch (error) { fail(error.message); }
  });
}

const pythonRuntimeScriptURL = document.currentScript.src;

async function runPython(code, stdin) {
  const [result] = await runPythonWorker(code, [stdin || '']);
  if (result.error) throw result.error;
  return result.output;
}

async function runPythonBatch(code, cases) {
  return runPythonWorker(code, cases.map((testCase) => String(testCase.stdin || '')));
}

async function getJudgeLanguages() {
  if (state.judgeLanguages) return state.judgeLanguages;
  const response = await fetchWithTimeout('https://ce.judge0.com/languages');
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

function encodeBase64Utf8(value) {
  const bytes = new TextEncoder().encode(String(value ?? ''));
  let binary = '';
  const chunkSize = 0x8000;
  for (let index = 0; index < bytes.length; index += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
  }
  return btoa(binary);
}

function decodeBase64Utf8(value) {
  if (!value) return '';
  try {
    const binary = atob(String(value));
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  } catch {
    return String(value);
  }
}

function flattenJudgeMessage(payload) {
  if (!payload) return '';
  if (typeof payload === 'string') return payload;
  if (Array.isArray(payload)) return payload.map(flattenJudgeMessage).filter(Boolean).join(' • ');
  if (typeof payload === 'object') {
    return Object.entries(payload)
      .map(([key, value]) => `${key}: ${flattenJudgeMessage(value)}`)
      .filter((entry) => !entry.endsWith(': '))
      .join(' • ');
  }
  return String(payload);
}

function markEngineError(error) {
  error.engineError = true;
  return error;
}

async function judgeHttpError(response, context) {
  let detail = '';
  try {
    const payload = await response.clone().json();
    detail = flattenJudgeMessage(payload);
  } catch {
    try { detail = (await response.text()).trim(); } catch { detail = ''; }
  }

  if (response.status === 400) {
    return markEngineError(new Error(`Le moteur d’exécution a refusé la requête.${detail ? ` Détail : ${detail}` : ' Vérifiez le code puis réessayez.'}`));
  }
  if (response.status === 429) return markEngineError(new Error('Le moteur d’exécution reçoit trop de demandes. Attendez quelques secondes puis réessayez.'));
  if (response.status >= 500) return markEngineError(new Error('Le moteur d’exécution distant rencontre un problème temporaire. Réessayez dans quelques instants.'));
  return markEngineError(new Error(`${context} (HTTP ${response.status})${detail ? ` : ${detail}` : '.'}`));
}

async function runJudge0(language, code, stdin) {
  setRuntimeStatus(language, 'connexion…');
  let languages;
  try {
    languages = await getJudgeLanguages();
  } catch (error) {
    setRuntimeStatus(language, 'indisponible', 'error');
    throw markEngineError(new Error(error?.message || 'Impossible de contacter le moteur d’exécution distant.'));
  }

  const languageId = findJudgeLanguageId(languages, language);
  const payload = {
    language_id: languageId,
    source_code: encodeBase64Utf8(code),
    stdin: encodeBase64Utf8(stdin || ''),
  };

  let createResponse;
  try {
    createResponse = await fetchWithTimeout('https://ce.judge0.com/submissions?base64_encoded=true&wait=false', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    setRuntimeStatus(language, 'indisponible', 'error');
    throw markEngineError(new Error('Impossible de contacter Judge0. Vérifiez votre connexion Internet puis réessayez.'));
  }

  if (!createResponse.ok) throw await judgeHttpError(createResponse, 'Impossible d’envoyer le code au moteur d’exécution');
  const created = await createResponse.json();
  if (!created.token) throw new Error('Le moteur d’exécution n’a pas renvoyé de jeton. Réessayez dans quelques instants.');

  let result = null;
  for (let attempt = 0; attempt < 24; attempt += 1) {
    await new Promise((resolve) => window.setTimeout(resolve, 350));
    let resultResponse;
    try {
      resultResponse = await fetchWithTimeout(`https://ce.judge0.com/submissions/${created.token}?base64_encoded=true&fields=stdout,stderr,compile_output,message,status,time,memory`);
    } catch {
      throw markEngineError(new Error('La connexion au moteur d’exécution a été interrompue pendant le traitement.'));
    }
    if (!resultResponse.ok) throw await judgeHttpError(resultResponse, 'Impossible de récupérer le résultat');
    result = await resultResponse.json();
    if (result?.status?.id && result.status.id > 2) break;
  }

  if (!result || !result.status || result.status.id <= 2) throw new Error('Le programme n’a pas terminé dans le délai prévu.');
  setRuntimeStatus(language, 'prêt', 'ready');

  const stdout = decodeBase64Utf8(result.stdout);
  const compileOutput = decodeBase64Utf8(result.compile_output);
  const stderr = decodeBase64Utf8(result.stderr);
  const message = decodeBase64Utf8(result.message);
  const details = [compileOutput, stderr, message].filter((value) => String(value || '').trim()).join('\n').trim();

  if (result.status.id !== 3) {
    const description = result.status.description || 'Erreur d’exécution';
    const error = new Error(details || description);
    error.runtimeOutput = stdout;
    error.runtimeStatus = description;
    throw error;
  }
  return `${stdout}${details ? `${stdout && !stdout.endsWith('\n') ? '\n' : ''}${details}` : ''}`;
}

function splitInteractiveInputValues(value) {
  const source = String(value ?? '');
  const tokens = [];
  let token = '';
  let quote = '';
  let escaped = false;

  const pushToken = () => {
    if (token.length) tokens.push(token);
    token = '';
  };

  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    if (quote) {
      if (escaped) {
        token += char;
        escaped = false;
      } else if (char === '\\') escaped = true;
      else if (char === quote) quote = '';
      else token += char;
      continue;
    }

    if (char === '"' || char === "'") {
      quote = char;
      continue;
    }
    if (/\s/.test(char)) {
      pushToken();
      continue;
    }
    token += char;
  }
  pushToken();
  return tokens;
}

function normalizeInteractiveStdin(value, requirement) {
  const raw = String(value ?? '').replace(/\r\n/g, '\n');
  if (!requirement || requirement.mode !== 'stdin' || Number(requirement.count || 0) <= 1) return raw;
  // Explicit lines are already input records: preserve spaces and empty lines.
  if (raw.includes('\n')) return raw;
  const tokens = splitInteractiveInputValues(raw);
  return tokens.length ? `${tokens.join('\n')}\n` : '';
}

function parsePhpPostInput(stdin) {
  const result = {};
  splitInteractiveInputValues(stdin).forEach((entry) => {
    const separator = entry.indexOf('=');
    if (separator === -1) return;
    const key = entry.slice(0, separator).trim();
    const value = entry.slice(separator + 1).trim();
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
  if (className && className !== 'Main') code = renameJavaIdentifier(code, className, 'Main');
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

function judgeBatchOutcome(result) {
  const stdout = decodeBase64Utf8(result?.stdout);
  const compileOutput = decodeBase64Utf8(result?.compile_output);
  const stderr = decodeBase64Utf8(result?.stderr);
  const message = decodeBase64Utf8(result?.message);
  const details = [compileOutput, stderr, message].filter((value) => String(value || '').trim()).join('\n').trim();
  const statusId = Number(result?.status?.id || 0);

  if (statusId === 3) {
    return { output: `${stdout}${details ? `${stdout && !stdout.endsWith('\n') ? '\n' : ''}${details}` : ''}` };
  }

  const description = result?.status?.description || (statusId <= 2 ? 'Exécution incomplète' : 'Erreur d’exécution');
  const error = new Error(details || description);
  error.runtimeOutput = stdout;
  error.runtimeStatus = description;
  return { error };
}

async function runJudge0Batch(language, code, cases, requirement, filename) {
  setRuntimeStatus(language, 'tests rapides…');
  const languages = await getJudgeLanguages();
  const languageId = findJudgeLanguageId(languages, language);
  const submissions = cases.map((testCase) => {
    const stdin = String(testCase.stdin || '');
    const prepared = prepareSource(language, code, stdin, requirement, filename);
    return {
      language_id: languageId,
      source_code: encodeBase64Utf8(prepared),
      stdin: encodeBase64Utf8(stdin),
    };
  });

  let createResponse;
  try {
    createResponse = await fetchWithTimeout('https://ce.judge0.com/submissions/batch?base64_encoded=true', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ submissions }),
    });
  } catch {
    throw markEngineError(new Error('Impossible de contacter Judge0 pour lancer les tests groupés.'));
  }

  if (!createResponse.ok) {
    const error = await judgeHttpError(createResponse, 'Impossible de lancer les tests groupés');
    error.batchFailed = true;
    throw error;
  }

  const createdPayload = await createResponse.json();
  const created = Array.isArray(createdPayload) ? createdPayload : (createdPayload?.submissions || []);
  const tokens = created.map((item) => item?.token).filter(Boolean);
  if (tokens.length !== cases.length) {
    const error = new Error('Le moteur n’a pas créé tous les cas de test groupés.');
    error.batchFailed = true;
    throw error;
  }

  let results = [];
  for (let attempt = 0; attempt < 30; attempt += 1) {
    await new Promise((resolve) => window.setTimeout(resolve, attempt < 3 ? 180 : 280));
    let response;
    try {
      const fields = 'token,stdout,stderr,compile_output,message,status,time,memory';
      response = await fetchWithTimeout(`https://ce.judge0.com/submissions/batch?tokens=${encodeURIComponent(tokens.join(','))}&base64_encoded=true&fields=${fields}`);
    } catch {
      throw markEngineError(new Error('La connexion à Judge0 a été interrompue pendant les tests groupés.'));
    }
    if (!response.ok) {
      const error = await judgeHttpError(response, 'Impossible de récupérer les tests groupés');
      error.batchFailed = true;
      throw error;
    }

    const payload = await response.json();
    const submissionsResult = Array.isArray(payload) ? payload : (payload?.submissions || []);
    const byToken = new Map(submissionsResult.map((item) => [item?.token, item]));
    results = tokens.map((token, index) => byToken.get(token) || submissionsResult[index] || null);
    if (results.every((item) => Number(item?.status?.id || 0) > 2)) break;
  }

  if (!results.length || results.some((item) => Number(item?.status?.id || 0) <= 2)) {
    const error = new Error('Les tests groupés n’ont pas terminé dans le délai prévu.');
    error.batchFailed = true;
    throw error;
  }

  setRuntimeStatus(language, 'prêt', 'ready');
  return results.map(judgeBatchOutcome);
}

async function runRemoteCasesLimited(language, code, cases, requirement, filename, concurrency = 4) {
  const results = new Array(cases.length);
  let cursor = 0;
  const workers = Array.from({ length: Math.min(concurrency, cases.length) }, async () => {
    while (true) {
      const index = cursor;
      cursor += 1;
      if (index >= cases.length) return;
      const stdin = String(cases[index].stdin || '');
      try {
        results[index] = { output: await runSource(language, code, stdin, requirement, filename) };
      } catch (error) {
        results[index] = { error };
      }
    }
  });
  await Promise.all(workers);
  return results;
}

async function runTestCasesFast(language, code, cases, requirement, filename) {
  if (language === 'python') {
    return runPythonBatch(code, cases);
  }

  try {
    return await runJudge0Batch(language, code, cases, requirement, filename);
  } catch (error) {
    if (!error?.batchFailed) throw error;
    appendTerminal('Le mode groupé est indisponible : bascule automatique sur 4 tests simultanés.');
    return runRemoteCasesLimited(language, code, cases, requirement, filename, 4);
  }
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
  const saved = appStorage.getItem(stdinStorageKey(file));
  let suggested = saved ?? exercise?.stdin ?? '';
  if (requirement.mode === 'php-post' && requirement.keys?.length && !saved) suggested = requirement.keys.map((key) => `${key}=`).join('\n');
  dom.stdinModalInput.value = suggested;
  dom.stdinModalContext.textContent = `${file.name} • ${requirement.label}${requirement.count ? ` • ${requirement.count} lecture(s) estimée(s)` : ''}`;
  dom.stdinModalHelp.textContent = requirement.mode === 'php-post'
    ? 'Séparez les couples clé=valeur par espace ou retour à la ligne. Utilisez des guillemets pour conserver des espaces dans une valeur.'
    : requirement.count > 1
      ? 'Séparez les entrées par espace ou retour à la ligne. Entourez une valeur contenant des espaces avec des guillemets.'
      : 'Saisissez la valeur attendue. Les espaces sont conservés pour une lecture unique.';
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
  const rawStdin = forceEmpty ? '' : dom.stdinModalInput.value;
  const stdin = requirement?.mode === 'php-post' ? rawStdin : normalizeInteractiveStdin(rawStdin, requirement);
  appStorage.setItem(stdinStorageKey(file), rawStdin);
  closeStdinModal({ restoreView: false });
  executeCode(stdin, requirement);
}

function requestExecution() {
  if (state.running) return;
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
  if (state.running) return null;
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
    if (language !== 'python') {
      setRuntimeStatus(language, error.engineError ? 'indisponible' : 'prêt', error.engineError ? 'error' : 'ready');
    }
    return null;
  } finally {
    setRunning(false);
    dom.terminalOutput.scrollTop = dom.terminalOutput.scrollHeight;
  }
}

async function testExercise() {
  if (state.running) return;
  const exercise = currentExercise();
  const file = activeFile();
  const language = activeLanguage();
  if (!exercise || !file) return;

  const code = dom.codeEditor.value;
  const cases = Array.isArray(exercise.tests) && exercise.tests.length
    ? exercise.tests
    : [{ stdin: exercise.stdin || '', expected: exercise.expected || '' }];

  if (!code.trim()) {
    clearTerminal();
    appendTerminal('Le code est vide. Complétez l’exercice avant de le tester.', 'error');
    return;
  }

  setRunning(true);
  clearTerminal();
  clearTestReport();
  setTerminalState(`tests 0/${cases.length}`);
  appendTerminal(`$ test ${file.name} // ${cases.length} cas en mode rapide`);
  scrollTerminalIntoView();

  let failureCount = 0;
  let executedCount = 0;
  let interrupted = false;

  try {
    const requirement = detectInputRequirement(language, code);
    const startedAt = performance.now();
    const outcomes = await runTestCasesFast(language, code, cases, requirement, file.name);
    const elapsed = Math.max(0, performance.now() - startedAt);

    for (let index = 0; index < outcomes.length; index += 1) {
      const outcome = outcomes[index] || {};
      const testCase = cases[index];
      const expected = normalizeOutput(testCase.expected);
      executedCount = index + 1;
      setTerminalState(`tests ${executedCount}/${cases.length}`);

      if (outcome.error) {
        const error = outcome.error;
        failureCount += 1;
        const runtimeDetails = [error.runtimeOutput, error.message || String(error)].filter(Boolean).join('\n');
        addTestFailureReport({
          index,
          total: cases.length,
          stdin: testCase.stdin || '',
          output: runtimeDetails,
          expected,
          title: 'Erreur d’exécution',
        });
        appendTerminal(`Cas ${index + 1}/${cases.length} : erreur d’exécution.`, 'error');

        const status = String(error.runtimeStatus || '');
        const fatal = Boolean(error.engineError) || /compilation|internal error|time limit|memory limit/i.test(status);
        if (fatal) {
          interrupted = true;
          appendTerminal('Erreur bloquante détectée : le rapport s’arrête ici pour rester lisible.', 'error');
          break;
        }
        continue;
      }

      const actual = normalizeOutput(outcome.output);
      if (actual !== expected) {
        failureCount += 1;
        addTestFailureReport({
          index,
          total: cases.length,
          stdin: testCase.stdin || '',
          output: actual,
          expected,
          title: actual ? 'Sortie différente' : 'Aucune sortie produite',
        });
        appendTerminal(`Cas ${index + 1}/${cases.length} non validé.`, 'error');
      }
    }

    const durationLabel = elapsed < 1000 ? `${Math.round(elapsed)} ms` : `${(elapsed / 1000).toFixed(2)} s`;
    if (failureCount === 0 && outcomes.length === cases.length) {
      appStorage.setItem(solvedKey(language, exercise), '1');
      renderExerciseList();
      appendTerminal(`Tous les ${cases.length} cas sont validés en ${durationLabel}.`, 'success');
      setTerminalState('réussi', 'success');
      clearTestReport();
    } else {
      const coverage = interrupted ? ` (${executedCount}/${cases.length} résultats affichés)` : '';
      appendTerminal(`${failureCount} cas en échec${coverage}. Temps de test : ${durationLabel}.`, 'error');
      setTerminalState('test échoué', 'error');
      dom.testReport?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  } catch (error) {
    const runtimeDetails = [error.runtimeOutput, error.message || String(error)].filter(Boolean).join('\n');
    addTestFailureReport({
      index: 0,
      total: cases.length,
      stdin: cases[0]?.stdin || '',
      output: runtimeDetails,
      expected: normalizeOutput(cases[0]?.expected || ''),
      title: 'Impossible de lancer les tests',
    });
    appendTerminal(error.message || String(error), 'error');
    setTerminalState('erreur', 'error');
  } finally {
    setRunning(false);
    dom.terminalOutput.scrollTop = dom.terminalOutput.scrollHeight;
  }
}


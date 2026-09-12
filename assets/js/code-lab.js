/* Code Lab — comportement de l’éditeur et initialisation */

const EDITOR_PAIRS = { '(': ')', '[': ']', '{': '}', '"': '"', "'": "'" };
const EDITOR_CLOSERS = new Set(Object.values(EDITOR_PAIRS));

function applyEditorContent(value, cursorStart, cursorEnd = cursorStart, recordHistory = true) {
  const previous = activeFile()?.content ?? dom.codeEditor.value;
  if (recordHistory && previous !== value) pushHistory(previous);
  dom.codeEditor.value = value;
  dom.codeEditor.selectionStart = cursorStart;
  dom.codeEditor.selectionEnd = cursorEnd;
  setActiveFileContent(value, { history: false });
  updateEditorDecorations();
  renderFileList();
}

function wrapOrInsertPair(opening, closing) {
  const editor = dom.codeEditor;
  const start = editor.selectionStart;
  const end = editor.selectionEnd;
  const value = editor.value;
  const selected = value.slice(start, end);
  if (selected) {
    const replacement = `${opening}${selected}${closing}`;
    applyEditorContent(`${value.slice(0, start)}${replacement}${value.slice(end)}`, start + 1, start + 1 + selected.length);
  } else applyEditorContent(`${value.slice(0, start)}${opening}${closing}${value.slice(end)}`, start + 1);
}

function lineIndentBefore(position) {
  const before = dom.codeEditor.value.slice(0, position);
  const lineStart = before.lastIndexOf('\n') + 1;
  return (before.slice(lineStart).match(/^[ \t]*/) || [''])[0];
}

function lineTextBefore(position) {
  const before = dom.codeEditor.value.slice(0, position);
  return before.slice(before.lastIndexOf('\n') + 1);
}

function singleStatementConditionalHeader(language, trimmedLine) {
  const line = String(trimmedLine || '').trim();
  if (!line || line.endsWith(':') || line.endsWith('{')) return false;

  if (language === 'php') {
    return /^(?:(?:if|elseif|else\s+if|while|for|foreach|switch)\s*\([^\n]*\)|else)\s*$/i.test(line);
  }
  if (language === 'java') {
    return /^(?:(?:if|else\s+if|while|for|switch)\s*\([^\n]*\)|else)\s*$/i.test(line);
  }
  return false;
}

function conditionHeaderWithoutBraces(language, trimmedLine) {
  const line = String(trimmedLine || '').trim();
  if (!line) return false;

  if (language === 'php') {
    if (singleStatementConditionalHeader(language, line)) return true;
    if (/^(?:if|elseif|else\s+if|else|while|for|foreach|switch)\b[\s\S]*:\s*$/i.test(line)) return true;
  }

  if (language === 'java') {
    if (singleStatementConditionalHeader(language, line)) return true;
  }

  return false;
}

function shouldIncreaseIndent(language, trimmedLine) {
  const line = String(trimmedLine || '').trimEnd();
  if (!line) return false;
  if (language === 'python') return line.endsWith(':');
  if ((language === 'java' || language === 'php') && line.endsWith('{')) return true;
  return conditionHeaderWithoutBraces(language, line);
}

function findForwardExpressionEnd(value, start) {
  if (start >= value.length || /\s/.test(value[start])) return -1;
  let index = start;
  let parenDepth = 0;
  let bracketDepth = 0;
  let braceDepth = 0;
  let quote = '';
  let escaped = false;

  while (index < value.length) {
    const char = value[index];

    if (quote) {
      if (!escaped && char === quote) quote = '';
      if (!escaped && char === '\\') escaped = true;
      else escaped = false;
      index += 1;
      continue;
    }

    if (char === '"' || char === "'") {
      quote = char;
      index += 1;
      continue;
    }

    if (char === '(') parenDepth += 1;
    else if (char === ')') {
      if (parenDepth === 0) break;
      parenDepth -= 1;
    } else if (char === '[') bracketDepth += 1;
    else if (char === ']') {
      if (bracketDepth === 0) break;
      bracketDepth -= 1;
    } else if (char === '{') braceDepth += 1;
    else if (char === '}') {
      if (braceDepth === 0) break;
      braceDepth -= 1;
    } else if (parenDepth === 0 && bracketDepth === 0 && braceDepth === 0 && /[;,\n]/.test(char)) break;
    else if (parenDepth === 0 && bracketDepth === 0 && braceDepth === 0 && /\s/.test(char)) break;

    index += 1;
  }

  return index > start ? index : -1;
}

function wrapForwardExpressionIfUseful(opening, closing) {
  if (opening !== '(') return false;
  const editor = dom.codeEditor;
  const start = editor.selectionStart;
  const end = editor.selectionEnd;
  if (start !== end || start === 0) return false;
  const value = editor.value;
  const left = value[start - 1] || '';
  const right = value[start] || '';
  if (!/[A-Za-z0-9_$\])]/.test(left) || !/[A-Za-z_$\[("']/.test(right)) return false;
  const expressionEnd = findForwardExpressionEnd(value, start);
  if (expressionEnd === -1) return false;
  applyEditorContent(
    `${value.slice(0, start)}${opening}${value.slice(start, expressionEnd)}${closing}${value.slice(expressionEnd)}`,
    start + 1,
  );
  return true;
}

function previousNonEmptyLineBeforeCurrent(position) {
  const value = dom.codeEditor.value;
  const currentLineStart = value.lastIndexOf('\n', Math.max(0, position - 1)) + 1;
  let cursor = currentLineStart - 1;
  while (cursor >= 0) {
    const lineEnd = cursor;
    const lineStart = value.lastIndexOf('\n', Math.max(0, lineEnd - 1)) + 1;
    const text = value.slice(lineStart, lineEnd + 1).replace(/\n$/, '');
    if (text.trim()) return { text, indent: (text.match(/^[ \t]*/) || [''])[0] };
    cursor = lineStart - 2;
  }
  return null;
}

function dedentAfterSingleStatement(language, position, currentIndent, currentLine) {
  if (!['php', 'java'].includes(language) || !String(currentLine || '').trim()) return null;
  const previous = previousNonEmptyLineBeforeCurrent(position);
  if (!previous || !singleStatementConditionalHeader(language, previous.text.trim())) return null;
  if (currentIndent.length <= previous.indent.length) return null;
  return previous.indent;
}

function handleSmartEnter(event) {
  const editor = dom.codeEditor;
  const start = editor.selectionStart;
  const end = editor.selectionEnd;
  const value = editor.value;
  const before = value.slice(0, start);
  const after = value.slice(end);
  const indent = lineIndentBefore(start);
  const trimmedBefore = lineTextBefore(start).trimEnd();
  const left = before.at(-1) || '';
  const right = after[0] || '';
  const pairedAtCursor = EDITOR_PAIRS[left] === right && !['"', "'"].includes(left);
  event.preventDefault();
  if (pairedAtCursor) {
    const innerIndent = `${indent}${INDENT_UNIT}`;
    const insertion = `\n${innerIndent}\n${indent}`;
    applyEditorContent(`${before}${insertion}${after}`, start + 1 + innerIndent.length);
    return;
  }
  let nextIndent = indent;
  const language = activeLanguage();
  if (shouldIncreaseIndent(language, trimmedBefore)) nextIndent += INDENT_UNIT;
  else {
    const dedented = dedentAfterSingleStatement(language, start, indent, trimmedBefore);
    if (dedented !== null) nextIndent = dedented;
  }
  const insertion = `\n${nextIndent}`;
  applyEditorContent(`${before}${insertion}${after}`, start + insertion.length);
}

function handleSmartBackspace(event) {
  const editor = dom.codeEditor;
  const start = editor.selectionStart;
  const end = editor.selectionEnd;
  if (start !== end || start === 0) return false;
  const value = editor.value;
  const left = value[start - 1];
  const right = value[start];
  if (EDITOR_PAIRS[left] !== right) return false;
  event.preventDefault();
  applyEditorContent(`${value.slice(0, start - 1)}${value.slice(start + 1)}`, start - 1);
  return true;
}

function handleTab(event) {
  const editor = dom.codeEditor;
  const start = editor.selectionStart;
  const end = editor.selectionEnd;
  const value = editor.value;
  event.preventDefault();
  if (start !== end && value.slice(start, end).includes('\n')) {
    const firstLineStart = value.lastIndexOf('\n', start - 1) + 1;
    const lastLineEndIndex = value.indexOf('\n', end);
    const blockEnd = lastLineEndIndex === -1 ? value.length : lastLineEndIndex;
    const block = value.slice(firstLineStart, blockEnd);
    const lines = block.split('\n');
    if (event.shiftKey) {
      let removedBeforeStart = 0;
      let removedTotal = 0;
      const updated = lines.map((line, index) => {
        const match = line.match(/^( {1,4}|\t)/);
        const removed = match ? match[0].length : 0;
        if (index === 0) removedBeforeStart = Math.min(removed, start - firstLineStart);
        removedTotal += removed;
        return removed ? line.slice(removed) : line;
      }).join('\n');
      applyEditorContent(`${value.slice(0, firstLineStart)}${updated}${value.slice(blockEnd)}`, Math.max(firstLineStart, start - removedBeforeStart), Math.max(firstLineStart, end - removedTotal));
    } else {
      const updated = lines.map((line) => `${INDENT_UNIT}${line}`).join('\n');
      applyEditorContent(`${value.slice(0, firstLineStart)}${updated}${value.slice(blockEnd)}`, start + INDENT_UNIT.length, end + lines.length * INDENT_UNIT.length);
    }
    return;
  }
  if (event.shiftKey) {
    const lineStart = value.lastIndexOf('\n', start - 1) + 1;
    const indentMatch = value.slice(lineStart, start).match(/^( {1,4}|\t)/);
    if (indentMatch) {
      const count = indentMatch[0].length;
      applyEditorContent(`${value.slice(0, lineStart)}${value.slice(lineStart + count)}`, Math.max(lineStart, start - count), Math.max(lineStart, end - count));
    }
    return;
  }
  applyEditorContent(`${value.slice(0, start)}${INDENT_UNIT}${value.slice(end)}`, start + INDENT_UNIT.length);
}

function handleEditorKeydown(event) {
  const editor = dom.codeEditor;
  const command = event.ctrlKey || event.metaKey;
  if (command && event.key.toLowerCase() === 's') {
    event.preventDefault();
    saveActiveFile();
    return;
  }
  if (command && event.key.toLowerCase() === 'z' && !event.shiftKey) {
    event.preventDefault();
    undoActiveFile();
    return;
  }
  if (command && (event.key.toLowerCase() === 'y' || (event.key.toLowerCase() === 'z' && event.shiftKey))) {
    event.preventDefault();
    redoActiveFile();
    return;
  }
  if (command && event.key === 'Enter') {
    event.preventDefault();
    requestExecution();
    return;
  }
  if (event.key === 'Tab') return handleTab(event);
  if (event.key === 'Enter') return handleSmartEnter(event);
  if (event.key === 'Backspace' && handleSmartBackspace(event)) return;
  if (command || event.altKey) return;
  const start = editor.selectionStart;
  const end = editor.selectionEnd;
  const value = editor.value;
  if (Object.hasOwn(EDITOR_PAIRS, event.key)) {
    if ((event.key === '"' || event.key === "'") && start === end && value[start] === event.key) {
      event.preventDefault();
      editor.selectionStart = editor.selectionEnd = start + 1;
      return;
    }
    event.preventDefault();
    if (!wrapForwardExpressionIfUseful(event.key, EDITOR_PAIRS[event.key])) {
      wrapOrInsertPair(event.key, EDITOR_PAIRS[event.key]);
    }
    return;
  }
  if (EDITOR_CLOSERS.has(event.key) && start === end && value[start] === event.key) {
    event.preventDefault();
    editor.selectionStart = editor.selectionEnd = start + 1;
  }
}

function handleEditorInput() {
  const file = activeFile();
  if (!file) return;
  const previous = file.content;
  const current = dom.codeEditor.value;
  if (previous !== current) {
    pushHistory(previous);
    file.content = current;
    file.updatedAt = Date.now();
    persistProject();
  }
  if (activeLanguage() === 'php') {
    const editor = dom.codeEditor;
    const cursor = editor.selectionStart;
    const before = editor.value.slice(0, cursor);
    const after = editor.value.slice(cursor);
    if (before.endsWith('<?php') && !after.includes('?>')) {
      const insertion = '\n\n?>';
      applyEditorContent(`${before}${insertion}${after}`, cursor + 1);
      return;
    }
  }
  updateEditorDecorations();
  updateSaveState();
  renderFileList();
}

function bindEvents() {
  dom.codeEditor.addEventListener('input', handleEditorInput);
  dom.codeEditor.addEventListener('scroll', syncEditorScroll);
  dom.codeEditor.addEventListener('keydown', handleEditorKeydown);
  dom.runButton.addEventListener('click', requestExecution);
  dom.testButton.addEventListener('click', testExercise);
  dom.resetButton.addEventListener('click', resetCurrentFile);
  dom.clearButton.addEventListener('click', clearTerminal);
  dom.hintButton.addEventListener('click', () => {
    if (!currentExercise()) return;
    dom.hintBox.hidden = !dom.hintBox.hidden;
  });
  dom.insertHintButton.addEventListener('click', insertHintSnippet);

  dom.newFileButton.addEventListener('click', () => openFileModal('create'));
  dom.saveFileButton.addEventListener('click', saveActiveFile);
  dom.downloadFileButton.addEventListener('click', downloadActiveFile);
  dom.renameFileButton.addEventListener('click', () => openFileModal('rename'));
  dom.deleteFileButton.addEventListener('click', deleteActiveFile);

  dom.fileModalConfirm.addEventListener('click', confirmFileModal);
  dom.fileModalCancel.addEventListener('click', closeFileModal);
  dom.fileModalClose.addEventListener('click', closeFileModal);
  dom.fileModalBackdrop.addEventListener('click', closeFileModal);
  dom.fileNameInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') { event.preventDefault(); confirmFileModal(); }
    if (event.key === 'Escape') { event.preventDefault(); closeFileModal(); }
  });

  dom.stdinModalRun.addEventListener('click', () => launchFromStdinModal(false));
  dom.stdinModalEmpty.addEventListener('click', () => launchFromStdinModal(true));
  dom.stdinModalCancel.addEventListener('click', closeStdinModal);
  dom.stdinModalClose.addEventListener('click', closeStdinModal);
  dom.stdinModalBackdrop.addEventListener('click', closeStdinModal);
  dom.stdinModalInput.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') { event.preventDefault(); closeStdinModal(); }
    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) { event.preventDefault(); launchFromStdinModal(false); }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (!dom.fileModal.hidden) closeFileModal();
      else if (!dom.stdinModal.hidden) closeStdinModal();
    }
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's' && document.activeElement !== dom.codeEditor) {
      event.preventDefault();
      saveActiveFile();
    }
  });

  window.addEventListener('beforeunload', (event) => {
    syncEditorToActiveFile();
    if (!anyDirtyFiles()) return;
    event.preventDefault();
    event.returnValue = '';
  });
}

function init() {
  Object.assign(dom, {
    fileCount: byId('fileCount'),
    fileList: byId('fileList'),
    exerciseCount: byId('exerciseCount'),
    exerciseList: byId('exerciseList'),
    exerciseEmpty: byId('exerciseEmpty'),
    editorFilename: byId('editorFilename'),
    saveState: byId('saveState'),
    exerciseBrief: byId('exerciseBrief'),
    exerciseDifficulty: byId('exerciseDifficulty'),
    exercisePosition: byId('exercisePosition'),
    exerciseTitle: byId('exerciseTitle'),
    exerciseDescription: byId('exerciseDescription'),
    exerciseInput: byId('exerciseInput'),
    exerciseExpected: byId('exerciseExpected'),
    editorShell: byId('editorShell'),
    codeEditor: byId('codeEditor'),
    highlightLayer: byId('highlightLayer'),
    lineNumbers: byId('lineNumbers'),
    runButton: byId('runButton'),
    testButton: byId('testButton'),
    hintButton: byId('hintButton'),
    resetButton: byId('resetButton'),
    clearButton: byId('clearButton'),
    terminalPanel: document.querySelector('.terminal-panel'),
    terminalOutput: byId('terminalOutput'),
    terminalState: byId('terminalState'),
    testReport: byId('testReport'),
    testReportSummary: byId('testReportSummary'),
    testReportList: byId('testReportList'),
    hintBox: byId('hintBox'),
    hintText: byId('hintText'),
    hintLevel: byId('hintLevel'),
    insertHintButton: byId('insertHintButton'),
    newFileButton: byId('newFileButton'),
    saveFileButton: byId('saveFileButton'),
    downloadFileButton: byId('downloadFileButton'),
    renameFileButton: byId('renameFileButton'),
    deleteFileButton: byId('deleteFileButton'),
    fileModal: byId('fileModal'),
    fileModalBackdrop: byId('fileModalBackdrop'),
    fileModalClose: byId('fileModalClose'),
    fileModalTitle: byId('fileModalTitle'),
    fileModalDescription: byId('fileModalDescription'),
    fileNameInput: byId('fileNameInput'),
    fileModalError: byId('fileModalError'),
    fileModalConfirm: byId('fileModalConfirm'),
    fileModalCancel: byId('fileModalCancel'),
    stdinModal: byId('stdinModal'),
    stdinModalBackdrop: byId('stdinModalBackdrop'),
    stdinModalInput: byId('stdinModalInput'),
    stdinModalContext: byId('stdinModalContext'),
    stdinModalHelp: byId('stdinModalHelp'),
    stdinModalRun: byId('stdinModalRun'),
    stdinModalEmpty: byId('stdinModalEmpty'),
    stdinModalCancel: byId('stdinModalCancel'),
    stdinModalClose: byId('stdinModalClose'),
  });
  loadProject();
  setRuntimeStatus('php', navigator.onLine ? 'en ligne' : 'hors ligne', navigator.onLine ? '' : 'error');
  setRuntimeStatus('java', navigator.onLine ? 'en ligne' : 'hors ligne', navigator.onLine ? '' : 'error');
  bindEvents();
  renderActiveFile();
}

document.addEventListener('DOMContentLoaded', init);

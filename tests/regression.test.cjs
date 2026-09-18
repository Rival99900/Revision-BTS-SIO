const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const source = name => fs.readFileSync(path.join(root, 'assets/js', name), 'utf8');
function context(extra = {}) {
  const elements = new Map();
  const element = id => {
    if (!elements.has(id)) elements.set(id, { textContent: '', style: {}, classList: { add() {}, remove() {}, toggle() {} } });
    return elements.get(id);
  };
  const c = vm.createContext({ console, URL, URLSearchParams, setTimeout, clearTimeout,
    document: { currentScript: { src: 'http://localhost/assets/js/code-lab-runtime.js' }, addEventListener() {}, getElementById: element, querySelectorAll: () => [] },
    ...extra });
  c.window = c;
  return { c, element, run: s => vm.runInContext(s, c) };
}
test('quiz score/progress includes the answer just submitted, never above 100%', () => {
  const {run,element} = context();run(source('quiz.js'));
  run('activeQ = [{}, {}]; cur = 0; score = 1; answered = true; updateStats()');
  assert.equal(element('tv').textContent, 1);assert.equal(element('pctv').textContent, '100%');
  assert.equal(element('pfb').style.width, '50%');
  run('cur = 1; score = 2; updateStats()');assert.equal(element('pctv').textContent, '100%');
});
test('changing year or subject clears the chapter restriction', () => {
  const {run} = context();run(source('quiz.js'));run('restart = () => {}; chapterFilter = "2"; setFilter("module", "maths")');
  assert.equal(run('chapterFilter'),'all');run('chapterFilter = "2"; setFilter("year", "2")');assert.equal(run('chapterFilter'),'all');
});
test('repeated Next cannot skip an unanswered question', () => {
  const {run} = context();run(source('quiz.js'));run('activeQ = [{},{}]; render = () => {}; answered = true; nextQ(); nextQ()');assert.equal(run('cur'),1);
});
test('blocked storage does not interrupt editing and retains session values', () => {
  const {run} = context({localStorage:{getItem(){throw Error('blocked')},setItem(){throw Error('full')}}});
  run(source('common.js'));assert.equal(run('appStorage.getItem("x")'),null);
  assert.equal(run('appStorage.setItem("x","draft")'),false);assert.equal(run('appStorage.getItem("x")'),'draft');
  run(source('code-lab-core.js'));run('loadProject()');assert.equal(run('state.storageFailed'),true);assert.equal(run('anyDirtyFiles()'),true);
});
test('multiline stdin preserves spaces and empty input records', () => {
  const {run,c} = context();run(source('code-lab-runtime.js'));
  c.input='Jean Dupont\n\nParis\n';assert.equal(run('normalizeInteractiveStdin(input, {mode:"stdin",count:3})'),c.input);
  assert.equal(run('normalizeInteractiveStdin("4 5", {mode:"stdin",count:2})'),'4\n5\n');
});
test('concurrent execution requests are ignored', () => {
  const {run} = context({state:{running:true}});run(source('code-lab-runtime.js'));
  assert.doesNotThrow(()=>run('requestExecution()'));
});
test('every quiz question has a valid answer and explanation', () => {
  const {run,c} = context();
  const html=fs.readFileSync(path.join(root,'quiz.html'),'utf8');
  for(const [,file] of html.matchAll(/src="assets\/js\/([^"?]+)(?:\?[^" ]*)?"/g)) if(file!=='quiz.js')run(source(file));
  assert.ok(c.QUIZ_DATA.length>300);
  for(const q of c.QUIZ_DATA){assert.ok(q.q&&q.exp, JSON.stringify(q));if(q.type==='mcq'){assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<q.opts.length, q.q)}else{assert.ok(q.answers?.length||q.keywords?.length||q.validator,q.q)}}
});
test('Java class adaptation preserves string literals and comments', () => {
  const {run,c} = context();run(source('code-lab-core.js'));run(source('code-lab-runtime.js'));
  c.java = 'public class Bonjour { Bonjour() {} public static void main(String[] args) { System.out.println("Bonjour"); } } // Bonjour';
  const prepared=run('prepareJavaSource(java, "Bonjour.java")');
  assert.match(prepared,/public class Main/);assert.match(prepared,/Main\(\)/);assert.match(prepared,/println\("Bonjour"\)/);assert.match(prepared,/\/\/ Bonjour$/);
});
test('palindrome expected outputs match the definition in all three languages', () => {
  const {run} = context();run(source('code-lab-exercises.js'));
  const exercises=run('Object.values(CODE_LAB_EXERCISES).flat().filter(e => e.concept === "palindrome")');
  for(const exercise of exercises)for(const entry of exercise.tests){const word=entry.stdin;const valid=[...word].reverse().join('')===word;assert.equal(entry.expected,`${word}: ${valid?'palindrome':'non palindrome'}`)}
});

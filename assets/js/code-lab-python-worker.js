/* Python runs outside the UI thread so even an infinite loop can be stopped. */
let runtime;
self.onmessage = async ({ data }) => {
  try {
    if (!runtime) {
      importScripts('https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js');
      runtime = await loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/' });
    }
    self.postMessage({ ready: true });
    runtime.globals.set('__bts_user_code', data.code);
    runtime.globals.set('__bts_inputs_json', JSON.stringify(data.inputs));
    const raw = await runtime.runPythonAsync(`
import sys, io, traceback, json
_bts_results = []
for _bts_stdin in json.loads(__bts_inputs_json):
    _bts_out = io.StringIO()
    _bts_previous = (sys.stdout, sys.stderr, sys.stdin)
    sys.stdout = sys.stderr = _bts_out
    sys.stdin = io.StringIO(_bts_stdin)
    _bts_error = None
    try:
        exec(compile(__bts_user_code, '<CodeLab>', 'exec'), {'__name__': '__main__'})
    except BaseException as _bts_exc:
        if not isinstance(_bts_exc, SystemExit) or _bts_exc.code not in (None, 0):
            _bts_error = traceback.format_exc()
    finally:
        sys.stdout, sys.stderr, sys.stdin = _bts_previous
    _bts_results.append({'output': _bts_out.getvalue(), 'error': _bts_error})
json.dumps(_bts_results, ensure_ascii=False)
`);
    self.postMessage({ results: JSON.parse(raw) });
  } catch (error) {
    self.postMessage({ error: error.message || String(error) });
  }
};

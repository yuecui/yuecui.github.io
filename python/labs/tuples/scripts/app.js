// ==============================
// Frontend Python Autograder — app.js
// ==============================

// ---------- Card configurations ----------
const CARDS = [
  {
    name: 'fruits_tuple',
    description: 'Create and return a tuple with 4 fruit names.',
    starter:
`def fruits_tuple() -> tuple[str, ...]:
    """Create and return a tuple with 4 fruit names."""
    pass
`,
    hints: ['Return a tuple, not a list.', 'Use comma-separated strings inside parentheses.', 'Order can be any 4 common fruits.']
  },

  {
    name: 'first_last_fruit',
    description: 'Return (first_fruit, last_fruit) from a tuple; error if empty.',
    starter:
`def first_last_fruit(fruits: tuple[str, ...]) -> tuple[str, str]:
    """Return (first_fruit, last_fruit). Raise ValueError if empty."""
    pass
`,
    hints: ['Check length before indexing.', 'Use fruits[0] and fruits[-1].', 'Raise ValueError on empty input.']
  },

  {
    name: 'count_fruits',
    description: 'Return the number of fruits in the tuple.',
    starter:
`def count_fruits(fruits: tuple[str, ...]) -> int:
    """Return the number of fruits using len()."""
    pass
`,
    hints: ['Use len(...) directly.', 'Return an int.', 'Works for empty tuples too.']
  },

  {
    name: 'has_apple',
    description: "Return True if 'apple' is in the tuple.",
    starter:
`def has_apple(fruits: tuple[str, ...]) -> bool:
    """Return True if 'apple' is in the tuple."""
    pass
`,
    hints: ["Use the 'in' operator.", "Comparison is case-sensitive.", 'Return a boolean.']
  },



  {
    name: 'sum_pairs',
    description: 'Return a tuple containing the sum of each (a,b) pair.',
    starter:
`def sum_pairs(pairs: tuple[tuple[int, int], ...]) -> tuple[int, ...]:
    """Return a tuple containing the sum of each pair."""
    pass
`,
    hints: ['Iterate over pairs.', 'Accumulate per-pair sums.', 'Convert final list to tuple.']
  },

  {
    name: 'unpack_tuple',
    description: 'Unpack as (a,b,*rest) and return (a,b,rest_list).',
    starter:
`def unpack_tuple(t: tuple[int, ...]) -> tuple[int, int, list[int]]:
    """Return (a,b,rest_list); raise ValueError if len<2."""
    pass
`,
    hints: ['Use starred unpacking: a, b, *rest = t', 'Validate length >= 2.', 'Return list for the tail.']
  },




  {
    name: 'reverse_tuple',
    description: 'Return a reversed tuple.',
    starter:
`def reverse_tuple(t: tuple) -> tuple:
    """Return reversed tuple (slice step -1)."""
    pass
`,
    hints: ['Use t[::-1].', 'Works for any element types.', 'Edge case: empty or 1-length.']
  },

  {
    name: 'multiply_triplets',
    description: 'Multiply each (a,b, c) and return results as tuple.',
    starter:
`def multiply_triplets(triplets: tuple[tuple[int, int, int], ...]) -> tuple[int, ...]:
    """Multiply each triple and return results as a tuple."""
    pass
`,
    hints: ['Iterate and unpack a,b,c.', 'Compute a*b*c.', 'Collect then convert to tuple.']
  },

  {
    name: 'unpack_middle',
    description: 'Return (first, middle_list, last).',
    starter:
`def unpack_middle(t: tuple[int, ...]) -> tuple[int, list[int], int]:
    """Return (first, middle_list, last); raise if len<2."""
    pass
`,
    hints: ['Use first, *middle, last = t', 'Validate length >= 2.', 'Middle must be a list in return.']
  },

  {
    name: 'unpack_nested',
    description: 'Unpack ((a,b),(c,d)) -> (a,b,c,d).',
    starter:
`def unpack_nested(t: tuple[tuple[int, int], tuple[int, int]]) -> tuple[int, int, int, int]:
    """Unpack ((a,b),(c,d)) -> (a,b,c,d)."""
    pass
`,
    hints: ['Double unpack: (a,b),(c,d) = t', 'Return a 4-tuple.', 'Preserve order.']
  },

  {
    name: 'swap_unpack',
    description: 'Return (d, c, b, a) from (a,b,c,d).',
    starter:
`def swap_unpack(t: tuple[int, int, int, int]) -> tuple[int, int, int, int]:
    """Return (d, c, b, a)."""
    pass
`,
    hints: ['Use multi-variable unpack.', 'Return reversed order.', 'Assume length is exactly 4.']
  },

  {
    name: 'flatten_2d_tuple',
    description: 'Flatten a 2D tuple to a 1D tuple (row-major).',
    starter:
`def flatten_2d_tuple(matrix: tuple[tuple[int, ...], ...]) -> tuple[int, ...]:
    """Flatten 2D tuple to 1D tuple (row-major)."""
    pass
`,
    hints: ['Nested loops over rows and values.', 'Append to list then tuple().', 'No comprehensions if disallowed.']
  },

  {
    name: 'reshape_to_2d_tuple',
    description: 'Reshape flat -> 2D with given number of columns.',
    starter:
`def reshape_to_2d_tuple(flat: tuple[int, ...], cols: int) -> tuple[tuple[int, ...], ...]:
    """Reshape flat->2D with given cols; raise ValueError if not divisible."""
    pass
`,
    hints: ['Check len(flat) % cols == 0.', 'Slice in steps of cols.', 'Each row must be a tuple.']
  },

  {
    name: 'pair_coordinates_with_cities',
    description: 'Zip coords with cities to (x,y,name) triplets.',
    starter:
`def pair_coordinates_with_cities(
    coords: tuple[tuple[float, float], ...],
    cities: tuple[str, ...]
) -> tuple[tuple[float, float, str], ...]:
    """Zip coords with cities to triplets; raise if lengths differ."""
    pass
`,
    hints: ['Validate equal lengths.', 'Iterate with zip.', 'Build (x,y,city) tuples.']
  },

  {
    name: 'find_first_occurrence',
    description: 'Binary search: first index of target in sorted tuple.',
    starter:
`def find_first_occurrence(nums: tuple[int, ...], target: int) -> int:
    """Binary search: first index of target, or -1."""
    pass
`,
    hints: ['Use left/right pointers.', 'Move right to mid-1 when found (search left).', 'Return -1 if absent.']
  },

  {
    name: 'find_last_occurrence',
    description: 'Binary search: last index of target in sorted tuple.',
    starter:
`def find_last_occurrence(nums: tuple[int, ...], target: int) -> int:
    """Binary search: last index of target, or -1."""
    pass
`,
    hints: ['Use left/right pointers.', 'Move left to mid+1 when found (search right).', 'Return -1 if absent.']
  },

  {
    name: 'binary_search_range',
    description: 'Return (start,end) indices of target; (-1,-1) if absent.',
    starter:
`def binary_search_range(nums: tuple[int, ...], target: int) -> tuple[int, int]:
    """Return (start,end) indices of target in sorted nums; or (-1,-1)."""
    pass
`,
    hints: ['Call the first/last helper functions.', 'Handle empty input.', 'If start == -1, return (-1,-1).']
  }
];




// ---------- Mount container ----------
const container = document.getElementById('container');
let pyodideReady;

// Load Pyodide once
async function getPy() {
  if (!pyodideReady) {
    pyodideReady = loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/' });
  }
  return pyodideReady;
}

// ---------- Hints (click-to-reveal, no buttons) ----------
function renderHintsTop(card) {
  if (!card.hints || !card.hints.length) return '';
  const items = card.hints.map((h, idx) => `
    <li class="hint-item">
      <p class="hint-text" data-hint-index="${idx}" aria-live="polite">${h}</p>
    </li>`).join('');
  return `
    <div class="hints">
      <div class="hints-title">Hints</div>
      <ul class="hints-list">${items}</ul>
    </div>`;
}
function initHintToggles(scopeEl) {
  const hints = scopeEl.querySelectorAll('.hint-text');
  hints.forEach(h => {
    h.classList.remove('revealed'); // start blurred
    h.addEventListener('click', () => h.classList.toggle('revealed'));
  });
}

// ---------- Build one editor/results pair ----------
function createPair(card) {
  const pair = document.createElement('div');
  pair.className = 'pair';

  // LEFT: editor
  const left = document.createElement('section');
  left.className = 'card';
  left.innerHTML = `
    <div class="body">
      <h2>YOUR CODE — ${card.name}</h2>
      ${renderHintsTop(card)}
      <div class="desc">${card.description}</div>
      <div class="pill">Runtime: Pyodide</div>
      <textarea></textarea>
      <div class="toolbar">
        <button class="run">▶ Run Tests</button>
        
      </div>
    </div>`;

  // RIGHT: results
  const right = document.createElement('section');
  right.className = 'card';
  right.innerHTML = `
    <div class="body">
      <h2>RESULTS — ${card.name}</h2>
      <div class="status"><span class="dot"></span><span>Idle</span></div>
      <div class="log" style="display:none"></div>
      <div class="table" style="display:none">
        <table>
          <thead><tr><th>#</th><th>Input</th><th>Expected</th><th>Got</th><th>OK?</th></tr></thead>
          <tbody></tbody>
        </table>
      </div>
    </div>`;

  pair.append(left, right);

  // Enhance textarea with CodeMirror (if available)
  const ta = left.querySelector('textarea');
  ta.value = card.starter || '';
  let cm = null;
  if (window.CodeMirror) {
    cm = CodeMirror.fromTextArea(ta, {
      mode: 'python',
      lineNumbers: true,
      indentUnit: 4,
      smartIndent: true,
      extraKeys: {
        'Tab': cm => cm.execCommand('insertSoftTab'),
        'Shift-Tab': 'indentLess'
      }
    });
    setTimeout(() => { try { cm.refresh(); } catch (_) {} }, 0);
  } else {
    // fallback to simple Tab handler
    ta.addEventListener('keydown', function (e) {
      if (e.key === 'Tab') {
        e.preventDefault();
        const s = this.selectionStart, e2 = this.selectionEnd;
        this.value = this.value.slice(0, s) + '    ' + this.value.slice(e2);
        this.selectionStart = this.selectionEnd = s + 4;
      }
    });
  }

  // Wire actions
  left.querySelector('.run').addEventListener('click', () => runOne({ left, right, cm, ta }, card));
  initHintToggles(left);

  return pair;
}

// ---------- Status / Results rendering ----------
function setStatus(section, kind, text) {
  const st = section.querySelector('.status');
  st.className = 'status ' + (kind || '');
  st.innerHTML = `<span class="dot"></span><span>${text}</span>`;
}

function showResults(section, payload) {
  const log = section.querySelector('.log');
  const tableWrap = section.querySelector('.table');
  const tbody = section.querySelector('tbody');

  log.style.display = 'none';
  tableWrap.style.display = 'none';
  tbody.innerHTML = '';

  if (!payload) return;

  if (payload.status === 'compile_error') {
    log.style.display = 'block';
    log.textContent = payload.error || 'Compile error';
    return;
  }

  tableWrap.style.display = 'block';
  (payload.tests || []).forEach((t, i) => {
    const tr = document.createElement('tr');

    // Input formatting: support advanced records with args/kwargs/stdin
    let inputCell = '';
    if (Array.isArray(t.input)) {
      inputCell = `(${t.input[0]}, ${t.input[1]})`;
    } else if (t.input && typeof t.input === 'object') {
      const a = Array.isArray(t.input.args) ? JSON.stringify(t.input.args) : '[]';
      const k = t.input.kwargs ? JSON.stringify(t.input.kwargs) : '{}';
      inputCell = `args=${a}, kwargs=${k}${t.input.stdin ? ', stdin=' + JSON.stringify(t.input.stdin) : ''}`;
    }

    const expected = (typeof t.expected !== 'undefined')
      ? String(t.expected)
      : (t.expected === null ? 'null' : '');
    const got = (typeof t.got !== 'undefined') ? String(t.got) : (t.error || t.stdout || '');

    tr.innerHTML = `<td>${i + 1}</td><td>${inputCell}</td><td>${expected}</td><td>${got}</td><td>${t.ok ? '✅' : '❌'}</td>`;
    tbody.appendChild(tr);
  });
}

// ---------- Tests path helpers (YOUR CONFIG) ----------
// NOTE: You requested this exact path. From scripts/index.html → ../text/<name>.json
function testsBaseURL() {
  return new URL('../tests/', document.baseURI).href;
}
function testsURL(name) {
  return new URL(`${name}.json`, testsBaseURL()).href;
}
async function fetchTests(name) {
  const url = testsURL(name);
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to load ${url}`);
  return res.json();
}

// ---------- Harness selection ----------
function isAdvancedTests(tests) {
  // advanced = array of objects (has args/expect/...)
  return Array.isArray(tests) && tests.length > 0 && typeof tests[0] === 'object' && !Array.isArray(tests[0]);
}

// Provide a default map used by advanced tests
function buildDefaultMap() {
  const rows = 12, cols = 14;
  const m = Array.from({ length: rows }, () => Array.from({ length: cols }, () => '.'));
  m[11][3] = 'S';  // start
  m[11][2] = 'T';  // treasure
  m[0][9]  = 'X';  // trap
  m[1][13] = 'E';  // exit
  m[1][2]  = 'F';  // blocked
  m[5][10] = 'P';  // blocked
  return m;
}

// Build the advanced Python program (your harness)
function composeAdvancedProgram(userCode, funcName, testsArray, maps) {
  // Pre-serialize JSON and then embed as a quoted string that Python will json.loads
  const testsJSON = JSON.stringify(testsArray);
  const mapsJSON  = JSON.stringify(maps);

  return [
    "import json, traceback, io, contextlib, builtins, copy, sys, types, re",
    "",
    "user_ns = {}",
    "code = " + JSON.stringify(userCode),
    "FUNC_NAME = " + JSON.stringify(funcName),
    "TESTS = json.loads(" + JSON.stringify(testsJSON) + ")",
    "MAPS  = json.loads(" + JSON.stringify(mapsJSON) + ")",
    "",
    "def deep_copy_maps(ns):",
    "    m = ns.get('maps')",
    "    return copy.deepcopy(m) if m is not None else None",
    "",
    "def run_one_test(fn, t, ns):",
    "    out_buf = io.StringIO()",
    "    err = None",
    "    exc_info = None",
    "    got = None",
    "    ok = True",
    "",
    "    __map = deep_copy_maps(ns) if t.get('use_fresh_map') else None",
    "    if __map is not None:",
    "        ns['__map'] = __map",
    "",
    "    args = t.get('args', [])",
    "    kwargs = t.get('kwargs', {})",
    "    def materialize(v):",
    "        if v == '$MAP':",
    "            return ns.get('__map')",
    "        return v",
    "    args = [materialize(v) for v in args]",
    "    kwargs = {k: materialize(v) for k, v in kwargs.items()}",
    "",
    "    stdin_list = t.get('stdin', None)",
    "    if stdin_list is not None:",
    "        it = iter(stdin_list)",
    "        original_input = builtins.input",
    "        builtins.input = lambda prompt=None: next(it)",
    "    else:",
    "        original_input = None",
    "",
    "    setup_code = t.get('setup')",
    "    if setup_code:",
    "        try:",
    "            exec(setup_code, ns)",
    "        except Exception as e:",
    "            return {'ok': False, 'error': f'setup_error: {e}', 'stdout': '', 'got': None}",
    "",
    "    try:",
    "        with contextlib.redirect_stdout(out_buf):",
    "            if fn is None:",
    "                raise RuntimeError('Function not found or not callable.')",
    "            got = fn(*args, **kwargs)",
    "    except Exception as e:",
    "        err = str(e)",
    "        exc_info = traceback.format_exc()",
    "        ok = False if not t.get('expect_exception') else True",
    "    finally:",
    "        if original_input is not None:",
    "            builtins.input = original_input",
    "",
    "    stdout = out_buf.getvalue()",
    "",
    "    if t.get('expect_exception'):",
    "        if exc_info is None:",
    "            ok = False",
    "        if ok and t.get('exception_contains'):",
    "            ok = t['exception_contains'] in exc_info",
    "",
    "    if 'expect' in t and not t.get('expect_exception', False):",
    "         exp = t['expect']",
    "         if isinstance(exp, list):",
    "                try:",
    "                   exp = tuple(exp)",
    "                except Exception:",
    "                    pass",
    "         ok = ok and (got == exp)",
    "",
    "    if 'expect_stdout_contains' in t:",
    "        substrs = t['expect_stdout_contains']",
    "        if isinstance(substrs, str):",
    "            substrs = [substrs]",
    "        ok = ok and all(s in stdout for s in substrs)",
    "",
    "    if 'expect_stdout_regex' in t:",
    "        pattern = re.compile(t['expect_stdout_regex'], re.M | re.S)",
    "        ok = ok and bool(pattern.search(stdout))",
    "",
    "    if 'expect_predicate' in t:",
    "        expr = t['expect_predicate']",
    "        try:",
    "            pred_ok = bool(eval(expr, {**ns, 'got': got, 'stdout': stdout, '__map': ns.get('__map')}))",
    "        except Exception:",
    "            pred_ok = False",
    "        ok = ok and pred_ok",
    "",
    "    if 'post_predicate' in t:",
    "        __RESULT__ = False",
    "        try:",
    "            exec(t['post_predicate'], {**ns, 'got': got, 'stdout': stdout, '__map': ns.get('__map')})",
    "            post_ok = bool(locals().get('__RESULT__', True))",
    "        except Exception:",
    "            post_ok = False",
    "        ok = ok and post_ok",
    "",
    "    rec = {",
    "        'input': {'args': args, 'kwargs': kwargs, 'stdin': stdin_list},",
    "        'expected': t.get('expect', None),",
    "        'ok': bool(ok),",
    "        'got': got,",
    "        'stdout': stdout[:2000],",
    "    }",
    "    if err:",
    "        rec['error'] = err",
    "        rec['traceback'] = exc_info",
    "    return rec",
    "",
    "try:",
    "    exec(code, user_ns)",
    "except Exception:",
    "    result = {'status': 'compile_error', 'error': traceback.format_exc()}",
    "else:",
    "    user_ns['maps'] = MAPS",
    "    fn = user_ns.get(FUNC_NAME)",
    "    if not callable(fn):",
    "        result = {'status': 'fail', 'error': 'Function not found or not callable.'}",
    "    else:",
    "        details = []",
    "        all_ok = True",
    "        for t in TESTS:",
    "            details.append(run_one_test(fn, t, user_ns))",
    "            all_ok = all_ok and details[-1].get('ok', False)",
    "        result = {'status': 'pass' if all_ok else 'fail', 'tests': details}",
    "",
    "json.dumps(result)"
  ].join('\n');
}


// ---------- Runner ----------
async function runOne(view, cfg) {
  const right = view.right;
  setStatus(right, '', '⏳ Running...');
  showResults(right, null);

  let tests;
  try {
    tests = await fetchTests(cfg.name);
  } catch (e) {
    setStatus(right, 'compile_error', '⚠️ Could not load tests');
    const log = right.querySelector('.log'); log.style.display = 'block'; log.textContent = String(e);
    return;
  }

  try {
    const py = await getPy();
    const userCode = view.cm ? view.cm.getValue() : view.ta.value;

    let program;
    if (isAdvancedTests(tests)) {
      const maps = buildDefaultMap();
      program = composeAdvancedProgram(userCode, cfg.name, tests, maps);
    } else {
      // Simple triplet fallback (not used by your new tests, but kept for compatibility)
        const simpleJSON = JSON.stringify(tests);
        program = [
        'import json, traceback',
        'user_ns = {}',
        'code = ' + JSON.stringify(userCode),
        'TESTS = json.loads(' + JSON.stringify(simpleJSON) + ')',
        'try:',
        '    exec(code, user_ns)',
        'except Exception:',
        '    result = {"status":"compile_error","error": traceback.format_exc()}',
        'else:',
        `    fn = user_ns.get(${JSON.stringify(cfg.name)})`,
        '    if not callable(fn):',
        '        result = {"status":"fail","error":"Function not found or not callable."}',
        '    else:',
        '        details = []',
        '        passed = True',
        '        for a,b,exp in TESTS:',
        '            try:',
        '                got = fn(a,b)',
        '                ok = (got == exp)',
        '                passed = passed and ok',
        '                details.append({"input":[a,b],"expected":exp,"got":got,"ok":bool(ok)})',
        '            except Exception as e:',
        '                passed = False',
        '                details.append({"input":[a,b],"expected":exp,"error":str(e),"ok":False})',
        '        result = {"status":"pass" if passed else "fail", "tests": details}',
        'json.dumps(result)'
        ].join('\n');
    }

    const out = await py.runPythonAsync(program);
    const payload = JSON.parse(String(out));

    if (payload.status === 'pass') setStatus(right, 'pass', '✅ All tests passed');
    else if (payload.status === 'compile_error') setStatus(right, 'compile_error', '⚠️ Compile error');
    else setStatus(right, 'fail', '❌ Some tests failed');

    showResults(right, payload);
  } catch (err) {
    setStatus(right, 'compile_error', '⚠️ Runtime error');
    const log = right.querySelector('.log'); log.style.display = 'block'; log.textContent = String(err);
  }
}

// ---------- Mount all cards ----------
CARDS.forEach(c => container.appendChild(createPair(c)));

// Safety net: global click delegation for hint text
document.addEventListener('click', function(e) {
  const el = e.target.closest('.hint-text');
  if (!el) return;
  el.classList.toggle('revealed');
});

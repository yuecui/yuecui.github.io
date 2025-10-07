// === Card Configurations ===
// Add `hints: []` with one or more hint strings per card.
const CARDS = [
  {
    name: 'sum_numbers',
    description: 'Implement sum_numbers(a, b) → return the numeric sum of a and b.',
    starter:
      'def sum_numbers(a, b):\n' +
      '    """Return the sum of a and b."""\n' +
      '    return a + b\n',
    hints: [
      'You probably only need one operator.',
      'Avoid printing; return the value instead.',
      'Consider negative numbers and floats.'
    ]
  },
  {
    name: 'multiply_numbers',
    description: 'Implement multiply_numbers(a, b) → return the product.',
    starter:
      'def multiply_numbers(a, b):\n' +
      '    """Return the product of a and b."""\n' +
      '    return a * b\n',
    hints: [
      'Any number times zero should be zero.',
      'Python uses * for multiplication.'
    ]
  }
];

const container = document.getElementById('container');
let pyodideReady;

// Load Pyodide once
async function getPy() {
  if (!pyodideReady) {
    pyodideReady = loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/' });
  }
  return pyodideReady;
}

function createPair(card) {
  const pair = document.createElement('div');
  pair.className = 'pair';

  // LEFT (editor)
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
        <span class="foot">Tests: <code>tests/${card.name}.json</code></span>
      </div>
    </div>`;

  // RIGHT (results)
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

  // enhance editor
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
    // fallback indentation
    ta.addEventListener('keydown', function (e) {
      if (e.key === 'Tab') {
        e.preventDefault();
        const s = this.selectionStart, e2 = this.selectionEnd;
        this.value = this.value.slice(0, s) + '    ' + this.value.slice(e2);
        this.selectionStart = this.selectionEnd = s + 4;
      }
    });
  }

  // wire Run button
  left.querySelector('.run').addEventListener('click', () => runOne({ left, right, cm, ta }, card));

  // wire hint toggles (if any)
  initHintToggles(left);

  return pair;
}

// Render the top hints area (supports multiple hints)
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


// Attach listeners to hint buttons
function initHintToggles(scopeEl) {
  const texts = scopeEl.querySelectorAll('.hint-text');
  const btns = scopeEl.querySelectorAll('.hint-toggle');

  // blur all by default
  texts.forEach(p => p.classList.remove('revealed'));

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = btn.getAttribute('data-hint-index');
      const p = scopeEl.querySelector(`.hint-text[data-hint-index="${idx}"]`);
      const isRevealed = p.classList.toggle('revealed');
      btn.textContent = isRevealed ? `Hide Hint ${Number(idx) + 1}` : `Show Hint ${Number(idx) + 1}`;
      btn.setAttribute('aria-expanded', String(isRevealed));
    });
  });
}

async function fetchTests(name) {
  const res = await fetch(`../tests/${name}.json`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to load tests/${name}.json`);
  return res.json();
}

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
  } else {
    tableWrap.style.display = 'block';
    (payload.tests || []).forEach((t, i) => {
      const tr = document.createElement('tr');
      const got = (typeof t.got !== 'undefined') ? String(t.got) : (t.error || '');
      tr.innerHTML = `<td>${i + 1}</td><td>(${t.input[0]}, ${t.input[1]})</td><td>${t.expected}</td><td>${got}</td><td>${t.ok ? '✅' : '❌'}</td>`;
      tbody.appendChild(tr);
    });
  }
}

async function runOne(view, cfg) {
  const right = view.right;
  setStatus(right, '', '⏳ Running...');
  showResults(right, null);

  let tests;
  try { tests = await fetchTests(cfg.name); }
  catch (e) {
    setStatus(right, 'compile_error', '⚠️ Could not load tests');
    const log = right.querySelector('.log'); log.style.display = 'block'; log.textContent = String(e);
    return;
  }

  try {
    const py = await getPy();
    const userCode = view.cm ? view.cm.getValue() : view.ta.value;

    const program = [
      'import json, traceback',
      'user_ns = {}',
      'code = ' + JSON.stringify(userCode),
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
      '        for a,b,exp in ' + JSON.stringify(tests) + ':',
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

// Mount all cards
CARDS.forEach(c => container.appendChild(createPair(c)));

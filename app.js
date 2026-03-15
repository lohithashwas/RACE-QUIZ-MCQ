/* ====================================================
   RACE PHASE 2 SESSION MCQ TEST — app.js
   Firebase REST API integration, anti-cheat, timer
==================================================== */

// ── Firebase Config ──────────────────────────────────
const FB_URL  = "https://qr-databse---upagraha-default-rtdb.asia-southeast1.firebasedatabase.app";
const FB_AUTH = "zvpq2DLFNGFHUq6S7tDVtIYfH4mSauwyJaTsht1p";

// ── Questions Bank ───────────────────────────────────
const QUESTIONS = [
  // Section 1: Verilog Basics
  { cat:"Verilog Basics", q:"Which keyword is used to start a Verilog module?", opts:["function", "module", "block", "define"], ans:1 },
  { cat:"Verilog Basics", q:"Which keyword ends a module?", opts:["end", "finish", "endmodule", "stop"], ans:2 },
  { cat:"Verilog Basics", q:"Which data type represents a connection between modules?", opts:["reg", "wire", "integer", "real"], ans:1 },
  { cat:"Verilog Basics", q:"Which block executes continuously when signals change?", opts:["initial", "always", "assign", "case"], ans:1 },
  { cat:"Verilog Basics", q:"Continuous assignment uses which keyword?", opts:["always", "assign", "begin", "case"], ans:1 },
  
  // Section 2: Verilog – Adder
  { cat:"Verilog – Adder", q:"What does this code represent?\n\nassign sum = a ^ b;\nassign carry = a & b;", opts:["Half Adder", "Full Adder", "Half Subtractor", "Decoder"], ans:0 },
  { cat:"Verilog – Adder", q:"What does this code implement?\n\nassign sum = a ^ b ^ cin;\nassign cout = (a & b) | (b & cin) | (a & cin);", opts:["Half Adder", "Full Adder", "Half Subtractor", "Encoder"], ans:1 },
  { cat:"Verilog – Adder", q:"A Full Adder has how many inputs?", opts:["2", "3", "4", "5"], ans:1 },

  // Section 3: Subtractor
  { cat:"Subtractor", q:"What does this code represent?\n\nassign diff = a ^ b;\nassign borrow = ~a & b;", opts:["Half Subtractor", "Full Subtractor", "Adder", "Decoder"], ans:0 },
  { cat:"Subtractor", q:"If a=0 and b=1, what is the output?\n\ndiff = a ^ b\nborrow = ~a & b", opts:["diff=1 borrow=1", "diff=0 borrow=1", "diff=1 borrow=0", "diff=0 borrow=0"], ans:0 },

  // Section 4: Multiplexer
  { cat:"Multiplexer", q:"What does the following code represent?\n\nassign y = s ? b : a;", opts:["Multiplexer", "Demultiplexer", "Encoder", "Decoder"], ans:0 },
  { cat:"Multiplexer", q:"If s=0, what will be the output?", opts:["a", "b", "1", "0"], ans:0 },

  // Section 5: Demultiplexer
  { cat:"Demultiplexer", q:"What does the following code represent?\n\nassign y0 = ~s & d;\nassign y1 = s & d;", opts:["2:1 MUX", "1:2 DEMUX", "Decoder", "Encoder"], ans:1 },
  { cat:"Demultiplexer", q:"If d=1 and s=1, output will be:", opts:["y0=1 y1=0", "y0=0 y1=1", "y0=1 y1=1", "y0=0 y1=0"], ans:1 },

  // Section 6: Encoder
  { cat:"Encoder", q:"What does this code represent?\n\nif(i0) y = 2'b00;\nelse if(i1) y = 2'b01;\nelse if(i2) y = 2'b10;\nelse if(i3) y = 2'b11;", opts:["Decoder", "Encoder", "MUX", "DEMUX"], ans:1 },
  { cat:"Encoder", q:"A 4-to-2 encoder has:", opts:["4 inputs and 2 outputs", "2 inputs and 4 outputs", "3 inputs and 8 outputs", "8 inputs and 3 outputs"], ans:0 },

  // Section 7: Decoder
  { cat:"Decoder", q:"What does this code represent?\n\nassign y0 = ~a & ~b;\nassign y1 = ~a & b;\nassign y2 = a & ~b;\nassign y3 = a & b;", opts:["4-to-2 Encoder", "2-to-4 Decoder", "MUX", "DEMUX"], ans:1 },
  { cat:"Decoder", q:"If a=1 and b=0, which output becomes 1?", opts:["y0", "y1", "y2", "y3"], ans:2 },

  // Section 8: Flip-Flops
  { cat:"Flip-Flops", q:"What does this code represent?\n\nalways @(posedge clk)\nq <= d;", opts:["D Flip-Flop", "T Flip-Flop", "JK Flip-Flop", "Latch"], ans:0 },
  { cat:"Flip-Flops", q:"What does this code represent?\n\nalways @(posedge clk)\nq <= t ^ q;", opts:["D Flip-Flop", "T Flip-Flop", "JK Flip-Flop", "SR Flip-Flop"], ans:1 },
  { cat:"Flip-Flops", q:"In JK Flip-Flop, when J=K=1:", opts:["Reset", "Set", "Toggle", "Hold"], ans:2 },

  // Section 9: Find the Bug in Verilog Code
  { cat:"Find the Bug in Verilog Code", q:"Identify the bug\n\nassign y = a && b;", opts:["Syntax error", "Wrong operator", "Missing input", "No error"], ans:1 },
  { cat:"Find the Bug in Verilog Code", q:"Identify the bug\n\nalways @(*)\nbegin\ny = a;\nend\n\nOutput declared as:\noutput y;", opts:["No issue", "y must be reg", "always block wrong", "assign required"], ans:1 },
  { cat:"Find the Bug in Verilog Code", q:"Identify the bug\n\nalways @(posedge clk)\nq = d;", opts:["Should use <=", "Should use assign", "clk wrong", "No error"], ans:0 },

  // Section 10: Testbench Questions
  { cat:"Testbench Questions", q:"What is the purpose of a testbench?", opts:["Synthesis", "Fabrication", "Verification", "Routing"], ans:2 },
  { cat:"Testbench Questions", q:"Which block is mainly used in testbench to apply inputs?", opts:["always", "initial", "assign", "module"], ans:1 },
  { cat:"Testbench Questions", q:"$finish command does:", opts:["Start simulation", "Stop simulation", "Display waveform", "Reset module"], ans:1 },

  // Section 11: Blocking vs Non-Blocking Assignment
  { cat:"Blocking vs Non-Blocking Assignment", q:"In Verilog, = represents:", opts:["Non-blocking assignment", "Blocking assignment", "Comparison", "Continuous assignment"], ans:1 },
  { cat:"Blocking vs Non-Blocking Assignment", q:"In Verilog, <= represents:", opts:["Blocking assignment", "Non-blocking assignment", "Comparison", "Logical operator"], ans:1 },
  { cat:"Blocking vs Non-Blocking Assignment", q:"Non-blocking assignment is mainly used for:", opts:["Combinational circuits", "Sequential circuits", "Testbench only", "Encoders"], ans:1 }
];

const TOTAL_Q      = QUESTIONS.length; // 30
const TOTAL_SECS   = 20 * 60;          // 20 minutes
const LABEL_CHARS  = ["A","B","C","D"];

// ── State ─────────────────────────────────────────────
let state = {
  name:         "",
  regId:        "",
  currentQ:     0,
  score:        0,
  answered:     false,
  warnings:     0,
  disqualified: false,
  startTime:    null,
  endTime:      null,
  timerInterval:null,
  secsLeft:     TOTAL_SECS,
  violations:   [],
};

// ── DOM refs ──────────────────────────────────────────
const $ = id => document.getElementById(id);

const screens = {
  landing:  $("screen-landing"),
  quiz:     $("screen-quiz"),
  warning:  $("screen-warning"),
  dq:       $("screen-dq"),
  result:   $("screen-result"),
};

// ── Show / Hide helpers ───────────────────────────────
function showScreen(key) {
  Object.values(screens).forEach(s => {
    s.classList.remove("active");
    s.classList.add("hidden");
  });
  screens[key].classList.remove("hidden");
  screens[key].classList.add("active");
}
function showOverlay(key) {
  screens[key].classList.remove("hidden");
  screens[key].classList.add("active");
}
function hideOverlay(key) {
  screens[key].classList.remove("active");
  screens[key].classList.add("hidden");
}

// ── Landing screen ────────────────────────────────────
$("btn-start").addEventListener("click", () => {
  const name  = $("inp-name").value.trim();
  const regId = $("inp-id").value.trim();
  if (!name)  { alert("Please enter your full name."); return; }
  if (!regId) { alert("Please enter your Register Number."); return; }

  state.name  = name;
  state.regId = regId;

  // Request fullscreen
  const el = document.documentElement;
  const req = el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen || el.msRequestFullscreen;
  if (req) req.call(el).catch(() => {});

  startQuiz();
});

// ── Start Quiz ────────────────────────────────────────
function startQuiz() {
  state.startTime = new Date();
  state.secsLeft  = TOTAL_SECS;

  $("hdr-user").textContent = "👤 " + state.name;

  showScreen("quiz");
  loadQuestion(0);
  startTimer();
}

// ── Timer ─────────────────────────────────────────────
function startTimer() {
  updateTimerDisplay();
  state.timerInterval = setInterval(() => {
    state.secsLeft--;
    updateTimerDisplay();
    if (state.secsLeft <= 0) {
      clearInterval(state.timerInterval);
      endQuiz("time_up");
    }
  }, 1000);
}
function updateTimerDisplay() {
  const m = Math.floor(state.secsLeft / 60).toString().padStart(2, "0");
  const s = (state.secsLeft % 60).toString().padStart(2, "0");
  const el = $("hdr-timer");
  el.textContent = `⏱ ${m}:${s}`;
  if (state.secsLeft <= 60) el.classList.add("low");
}

// ── Load Question ─────────────────────────────────────
function loadQuestion(idx) {
  state.currentQ = idx;
  state.answered = false;
  const q = QUESTIONS[idx];

  $("q-category").textContent = q.cat;
  $("q-text").textContent = `Q${idx + 1}. ${q.q}`;
  $("hdr-qcount").textContent = `Q ${idx + 1} / ${TOTAL_Q}`;
  $("progress-bar").style.width = `${((idx) / TOTAL_Q) * 100}%`;

  const grid = $("options-grid");
  grid.innerHTML = "";
  q.opts.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.innerHTML = `<span class="opt-label">${LABEL_CHARS[i]}</span>${opt}`;
    btn.addEventListener("click", () => selectOption(btn, i));
    grid.appendChild(btn);
  });

  $("btn-next").disabled = true;
}

// ── Select Option ─────────────────────────────────────
function selectOption(btn, idx) {
  if (state.answered) return;
  state.answered = true;

  const q    = QUESTIONS[state.currentQ];
  const btns = document.querySelectorAll(".option-btn");

  if (idx === q.ans) {
    state.score++;
    btn.classList.add("correct");
  } else {
    btn.classList.add("wrong");
    btns[q.ans].classList.add("correct");
  }

  btns.forEach(b => b.disabled = true);
  $("btn-next").disabled = false;
}

// ── Next Question ─────────────────────────────────────
$("btn-next").addEventListener("click", () => {
  const next = state.currentQ + 1;
  if (next < TOTAL_Q) {
    loadQuestion(next);
  } else {
    endQuiz("completed");
  }
});

// ── End Quiz ──────────────────────────────────────────
function endQuiz(reason) {
  clearInterval(state.timerInterval);
  state.endTime     = new Date();
  state.disqualified= (reason === "disqualified");

  const taken = Math.round((state.endTime - state.startTime) / 1000);
  const mm    = Math.floor(taken / 60);
  const ss    = taken % 60;

  // Exit fullscreen
  const exitFS = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen;
  if (exitFS) exitFS.call(document).catch(() => {});

  // Push to Firebase
  const payload = {
    name:        state.name,
    regId:       state.regId,
    score:       state.score,
    total:       TOTAL_Q,
    timeTaken:   `${mm}m ${ss}s`,
    violations:  state.violations,
    reason:      reason,
    submittedAt: new Date().toISOString(),
  };
  pushToFirebase(payload);

  // Show Result
  const pct = (state.score / TOTAL_Q) * 100;
  let title = "Quiz Completed! 🎉";
  if (reason === "time_up")       title = "Time's Up! ⏰";
  if (reason === "disqualified")  title = "Disqualified ❌";

  $("r-title").textContent = title;
  $("r-score").textContent = state.score;
  $("r-name").textContent  = state.name + " · " + state.regId;
  $("r-sub").textContent   = reason === "disqualified"
    ? "You have been disqualified. Results have been recorded."
    : `Result saved to database · Time taken: ${mm}m ${ss}s`;
  $("r-stats").innerHTML   = `
    Correct: <strong>${state.score}</strong> &nbsp;|&nbsp;
    Wrong: <strong>${TOTAL_Q - state.score}</strong> &nbsp;|&nbsp;
    Accuracy: <strong>${pct.toFixed(1)}%</strong>
  `;

  // Ring animation
  const offset = 314 * (1 - state.score / TOTAL_Q);
  setTimeout(() => {
    $("ring-fill").style.strokeDashoffset = offset;
    $("ring-fill").style.stroke = pct >= 60 ? "#43e97b" : pct >= 40 ? "#ffb732" : "#ff4747";
  }, 100);

  showScreen("result");
}

// ── Firebase Push ─────────────────────────────────────
function pushToFirebase(data) {
  const path = "/quiz_race_results.json?auth=" + FB_AUTH;
  fetch(FB_URL + path, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(data),
  }).catch(e => console.warn("Firebase error:", e));
}

// ── Anti Cheat: Violations ────────────────────────────
function recordAndWarn(type) {
  if (state.disqualified) return;

  // Log the violation
  state.violations.push({ type, time: new Date().toISOString() });

  // Push violation snapshot to Firebase
  pushToFirebase({
    name:    state.name,
    regId:   state.regId,
    event:   "VIOLATION",
    type,
    time:    new Date().toISOString(),
    warnNum: state.warnings + 1,
  });

  state.warnings++;

  if (state.warnings >= 2) {
    // Disqualify
    state.disqualified = true;
    clearInterval(state.timerInterval);
    hideOverlay("warning");
    showOverlay("dq");
    setTimeout(() => endQuiz("disqualified"), 3000);
    return;
  }

  // First warning
  $("warn-msg").textContent =
    `Violation detected: "${type}". This has been logged. Another violation will immediately disqualify you.`;
  showOverlay("warning");
}

// ── Resume from warning ───────────────────────────────
$("btn-resume").addEventListener("click", () => {
  hideOverlay("warning");
  // Re-enter fullscreen
  const el  = document.documentElement;
  const req = el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen;
  if (req) req.call(el).catch(() => {});
});

// ── Tab Visibility Detection ──────────────────────────
document.addEventListener("visibilitychange", () => {
  if (document.hidden && screens.quiz.classList.contains("active") && !state.disqualified) {
    recordAndWarn("Tab switch detected");
  }
});

// ── Fullscreen exit Detection ─────────────────────────
document.addEventListener("fullscreenchange",       checkFS);
document.addEventListener("webkitfullscreenchange", checkFS);
document.addEventListener("mozfullscreenchange",    checkFS);

function checkFS() {
  const isFS = !!(document.fullscreenElement || document.webkitFullscreenElement);
  if (!isFS && screens.quiz.classList.contains("active") && !state.disqualified) {
    recordAndWarn("Fullscreen exited");
  }
}

// ── Block context-menu / copy / etc. ─────────────────
["contextmenu","copy","cut","paste","selectstart"].forEach(ev =>
  document.addEventListener(ev, e => e.preventDefault())
);

// ── Block DevTools shortcuts ──────────────────────────
document.addEventListener("keydown", e => {
  if (
    e.key === "F12" ||
    (e.ctrlKey && e.shiftKey && ["I","J","C"].includes(e.key)) ||
    (e.ctrlKey && e.key === "U") ||
    (e.ctrlKey && ["a","c","v","x","s","p"].includes(e.key.toLowerCase()))
  ) {
    e.preventDefault();
    if (screens.quiz.classList.contains("active")) {
      recordAndWarn("DevTools / keyboard shortcut attempt");
    }
  }
});

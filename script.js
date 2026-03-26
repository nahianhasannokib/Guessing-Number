// ── State ──────────────────────────────────────────────
let low = 1, high = 100, mid, steps = 0;

// ── Screen Management ──────────────────────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
    s.style.display = 'none';
  });
  const screen = document.getElementById(id);
  screen.style.display = 'flex';
  // Force reflow for animation
  void screen.offsetWidth;
  screen.classList.add('active');
}

// ── Start ───────────────────────────────────────────────
function startGame() {
  low = 1; high = 100; steps = 0;
  showScreen('questionScreen');
  nextQuestion();
}

// ── Next Question ───────────────────────────────────────
function nextQuestion() {
  mid = Math.floor((low + high) / 2);
  steps++;

  // Update step counter
  const stepEl = document.getElementById('stepNum');
  stepEl.textContent = steps;
  stepEl.style.animation = 'none';
  void stepEl.offsetWidth;
  stepEl.style.animation = '';

  // Update range display
  document.getElementById('rangeDisplay').textContent = `${low} – ${high}`;

  // Progress bar: how narrowed down we are (log scale feels good here)
  const rangeSize = high - low + 1;
  const progress = Math.max(2, Math.round((1 - rangeSize / 100) * 100));
  document.getElementById('rangeFill').style.width = progress + '%';

  // Update question with pop animation
  const card = document.getElementById('questionCard');
  card.classList.remove('pop');
  void card.offsetWidth;
  card.classList.add('pop');

  document.getElementById('question').textContent =
    `Is your number greater than ${mid}?`;
}

// ── Answer: Yes ──────────────────────────────────────────
function answerYes() {
  addRipple(event);
  low = mid + 1;
  checkResult();
}

// ── Answer: No ───────────────────────────────────────────
function answerNo() {
  addRipple(event);
  high = mid;
  checkResult();
}

// ── Check Result ─────────────────────────────────────────
function checkResult() {
  if (low >= high) {
    showResult(low);
  } else {
    nextQuestion();
  }
}

// ── Show Result ───────────────────────────────────────────
function showResult(number) {
  showScreen('resultScreen');

  document.getElementById('yourNumber').textContent = number;
  document.getElementById('stepCount').textContent = steps;

  if (steps <= 5) {
    document.getElementById('resultTitle').textContent = 'Got it fast!';
    document.getElementById('resultEmoji').textContent = '🔥';
  } else if (steps <= 7) {
    document.getElementById('resultTitle').textContent = 'Got it!';
    document.getElementById('resultEmoji').textContent = '🎉';
  } else {
    document.getElementById('resultTitle').textContent = 'Mind read!';
    document.getElementById('resultEmoji').textContent = '🧠';
  }

  // Confetti burst
  setTimeout(() => launchConfetti(), 300);
}

// ── Reset ─────────────────────────────────────────────────
function resetGame() {
  addRipple(event);
  // Clear confetti
  document.querySelectorAll('.confetti').forEach(c => c.remove());
  showScreen('introScreen');
}

// ── Confetti ──────────────────────────────────────────────
function launchConfetti() {
  const colors = ['#7c5cfc', '#ff6b9d', '#00d4ff', '#ffd700', '#22c55e', '#f97316'];
  const burst = document.getElementById('resultBurst');
  burst.innerHTML = '';

  for (let i = 0; i < 48; i++) {
    const c = document.createElement('div');
    c.classList.add('confetti');
    c.style.left = Math.random() * 100 + '%';
    c.style.top = '-10px';
    c.style.background = colors[Math.floor(Math.random() * colors.length)];
    c.style.width = (Math.random() * 8 + 5) + 'px';
    c.style.height = (Math.random() * 8 + 5) + 'px';
    c.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    c.style.animationDuration = (Math.random() * 1.5 + 1) + 's';
    c.style.animationDelay = (Math.random() * 0.6) + 's';
    burst.appendChild(c);
  }
}

// ── Ripple Effect ─────────────────────────────────────────
function addRipple(e) {
  if (!e || !e.currentTarget) return;
  const btn = e.currentTarget;
  const r = document.createElement('span');
  r.classList.add('ripple');
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  r.style.width = r.style.height = size + 'px';
  r.style.left = (e.clientX - rect.left - size / 2) + 'px';
  r.style.top  = (e.clientY - rect.top  - size / 2) + 'px';
  btn.appendChild(r);
  setTimeout(() => r.remove(), 600);
}

// ── Attach ripple to buttons ──────────────────────────────
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', addRipple);
});
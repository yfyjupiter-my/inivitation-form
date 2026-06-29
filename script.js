const slider = document.getElementById('slider');
let pendingSubmit = null;

document.querySelectorAll('input[name="attend"]').forEach(r => r.addEventListener('change', () => {
  const attending = document.querySelector('input[name="attend"]:checked').value === 'yes';
  document.getElementById('field-guests').style.display = attending ? '' : 'none';
  document.getElementById('field-arrive').style.display = attending ? '' : 'none';
}));

function setStep(n) {
  const s1 = document.getElementById('step-1');
  const s2 = document.getElementById('step-2');
  s1.className = 'step' + (n === 1 ? ' active' : ' done');
  s2.className = 'step' + (n === 2 ? ' active' : '');
  s1.ariaCurrent = n === 1 ? 'step' : null;
  s2.ariaCurrent = n === 2 ? 'step' : null;
  document.getElementById('step-connector').className = 'step-connector' + (n === 2 ? ' done' : '');
}

function goToRsvp()   { slider.classList.add('show-rsvp');    setStep(2); }
function goToInvite() { clearTimeout(pendingSubmit); pendingSubmit = null; slider.classList.remove('show-rsvp'); setStep(1); }

function submitRsvp() {
  const name   = document.getElementById('rsvp-name').value.trim();
  const guests = document.getElementById('rsvp-guests').value.trim();
  const arrive = document.getElementById('rsvp-arrive').value;
  const attend = document.querySelector('input[name="attend"]:checked').value;

  if (!name)   { shake(document.getElementById('rsvp-name'));   return; }
  const gNum = parseInt(guests, 10);
  if (attend === 'yes') {
    if (!gNum || gNum < 1 || gNum > 20) { shake(document.getElementById('rsvp-guests')); return; }
  }

  const btn = document.getElementById('rsvp-submit-btn');
  btn.classList.add('loading');
  btn.disabled = true;
  const errEl = document.getElementById('rsvp-error');
  if (errEl) errEl.style.display = 'none';

  let arriveStr = arrive;
  if (arrive) {
    const [h, m] = arrive.split(':').map(Number);
    arriveStr = `${h % 12 || 12}:${String(m).padStart(2,'0')} ${h >= 12 ? 'PM' : 'AM'}`;
  }

  pendingSubmit = fetch('https://formspree.io/f/xwvdqpvy', {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, guests: gNum || 0, arrive: arriveStr, attend }),
  }).then(res => {
    if (!res.ok) throw new Error(res.status);
    if (!pendingSubmit) return; pendingSubmit = null;

    const accepting = attend === 'yes';
    const icon = document.getElementById('success-icon');
    icon.classList.toggle('declined', !accepting);

    document.getElementById('success-title').textContent =
      accepting ? "You're confirmed!" : "We'll miss you";
    document.getElementById('rsvp-confirm-msg').textContent = accepting
      ? `We look forward to celebrating with you, ${name}!`
      : `Thank you for letting us know, ${name}. You'll be missed!`;

    const pillsEl = document.getElementById('success-pills');
    pillsEl.innerHTML = '';
    if (accepting) {
      [['👥', `${gNum} guest${gNum > 1 ? 's' : ''}`], ...(arriveStr ? [['🕐', `Arriving at ${arriveStr}`]] : [])]
        .forEach(([ic, label]) => {
          const p = document.createElement('span');
          p.className = 'success-pill';
          p.textContent = `${ic}  ${label}`;
          pillsEl.appendChild(p);
        });
    }

    document.getElementById('rsvp-form-body').style.display = 'none';
    const confirmEl = document.getElementById('rsvp-confirm');
    confirmEl.style.display = 'flex';
    const animEls = [...confirmEl.querySelectorAll('*')];
    animEls.forEach(el => { el.style.animation = 'none'; });
    confirmEl.offsetHeight; // ponytail: single reflow flush
    animEls.forEach(el => { el.style.animation = ''; });
    document.getElementById('success-title').focus();

    if (accepting) spawnConfetti();

    btn.classList.remove('loading');
    btn.disabled = false;
  }).catch(() => {
    pendingSubmit = null;
    btn.classList.remove('loading');
    btn.disabled = false;
    const err = document.getElementById('rsvp-error');
    if (err) { err.style.display = ''; }
  });
}

function editRsvp() {
  clearTimeout(pendingSubmit); pendingSubmit = null;
  document.getElementById('rsvp-form-body').style.display = '';
  document.getElementById('rsvp-confirm').style.display = 'none';
  document.getElementById('confetti-wrap').innerHTML = '';
}

function shake(el) {
  el.focus();
  el.style.animation = 'none'; el.offsetHeight;
  el.style.animation = 'shakeField 350ms ease';
  el.addEventListener('animationend', () => el.style.animation = '', { once: true });
}

const COLORS = ['#c2410c','#e07a50','#f0a07a','#4a3728','#d4b8a0','#f9c4a8'];
function spawnConfetti() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const wrap = document.getElementById('confetti-wrap');
  wrap.innerHTML = '';
  for (let i = 0; i < 28; i++) {
    const s = document.createElement('span');
    const angle = Math.random() * 360;
    const dist  = 60 + Math.random() * 120;
    s.style.cssText = `
      left:${20 + Math.random() * 60}%;
      background:${COLORS[Math.floor(Math.random() * COLORS.length)]};
      --tx:${Math.cos(angle * Math.PI/180) * dist}px;
      --ty:${-(40 + Math.random() * 140)}px;
      --r:${Math.random() * 720 - 360}deg;
      animation-delay:${Math.random() * 300}ms;
      animation-duration:${700 + Math.random() * 400}ms;
      border-radius:${Math.random() > .5 ? '50%' : '2px'};
      width:${5 + Math.random() * 5}px;
      height:${5 + Math.random() * 5}px;
    `;
    wrap.appendChild(s);
  }
}

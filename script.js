//Clock
function updateClock() {
  const now = new Date();
  let h = now.getHours();
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  const el = document.getElementById('nav-clock-time');
  if (el) el.textContent = `${String(h).padStart(2,'0')}:${m}:${s} ${ampm}`;
}
updateClock();
setInterval(updateClock, 1000);

//Cursor
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  cursorRing.style.left = e.clientX + 'px';
  cursorRing.style.top = e.clientY + 'px';
});

document.addEventListener('mouseover', (e) => {
  const isRing = e.target.closest('.announcement, .announcement-text, #nav-logo, #nav-tweet');
  const isLine = e.target.closest('#nav-clock-time, a, button, .nav-version-item, .hero-line, .about__content');

  if (isRing) {
    cursorRing.style.opacity = '1';
    cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
    cursor.style.width = '15px';
    cursor.style.height = '15px';
    cursor.style.borderRadius = '50%';
  } else if (isLine) {
    cursorRing.style.opacity = '0';
    cursorRing.style.transform = 'translate(-50%, -50%) scale(0.5)';
    cursor.style.width = '4px';
    cursor.style.height = '27px';
    cursor.style.borderRadius = '0';
  } else {
    cursorRing.style.opacity = '0';
    cursorRing.style.transform = 'translate(-50%, -50%) scale(0.5)';
    cursor.style.width = '15px';
    cursor.style.height = '15px';
    cursor.style.borderRadius = '50%';
  } 
});

//Hamburger
const hamburger = document.getElementById('hamburger');
const hamburgerMenu = document.getElementById('hamburger-menu');

hamburger.addEventListener('click', () => {
  hamburgerMenu.classList.toggle('open');
  if (hamburgerMenu.classList.contains('open')) {
    hamburger.innerHTML = '✕';
    hamburger.style.fontSize = '20px';
    hamburger.style.color = 'white';
  } else {
    hamburger.innerHTML = `
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
    `;
  }
});

//Intro animation
function splitLetters() {
  const lines = document.querySelectorAll('.hero-line');
  lines.forEach((line) => {
    const text = line.textContent;
    line.textContent = '';
    text.split('').forEach((char, i) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.transform = 'translateY(80px) rotate(3deg)';
      span.style.animation = `heroReveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.07}s forwards`;
      line.appendChild(span);
    });
  });
}
splitLetters();

//After splitLetters() call
const hint = document.getElementById('hero-scroll-hint');
const label = document.getElementById('hero-label');

hint.style.opacity = '0';
hint.style.transform = 'translateY(30px)';
hint.style.animation = 'heroReveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) 1.6s forwards';

label.style.opacity = '0';
label.style.transform = 'translateY(30px)';
label.style.animation = 'heroReveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) 1.9s forwards';

// Try This Beauty
const tryTextarea = document.getElementById('try-textarea');
const ctrlSize    = document.getElementById('ctrl-size');
const ctrlTrack   = document.getElementById('ctrl-track');
const ctrlLead    = document.getElementById('ctrl-lead');

function applyTryStyles() {
  const size  = ctrlSize.value;
  const track = ctrlTrack.value;
  const lead  = ctrlLead.value;

  tryTextarea.style.fontSize      = size + 'px';
  tryTextarea.style.letterSpacing = track + 'px';
  tryTextarea.style.lineHeight    = lead + '%';

  document.getElementById('val-size').textContent  = size  + 'PX';
  document.getElementById('val-track').textContent = track + 'px';
  document.getElementById('val-lead').textContent  = lead  + '%';

  document.getElementById('lbl-size').textContent  = size;
  document.getElementById('lbl-track').textContent = track;
  document.getElementById('lbl-lead').textContent  = lead;
}

ctrlSize.addEventListener('input',  applyTryStyles);
ctrlTrack.addEventListener('input', applyTryStyles);
ctrlLead.addEventListener('input',  applyTryStyles);



// Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });


document.querySelectorAll('.reveal, .art-reveal').forEach(el => revealObserver.observe(el));

//Parallax
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  //Hero
  document.querySelector('.hero-line-basement').style.transform = `translateY(${scrollY * 0.25}px)`;
  document.querySelector('.hero-line-grotesque').style.transform = `translateY(${scrollY * 0.12}px)`;
  document.getElementById('hero-scroll-hint').style.transform   = `translateY(${scrollY * 0.08}px)`;
  document.getElementById('hero-label').style.transform         = `translateY(${scrollY * 0.2}px)`;

  // About
  const about = document.getElementById('about');
  const aboutTop = about.offsetTop;
  const relAbout = Math.max(0, scrollY - aboutTop + window.innerHeight);

  document.querySelector('.about__content').style.transform = `translateY(${relAbout * -0.03}px)`;

  const abSvgs = document.querySelectorAll('.ab-svg');
  abSvgs[0].style.transform = `translate(0px, 0px)`;
  abSvgs[1].style.transform = `translate(-16px, calc(-20px + ${relAbout * -0.015}px))`;
  abSvgs[2].style.transform = `translate(-32px, calc(-40px + ${relAbout * -0.03}px))`;
  abSvgs[3].style.transform = `translate(-48px, calc(-60px + ${relAbout * -0.045}px))`;
});

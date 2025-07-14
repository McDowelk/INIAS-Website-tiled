document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'title',
      right: 'prev,next'
    },
    events: [
      { title: 'Ancienne Belgique, Brussel', start: '2025-07-20' },
      { title: 'Lowlands, Nederland',       start: '2025-08-15' }
    ]
  });
  calendar.render();
});

// ========= Scroll-speed driven filmstrip =============
const strips = document.querySelectorAll('.filmstrip .track');

let lastScrollY = window.scrollY;
let lastTime   = performance.now();
let speed = 0;

function update() {
  const now = performance.now();
  const dt  = (now - lastTime) / 1000;          // sec
  const dy  = window.scrollY - lastScrollY;      // px
  lastScrollY = window.scrollY;
  lastTime = now;

  // pixels per seconde, afgevlakt
  speed = speed * 0.9 + (dy / dt) * 0.1;

  // begrens snelheid
  const max = 600;              // px/s
  const v = Math.max(Math.min(speed,  max), -max);

  // verplaats elke strip: translateX loopt modulo 50%
  strips.forEach(track => {
    const current = (parseFloat(track.dataset.offset) || 0) + v * dt;
    track.dataset.offset = current;                       // bewaren
    track.style.transform = `translateX(${current % (track.offsetWidth/2) * -1}px)`;
  });

  requestAnimationFrame(update);
}
requestAnimationFrame(update);

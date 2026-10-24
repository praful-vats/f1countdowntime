import { DEMO_NOW, races } from './data.js';

// The prototype clock advances from a fixed sample date. Replace this and
// data.js with a schedule provider when the visual design is approved.
const startedAt = performance.now();
const demoNow = () => Date.parse(DEMO_NOW) + performance.now() - startedAt;
const main = document.querySelector('#main');
const normalizeZone = value => value === 'Asia/Calcutta' ? 'Asia/Kolkata' : value;
let zone = 'Asia/Kolkata';
try { zone = normalizeZone(localStorage.getItem('lights-out-zone') || Intl.DateTimeFormat().resolvedOptions().timeZone || zone); } catch {}
try { new Intl.DateTimeFormat('en', { timeZone: zone }); } catch { zone = 'Asia/Kolkata'; }
let selectedSession = 'race';
let currentRace;
let currentPage = 'next';
let pendingFocus = null;
const nextRace = () => races.find(r => Date.parse(r.sessions.at(-1).end) > demoNow()) || races.at(-1);
const completed = r => Date.parse(r.sessions.at(-1).end) <= demoNow();
const pad = n => String(n).padStart(2, '0');
const format = (iso, options = {}) => new Intl.DateTimeFormat('en-GB', { timeZone: zone, ...options }).format(new Date(iso));
const date = iso => format(iso, { day: '2-digit', month: 'short' });
const time = iso => format(iso, { hour: '2-digit', minute: '2-digit', hour12: false });
const sessionStatus = s => demoNow() >= Date.parse(s.end) ? 'completed' : demoNow() >= Date.parse(s.start) ? 'live' : 'upcoming';
const arrow = '<span aria-hidden="true">↗</span>';
const calendarIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 6h16v15H4zM4 11h16M8 3v6M16 3v6"/></svg>';
const globeIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/></svg>';
const iconPaths = {
  fp1: '<path d="M12 24h40M16 24l8-12h16l8 12M17 31l7 6h16l7-6M14 42h36M10 36v17M54 36v17M24 49h16"/>',
  fp2: '<path d="M12 17l10-7h20l10 7v31l-10 7H22l-10-7ZM12 25h40M24 25v14h16V25M20 45h24"/>',
  fp3: '<path d="M16 10h32l8 14v25L43 56H21L8 49V24ZM8 30h48M23 30l9 13 9-13M32 43v13"/>',
  sq: '<path d="M10 18h28L24 39h28M10 18v12M52 39V27M15 48h20M35 9h16M45 5v8"/>',
  sprint: '<path d="M8 45 30 12h23L31 45ZM7 54h27M40 52h16M48 44v16"/>',
  qualifying: '<path d="M25 6h14M32 6v9M49 14l5 6M17 18l-6 6M32 17l17 7 7 16-7 15H15L8 40l7-16ZM32 25v16l11 6"/>',
  race: '<path d="M12 58V10M12 12h38v30H12"/><path d="M14 14h11v9H14ZM36 14h11v9H36ZM25 23h11v9H25ZM14 32h11v8H14ZM36 32h11v8H36Z" fill="currentColor" stroke="none"/>',
};
function icon(id, className = 'session-icon') { return `<svg class="${className}" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="miter" aria-hidden="true">${iconPaths[id] || iconPaths.race}</svg>`; }
function flag(r) { const type = ['MX', 'BR', 'US'].includes(r.flag) ? r.flag.toLowerCase() : 'generic'; return `<span class="flag flag-${type}" aria-label="${r.country}">${type === 'generic' ? r.flag : ''}</span>`; }
function zoneLabel(iso) {
  return new Intl.DateTimeFormat('en-GB', { timeZone: zone, timeZoneName: 'short' })
    .formatToParts(new Date(iso)).find(part => part.type === 'timeZoneName')?.value || zone;
}
function calendarZoneLabel() { return zone === 'Asia/Kolkata' ? 'India' : zone.split('/').at(-1).replaceAll('_', ' '); }
function zoneOptions() {
  const local = normalizeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const zones = [...new Set([local, 'Asia/Kolkata', 'UTC', 'America/Mexico_City', 'America/Sao_Paulo', 'America/Los_Angeles', 'Europe/London', 'Asia/Qatar', 'Asia/Dubai', zone].filter(Boolean))];
  const names = { 'Asia/Kolkata': 'India · IST', UTC: 'Universal · UTC', 'America/Mexico_City': 'Mexico City', 'America/Sao_Paulo': 'São Paulo', 'America/Los_Angeles': 'Los Angeles', 'Europe/London': 'London', 'Asia/Qatar': 'Qatar', 'Asia/Dubai': 'Abu Dhabi' };
  return zones.map(z => `<option value="${z}" ${z === zone ? 'selected' : ''}>${names[z] || z.split('/').at(-1).replaceAll('_', ' ')}${z === local ? ' (local)' : ''}</option>`).join('');
}
function zoneSelect() { return `<label class="timezone-control">${globeIcon}<span class="sr-only">Display timezone</span><select id="timezone" aria-label="Display timezone">${zoneOptions()}</select></label>`; }
function track(r, className = '') { return `<svg class="${className}" viewBox="0 0 500 280" aria-label="Stylized ${r.title} circuit illustration" role="img"><path class="track" d="${r.trackPath}"/></svg>`; }
function dateRange(r) {
  const first = r.sessions[0].start;
  if (format(first, { month: 'short' }) === format(r.date, { month: 'short' })) return `${format(first, { day: '2-digit' })}—${date(r.date)}`;
  return `${date(first)}—${date(r.date)}`;
}
function sessionLabel(item, status) {
  return `${item.name}, ${format(item.start, { weekday: 'long' })}, ${time(item.start)} ${zoneLabel(item.start)}, ${status}`;
}
function sessionStateText(id, status) {
  return id === selectedSession ? 'VIEWING' : status === 'completed' ? 'COMPLETED' : status === 'live' ? 'IN PROGRESS' : 'SET COUNTDOWN ↗';
}
function refreshSessionCards() {
  currentRace.sessions.forEach(item => {
    const card = document.querySelector(`[data-session="${item.id}"]`);
    const status = sessionStatus(item);
    if (!card || card.dataset.status === status) return;
    card.dataset.status = status;
    card.classList.remove('upcoming', 'live', 'completed');
    card.classList.add(status);
    card.setAttribute('aria-label', sessionLabel(item, status));
    card.querySelector('.session-state').textContent = sessionStateText(item.id, status);
  });
}
function renderRace(r) {
  currentRace = r;
  currentPage = 'next';
  const isNext = r.id === nextRace().id;
  const isPast = completed(r);
  const next = races.find(x => x.round > r.round);
  const s = r.sessions.find(s => s.id === selectedSession) || r.sessions.at(-1);
  selectedSession = s.id;
  main.innerHTML = `
    <section class="race-hero" aria-labelledby="race-title">
      <div class="race-info">
        <div class="eyebrow"><span class="red">${isPast ? 'FROM THE ARCHIVE' : isNext ? 'NEXT ON THE GRID' : 'ON THE HORIZON'}</span><span class="slash">/</span><span class="round-tag">ROUND ${pad(r.round)}</span>${r.sprint ? '<span class="sprint-tag">SPRINT WEEKEND</span>' : ''}</div>
        <h1 class="race-title${r.title.length > 14 ? ' long-title' : ''}" id="race-title">${r.title}${flag(r)}</h1>
        <div class="race-subtitle">${r.circuit}<span class="bullet">·</span><span class="country-name">${r.country}</span></div>
        <div class="hero-bottom"><span class="date-inline">${calendarIcon}${dateRange(r).toUpperCase()} 2026</span><button class="outline-link" data-action="calendar">Explore the calendar ${arrow}</button></div>
      </div>
      <div class="circuit-panel"><div class="micro"><span>CIRCUIT STUDY / ${pad(r.round)}</span><span>NOT TO SCALE ↗</span></div>${track(r)}<div class="circuit-stats"><div><span>LENGTH</span>${r.lengthKm} KM</div><div><span>LAPS</span>${r.laps}</div><div><span>DISTANCE</span>${r.distanceKm} KM</div></div></div>
    </section>
    <section class="countdown-panel" aria-label="${s.name} countdown">
      <div class="timer-top"><div class="micro"><span class="lights" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span><span id="timer-caption"></span></div><span class="timer-round">FORMULA ONE / ${pad(r.round)} OF 24</span></div>
      <div id="timer-body"></div>
      <div class="timer-bottom"><div><strong>${s.name.toUpperCase()}</strong><span> &nbsp;/&nbsp; </span><span class="time-date">${format(s.start, { weekday: 'short', day: '2-digit', month: 'short' }).toUpperCase()} · ${time(s.start)} ${zoneLabel(s.start)}</span></div>${zoneSelect()}</div>
    </section>
    <section class="weekend" aria-labelledby="weekend-title"><div class="section-heading"><h2 id="weekend-title">The race weekend <span>/ ${pad(r.sessions.length)} SESSIONS</span></h2><span class="micro">SELECT A SESSION TO VIEW ITS COUNTDOWN ↙</span></div><div class="session-grid">${r.sessions.map(item => {
      const status = sessionStatus(item);
      return `<button class="session-card ${item.id === s.id ? 'selected' : ''} ${status}" data-session="${item.id}" data-status="${status}" aria-pressed="${item.id === s.id}" aria-label="${sessionLabel(item, status)}"><span class="session-day">${format(item.start, { weekday: 'short' }).toUpperCase()} / ${date(item.start).toUpperCase()}</span><span class="session-name">${item.name}</span><span class="session-time">${time(item.start)}</span>${icon(item.id)}<span class="session-state">${sessionStateText(item.id, status)}</span></button>`;
    }).join('')}</div></section>
    <div class="next-strip"><div class="next-strip-left"><span class="micro">${next ? 'THEN WE GO TO' : 'THAT’S THE SEASON'}</span><span class="next-race-name">${next ? `${flag(next)}${next.title} <span class="next-strip-date">${dateRange(next)}${next.sprint ? ' · Sprint weekend' : ''}</span>` : '24 rounds. One championship.'}</span></div><button class="text-button" ${next ? `data-race="${next.id}"` : 'data-action="calendar"'}>${next ? 'View weekend' : 'View calendar'} ${arrow}</button></div>`;
  renderTimer(true);
  updateNav();
}
let timerMode = '';
function renderTimer(force = false) {
  if (currentPage !== 'next' || !currentRace) return;
  refreshSessionCards();
  const s = currentRace.sessions.find(s => s.id === selectedSession);
  const state = sessionStatus(s);
  const caption = document.querySelector('#timer-caption');
  const body = document.querySelector('#timer-body');
  if (!body) return;
  caption.textContent = state === 'completed' ? 'THE CHEQUERED FLAG HAS FALLEN' : state === 'live' ? 'SESSION IN PROGRESS' : s.id === 'race' ? 'LIGHTS OUT IN' : `${s.name.toUpperCase()} STARTS IN`;
  if (force || timerMode !== state) {
    timerMode = state;
    if (state === 'upcoming') {
      body.innerHTML = `<div class="countdown" role="timer" aria-label="Countdown to ${s.name}">${['DAYS', 'HOURS', 'MINUTES', 'SECONDS'].map((label, i) => `<div class="time-unit"><span class="time-value" data-unit="${i}">00</span><span class="time-label">${label}</span></div>`).join('')}</div>`;
    } else {
      body.innerHTML = `<div class="past-banner"><div><div class="past-title">${state === 'live' ? 'ON TRACK.' : 'SESSION<br>COMPLETE.'}</div><span class="past-label">${state === 'live' ? 'The sample session is underway.' : 'Every finish is a new countdown.'}</span></div>${icon(s.id, 'completed-emblem')}</div>`;
    }
  }
  if (state === 'upcoming') {
    const seconds = Math.max(0, Math.ceil((Date.parse(s.start) - demoNow()) / 1000));
    const values = [Math.floor(seconds / 86400), Math.floor(seconds % 86400 / 3600), Math.floor(seconds % 3600 / 60), seconds % 60];
    document.querySelectorAll('[data-unit]').forEach((el, i) => { const value = pad(values[i]); if (el.textContent !== value) el.textContent = value; });
  }
}
function renderCalendar(filter = 'upcoming') {
  currentPage = 'calendar';
  const upcoming = races.filter(r => !completed(r));
  const past = races.filter(completed);
  const visible = filter === 'past' ? [...past].reverse() : filter === 'all' ? races : upcoming;
  main.innerHTML = `<section class="calendar-intro"><div><div class="eyebrow"><span class="red">THE WORLD IS OUR RACETRACK</span><span class="slash">/</span><span>2026 SEASON</span></div><h1 class="calendar-title">The calendar<span style="color:var(--red)">.</span></h1></div><p>24 weekends. A world of anticipation.<br>Find your next lights out.</p></section><div class="calendar-bar"><div class="filter-group" aria-label="Filter races">${[['upcoming', 'Upcoming', upcoming.length], ['past', 'Past races', past.length], ['all', 'Full season', races.length]].map(([id, label, count]) => `<button class="filter ${filter === id ? 'active' : ''}" data-filter="${id}" aria-pressed="${filter === id}">${label}<span>${pad(count)}</span></button>`).join('')}</div><span class="micro">SAMPLE 2026 SCHEDULE / ${calendarZoneLabel()}</span></div><div class="calendar-grid">${visible.map(r => {
    const isNext = r.id === nextRace().id;
    return `<button class="race-card ${isNext ? 'next-card' : ''}" data-race="${r.id}" aria-label="View ${r.title} Grand Prix weekend"><div class="card-top"><span>ROUND ${pad(r.round)} <span class="slash">/</span> ${r.flag}</span>${isNext ? '<span class="card-badge">UP NEXT ↗</span>' : r.sprint ? '<span class="card-badge">SPRINT</span>' : completed(r) ? '<span>COMPLETED</span>' : '<span>GRAND PRIX</span>'}</div><h2>${r.title}</h2><span class="card-circuit">${r.circuit}</span>${track(r, 'card-track')}<div class="card-bottom"><span>${dateRange(r).toUpperCase()}</span><span class="arrow" aria-hidden="true">↗</span></div></button>`;
  }).join('')}</div>`;
  updateNav();
}
function updateNav() { document.querySelectorAll('[data-nav]').forEach(el => { const active = el.dataset.nav === currentPage; el.classList.toggle('active', active); active ? el.setAttribute('aria-current', 'page') : el.removeAttribute('aria-current'); }); }
function route() {
  const [page, id] = location.hash.slice(1).split('/');
  if (page === 'calendar') renderCalendar(['upcoming', 'past', 'all'].includes(id) ? id : 'upcoming');
  else { selectedSession = 'race'; renderRace(page === 'race' ? races.find(r => r.id === id) || nextRace() : nextRace()); }
  if (pendingFocus) {
    document.querySelector(pendingFocus)?.focus({ preventScroll: true });
    pendingFocus = null;
  }
}
function navigate(hash) { if (location.hash === hash) route(); else location.hash = hash; window.scrollTo({ top: 0, behavior: 'instant' }); }
document.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;
  if (button.dataset.nav) navigate(button.dataset.nav === 'next' ? '#next' : '#calendar/upcoming');
  if (button.dataset.action === 'calendar') navigate('#calendar/upcoming');
  if (button.dataset.race) navigate(`#race/${button.dataset.race}`);
  if (button.dataset.filter) {
    pendingFocus = `[data-filter="${button.dataset.filter}"]`;
    navigate(`#calendar/${button.dataset.filter}`);
  }
  if (button.dataset.session) {
    selectedSession = button.dataset.session;
    renderRace(currentRace);
    document.querySelector(`[data-session="${selectedSession}"]`).focus({ preventScroll: true });
  }
});
document.addEventListener('change', event => {
  if (event.target.id !== 'timezone') return;
  zone = normalizeZone(event.target.value);
  try { localStorage.setItem('lights-out-zone', zone); } catch {}
  renderRace(currentRace);
  document.querySelector('#timezone').focus({ preventScroll: true });
});
window.addEventListener('hashchange', route);
route();
setInterval(renderTimer, 1000);

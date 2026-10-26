import { races, scheduleMeta } from './data.js';
import { iconPaths } from './icons.js';
import { defaultSession } from './session-selection.js';
import { pixelTracks } from './track-data.js';

// Compare the verified schedule snapshot with the visitor's current clock.
const now = () => Date.now();
const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
const sourceUrl = value => {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && (url.hostname === 'formula1.com' || url.hostname.endsWith('.formula1.com')) ? url.href : scheduleMeta.sourceUrl;
  } catch { return scheduleMeta.sourceUrl; }
};
const main = document.querySelector('#main');
const normalizeZone = value => value === 'Asia/Calcutta' ? 'Asia/Kolkata' : value;
let zone = 'Asia/Kolkata';
try { zone = normalizeZone(localStorage.getItem('lights-out-zone') || Intl.DateTimeFormat().resolvedOptions().timeZone || zone); } catch {}
try { new Intl.DateTimeFormat('en', { timeZone: zone }); } catch { zone = 'Asia/Kolkata'; }
let selectedSession;
let autoSelectSession = true;
let followNextWeekend = true;
let currentRace;
let currentPage = 'next';
let pendingFocus = null;
const weekendEnd = r => Math.max(...r.sessions.map(session => Date.parse(session.end)));
const nextRace = () => races.find(r => weekendEnd(r) > now()) || races.at(-1);
const completed = r => weekendEnd(r) <= now();
const pad = n => String(n).padStart(2, '0');
const format = (iso, options = {}) => new Intl.DateTimeFormat('en-GB', { timeZone: zone, ...options }).format(new Date(iso));
const date = iso => format(iso, { day: '2-digit', month: 'short' });
const time = iso => format(iso, { hour: '2-digit', minute: '2-digit', hour12: false });
const sessionStatus = s => now() >= Date.parse(s.end) ? 'completed' : now() >= Date.parse(s.start) ? 'scheduled' : 'upcoming';
const arrow = '<span aria-hidden="true">↗</span>';
const calendarIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 6h16v15H4zM4 11h16M8 3v6M16 3v6"/></svg>';
const globeIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/></svg>';
function icon(id, className = 'session-icon') { return `<svg class="${className}" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="miter" aria-hidden="true">${iconPaths[id] || iconPaths.race}</svg>`; }
function flag(r) { const type = ['MX', 'BR', 'US'].includes(r.flag) ? r.flag.toLowerCase() : 'generic'; return `<span class="flag flag-${type}" aria-label="${escapeHtml(r.country)}">${type === 'generic' ? escapeHtml(r.flag) : ''}</span>`; }
function zoneLabel(iso) {
  return new Intl.DateTimeFormat('en-GB', { timeZone: zone, timeZoneName: 'short' })
    .formatToParts(new Date(iso)).find(part => part.type === 'timeZoneName')?.value || zone;
}
function calendarZoneLabel() { return zone === 'Asia/Kolkata' ? 'India' : zone.split('/').at(-1).replaceAll('_', ' '); }
function zoneOptions() {
  const local = normalizeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const zones = [...new Set([local, currentRace?.timezone, 'Asia/Kolkata', 'UTC', 'America/Chicago', 'America/Mexico_City', 'America/Sao_Paulo', 'America/Los_Angeles', 'Europe/London', 'Asia/Qatar', 'Asia/Dubai', zone].filter(Boolean))];
  const names = { 'Asia/Kolkata': 'India · IST', UTC: 'Universal · UTC', 'America/Chicago': 'Austin · Central', 'America/Mexico_City': 'Mexico City', 'America/Sao_Paulo': 'São Paulo', 'America/Los_Angeles': 'Los Angeles', 'Europe/London': 'London', 'Asia/Qatar': 'Qatar', 'Asia/Dubai': 'Abu Dhabi' };
  return zones.map(z => `<option value="${escapeHtml(z)}" ${z === zone ? 'selected' : ''}>${escapeHtml(names[z] || z.split('/').at(-1).replaceAll('_', ' '))}${z === currentRace?.timezone ? ' · track' : ''}${z === local ? ' (local)' : ''}</option>`).join('');
}
function zoneSelect() { return `<label class="timezone-control">${globeIcon}<span class="sr-only">Display timezone</span><select id="timezone" aria-label="Display timezone">${zoneOptions()}</select></label>`; }
function track(r, className = '') {
  const candidate = pixelTracks[r.id]?.asset;
  const asset = typeof candidate === 'string' && /^\.\/tracks\/[a-z0-9-]+\.svg$/i.test(candidate) ? candidate : '';
  if (!asset) return `<div class="track-map track-map-unavailable ${className}" role="img" aria-label="${escapeHtml(r.circuit)} track layout unavailable"><span>MAP UNAVAILABLE</span></div>`;
  return `<div class="track-map ${className}" style="--track-image:url('${escapeHtml(asset)}')" aria-label="${escapeHtml(r.circuit)} stylised track layout" role="img"></div>`;
}
const trackDate = (value, options) => new Intl.DateTimeFormat('en-GB', { timeZone: 'UTC', ...options }).format(new Date(`${value}T12:00:00Z`));
function dateRange(r) {
  const first = r.dateStart;
  const last = r.dateEnd;
  if (first.slice(0, 7) === last.slice(0, 7)) return `${trackDate(first, { day: '2-digit' })}—${trackDate(last, { day: '2-digit', month: 'short' })}`;
  return `${trackDate(first, { day: '2-digit', month: 'short' })}—${trackDate(last, { day: '2-digit', month: 'short' })}`;
}
function sessionLabel(item, status) {
  return `${item.name}, ${format(item.start, { weekday: 'long' })}, ${time(item.start)} ${zoneLabel(item.start)}, ${status}`;
}
function sessionStateText(id, status) {
  return id === selectedSession ? 'VIEWING' : status === 'completed' ? 'ENDED' : status === 'scheduled' ? 'SCHEDULED NOW' : 'SET COUNTDOWN ↗';
}
function refreshSessionCards() {
  currentRace.sessions.forEach(item => {
    const card = document.querySelector(`[data-session="${item.id}"]`);
    const status = sessionStatus(item);
    if (!card || card.dataset.status === status) return;
    card.dataset.status = status;
    card.classList.remove('upcoming', 'scheduled', 'completed');
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
  const s = r.sessions.find(s => s.id === selectedSession) || defaultSession(r, now());
  selectedSession = s.id;
  main.innerHTML = `
    <section class="race-hero" aria-labelledby="race-title">
      <div class="race-info">
        <div class="eyebrow"><span class="red">${isPast ? 'FROM THE ARCHIVE' : isNext ? 'NEXT ON THE GRID' : 'ON THE HORIZON'}</span><span class="slash">/</span><span class="round-tag">ROUND ${escapeHtml(pad(r.round))}</span>${r.sprint ? '<span class="sprint-tag">SPRINT WEEKEND</span>' : ''}</div>
        <h1 class="race-title${r.title.length > 14 ? ' long-title' : ''}" id="race-title" title="${escapeHtml(r.officialName)}">${escapeHtml(r.title)}${flag(r)}</h1>
        <div class="race-subtitle">${escapeHtml(r.circuit)}<span class="bullet">·</span><span class="country-name">${escapeHtml(r.location)}, ${escapeHtml(r.country)}</span></div>
        <p class="official-race-name">${escapeHtml(r.officialName)}</p>
        <div class="hero-bottom"><span class="date-inline" title="Weekend dates at the circuit">${calendarIcon}${escapeHtml(dateRange(r).toUpperCase())} ${escapeHtml(scheduleMeta.season)}</span><button class="outline-link" data-action="calendar">Explore the calendar ${arrow}</button></div>
      </div>
      <div class="circuit-panel"><div class="micro"><span>CIRCUIT STUDY / ${escapeHtml(pad(r.round))}</span><a class="source-link" href="./map-credits.html" target="_blank" rel="noopener noreferrer" aria-label="Track map sources and credits">MAP CREDITS ↗</a></div>${track(r)}<div class="circuit-stats"><div><span>LENGTH</span>${escapeHtml(r.lengthKm)} KM</div><div><span>LAPS</span>${escapeHtml(r.laps)}</div><div><span>DISTANCE</span>${escapeHtml(r.distanceKm)} KM</div></div></div>
    </section>
    <section class="countdown-panel" aria-label="${escapeHtml(s.name)} countdown">
      <div class="timer-top"><div class="micro"><span class="lights" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span><span id="timer-caption"></span></div><span class="timer-round">FORMULA ONE / ${escapeHtml(pad(r.round))} OF ${races.length}</span></div>
      <div id="timer-body"></div>
      <div class="timer-bottom"><div><strong>${escapeHtml(s.name.toUpperCase())}</strong><span> &nbsp;/&nbsp; </span><span class="time-date">${escapeHtml(format(s.start, { weekday: 'short', day: '2-digit', month: 'short' }).toUpperCase())} · ${escapeHtml(time(s.start))} ${escapeHtml(zoneLabel(s.start))}</span></div>${zoneSelect()}</div>
    </section>
    <section class="weekend" aria-labelledby="weekend-title"><div class="section-heading"><h2 id="weekend-title">The race weekend <span>/ ${pad(r.sessions.length)} SESSIONS</span></h2><span class="micro">SELECT A SESSION TO VIEW ITS COUNTDOWN ↙</span></div><div class="session-grid">${r.sessions.map(item => {
      const status = sessionStatus(item);
      return `<button class="session-card ${item.id === s.id ? 'selected' : ''} ${status}" data-session="${escapeHtml(item.id)}" data-status="${status}" aria-pressed="${item.id === s.id}" aria-label="${escapeHtml(sessionLabel(item, status))}"><span class="session-day">${escapeHtml(format(item.start, { weekday: 'short' }).toUpperCase())} / ${escapeHtml(date(item.start).toUpperCase())}</span><span class="session-name">${escapeHtml(item.name)}</span><span class="session-time">${escapeHtml(time(item.start))}</span>${icon(item.id)}<span class="session-state">${sessionStateText(item.id, status)}</span></button>`;
    }).join('')}</div></section>
    <div class="next-strip"><div class="next-strip-left"><span class="micro">${next ? 'THEN WE GO TO' : 'THAT’S THE SEASON'}</span><span class="next-race-name">${next ? `${flag(next)}${escapeHtml(next.title)} <span class="next-strip-date">${escapeHtml(dateRange(next))}${next.sprint ? ' · Sprint weekend' : ''}</span>` : `${races.length} rounds. One championship.`}</span></div><button class="text-button" ${next ? `data-race="${escapeHtml(next.id)}"` : 'data-action="calendar"'}>${next ? 'View weekend' : 'View calendar'} ${arrow}</button></div>`;
  renderTimer(true);
  updateNav();
}
let timerMode = '';
function renderTimer(force = false) {
  if (currentPage !== 'next' || !currentRace) return;
  if (autoSelectSession && !force) {
    const nextWeekend = followNextWeekend ? nextRace() : currentRace;
    const session = defaultSession(nextWeekend, now());
    if (nextWeekend.id !== currentRace.id || session.id !== selectedSession) {
      selectedSession = session.id;
      renderRace(nextWeekend);
      return;
    }
  }
  refreshSessionCards();
  const s = currentRace.sessions.find(s => s.id === selectedSession);
  const state = sessionStatus(s);
  const caption = document.querySelector('#timer-caption');
  const body = document.querySelector('#timer-body');
  if (!body) return;
  caption.textContent = state === 'completed' ? 'SCHEDULED SESSION ENDED' : state === 'scheduled' ? 'SCHEDULED SESSION WINDOW' : s.id === 'race' ? 'LIGHTS OUT IN' : `${s.name.toUpperCase()} STARTS IN`;
  if (force || timerMode !== state) {
    timerMode = state;
    if (state === 'upcoming') {
      body.innerHTML = `<div class="countdown" role="timer" aria-label="Countdown to ${escapeHtml(s.name)}">${['DAYS', 'HOURS', 'MINUTES', 'SECONDS'].map((label, i) => `<div class="time-unit"><span class="time-value" data-unit="${i}">00</span><span class="time-label">${label}</span></div>`).join('')}</div>`;
    } else {
      body.innerHTML = `<div class="past-banner"><div><div class="past-title">${state === 'scheduled' ? 'SCHEDULED<br>NOW.' : 'SESSION<br>ENDED.'}</div><span class="past-label">${state === 'scheduled' ? 'Within the published session time.' : 'The published session time has passed.'}</span></div>${icon(s.id, 'completed-emblem')}</div>`;
    }
  }
  if (state === 'upcoming') {
    const seconds = Math.max(0, Math.ceil((Date.parse(s.start) - now()) / 1000));
    const values = [Math.floor(seconds / 86400), Math.floor(seconds % 86400 / 3600), Math.floor(seconds % 3600 / 60), seconds % 60];
    document.querySelectorAll('[data-unit]').forEach((el, i) => { const value = pad(values[i]); if (el.textContent !== value) el.textContent = value; });
  }
}
function renderCalendar(filter = 'upcoming') {
  currentPage = 'calendar';
  const upcoming = races.filter(r => !completed(r));
  const past = races.filter(completed);
  const visible = filter === 'past' ? [...past].reverse() : filter === 'all' ? races : upcoming;
  main.innerHTML = `<section class="calendar-intro"><div><div class="eyebrow"><span class="red">THE WORLD IS OUR RACETRACK</span><span class="slash">/</span><span>${escapeHtml(scheduleMeta.season)} SEASON</span></div><h1 class="calendar-title">The calendar<span style="color:var(--red)">.</span></h1></div><p>${races.length} weekends. A world of anticipation.<br>Find your next lights out.</p></section><div class="calendar-bar"><div class="filter-group" aria-label="Filter races">${[['upcoming', 'Upcoming', upcoming.length], ['past', 'Past races', past.length], ['all', 'Full season', races.length]].map(([id, label, count]) => `<button class="filter ${filter === id ? 'active' : ''}" data-filter="${id}" aria-pressed="${filter === id}">${label}<span>${pad(count)}</span></button>`).join('')}</div><span class="micro">${escapeHtml(scheduleMeta.season)} SCHEDULE / WEEKEND DATES AT THE CIRCUIT</span></div><div class="calendar-grid">${visible.map(r => {
    const isNext = r.id === nextRace().id;
    return `<button class="race-card ${isNext ? 'next-card' : ''}" data-race="${escapeHtml(r.id)}" aria-label="View ${escapeHtml(r.officialName)} weekend"><div class="card-top"><span>ROUND ${escapeHtml(pad(r.round))} <span class="slash">/</span> ${escapeHtml(r.flag)}</span>${isNext ? '<span class="card-badge">UP NEXT ↗</span>' : r.sprint ? '<span class="card-badge">SPRINT</span>' : completed(r) ? '<span>PAST WEEKEND</span>' : '<span>GRAND PRIX</span>'}</div><h2>${escapeHtml(r.title)}</h2><span class="card-circuit">${escapeHtml(r.circuit)}</span><span class="card-location">${escapeHtml(r.location)}, ${escapeHtml(r.country)}</span>${track(r, 'card-track')}<div class="card-bottom"><span>${escapeHtml(dateRange(r).toUpperCase())}</span><span class="arrow" aria-hidden="true">↗</span></div></button>`;
  }).join('')}</div>`;
  updateNav();
}
function updateNav() { document.querySelectorAll('[data-nav]').forEach(el => { const active = el.dataset.nav === currentPage; el.classList.toggle('active', active); active ? el.setAttribute('aria-current', 'page') : el.removeAttribute('aria-current'); }); }
function route() {
  const [page, id] = location.hash.slice(1).split('/');
  if (page === 'calendar') renderCalendar(['upcoming', 'past', 'all'].includes(id) ? id : 'upcoming');
  else {
    followNextWeekend = page !== 'race';
    autoSelectSession = true;
    const race = page === 'race' ? races.find(r => r.id === id) || nextRace() : nextRace();
    selectedSession = defaultSession(race, now()).id;
    renderRace(race);
  }
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
    autoSelectSession = false;
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
const sourceNote = document.querySelector('#source-note');
if (sourceNote) {
  const checkedDate = new Intl.DateTimeFormat('en-GB', { timeZone: 'UTC', day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(scheduleMeta.checkedAt));
  sourceNote.innerHTML = `<i aria-hidden="true"></i><a href="${escapeHtml(sourceUrl(scheduleMeta.sourceUrl))}" target="_blank" rel="noopener noreferrer">FORMULA1.COM SNAPSHOT · CHECKED ${escapeHtml(checkedDate.toUpperCase())} ↗</a>`;
}
document.querySelector('#header-season').textContent = `${scheduleMeta.season} SEASON`;
route();
setInterval(renderTimer, 1000);

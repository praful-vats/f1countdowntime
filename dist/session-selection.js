// Show an active session first, then the earliest future session.
// Archived weekends retain their final race as the default detail view.
export function defaultSession(race, now) {
  const sessions = [...race.sessions].sort((a, b) => Date.parse(a.start) - Date.parse(b.start));
  return sessions.find(session => Date.parse(session.start) <= now && Date.parse(session.end) > now)
    || sessions.find(session => Date.parse(session.start) > now)
    || sessions.find(session => session.id === 'race')
    || sessions.at(-1);
}

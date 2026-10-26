// Keep the default countdown on the earliest session that has not started.
// These timestamps describe the schedule, not live race-control status.
// Use the active window only when no future session remains in this weekend;
// archived weekends retain their final race as the default detail view.
export function defaultSession(race, now) {
  const sessions = [...race.sessions].sort((a, b) => Date.parse(a.start) - Date.parse(b.start));
  return sessions.find(session => Date.parse(session.start) > now)
    || sessions.find(session => Date.parse(session.start) <= now && Date.parse(session.end) > now)
    || sessions.find(session => session.id === 'race')
    || sessions.at(-1);
}

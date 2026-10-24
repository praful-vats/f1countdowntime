/**
 * Design-prototype fixtures. All dates, results and circuit statistics are
 * illustrative sample data, not an official Formula 1 calendar.
 * Replace this module with normalized provider data when connecting a live API.
 */
export const DEMO_NOW = '2026-10-24T10:00:00Z';

const DAY = 24 * 60 * 60 * 1000;

function sessionStart(raceDate, daysBefore, hour, minute = 0) {
  const date = new Date(new Date(raceDate).getTime() - daysBefore * DAY);
  date.setUTCHours(hour, minute, 0, 0);
  return date.toISOString();
}

function session(id, name, start, durationMinutes) {
  return {
    id,
    name,
    start,
    end: new Date(new Date(start).getTime() + durationMinutes * 60000).toISOString(),
  };
}

function weekend(raceDate, isSprint) {
  const friday = (hour, minute = 0) => sessionStart(raceDate, 2, hour, minute);
  const saturday = (hour, minute = 0) => sessionStart(raceDate, 1, hour, minute);
  if (isSprint) {
    return [
      session('fp1', 'Practice 1', friday(15, 30), 60),
      session('sq', 'Sprint qualifying', friday(19, 30), 44),
      session('sprint', 'Sprint', saturday(15), 60),
      session('qualifying', 'Qualifying', saturday(19), 60),
      session('race', 'Race', raceDate, 120),
    ];
  }
  return [
    session('fp1', 'Practice 1', friday(15, 30), 60),
    session('fp2', 'Practice 2', friday(19), 60),
    session('fp3', 'Practice 3', saturday(16, 30), 60),
    session('qualifying', 'Qualifying', saturday(20), 60),
    session('race', 'Race', raceDate, 120),
  ];
}

// Stylized track drawings share a 500 × 280 viewBox. These are original
// geometric illustrations for the prototype, not exact circuit maps.
const fixtures = [
  {
    id: 'australia', round: 1, country: 'Australia', title: 'Australian',
    circuit: 'Albert Park Grand Prix Circuit', flag: 'AU',
    date: '2026-03-08T04:00:00Z', sprint: false,
    lengthKm: '5.278', laps: 58, distanceKm: '306.124', winner: 'L. Norris',
    trackPath: 'M85 180 L125 80 Q150 45 190 70 L230 103 L300 55 Q330 40 350 75 L405 155 Q420 185 390 200 L320 205 L280 230 L220 210 L155 225 L110 200 Z',
  },
  {
    id: 'china', round: 2, country: 'China', title: 'Chinese',
    circuit: 'Shanghai International Circuit', flag: 'CN',
    date: '2026-03-15T07:00:00Z', sprint: true,
    lengthKm: '5.451', laps: 56, distanceKm: '305.066', winner: 'O. Piastri',
    trackPath: 'M85 205 L370 205 Q405 205 410 170 L410 100 Q405 70 370 75 L340 95 L325 130 L280 145 L240 130 Q205 110 220 80 Q240 50 270 75 Q290 105 255 110 L160 115 L125 150 L95 155 Z',
  },
  {
    id: 'japan', round: 3, country: 'Japan', title: 'Japanese',
    circuit: 'Suzuka International Racing Course', flag: 'JP',
    date: '2026-03-29T05:00:00Z', sprint: false,
    lengthKm: '5.807', laps: 53, distanceKm: '307.471', winner: 'M. Verstappen',
    trackPath: 'M65 195 L140 190 L185 155 L225 175 L265 130 L305 150 L330 105 L380 80 Q430 65 430 110 L420 170 L360 200 L300 180 L265 135 L220 110 L185 125 L145 90 L95 100 L65 140 Z',
  },
  {
    id: 'bahrain', round: 4, country: 'Bahrain', title: 'Bahrain',
    circuit: 'Bahrain International Circuit', flag: 'BH',
    date: '2026-04-12T15:00:00Z', sprint: false,
    lengthKm: '5.412', laps: 57, distanceKm: '308.238', winner: 'G. Russell',
    trackPath: 'M80 215 L385 215 L415 175 L380 145 L345 165 L310 130 L345 95 L315 65 L250 75 L230 115 L185 100 L165 145 L110 140 L80 180 Z',
  },
  {
    id: 'saudi-arabia', round: 5, country: 'Saudi Arabia', title: 'Saudi Arabian',
    circuit: 'Jeddah Corniche Circuit', flag: 'SA',
    date: '2026-04-19T17:00:00Z', sprint: false,
    lengthKm: '6.174', laps: 50, distanceKm: '308.450', winner: 'C. Leclerc',
    trackPath: 'M70 210 L110 165 L145 170 L180 130 L210 145 L245 105 L280 120 L315 75 L370 55 Q400 45 415 70 L425 100 L380 125 L350 150 L310 155 L280 185 L240 175 L200 205 L155 195 L115 225 Z',
  },
  {
    id: 'miami', round: 6, country: 'United States', title: 'Miami',
    circuit: 'Miami International Autodrome', flag: 'US',
    date: '2026-05-03T20:00:00Z', sprint: true,
    lengthKm: '5.412', laps: 57, distanceKm: '308.326', winner: 'L. Norris',
    trackPath: 'M60 180 L90 140 L125 145 L145 110 L195 130 L215 95 L265 115 L285 90 L335 110 L390 75 L430 110 L400 145 L350 150 L325 175 L290 165 L265 200 L210 190 L170 210 L130 190 L90 215 Z',
  },
  {
    id: 'canada', round: 7, country: 'Canada', title: 'Canadian',
    circuit: 'Circuit Gilles-Villeneuve', flag: 'CA',
    date: '2026-05-24T18:00:00Z', sprint: true,
    lengthKm: '4.361', laps: 70, distanceKm: '305.270', winner: 'O. Piastri',
    trackPath: 'M70 205 L125 175 L160 185 L200 145 L240 155 L275 115 L315 120 L380 70 Q410 55 425 85 Q435 110 400 135 L350 155 L330 185 L290 175 L250 205 L200 195 L160 225 L115 210 L85 230 Z',
  },
  {
    id: 'monaco', round: 8, country: 'Monaco', title: 'Monaco',
    circuit: 'Circuit de Monaco', flag: 'MC',
    date: '2026-06-07T13:00:00Z', sprint: false,
    lengthKm: '3.337', laps: 78, distanceKm: '260.286', winner: 'C. Leclerc',
    trackPath: 'M90 210 L150 205 L185 170 L210 180 L230 150 L260 160 L280 130 L335 140 L395 100 L420 60 L385 50 L350 90 L315 80 L280 105 L245 90 L210 120 L180 110 L145 145 L115 150 L95 180 Z',
  },
  {
    id: 'barcelona', round: 9, country: 'Spain', title: 'Barcelona-Catalunya',
    circuit: 'Circuit de Barcelona-Catalunya', flag: 'ES',
    date: '2026-06-14T13:00:00Z', sprint: false,
    lengthKm: '4.657', laps: 66, distanceKm: '307.236', winner: 'M. Verstappen',
    trackPath: 'M80 210 L385 210 Q425 205 415 175 L375 140 L345 150 L320 115 L350 85 Q360 55 325 50 L275 70 L250 115 L215 105 L185 145 L145 130 L120 160 L85 165 Z',
  },
  {
    id: 'austria', round: 10, country: 'Austria', title: 'Austrian',
    circuit: 'Red Bull Ring', flag: 'AT',
    date: '2026-06-28T13:00:00Z', sprint: false,
    lengthKm: '4.318', laps: 71, distanceKm: '306.452', winner: 'L. Norris',
    trackPath: 'M85 220 L415 220 L405 175 L350 155 L385 65 L345 45 L290 75 L250 110 L220 105 L185 145 L145 140 L110 180 Z',
  },
  {
    id: 'britain', round: 11, country: 'United Kingdom', title: 'British',
    circuit: 'Silverstone Circuit', flag: 'GB',
    date: '2026-07-05T14:00:00Z', sprint: false,
    lengthKm: '5.891', laps: 52, distanceKm: '306.198', winner: 'L. Hamilton',
    trackPath: 'M75 180 L125 125 L105 90 L150 55 L215 80 L250 55 L280 90 L325 75 L345 110 L390 100 L430 140 L380 185 L335 175 L310 215 L260 190 L220 225 L180 205 L145 225 L110 195 Z',
  },
  {
    id: 'belgium', round: 12, country: 'Belgium', title: 'Belgian',
    circuit: 'Circuit de Spa-Francorchamps', flag: 'BE',
    date: '2026-07-19T13:00:00Z', sprint: false,
    lengthKm: '7.004', laps: 44, distanceKm: '308.052', winner: 'M. Verstappen',
    trackPath: 'M60 210 L155 205 L175 175 L210 185 L250 135 L285 120 L330 65 L380 55 L425 95 L395 125 L355 130 L330 160 L285 175 L260 210 L215 200 L185 235 L145 225 L100 240 Z',
  },
  {
    id: 'hungary', round: 13, country: 'Hungary', title: 'Hungarian',
    circuit: 'Hungaroring', flag: 'HU',
    date: '2026-07-26T13:00:00Z', sprint: false,
    lengthKm: '4.381', laps: 70, distanceKm: '306.630', winner: 'O. Piastri',
    trackPath: 'M75 215 L390 215 Q425 210 415 175 L380 155 L350 180 L315 160 L330 120 L300 90 L265 105 L245 65 L210 70 L190 110 L150 95 L115 125 L130 165 L90 170 Z',
  },
  {
    id: 'netherlands', round: 14, country: 'Netherlands', title: 'Dutch',
    circuit: 'Circuit Zandvoort', flag: 'NL',
    date: '2026-08-23T13:00:00Z', sprint: true,
    lengthKm: '4.259', laps: 72, distanceKm: '306.587', winner: 'M. Verstappen',
    trackPath: 'M80 205 L360 205 Q420 200 410 155 L385 125 L345 140 L315 110 L330 80 L295 55 L255 90 L220 75 L200 115 L165 100 L140 130 L115 115 L85 145 L110 175 Z',
  },
  {
    id: 'italy', round: 15, country: 'Italy', title: 'Italian',
    circuit: 'Autodromo Nazionale Monza', flag: 'IT',
    date: '2026-09-06T13:00:00Z', sprint: false,
    lengthKm: '5.793', laps: 53, distanceKm: '306.720', winner: 'C. Leclerc',
    trackPath: 'M90 215 L345 215 Q410 215 425 170 Q440 125 385 105 L340 95 L310 65 L270 80 L240 65 L205 100 L160 105 L135 140 L100 145 L110 175 Z',
  },
  {
    id: 'madrid', round: 16, country: 'Spain', title: 'Spanish',
    circuit: 'Madring', flag: 'ES',
    date: '2026-09-13T13:00:00Z', sprint: false,
    lengthKm: '5.474', laps: 56, distanceKm: '306.544', winner: 'G. Russell',
    trackPath: 'M70 210 L225 210 L250 180 L285 195 L330 165 L385 165 L425 120 L400 75 L350 60 L310 85 L275 65 L240 100 L205 90 L180 135 L135 130 L110 165 L80 160 Z',
  },
  {
    id: 'azerbaijan', round: 17, country: 'Azerbaijan', title: 'Azerbaijan',
    circuit: 'Baku City Circuit', flag: 'AZ',
    date: '2026-09-27T11:00:00Z', sprint: false,
    lengthKm: '6.003', laps: 51, distanceKm: '306.049', winner: 'O. Piastri',
    trackPath: 'M60 215 L425 215 L425 175 L365 175 L365 135 L320 135 L320 95 L280 95 L280 60 L245 60 L245 95 L205 95 L205 125 L165 125 L165 155 L115 155 L115 185 L60 185 Z',
  },
  {
    id: 'singapore', round: 18, country: 'Singapore', title: 'Singapore',
    circuit: 'Marina Bay Street Circuit', flag: 'SG',
    date: '2026-10-11T12:00:00Z', sprint: false,
    lengthKm: '4.940', laps: 62, distanceKm: '306.143', winner: 'L. Norris',
    trackPath: 'M70 210 L220 210 L220 180 L265 180 L265 210 L395 210 L425 175 L400 140 L360 140 L360 100 L315 100 L315 70 L270 70 L245 105 L200 105 L200 75 L145 75 L145 130 L105 130 L105 170 L70 170 Z',
  },
  {
    id: 'united-states', round: 19, country: 'United States', title: 'United States',
    circuit: 'Circuit of the Americas', flag: 'US',
    date: '2026-10-18T19:00:00Z', sprint: true,
    lengthKm: '5.513', laps: 56, distanceKm: '308.405', winner: 'M. Verstappen',
    trackPath: 'M65 215 L165 210 L210 175 L250 190 L300 135 L360 115 L425 80 L395 50 L330 85 L295 70 L270 105 L240 85 L210 125 L180 110 L150 150 L125 135 L100 175 L70 175 Z',
  },
  {
    id: 'mexico-city', round: 20, country: 'Mexico', title: 'Mexico City',
    circuit: 'Autódromo Hermanos Rodríguez', flag: 'MX',
    date: '2026-10-25T20:00:00Z', sprint: false,
    lengthKm: '4.304', laps: 71, distanceKm: '305.354',
    trackPath: 'M63 205 L399 205 Q426 205 426 181 L426 153 L382 153 L382 124 L346 124 L346 91 L312 91 L295 115 L272 90 L249 115 L225 90 L201 113 L170 83 L128 83 L128 115 L94 115 L94 156 L63 156 Z',
  },
  {
    id: 'sao-paulo', round: 21, country: 'Brazil', title: 'São Paulo',
    circuit: 'Autódromo José Carlos Pace', flag: 'BR',
    date: '2026-11-08T17:00:00Z', sprint: true,
    lengthKm: '4.309', laps: 71, distanceKm: '305.879',
    trackPath: 'M75 205 L350 205 Q420 205 425 160 Q425 120 385 95 L330 70 L280 75 L250 115 L215 95 L180 115 L195 150 L235 155 L250 180 L200 185 L165 160 L125 165 L105 140 L75 165 Z',
  },
  {
    id: 'las-vegas', round: 22, country: 'United States', title: 'Las Vegas',
    circuit: 'Las Vegas Strip Circuit', flag: 'US',
    date: '2026-11-22T04:00:00Z', sprint: false,
    lengthKm: '6.201', laps: 50, distanceKm: '309.958',
    trackPath: 'M65 215 L430 215 L430 155 L380 155 L380 115 L310 115 L310 70 L250 70 L250 100 L205 100 L205 65 L150 65 L150 125 L105 125 L105 170 L65 170 Z',
  },
  {
    id: 'qatar', round: 23, country: 'Qatar', title: 'Qatar',
    circuit: 'Lusail International Circuit', flag: 'QA',
    date: '2026-11-29T16:00:00Z', sprint: true,
    lengthKm: '5.419', laps: 57, distanceKm: '308.611',
    trackPath: 'M80 215 L385 215 L415 180 L385 150 L345 165 L320 135 L345 105 L315 75 L280 90 L250 60 L215 80 L190 65 L160 100 L175 130 L140 150 L110 130 L80 165 Z',
  },
  {
    id: 'abu-dhabi', round: 24, country: 'United Arab Emirates', title: 'Abu Dhabi',
    circuit: 'Yas Marina Circuit', flag: 'AE',
    date: '2026-12-06T13:00:00Z', sprint: false,
    lengthKm: '5.281', laps: 58, distanceKm: '306.183',
    trackPath: 'M65 210 L365 210 L405 175 L375 140 L345 150 L320 115 L350 85 L310 55 L260 85 L230 75 L200 110 L155 95 L120 125 L140 155 L100 175 L70 155 Z',
  },
];

export const races = fixtures.map((race) => ({
  ...race,
  sessions: weekend(race.date, race.sprint),
}));

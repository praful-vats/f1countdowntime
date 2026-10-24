// A shared open-wheel car keeps all three practice sessions visually consistent.
const practice = '<path d="M18 7h28M20 57h24M20 23h8M36 23h8M20 47h5M39 47h5"/><path d="M29 12h6v12l5 10v13l-5 6h-6l-5-6V34l5-10Z"/><path d="M11 16h10v15H11ZM43 16h10v15H43ZM11 40h10v15H11ZM43 40h10v15H43Z" fill="currentColor" stroke="none"/><path d="M32 32v9"/>';
const stopwatch = '<path d="M25 6h14M32 6v9M47 20l6-6"/><circle cx="32" cy="37" r="20"/><path d="M32 25v12l10 6"/>';
const race = '<path d="M12 58V10M12 12h38v30H12"/><path d="M14 14h11v9H14ZM36 14h11v9H36ZM25 23h11v9H25ZM14 32h11v8H14ZM36 32h11v8H36Z" fill="currentColor" stroke="none"/>';

export const iconPaths = {
  fp1: practice,
  fp2: practice,
  fp3: practice,
  qualifying: stopwatch,
  sq: `<path d="M3 29h9M3 38h9M6 47h6"/><g transform="translate(7 4) scale(.88)">${stopwatch}</g>`,
  sprint: '<path d="M5 18h54v24H5ZM13 42v12M51 42v12M8 54h10M46 54h10"/><g fill="currentColor" stroke="none"><circle cx="12" cy="30" r="3.2"/><circle cx="22" cy="30" r="3.2"/><circle cx="32" cy="30" r="3.2"/><circle cx="42" cy="30" r="3.2"/><circle cx="52" cy="30" r="3.2"/></g>',
  race,
};

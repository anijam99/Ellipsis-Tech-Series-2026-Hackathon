/**
 * Palette contrast gate.
 *
 * Every foreground/background pairing the app actually uses, checked against WCAG AA.
 * Run this before shipping a colour change: `node scripts/check-contrast.mjs`
 * Exits non-zero if anything drops below its minimum, so it can go in CI.
 */
import config from '../tailwind.config.js';

const c = config.theme.extend.colors;
const S = c.kachang;

const hx = h => { h = h.replace('#', ''); return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16)); };
const lin = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
const L = h => { const [r, g, b] = hx(h).map(lin); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const ratio = (a, b) => { const x = L(a), y = L(b); const [hi, lo] = x > y ? [x, y] : [y, x]; return (hi + 0.05) / (lo + 0.05); };

const CARD = c.white, CANVAS = S.canvas, SHELL = S.shell, SHELL_UP = S.shellUp;

const checks = [
  ['body text on card',        c.slate[700], CARD,          4.5],
  ['body text on canvas',      c.slate[700], CANVAS,        4.5],
  ['secondary on card',        c.slate[500], CARD,          4.5],
  ['secondary on canvas',      c.slate[500], CANVAS,        4.5],
  ['small label on card',      c.slate[400], CARD,          4.5],
  ['small label on canvas',    c.slate[400], CANVAS,        4.5],
  ['cream text on primary',    CARD,         c.pink[500],   4.5],
  ['cream text on hover',      CARD,         c.pink[700],   4.5],
  ['pink text on card',        c.pink[600],  CARD,          4.5],
  ['pink text on its wash',    c.pink[600],  c.pink[50],    4.5],
  ['sage text on its wash',    c.emerald[600], c.emerald[50], 4.5],
  ['gula text on its wash',    c.amber[600], c.amber[50],   4.5],
  ['terra text on its wash',   c.orange[600], c.orange[50], 4.5],
  ['plum text on its wash',    c.purple[600], c.purple[50], 4.5],
  ['shell heading',            c.slate[100], SHELL,         4.5],
  ['shell muted text',         c.slate[300], SHELL_UP,      4.5],
];

let failed = 0;
for (const [name, fg, bg, min] of checks) {
  const r = ratio(fg, bg);
  const ok = r >= min;
  if (!ok) failed++;
  console.log(`${ok ? 'PASS' : 'FAIL'} ${r.toFixed(2).padStart(6)}:1 (min ${min})  ${name}`);
}
console.log(failed ? `\n${failed} pairing(s) below AA` : '\nAll pairings clear WCAG AA.');
process.exit(failed ? 1 : 0);

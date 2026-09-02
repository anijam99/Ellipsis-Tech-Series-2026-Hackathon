# UI/UX pass over the Gemini build

Visual identity kept as-is: the kachang palette, rounded white cards, and the phone-frame
demo shell are all unchanged. This was refinement, not redesign.

## Defects fixed

**The journey route didn't render.** `overflow-hidden` on the roadmap card set its flex
minimum size to zero, so inside `flex flex-col h-full` the whole four-milestone route
collapsed to one clipped row — a screen headed "Four milestones, one route" was showing
one card and no route. Same class of bug was crushing the Support category filters into
grey bars. Fixed at the cause and guarded every screen's scroll children.

**The melted companion was invisible.** Its puddle, floating toppings, gold coin and sad
face are all drawn at y 140–152, and the shared bowl painted over them afterwards. Pure
paint-order bug: the most severe state read as the *least* dramatic. The melted group now
renders inside the bowl.

**The speech bubble contradicted the bowl.** It opened on hardcoded healthy copy, so a
melting companion sat there crying while telling you that you were on track. The lines are
now keyed to the state (and a check-in still keeps its own celebration).

**Nothing had keyboard focus.** Not one button in the app had a focus style. One ring,
defined once, on everything focusable.

**Five animations ran forever, for everyone.** `prefers-reduced-motion` is now honoured.

**`body` was `bg-slate-950` with `text-slate-800`** — near-black text on a near-black page.

## Hierarchy

- **Scheme amounts now scale with magnitude.** A S$30,000 housing grant and a S$500 voucher
  were set identically, so the list had no shape. Claimed ones step back in grey.
- **Spent vs Planned is one bar, not two.** The old pair made you compare two lengths and
  do the subtraction yourself — and their widths were hardcoded at 85%/55% when the real
  ratio is 61%, so the picture disagreed with the numbers. Now the plan fills the bar and
  the overage continues past it, which is the shape of the sentence.
- **Home metrics promoted**, labels un-wrapped from hardcoded `<br />`.
- **Mascot artboard cropped** to the drawing's real bounds — the hero card was reserving
  ~330px for a ~200px drawing.
- Redundant "COMPANION STATUS: HEALTHY" row and the "tap me" chip removed; the bowl and
  the headline already say it, and a label apologising for an affordance isn't one.
- Type scale added (`text-display`/`figure`/`title`/`amount`/`label`), tabular figures on
  money and counts, typographic quotes.
- Tab bar: underline marker instead of a dot colliding with descenders; badge given room;
  removed the whole-tab scale that nudged neighbours on every switch.

## Added

`?tab=` and `?state=` deep links — a refresh keeps your place, and a judge can land
directly on any screen or companion state.

## Two things for you to decide

1. **`"Your bowl is sweet and full! S$1,050 saved this month!"`** — S$1,050 is the amount
   *required* monthly by the proposal, not what was saved. I left the claim alone rather
   than rewrite product copy, but it should probably change.
2. **The build was broken on this machine** before any of this: Windows Application Control
   blocks Vite 6's native rollup binary. Added an npm override onto `@rollup/wasm-node`,
   which fixes `dev` and `build`. Harmless elsewhere; drop it if your machines are fine.

## State

`npx tsc --noEmit` clean · production build clean · design detector reports three findings,
all verified false positives (two are hover pairs where the text colour changes with the
background; the third matches the substring `animate-bounce` inside our own `bounce-slow`,
which is a 3s ease-in-out idle, now gated behind reduced-motion).

---

# Warm palette pass

The app was white-on-white with cool slate neutrals — correct, but clinical for something
whose whole premise is that money shouldn't feel daunting. It now runs warm.

## The system

| Role | Value | Notes |
|---|---|---|
| Canvas | `#EDE2D0` | the tan the phone surface sits on |
| Card | `#FBF6ED` | cream — this is what `white` now maps to |
| Raised | `#FFFCF6` | inputs, popovers: one step up from a card |
| Sunken | `#E4D9C6` | progress tracks, grouped fields |
| Shell | `#1C1712` | the page behind the phone — espresso, not blue-black |
| Ink | warm taupe ramp | replaces every cool `slate-*` in the codebase |

Accents, each with a job rather than a decoration: **rose** for action only (so the primary
control stays findable), **sage** for on-track and claimed, **gula** for money and
attention, **terracotta** for overspend and melt, **plum** for skills and training.

The step from tan canvas to cream card is deliberately small. That narrow contrast is what
makes it feel calm; the width is spent between ink and surface instead, where it buys
readability.

## Done as a token remap, not a repaint

Overriding `white` and the `slate`/`gray`/`stone` ramps in `tailwind.config.js` warmed
every existing `bg-white` and `text-slate-500` at once. Only genuinely hardcoded values
needed touching: the phone surface, three button fills, the confetti, and the mascot's own
SVG (its bowl was cool `#E2E8F0`, which read as a foreign object once everything else went
warm).

The `slate-400` step is deliberately **darker** than Tailwind's, because this codebase uses
`text-slate-400` for real label text where it has to clear 4.5:1 on tan.

## Colour doing work

Scheme cards now carry a soft wash keyed to their `category` — a field that was in the data
and doing nothing on screen. Gentle variety, and it encodes what kind of support each one
is rather than just adding colour.

## Verified, not eyeballed

`npm run check:contrast` checks all sixteen real pairings against WCAG AA and exits
non-zero on failure, so it can go in CI. The primary rose was **solved** rather than
picked: I searched for the most saturated rose that still carries cream text at 4.5:1, then
pulled the saturation back to keep it calm — hence a fill token (`pink-500`) and a text
token (`pink-600`) that differ on purpose.

One deliberate exception: the melting bowl's tear stays cool. It's depicting water.

/** @type {import('tailwindcss').Config} */

/*
 * Ice Kaching runs warm.
 *
 * The palette is the dessert stall, not the banking app: a tan canvas, cream cards that
 * sit on it in a soft step rather than a hard white cut-out, and warm accents that stay
 * quiet until they mean something. Pink is reserved for action so it stays findable.
 *
 * This is a token remap, not a per-component repaint. Overriding `white` and the `slate`
 * ramp warms every existing `bg-white` / `text-slate-500` in the codebase at once, which
 * is why the whole app changed temperature without touching the screens.
 *
 * Every foreground/background pairing below was checked against WCAG AA before shipping.
 * The 400 step is deliberately darker than Tailwind's, because this codebase uses
 * `text-slate-400` for real label text where it has to clear 4.5:1 on tan.
 */

const warm = {
  50: '#F8F4EC',
  100: '#F1EADE',
  200: '#E4D9C6',
  300: '#C9B99E',
  400: '#716351',
  500: '#6B5C48',
  600: '#574A39',
  700: '#453A2D',
  800: '#362E24',
  900: '#292219',
  950: '#1C1712',
};

const rose = {
  50: '#FCEAEE', 100: '#F8D6DD', 200: '#F2BAC6', 300: '#EC98AB', 400: '#E4657F',
  // 500 is the action fill: the most saturated rose that still carries cream text at AA.
  // 600 is the text token. They differ on purpose -- a fill and a label have different jobs.
  500: '#B84A63', 600: '#A1485A', 700: '#8E3E50', 800: '#7A3644', 900: '#5F2A35',
};
const sage = {
  50: '#EAF1E7', 100: '#D6E5D2', 200: '#B7D0B2', 300: '#93B892', 400: '#6E9670',
  500: '#5F8A62', 600: '#4B6D4E', 700: '#446246', 800: '#374F38', 900: '#2A3D2B',
};
const gula = {
  50: '#FAF0DE', 100: '#F4E1BE', 200: '#E9C88C', 300: '#DAAC5C', 400: '#C08A3C',
  500: '#AC7833', 600: '#875D24', 700: '#7A5421', 800: '#61431A', 900: '#4A3314',
};
const terracotta = {
  50: '#FBEAE3', 100: '#F6D5C7', 200: '#EDB39B', 300: '#DC8D6D', 400: '#C2664A',
  500: '#B85F44', 600: '#9A513B', 700: '#8D4936', 800: '#713B2C', 900: '#572E22',
};
const plum = {
  50: '#F3ECF4', 100: '#E6D8E8', 200: '#D0B8D3', 300: '#B49AB8', 400: '#9C7FA0',
  500: '#8E6B93', 600: '#7A5B7D', 700: '#6F5273', 800: '#59425C', 900: '#443346',
};

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Cards are cream, never paper-white. This single line warms the whole app.
        white: '#FBF6ED',
        // Warm taupe stands in for every cool neutral the screens already reference.
        slate: warm,
        gray: warm,
        neutral: warm,
        stone: warm,
        // Accents, each with a role.
        pink: rose,
        rose: rose,
        emerald: sage,
        green: sage,
        amber: gula,
        yellow: gula,
        orange: terracotta,
        red: terracotta,
        purple: plum,
        violet: plum,

        kachang: {
          canvas: '#EDE2D0', // the tan the app sits on
          card: '#FBF6ED', // cream surface
          raised: '#FFFCF6', // inputs, popovers — one step up from the card
          sunken: '#E4D9C6', // progress tracks, grouped fields
          shell: '#1C1712', // the demo page around the phone
          shellUp: '#2A231C',
          pink: '#E4657F',
          softpink: '#FCEAEE',
          coral: '#C2664A',
          green: '#5F8A62',
          softgreen: '#EAF1E7',
          yellow: '#C08A3C',
          softyellow: '#FAF0DE',
          purple: '#9C7FA0',
          softpurple: '#F3ECF4',
          dark: '#453A2D',
          bg: '#EDE2D0',
        },
        brand: rose,
      },
      fontSize: {
        display: ['2.75rem', { lineHeight: '1', letterSpacing: '-0.035em', fontWeight: '800' }],
        figure: ['2rem', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '800' }],
        title: ['1.5rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
        amount: ['1.125rem', { lineHeight: '1.2', letterSpacing: '-0.015em', fontWeight: '800' }],
        label: ['0.6875rem', { lineHeight: '1.2', letterSpacing: '0.04em', fontWeight: '700' }],
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        // Warm shadows. Neutral black over tan reads as dirt; tinting them to the canvas
        // hue keeps the depth without muddying the surface.
        soft: '0 4px 20px -2px rgba(94, 74, 48, 0.07), 0 2px 6px -1px rgba(94, 74, 48, 0.05)',
        float: '0 10px 30px -5px rgba(94, 74, 48, 0.10), 0 4px 12px -2px rgba(94, 74, 48, 0.06)',
        glow: '0 0 25px rgba(228, 101, 127, 0.28)',
      },
      keyframes: {
        bounceSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(0.98)' },
        },
        drip: {
          '0%': { transform: 'translateY(0) scaleY(1)', opacity: '0.8' },
          '50%': { transform: 'translateY(8px) scaleY(1.4)', opacity: '1' },
          '100%': { transform: 'translateY(16px) scaleY(1)', opacity: '0' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg) translateY(0)' },
          '15%': { transform: 'rotate(-4deg) translateY(-2px)' },
          '30%': { transform: 'rotate(4deg) translateY(-4px)' },
          '45%': { transform: 'rotate(-3deg) translateY(-2px)' },
          '60%': { transform: 'rotate(3deg) translateY(-3px)' },
          '75%': { transform: 'rotate(-2deg) translateY(-1px)' },
          '90%': { transform: 'rotate(1deg) translateY(0)' },
        },
        squish: {
          '0%': { transform: 'scale(1, 1)' },
          '20%': { transform: 'scale(1.18, 0.82)' },
          '45%': { transform: 'scale(0.88, 1.12)' },
          '65%': { transform: 'scale(1.06, 0.94)' },
          '80%': { transform: 'scale(0.97, 1.03)' },
          '100%': { transform: 'scale(1, 1)' },
        },
        shiver: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-3px) rotate(-1deg)' },
          '40%': { transform: 'translateX(3px) rotate(1deg)' },
          '60%': { transform: 'translateX(-2px) rotate(-0.5deg)' },
          '80%': { transform: 'translateX(2px) rotate(0.5deg)' },
        },
        floatParticle: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '1' },
          '60%': { opacity: '0.9' },
          '100%': { transform: 'translateY(-48px) scale(0.6)', opacity: '0' },
        },
        doubleBounce: {
          '0%': { transform: 'scale(1) translateY(0)' },
          '15%': { transform: 'scale(0.92, 1.08) translateY(4px)' },
          '30%': { transform: 'scale(1.14, 0.86) translateY(-14px)' },
          '45%': { transform: 'scale(0.96, 1.04) translateY(2px)' },
          '58%': { transform: 'scale(1.08, 0.92) translateY(-8px)' },
          '72%': { transform: 'scale(0.98, 1.02) translateY(1px)' },
          '85%': { transform: 'scale(1.03, 0.97) translateY(-3px)' },
          '100%': { transform: 'scale(1) translateY(0)' },
        },
        blink: {
          '0%, 92%, 100%': { transform: 'scaleY(1)' },
          '96%': { transform: 'scaleY(0.08)' },
        },
        slideUpFade: {
          '0%': { transform: 'translateY(8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'bounce-slow': 'bounceSlow 3s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        drip: 'drip 2s ease-in-out infinite',
        wiggle: 'wiggle 5s ease-in-out infinite',
        squish: 'squish 0.45s cubic-bezier(0.36, 0.07, 0.19, 0.97)',
        shiver: 'shiver 0.5s ease-in-out infinite',
        'float-particle': 'floatParticle 1.4s ease-out forwards',
        'double-bounce': 'doubleBounce 0.75s cubic-bezier(0.36, 0.07, 0.19, 0.97)',
        blink: 'blink 4s ease-in-out infinite',
        'slide-up-fade': 'slideUpFade 0.25s ease-out forwards',
      },
    },
  },
  plugins: [],
};

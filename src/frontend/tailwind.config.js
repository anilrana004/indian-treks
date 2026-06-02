import typography from "@tailwindcss/typography";
import containerQueries from "@tailwindcss/container-queries";
import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["index.html", "src/**/*.{js,ts,jsx,tsx,html,css}"],
  theme: {
    // Custom TrekRoot breakpoints
    screens: {
      sm:      '640px',
      md:      '768px',
      lg:      '1024px',
      xl:      '1280px',
      '2xl':   '1440px',
      wide:    '1441px',
      // Named breakpoints for clarity
      tablet:  '768px',
      desktop: '1024px',
    },
    container: {
      center: true,
      padding: '2rem',
      screens: { '2xl': '1400px' },
    },
    extend: {
      // ── Brand Colors ──────────────────────────────────────
      colors: {
        primary: {
          DEFAULT: '#38A169',
          light:   '#68D391',
          dark:    '#276749',
          pale:    '#F0FFF4',
          50:      '#F0FFF4',
          100:     '#C6F6D5',
          200:     '#9AE6B4',
          300:     '#68D391',
          400:     '#48BB78',
          500:     '#38A169',
          600:     '#2F855A',
          700:     '#276749',
          800:     '#22543D',
          900:     '#1C4532',
        },
        accent: {
          DEFAULT: '#F59E0B',
          warm:    '#FCD34D',
          deep:    '#D97706',
          50:      '#FFFBEB',
          100:     '#FEF3C7',
          200:     '#FDE68A',
          300:     '#FCD34D',
          400:     '#FBBF24',
          500:     '#F59E0B',
          600:     '#D97706',
          700:     '#B45309',
          800:     '#92400E',
          900:     '#78350F',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          muted:   '#F7F7F7',
          soft:    '#F0FFF4',
        },
        border: {
          DEFAULT: '#E8E8E8',
          light:   '#F0F0F0',
          dark:    '#CCCCCC',
        },
        trek: {
          easy:     '#38A169',
          moderate: '#F59E0B',
          difficult: '#E53E3E',
          extreme:  '#7B2D8B',
        },

        // shadcn/ui semantic tokens (OKLCH via CSS vars)
        input:       'oklch(var(--input))',
        ring:        'oklch(var(--ring) / <alpha-value>)',
        background:  'oklch(var(--background))',
        foreground:  'oklch(var(--foreground))',
        secondary: {
          DEFAULT:    'oklch(var(--secondary) / <alpha-value>)',
          foreground: 'oklch(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT:    'oklch(var(--destructive) / <alpha-value>)',
          foreground: 'oklch(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT:    'oklch(var(--muted) / <alpha-value>)',
          foreground: 'oklch(var(--muted-foreground) / <alpha-value>)',
        },
        popover: {
          DEFAULT:    'oklch(var(--popover))',
          foreground: 'oklch(var(--popover-foreground))',
        },
        card: {
          DEFAULT:    'oklch(var(--card))',
          foreground: 'oklch(var(--card-foreground))',
        },
        chart: {
          1: 'oklch(var(--chart-1))',
          2: 'oklch(var(--chart-2))',
          3: 'oklch(var(--chart-3))',
          4: 'oklch(var(--chart-4))',
          5: 'oklch(var(--chart-5))',
        },
        sidebar: {
          DEFAULT:             'oklch(var(--sidebar))',
          foreground:          'oklch(var(--sidebar-foreground))',
          primary:             'oklch(var(--sidebar-primary))',
          'primary-foreground':'oklch(var(--sidebar-primary-foreground))',
          accent:              'oklch(var(--sidebar-accent))',
          'accent-foreground': 'oklch(var(--sidebar-accent-foreground))',
          border:              'oklch(var(--sidebar-border))',
          ring:                'oklch(var(--sidebar-ring))',
        },
      },

      // ── Typography ────────────────────────────────────────
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        sans:    ['Inter',            'system-ui', 'sans-serif'],
        accent:  ['Space Grotesk',    'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono',   'Courier New', 'monospace'],
      },

      // ── Border Radii ──────────────────────────────────────
      borderRadius: {
        card: '16px',
        btn:  '4px',
        lg:   'var(--radius)',
        md:   'calc(var(--radius) - 2px)',
        sm:   'calc(var(--radius) - 4px)',
      },

      // ── Max-Width ─────────────────────────────────────────
      maxWidth: {
        site: '1440px',
      },

      // ── Box Shadows ───────────────────────────────────────
      boxShadow: {
        xs:       '0 1px 2px 0 rgba(0,0,0,0.05)',
        sm:       '0 1px 2px 0 rgba(0,0,0,0.08)',
        md:       '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.08)',
        lg:       '0 10px 15px -3px rgba(0,0,0,0.12), 0 4px 6px -4px rgba(0,0,0,0.08)',
        elevated: '0 20px 25px -5px rgba(0,0,0,0.15), 0 8px 10px -6px rgba(0,0,0,0.1)',
        subtle:   '0 1px 2px 0 rgba(0,0,0,0.04)',
        summit:   '0 8px 24px rgba(212,136,14,0.35)',
        glacier:  '0 8px 24px rgba(45,106,79,0.35)',
        card:     '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
        gold:     '0 4px 12px rgba(245,158,11,0.35)',
        green:    '0 4px 12px rgba(56,161,105,0.35)',
      },

      // ── Keyframes ─────────────────────────────────────────
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to:   { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to:   { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        'slide-in-from-top': {
          from: { transform: 'translateY(-10px)', opacity: '0' },
          to:   { transform: 'translateY(0)',      opacity: '1' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1'    },
          '50%':       { opacity: '0.85' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition:  '200% center' },
        },
      },

      // ── Animation Aliases ─────────────────────────────────
      animation: {
        'accordion-down':    'accordion-down 0.2s ease-out',
        'accordion-up':      'accordion-up 0.2s ease-out',
        'fade-in':           'fade-in 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-in-from-top': 'slide-in-from-top 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'pulse-subtle':      'pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        shimmer:             'shimmer 1.5s ease infinite',
      },
    },
  },
  plugins: [typography, containerQueries, animate],
};

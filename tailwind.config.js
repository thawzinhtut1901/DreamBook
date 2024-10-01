/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    fontFamily: {
      Inter: ["Inter", "sans-serif"],
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        border: "#E0E0E0",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#3A7AD5",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "#666666",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        darker: {
          brand: "var(--color-brand-darker)",
          neutral: "var(--color-neutral-darker)",
          positive: "var(--color-positive-darker)",
          negative: "var(--color-negative-darker)",
          warning: "var(--color-warning-darker)",
        },
        dark: {
          brand: "var(--color-brand-dark)",
          neutral: "var(--color-neutral-dark)",
          positive: "var(--color-positive-dark)",
          negative: "var(--color-negative-dark)",
          warning: "var(--color-warning-dark)",
        },
        default: {
          brand: "var(--color-brand-default)",
          neutral: "var(--color-neutral-default)",
          positive: "var(--color-positive-default)",
          negative: "var(--color-negative-default)",
          warning: "var(--color-warning-default)",
        },
        light: {
          brand: "var(--color-brand-light)",
          neutral: "var(--color-neutral-light)",
          positive: "var(--color-positive-light)",
          negative: "var(--color-negative-light)",
          warning: "var(--color-warning-light)",
        },
        lighter: {
          brand: "var(--color-brand-lighter)",
          neutral: "var(--color-neutral-lighter)",
          positive: "var(--color-positive-lighter)",
          negative: "var(--color-negative-lighter)",
          warning: "var(--color-warning-lighter)",
        },
        dark: {
          bg: "#1F1F1F",
          border: "#666666",
        },
      },
      borderRadius: {
        md: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
  darkMode: "class",
};

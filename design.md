# Design Tokens

> **Theme: Warm & Earthy** — cream backgrounds, terracotta accent, rounded corners.

Design tokens are the single source of truth for visual decisions. All values live in `tokens.css` as CSS custom properties and are consumed project-wide.

---

## Color

### Warm neutrals (background / surface scale)

```css
--color-neutral-0:   #ffffff;
--color-neutral-50:  #fdf6ee;  /* page background */
--color-neutral-100: #fffaf4;  /* surface */
--color-neutral-200: #f5ebe0;  /* subtle fill */
--color-neutral-300: #e8d5c0;  /* border */
--color-neutral-400: #d4b8a0;
--color-neutral-500: #8b6a52;  /* muted text */
--color-neutral-600: #6b4f3a;
--color-neutral-700: #4a3728;
--color-neutral-800: #3a2518;
--color-neutral-900: #2c1810;  /* primary text */
```

### Terracotta (accent / primary)

```css
--color-primary-100: #fde8de;
--color-primary-200: #f9c4a8;
--color-primary-300: #f0a07a;
--color-primary-400: #e07a50;
--color-primary-500: #d05a32;
--color-primary-600: #c2410c;  /* accent */
--color-primary-700: #9a3412;  /* accent hover */
--color-primary-800: #7c2d12;
--color-primary-900: #5c1f0a;
```

### Status

```css
--color-success: #4d7c0f;
--color-warning: #b45309;
--color-error:   #be123c;
--color-info:    #c2410c;  /* reuses accent */
```

### Semantic aliases

```css
--color-bg:           var(--color-neutral-50);
--color-bg-subtle:    var(--color-neutral-200);
--color-surface:      var(--color-neutral-100);
--color-border:       var(--color-neutral-300);
--color-text:         var(--color-neutral-900);
--color-text-muted:   var(--color-neutral-500);
--color-text-inverse: var(--color-neutral-0);
--color-accent:       var(--color-primary-600);
--color-accent-hover: var(--color-primary-700);
```

---

## Typography

### Font families

```css
--font-sans:  'Georgia', 'Times New Roman', serif;  /* warm, editorial feel */
--font-ui:    system-ui, -apple-system, sans-serif;  /* UI chrome, labels, buttons */
--font-mono:  ui-monospace, 'Courier New', monospace;
```

### Font sizes (1rem = 16px)

```css
--text-xs:   0.75rem;   /* 12px */
--text-sm:   0.875rem;  /* 14px */
--text-base: 1rem;      /* 16px */
--text-lg:   1.125rem;  /* 18px */
--text-xl:   1.25rem;   /* 20px */
--text-2xl:  1.5rem;    /* 24px */
--text-3xl:  1.875rem;  /* 30px */
--text-4xl:  2.25rem;   /* 36px */
```

### Font weights

```css
--font-normal:   400;
--font-medium:   500;
--font-semibold: 600;
--font-bold:     700;
```

### Line heights

```css
--leading-tight:  1.25;
--leading-snug:   1.375;
--leading-normal: 1.5;
--leading-relaxed:1.625;
```

---

## Spacing

4-point scale.

```css
--space-0:  0;
--space-1:  0.25rem;  /* 4px */
--space-2:  0.5rem;   /* 8px */
--space-3:  0.75rem;  /* 12px */
--space-4:  1rem;     /* 16px */
--space-5:  1.25rem;  /* 20px */
--space-6:  1.5rem;   /* 24px */
--space-8:  2rem;     /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
```

---

## Border

Warm & Earthy uses larger radii for a softer, more organic feel.

```css
--radius-sm:   0.375rem; /* 6px */
--radius-md:   0.75rem;  /* 12px */
--radius-lg:   1rem;     /* 16px */
--radius-xl:   1.25rem;  /* 20px */
--radius-2xl:  1.5rem;   /* 24px */
--radius-full: 9999px;

--border-width:   1px;
--border-width-2: 2px;
--border-color:   var(--color-border);
```

---

## Shadow

Shadows use the warm brown base instead of pure black.

```css
--shadow-sm: 0 1px 3px 0 rgb(44 24 16 / 0.08);
--shadow-md: 0 4px 12px rgb(44 24 16 / 0.10), 0 2px 4px rgb(44 24 16 / 0.06);
--shadow-lg: 0 10px 24px rgb(44 24 16 / 0.12), 0 4px 8px rgb(44 24 16 / 0.06);
--shadow-xl: 0 20px 40px rgb(44 24 16 / 0.14), 0 8px 16px rgb(44 24 16 / 0.08);
```

---

## Z-index

```css
--z-base:    0;
--z-raised:  10;
--z-dropdown:100;
--z-sticky:  200;
--z-overlay: 300;
--z-modal:   400;
--z-toast:   500;
```

---

## Transition

```css
--duration-fast:   100ms;
--duration-base:   200ms;
--duration-slow:   300ms;
--ease-in:         cubic-bezier(0.4, 0, 1, 1);
--ease-out:        cubic-bezier(0, 0, 0.2, 1);
--ease-in-out:     cubic-bezier(0.4, 0, 0.2, 1);
```

---

## Breakpoints

Used in `@media` queries only — not CSS custom properties (they can't be used inside media queries).

| Name | Min-width |
|------|-----------|
| sm   | 640px     |
| md   | 768px     |
| lg   | 1024px    |
| xl   | 1280px    |
| 2xl  | 1536px    |

---

## Usage

1. Link `tokens.css` before all other stylesheets.
2. Use semantic aliases (`--color-accent`) in component CSS, raw scale values (`--color-primary-600`) only in `tokens.css` itself.
3. Never hardcode hex, px, or unitless values in component CSS — always reference a token.

```html
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="styles.css">
```

```css
/* tokens.css — define everything once */
:root { ... }

/* button.css — consume tokens, never raw values */
.btn {
  background: var(--color-accent);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  transition: background var(--duration-base) var(--ease-in-out);
}
.btn:hover {
  background: var(--color-accent-hover);
}
```

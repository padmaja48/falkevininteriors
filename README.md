# Falkevin Interior Designers

Premium interior design studio website — Next.js App Router, TypeScript, Tailwind CSS.

Quiet, warm, editorial. Luxury through restraint.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS (theme via CSS variables)
- `next/image` + `next/font` (Cormorant Garamond, DM Sans)
- Framer Motion (scroll reveals / transitions)
- Lenis (smooth scroll)

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Structure

```
/content          # All client-specific copy, theme, images
/components       # Reusable UI (no hard-coded brand text)
/app              # Routes: home, about, services, contact, api
```

## Customize

See **[CUSTOMIZING.md](./CUSTOMIZING.md)** for onboarding a new client.

Image attribution: **[CREDITS.md](./CREDITS.md)**.

Project AI rules: `.cursor/rules/project.mdc`.

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Cinematic home + lead CTAs |
| `/services` | Detailed services |
| `/about` | Studio story |
| `/contact` | Consultation form + map |
| `/api/contact` | Lead endpoint (wire email/Sheets/WhatsApp) |

## Lead generation

- Sticky mobile bar: WhatsApp | Book Consultation
- Floating WhatsApp button
- Strategic CTAs on every page
- Contact form with validation + success state

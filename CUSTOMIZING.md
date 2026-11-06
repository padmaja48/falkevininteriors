# Customizing for a New Client

Onboard a Hyderabad interior studio in a few hours by editing content and theme — not components.

## 1. Brand & contact (30–45 min)

Edit `content/site.config.ts`:

- `company`, `tagline`, `logoText`, `location`, `description`
- `contact` phone / WhatsApp / email / address / maps URLs
- `social` Instagram / Pinterest / Facebook
- `nav` labels if needed
- `cta` button copy
- `seo.siteUrl` and default meta description

WhatsApp links are built automatically via `getWhatsAppUrl()`.

## 2. Theme tokens (15–30 min)

Edit `content/theme.config.ts` colors (and radii if needed). Tokens are injected as CSS variables in `app/layout.tsx`.

Keep the warm, quiet palette. Accent should stay muted (champagne / bronze / soft stone) — not neon.

Fonts are loaded in `app/layout.tsx` (Cormorant Garamond + DM Sans). To swap fonts, change the `next/font` imports and keep the CSS variable names `--font-heading` / `--font-body`.

## 3. Copy (1–2 hours)

| File | What to replace |
|------|-----------------|
| `content/home.ts` | Hero, studio intro, why-us, process, stats, journal, final CTA |
| `content/about.ts` | Story, philosophy, founder, team, values |
| `content/services.ts` | Service names, descriptions, offers |
| `content/projects.ts` | Project case studies (slugs, locations, copy) |
| `content/testimonials.ts` | Client quotes |
| `content/images.ts` | **All** image URLs + alt text |

Never put client names, phone numbers, or image URLs inside `/components`.

## 4. Photography (1–3 hours)

1. Collect client photos (or licensed stock).
2. Prefer placing files in `/public/images/...` and point `content/images.ts` at `/images/...`.
3. Or keep remote CDN URLs and add hostnames to `next.config.ts` → `images.remotePatterns`.
4. Update `CREDITS.md` if attribution is required.

Hero and final CTA images should be wide, high-resolution, and cinematic.

## 5. Projects

- Add/edit entries in `content/projects.ts`.
- Add matching keys under `images.projects[slug]` in `content/images.ts`.
- Featured home gallery uses `featured: true` + `homeIndex`.
- Filters use `category`: `apartments` | `villas` | `kitchens` | `bedrooms` | `living` | `commercial`.

## 6. Contact form delivery

`app/api/contact/route.ts` validates each lead, sends a notification to the studio inbox,
and sends a confirmation email to the customer through `lib/mailer.ts`.

The mailer supports two server-side authentication modes:

- Recommended for Gmail: set `SMTP_AUTH=oauth2`, `SMTP_USER`, `SMTP_CLIENT_ID`,
  `SMTP_CLIENT_SECRET`, and `SMTP_REFRESH_TOKEN`.
- Fallback: set `SMTP_AUTH=password`, `SMTP_USER`, and `SMTP_PASS` using an
  app password or SMTP password from the email provider.

Copy `.env.example` to `.env.local` and keep all secrets out of source control.
To generate the Gmail refresh token locally, first add
`http://127.0.0.1:53682/oauth2callback` as an authorized redirect URI for the OAuth
client, then run:

```bash
npm run oauth:refresh-token
```

The script opens Google authorization, handles the local callback, and prints the
`SMTP_REFRESH_TOKEN` value. It does not write secrets into source control.

The contact endpoint can also be extended with:

- Google Sheets append
- WhatsApp / CRM webhook

## 7. Deploy

```bash
npm install
npm run build
npm start
```

Deploy to Vercel (or similar). Set `seo.siteUrl` to the production domain before launch.

## Checklist before handoff

- [ ] All phone / WhatsApp / email / address updated
- [ ] Logo text or logo image swapped
- [ ] Theme colors match brand
- [ ] Client photography in `images.ts`
- [ ] At least 6–9 real projects
- [ ] Testimonials feel authentic
- [ ] Contact API wired
- [ ] `npm run build` passes
- [ ] Mobile CTAs checked at 360px / 390px

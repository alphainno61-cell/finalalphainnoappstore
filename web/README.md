# OmniStore Web

OmniStore is a Microsoft Store–inspired marketplace frontend built with Next.js.
It includes a homepage, app catalog, app detail pages, and a developer upload portal UI.

## Tech Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS 4

## Implemented Pages

- `/` : Store home (featured hero, platform filter, top apps, developer CTA)
- `/apps` : App listing grid
- `/apps/[slug]` : App details and download CTA
- `/developer/upload` : Developer app upload form (frontend placeholder)

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality Checks

```bash
npm run lint
npm run build
```

## Project Structure

- `src/app/page.tsx` – homepage UI
- `src/app/apps/page.tsx` – catalog listing
- `src/app/apps/[slug]/page.tsx` – app detail route
- `src/app/developer/upload/page.tsx` – developer portal upload form
- `src/components/store-shell.tsx` – shared top nav + sidebar layout
- `src/lib/apps.ts` – sample app data model and seed data

## Next Steps (Backend Integration)

- Add auth (`user`, `developer`, `admin` roles)
- Connect upload form to API + object storage (S3/R2)
- Add app moderation workflow and malware scanning
- Add download tracking, ratings, and reviews
- Add payments/payouts for paid apps

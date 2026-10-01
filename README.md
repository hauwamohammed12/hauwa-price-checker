# Hauwa Mohammed Price Checker

Computerized Price Checking System for **Hauwa Mohammed**.

## Structure

- **Organization** — Hauwa Mohammed (main admin)
- **Companies / Branches** — regional retail companies
- **Stations / Shops** — individual selling points

## Features

| Area | Route |
|------|--------|
| Landing | `/` |
| Public price checker | `/check` |
| Organization admin | `/admin` |
| Company dashboard | `/company/[id]` |
| Shop dashboard | `/shop/[id]` |
| Staff portals | `/login` |

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS

## Run locally

```bash
cd hauwa-price-checker
npm install --legacy-peer-deps
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Demo tip: try barcode `8901234567890` (Golden Penny Rice 25kg) on the public checker.

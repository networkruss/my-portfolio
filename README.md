# My Portfolio

Minimal, production-ready Next.js portfolio site.

## Environment Variables

Set these in your `.env.local` for local testing and in your hosting provider (Vercel) for production:

- `GMAIL_USER` — Gmail address used by the contact API (e.g. `soliven.neilrussel.d@gmail.com`).
- `GMAIL_PASS` — Gmail App Password (recommended, not your normal account password).
- `NEXT_PUBLIC_BASE_URL` — Your site URL (e.g. `https://your-domain.com`). Used for client-side fetches if needed.
- `NEXT_PUBLIC_FORMSPREE_PROJECT_ID` (recommended) — Formspree project/form ID for client-side use (example: `mdaojvoq`).

> Never commit secrets to the repository. Use Vercel's Environment Variables UI or your host's secret store.

## Local development

Install deps:

```bash
npm install
```

Run dev server:

```bash
npm run dev
```

Build production bundle:

```bash
npm run build
```

Start production server locally:

```powershell
#$env:PORT=3000; npm start
```

## Deploy to Vercel

1. Sign in to https://vercel.com and import this repository (choose your Git provider).
2. In Project Settings -> Environment Variables, add the variables listed above for the `Production` environment.
3. Trigger a deploy (Vercel runs `next build` automatically).
4. After deployment, verify the contact form works. Formspree is used by default; set `NEXT_PUBLIC_FORMSPREE_PROJECT_ID` in Vercel if you want to override the built-in ID.

## Create a GitHub repository and push (recommended)

If you have the `gh` CLI installed and authenticated, run from the project root:

```bash
# create repo on your GitHub account and push current folder
gh repo create my-portfolio --public --source=. --remote=origin --push
```

If you don't have `gh`, you can create a repo on GitHub.com and then run:

```bash
git init
git add .
git commit -m "Initial commit: production-ready fixes"
git branch -M main
git remote add origin https://github.com/<your-username>/my-portfolio.git
git push -u origin main
```

Replace `<your-username>` with your GitHub username.

## Notes

- The repo includes a small re-export shim for backward compatibility: `app/components/Animatedbackgroud.tsx` re-exports the correctly-named `AnimatedBackground` component.
- Use App Passwords for Gmail SMTP or use Formspree if you prefer not to manage SMTP credentials.

---

If you want, I can: create the GitHub repo for you (I will need your permission and either the `gh` CLI authenticated here or a GitHub personal access token), or I can commit and leave the remote creation to you.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

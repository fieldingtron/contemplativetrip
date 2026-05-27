# contemplative-nextjs

Next.js + TinaCMS site for contemplative-trip content.

## Requirements

- Node.js 20+
- pnpm 10+

## Install

```bash
pnpm install
```

## Run Locally

```bash
pnpm run dev
```

App URL: http://localhost:3000

## Build and Start

```bash
pnpm run build
pnpm run start
```

## Lint

```bash
pnpm run lint
```

## Upgrade Packages

Upgrade all dependencies to latest:

```bash
pnpm up --latest
```

Check outdated packages:

```bash
pnpm outdated
```

If pnpm asks about blocked build scripts, approve and reinstall:

```bash
pnpm approve-builds
pnpm install
```

## Content Model

Content is local MDX files in:

- content/articles
- content/events
- content/direction

The runtime site does not fetch WordPress data.

## Contact Form

The contact page posts to Netlify function:

- /.netlify/functions/contact-form

Email delivery is handled with Resend.

## Environment Variables

Typical local variables used by this app:

- DOMAIN_URLS
- TINA_PUBLIC_IS_LOCAL
- NEXT_PUBLIC_TINA_CLIENT_ID
- TINA_TOKEN
- RESEND_API_KEY
- FROM_EMAIL
- RECIPIENT_EMAIL
- CSV_URL

## AI Assistant Workflow

### GitHub Copilot

- Use Copilot Chat in VS Code for code edits, refactors, and review.
- Keep changes focused and validate with pnpm run dev.

### Claude Code

If you use Claude Code for local automation, keep it in the same workflow:

1. Sync dependencies: pnpm install
2. Run checks after edits: pnpm run dev
3. Keep package management on pnpm for this repo
4. Prefer small, reviewable commits

Optional local setup example:

```bash
# install/update Claude Code CLI per your platform docs
# then run it inside this repo
claude
```

## Notes

- This repository currently contains both package-lock.json and pnpm-lock.yaml from prior tooling history.
- Prefer pnpm commands going forward to keep dependency state consistent.

# AquaScore Prototype

AquaScore is a Vercel-only Next.js prototype website with a clean, responsive marketing site, working auth flows, a contact form, serverless API routes, and localStorage-backed dashboard CRUD.

## What is included

- Home page with clear product introduction
- About page
- Contact page with working validation and API response
- Dashboard page with real localStorage CRUD and analytics widgets
- Responsive navbar and footer
- 404 page
- Next.js serverless routes for login, signup, data, and contact
- Session state stored in localStorage
- Mock data and serverless responses for fast prototyping

## Pages

- `/` Home
- `/about` About
- `/contact` Contact
- `/dashboard` Dashboard

## API routes

- `POST /api/login`
- `POST /api/signup`
- `GET /api/data`
- `POST /api/contact`

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build for production

```bash
npm run build
npm start
```

## Prototype behavior

- Login and signup use localStorage sessions.
- The contact form validates input and returns a server response.
- The dashboard includes a real CRUD task board stored in localStorage.
- API routes run as serverless functions, so the app can deploy to Vercel without a separate backend.

## Tech stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Serverless route handlers
- LocalStorage for session and CRUD state
- Zod validation

## Notes

- Demo login credentials are seeded in the app routes for quick testing.
- The project is intentionally simplified so it can run as a self-contained prototype on Vercel.

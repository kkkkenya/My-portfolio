# Gregory Muhoro — Portfolio

A single-page portfolio built with Vite + React + TypeScript + Tailwind CSS.

## Run locally

```bash
npm install
npm run dev
```

Opens at http://localhost:5173

## Build for production

```bash
npm run build
```

Outputs static files to `dist/` — upload that folder as-is to Truehost, or
connect the repo to Vercel and it will build automatically (build command
`npm run build`, output directory `dist`).

## Where to edit content

All the text on the page — projects, experience, expertise, contact info —
lives in one place: `src/data.ts`. Edit that file and the whole site updates.

## Where to edit design

- Colors, fonts and spacing tokens: `src/index.css` (the `@theme` block)
- Layout of each section: `src/components/*.tsx`

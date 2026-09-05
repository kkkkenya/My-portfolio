# Gregory Kimemiah — Portfolio (Night Heat)

Arcade-style engineering portfolio: a "Night Heat" title screen leading into a
stage-select garage. Stages: About Me, AI Projects, Leadership, Tech Skills,
Engineering, Client Work.

## Stack

React 19 + Vite + Tailwind CSS v4. Signature theme: volt (`#c8ff2e`) on asphalt
(`#0c0c22`).

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
```

## Build & deploy

```bash
npm run build    # outputs dist/
```

Production deploys to Vercel from `main` (`my-portfolio` project).

## Project layout

- `src/App.jsx` — title screen → loading beat → garage entry
- `src/select/` — TitleScreen, SkinA–D stage skins, roster data, stage CSS
- `public/gregory.png` — profile photo (also the OG/social image)

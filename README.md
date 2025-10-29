# IBA Club React Site

## Getting started

```bash
npm install
npm run dev
```

## Project structure

- `src/App.jsx` – page composition and section layout.
- `src/components/` – presentational components (navigation, hero, interest form, footer).
- `src/components/sections/` – reusable section blocks shared between the home previews and detail pages.
- `src/data/content.js` – editable copy for board members, programs, funds, partners, alumni.
- `src/styles/` – modular CSS files for each component and shared layout rules.
- `src/pages/` – route-level components (`/board`, `/programs`, `/funds`, `/partners`, `/alumni`, `/interest`).

## Customization

- Update `src/data/content.js` to change text and lists without touching layout code.
- Modify colours or spacing in the corresponding CSS files under `src/styles/`.
- Interest form currently logs submissions to the console; hook it up to your preferred backend or form service when ready.

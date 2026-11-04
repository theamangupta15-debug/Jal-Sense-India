# Jal Sense India — frontend (Phase 2)

**Understand Your Water. Protect Your Health.**
React + Vite + React Router. Pilot: Nagpur district, Maharashtra.
## Run
```
npm install
cp .env.example .env     # optional; leave VITE_API_BASE_URL empty without a backend
npm run dev              # development
npm test                 # data-integrity tests (Vitest)
npm run build            # production build
```
## Design rules implemented
- Groundwater and drinking-water quality are separate services, sections and types.
- Missing values show "Data unavailable", never zero. Records lacking source, date or scope are withheld.
- No measurements exist in this repo: fixtures hold administrative names only (`src/data/locations.js`). Without a backend, data sections show honest empty states.
- Backend contract: Phase 1 envelope `{ data, provenance[], coverage, limitations[] }` at `/api/locations/:id/groundwater`, `/water-quality`, `/api/assistant/chat` (not yet built; Phase 3).
- The assistant never simulates answers.
## Not done / blocked
- Recharts trend chart and Leaflet map: need verified observations and coordinates/boundaries (Phase 1b). Add dependencies then.
- Health guidance text: pending MoHFW/NCDC/WHO review. Feedback form is UI-only.
- Marathi/Hindi translations, route lazy-loading, status classification and freshness thresholds (pending configuration).
- LGD codes in fixtures are null until verified.

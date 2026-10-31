# FoodCircle Frontend — n8n Deployment

This folder is the original React/Vite frontend extracted from `FoodCircle-main.zip`. The existing UI and FoodCircle behaviour have been retained. Its API requests now target the four supplied n8n workflows.

## API target

The production API base URL is configured in `.env.production`:

```text
https://n8n-csqpur4fxb8c31rqg3fz8jlt.78.47.76.115.nip.swatantra.cloud/webhook
```

`src/api.js` centralizes the URL. To use a different n8n instance, change `VITE_API_BASE_URL` before building. Vite embeds this value into the frontend at build time. Do not add a trailing slash after `/webhook`.

## Frontend-to-workflow route mapping

| Frontend action | n8n production route | Method |
|---|---|---|
| Register | `/users` | POST |
| Login | `/login` | POST |
| Create order | `/orders` | POST |
| Search by dish | `/rbm/search/dish` | GET |
| Search by restaurant | `/rbm/search/restaurant` | GET |
| Search by user | `/rbm/user/:userName/:userEmail` | GET |

All paths above are appended to the configured API base URL. The request body fields and response properties used by the original components are preserved. These routes exist in `01_FoodCircle_Core_APIs.json`, `02_FoodCircle_RBM_APIs.json`, and `03_FoodCircle_Search_APIs.json` in the accompanying n8n package.

## Build locally

The build toolchain is pinned to Vite 6.4.5 and `@vitejs/plugin-react` 4.7.0 to avoid Vite 8/Rolldown native-binding incompatibilities in the current Selfhost Nixpacks Node 22.11 build image. The package supports Node.js 18.18+.

```bash
npm install --include=optional --package-lock=false
npm run build
```

The deployable static site is generated in `dist/`. The old `package-lock.json` was intentionally removed because it locked the Vite 8/Rolldown dependency tree. The included `nixpacks.toml` forces a fresh Linux dependency install with optional native packages enabled and prevents npm from using or generating a platform-specific lockfile.

## Deploy on Selfhost.dev

Deploy this `frontend` directory as a Vite/Node build project using:

- Build command: `npm install --include=optional --package-lock=false && npm run build`
- Output directory: `dist`

If Selfhost.dev asks for an environment variable, set:

- `VITE_API_BASE_URL` = `https://n8n-csqpur4fxb8c31rqg3fz8jlt.78.47.76.115.nip.swatantra.cloud/webhook`

The n8n workflows must remain published, and their PostgreSQL credential must point to the FoodCircle application database. Browser requests are cross-origin, so the n8n Webhook nodes are configured with Allowed Origins (CORS) set to `*`, and the response nodes include CORS response headers. For a restricted production deployment, change these to the exact frontend origin once Selfhost.dev provides its public URL.

## Notes

- No Spring Boot server is required for this frontend build. n8n is the API backend.
- The API base URL is configurable; the deployed n8n host is only the current default.
- The original plaintext password behaviour has not been changed by this frontend extraction. Use test credentials only until authentication is upgraded.

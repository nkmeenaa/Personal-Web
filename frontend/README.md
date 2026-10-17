# Personal portfolio

## Local development

1. Install frontend and backend dependencies:

   ```sh
   cd frontend && npm install
   cd ../backend && npm install
   ```

2. Start the API from `backend` with `npm run dev`.
3. In another terminal, start the frontend from `frontend` with `npm run dev`.

The frontend proxies `/api` requests to `http://localhost:8000` during development. Copy `.env.example` to `.env.local` only when you need to override the frontend defaults.

## Deployment

Deploy the frontend and backend as separate services, or serve both from the same origin:

- **Frontend:** use `frontend` as the project root, `npm run build` as the build command, and `dist` as the output directory. Set `VITE_API_BASE_URL` to the backend's public origin when the API is hosted separately. Leave it empty for a same-origin API.
- **Backend:** use `backend` as the project root and `npm start` as the start command. The service reads the hosting provider's `PORT` value and listens on all network interfaces. Set `CORS_ORIGIN` to the public frontend origin. Multiple allowed origins can be comma-separated.

`VITE_API_BASE_URL` and `VITE_CODEFORCES_HANDLE` are frontend build-time settings and are embedded in the public site; do not put secrets in `VITE_*` variables. Backend settings belong in the backend service's environment and must not be committed. The `/health` endpoint can be used for backend health checks.

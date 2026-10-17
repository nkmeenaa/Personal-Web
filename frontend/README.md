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

Deploy `frontend` as a static Vite site using `npm run build` as the build command and `dist` as the output directory. Set `VITE_API_BASE_URL` to the public URL of the separately deployed Express backend. Leave it empty only when the backend is available on the same origin. This is a public build-time setting; do not put secrets in `VITE_*` variables.

The frontend calls the backend's `/api/portfolio` and `/api/codeforces/:handle` endpoints. Configure and deploy the backend separately from the `backend` directory.

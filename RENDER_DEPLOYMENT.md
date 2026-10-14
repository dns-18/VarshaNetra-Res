# VarshaNetra — Render deployment additions (no existing-file changes)

These files are additive only. No existing VarshaNetra source/configuration file is replaced.

## Backend Web Service

Create a Render **Web Service** from this repository with:

- Root Directory: `backend`
- Runtime: `Python 3`
- Build Command: `pip install -r requirements-render.txt`
- Start Command: `bash render-start.sh`

The lightweight runtime file is `backend/requirements-render.txt`. It is intentionally separate from the existing `backend/requirements.txt`, so the original dependency file is untouched.

Set:

- `VARSHANETRA_ALLOWED_ORIGINS` = the deployed frontend URL (for example, `https://your-frontend.onrender.com`)

Health check:

- `GET /health`

## Frontend Static Site

Create a Render **Static Site**:

- Root Directory: `frontend`
- Build Command: `npm ci && npm run build`
- Publish Directory: `dist`
- Environment variable: `VITE_API_BASE_URL` = the backend Render URL

The existing `frontend/vite.config.js` and API client remain unchanged.

## Important

The repository already contains an existing `render.yaml`. Because the instruction for this package is to avoid modifying any existing file, these additions do not replace that file. If you use Render Blueprint mode, keep the existing Blueprint unchanged and use the dashboard service settings above if its dependency installation is too heavy.

## Why this works

The current API runtime imports NumPy, pandas, SciPy, PyYAML, scikit-learn, FastAPI, Uvicorn and Pydantic. SHAP is optional in the existing explainability implementation and has a built-in finite-difference fallback, so it is deliberately not required for the lightweight Render runtime. The deep-learning and geospatial packages remain available in the original `backend/requirements.txt` for the full development/training environment.

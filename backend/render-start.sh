#!/usr/bin/env bash
set -euo pipefail
export PYTHONPATH="/opt/render/project/src/backend/src:${PYTHONPATH:-}"
exec uvicorn varshanetra.inference.api:app --host 0.0.0.0 --port "${PORT:-8000}"

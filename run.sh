#!/bin/bash
# ──────────────────────────────────────────────
# AptosProof: Auto Runner Script
# Runs both the frontend (HTML/CSS/JS) server
# and Aptos blockchain local node environment
# ──────────────────────────────────────────────

# Abort on error
set -e

# ─── CONFIG ───────────────────────────────────
FRONTEND_DIR="frontend"
APTOS_NETWORK="devnet"  # or "localnet" if running locally
PORT=5500                # frontend port

# ─── CHECKS ───────────────────────────────────
if ! command -v python3 &> /dev/null; then
  echo "Error: Python3 not found (required for simple HTTP server)"
  exit 1
fi

# Note: aptos CLI is optional for frontend-only testing
if ! command -v aptos &> /dev/null; then
  echo "Warning: aptos CLI not found. You can install it from https://aptos.dev/cli-tools/aptos-cli-installation"
  echo "Frontend will still work for testing with deployed contracts."
fi

# ─── START FRONTEND SERVER ────────────────────
echo "Starting Frontend Server at http://localhost:$PORT"
cd "$FRONTEND_DIR"
python3 -m http.server $PORT &
FRONTEND_PID=$!
cd ..

# ─── START APTOS NODE (if localnet) ───────────
# if [ "$APTOS_NETWORK" = "devnet" ]; then
#   echo "Starting Local Aptos Node..."
#   aptos node run-local-testnet --with-faucet &
#   APTOS_PID=$!
# else
#   echo "Using Aptos Testnet — no node start required."
# fi
echo "Using Aptos Devnet — remote blockchain connection."


# ─── STATUS ───────────────────────────────────
echo ""
echo "──────────────────────────────────────────────"
echo "AptosProof Environment Active"
echo "Frontend:  http://localhost:$PORT"
if [ "$APTOS_NETWORK" = "localnet" ]; then
  echo "Aptos Node: running locally"
else
  echo "Aptos Node: remote (devnet)"
fi
echo "──────────────────────────────────────────────"
echo ""
echo "Press [CTRL+C] to stop everything."
echo ""

# ─── CLEANUP HANDLER ──────────────────────────
trap 'echo "Stopping all..."; kill $FRONTEND_PID 2>/dev/null; [ -n "$APTOS_PID" ] && kill $APTOS_PID 2>/dev/null; exit 0' SIGINT

# ─── WAIT LOOP ────────────────────────────────
wait

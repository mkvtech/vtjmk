#!/usr/bin/env bash
# scripts/build.sh

# Make this file executable:
# chmod +x scripts/*

# Build frontend
yarn --cwd ./frontend build --outDir ../backend/public

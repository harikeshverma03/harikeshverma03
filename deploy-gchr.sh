#!/bin/bash

set -e  # Exit on error

USERNAME=harikeshverma03
FRONTEND_PATH=./frontend
BACKEND_PATH=./backend
FRONTEND_IMAGE=ghcr.io/$USERNAME/portfolio-frontend:latest
BACKEND_IMAGE=ghcr.io/$USERNAME/portfolio-backend:latest

echo "🔧 Enabling Docker Buildx (cross-build for Raspberry Pi)..."
docker buildx create --use --name harikesh-builder || docker buildx use harikesh-builder

echo "📦 Building and pushing backend image..."
docker buildx build --platform linux/amd64 -t $BACKEND_IMAGE $BACKEND_PATH --push

echo "📦 Building and pushing frontend image..."
docker buildx build --platform linux/amd64 -t $FRONTEND_IMAGE $FRONTEND_PATH --push

echo "✅ Done. Images pushed to GitHub Container Registry:"
echo "→ $BACKEND_IMAGE"
echo "→ $FRONTEND_IMAGE"

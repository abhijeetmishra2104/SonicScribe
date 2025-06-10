#!/bin/sh

set -e

echo "📦 Generating Prisma Client..."
npx prisma generate

echo "🚀 Running DB migrations..."
npx prisma migrate deploy

echo "🟢 Starting Next.js..."
npm run dev

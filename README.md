# FlowForge

FlowForge is a workflow engine and personal operations platform.

## Tech Stack
- Backend: NestJS + TypeScript
- Frontend: React + TypeScript (Vite)
- Database: PostgreSQL (Docker)
- ORM: Prisma
- Auth: JWT + bcrypt

## Setup

```bash
# start database
docker compose up -d

# backend
cd backend
pnpm install
pnpm run start:dev

# frontend
cd frontend
pnpm install
pnpm run dev

# 🚀 Deploying QuickVoice to Coolify

This guide explains how to deploy the complete **QuickVoice** production stack to [Coolify](https://coolify.io) in under 10 minutes.

---

## Architecture Overview

The Coolify deployment stack consists of 6 services orchestrated via Docker Compose:

1. **`postgres`**: PostgreSQL 16 database with persistent storage and healthchecks.
2. **`redis`**: Redis 7 cache and BullMQ job queue manager.
3. **`server`**: Core Express/Node.js API backend (handles authentication, agent management, telephony webhooks, automated database migrations).
4. **`console`**: Next.js 16 Customer Console (web dashboard for managing agents, calls, phone numbers, and settings).
5. **`web`**: Next.js 16 Marketing landing page and documentation portal.
6. **`ai`**: Python FastAPI & LiveKit Agent runtime worker.

---

## 🛠️ Deployment Steps

### Step 1: Create a New Project in Coolify
1. Log in to your **Coolify dashboard**.
2. Go to **Projects** > Click **+ Add Project**.
3. Select your Environment (e.g. `production`).

### Step 2: Add a Docker Compose Service
1. Click **+ New Resource** > Select **Docker Compose**.
2. Choose **Source**:
   - **Option A (GitHub Repository - Recommended):** Connect your GitHub account, select `Advanced-quick-voice`, branch `main`, and set **Compose File Location** to `docker-compose.coolify.yml`.
   - **Option B (Raw Compose):** Copy and paste the entire contents of [`docker-compose.coolify.yml`](./docker-compose.coolify.yml).

### Step 3: Configure Environment Variables
In the Coolify resource settings, go to the **Environment Variables** tab and paste the contents from [`.env.coolify.example`](./.env.coolify.example).

Make sure to set the following critical values:

| Variable | Description | Example |
|:---|:---|:---|
| `SERVER_URL` | Public URL for the API backend | `https://api.yourdomain.com` |
| `CONSOLE_URL` | Public URL for the Customer Console | `https://app.yourdomain.com` |
| `LANDING_URL` | Public URL for the Landing Page | `https://yourdomain.com` |
| `POSTGRES_PASSWORD` | Strong password for PostgreSQL | `e.g. MySecr3tDbP@ss!` |
| `BETTER_AUTH_SECRET` | 32+ character random string for session signing | `openssl rand -base64 32` |
| `INTERNAL_API_KEY` | Cluster communication key between Server & AI | `openssl rand -hex 24` |

#### Voice Provider Keys (Required for Live Calling):
- `LIVEKIT_URL`, `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET`
- `DEEPGRAM_API_KEY`
- `ELEVENLABS_API_KEY`
- `OPENAI_API_KEY` or `GROQ_API_KEY`

### Step 4: Configure Domain Routing & SSL
Under the Coolify service settings, assign domains to the exposed services:
- **`server`**: Route domain `https://api.yourdomain.com` to port `5000`.
- **`console`**: Route domain `https://app.yourdomain.com` to port `3000`.
- **`web`**: Route domain `https://yourdomain.com` to port `3001`.

Coolify will automatically provision free Let's Encrypt SSL certificates for all configured domains.

### Step 5: Deploy
1. Click **Deploy** in the top right.
2. Coolify will build the Docker images, start the containers, run the Prisma database migrations automatically, and attach the Traefik proxy.
3. Once the build completes, visit your console at `https://app.yourdomain.com` to register your first admin account!

---

## 🔍 Health & Verification
- **Database Migrations**: The `server` container automatically executes `prisma migrate deploy` on startup before booting the API server.
- **Server Healthcheck**: Visit `https://api.yourdomain.com/health` (or `api/v1/health`) to confirm system readiness.
- **Console Login**: Visit `https://app.yourdomain.com/login` and verify seamless authentication.

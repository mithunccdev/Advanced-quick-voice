# 🚀 Deploying QuickVoice to Coolify (Docker Compose)

This guide explains how to deploy the **QuickVoice** production stack to [Coolify](https://coolify.io) using Docker Compose with your existing PostgreSQL and Redis services (no extra storage/MinIO needed).

---

## Architecture Overview

The deployment runs 4 application services in Docker Compose and connects directly to your existing PostgreSQL and Redis:

1. **`server`**: Core Node.js API backend (port `5000` ➜ `api.cochindigitalsystem.com`)
2. **`console`**: Next.js Customer Console dashboard (port `3000` ➜ `app.cochindigitalsystem.com`)
3. **`web`**: Next.js Marketing landing page (port `3001` ➜ `web.cochindigitalsystem.com`)
4. **`ai`**: Python LiveKit Agent runtime worker (internal port `5555`)
- **PostgreSQL**: Connected via `DATABASE_URL` (your existing Postgres)
- **Redis**: Connected via `REDIS_URL` (your existing Redis)

---

## 🛠️ Step-by-Step Deployment

### Step 1: Create or Open Your Coolify Project
1. In your Coolify dashboard, navigate to your Project (e.g. `QuickVoice`).
2. Click **+ New Resource** ➜ Select **Docker Compose**.
3. Choose **Public Repository** (or GitHub App).
4. Enter repository: `https://github.com/mithunccdev/Advanced-quick-voice.git`, branch `main`.
5. Set **Compose File Location** to:
   ```
   docker-compose.coolify.yml
   ```

---

### Step 2: Configure Environment Variables

In the Coolify resource, go to the **Environment Variables** tab and paste the following:

```env
# ------------------------------------------------------------------------------
# 1. Public Domains & URLs
# ------------------------------------------------------------------------------
SERVER_URL=https://api.cochindigitalsystem.com
CONSOLE_URL=https://app.cochindigitalsystem.com
LANDING_URL=https://web.cochindigitalsystem.com

# ------------------------------------------------------------------------------
# 2. Existing Database & Redis Connections
# ------------------------------------------------------------------------------
# If Postgres/Redis are Coolify database resources, use their internal hostnames:
DATABASE_URL=postgresql://quickvoice:YOUR_POSTGRES_PASSWORD@quickvoice-postgresql:5432/quickvoice
REDIS_URL=redis://quickvoice-redis:6379

# (Alternative) If Postgres/Redis are installed directly on your VPS host:
# DATABASE_URL=postgresql://quickvoice:YOUR_POSTGRES_PASSWORD@host.docker.internal:5432/quickvoice
# REDIS_URL=redis://host.docker.internal:6379

# ------------------------------------------------------------------------------
# 3. Security Secrets & Settings
# ------------------------------------------------------------------------------
BETTER_AUTH_SECRET=generate_any_random_32_character_string_here
INTERNAL_API_KEY=generate_any_random_internal_secret_here

# Allows registering and logging in without configuring SMTP email verification
REQUIRE_EMAIL_VERIFICATION=false

# ------------------------------------------------------------------------------
# 4. Voice Providers (LiveKit)
# ------------------------------------------------------------------------------
LIVEKIT_URL=wss://your-livekit-server.livekit.cloud
LIVEKIT_API_KEY=your_livekit_key
LIVEKIT_API_SECRET=your_livekit_secret

# Optional LiveKit SIP Trunk IDs (if using telephony)
LIVEKIT_SIP_INBOUND_TRUNK_ID=
LIVEKIT_SIP_OUTBOUND_TRUNK_TWILIO_ID=
LIVEKIT_SIP_OUTBOUND_TRUNK_TELNYX_ID=
LIVEKIT_SIP_OUTBOUND_TRUNK_VOBIZ_ID=

# ------------------------------------------------------------------------------
# 5. AI Providers
# ------------------------------------------------------------------------------
DEEPGRAM_API_KEY=your_deepgram_api_key
OPENAI_API_KEY=your_openai_api_key
SARVAM_API_KEY=
ELEVENLABS_API_KEY=
CARTESIA_API_KEY=
GROQ_API_KEY=
DEEPSEEK_API_KEY=

# ------------------------------------------------------------------------------
# 6. Telephony (Optional)
# ------------------------------------------------------------------------------
TELNYX_API_KEY=
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
VOBIZ_AUTH_ID=
VOBIZ_AUTH_TOKEN=
```

---

### Step 3: Configure Domain Routing in Coolify

In Coolify's service configuration, assign your public domains to the ports:

| Service | Port | Domain |
|:---|:---:|:---|
| **`server`** | `5000` | `https://api.cochindigitalsystem.com` |
| **`console`** | `3000` | `https://app.cochindigitalsystem.com` |
| **`web`** | `3001` | `https://web.cochindigitalsystem.com` |

Coolify will automatically handle SSL certificates for all 3 domains.

---

### Step 4: Click Deploy

1. Click **Deploy**.
2. Coolify will build:
   - `server` (runs `prisma migrate deploy` on your existing DB, then starts)
   - `console` (Next.js dashboard with build args configured)
   - `web` (Next.js marketing site)
   - `ai` (optimized build with CPU Torch and skipped model downloads)
3. Once finished:
   - Visit `https://app.cochindigitalsystem.com` to register your admin account.
   - Visit `https://api.cochindigitalsystem.com/health` to confirm server readiness.
   - Visit `https://web.cochindigitalsystem.com` to view your marketing site.

# 🚀 Deploying QuickVoice to Coolify with Railpack

This guide explains how to deploy the complete **QuickVoice** production stack to [Coolify](https://coolify.io) using the **Railpack** build pack for Node.js services and **Dockerfile** for the AI worker.

> **Why Railpack?** Railpack is Coolify's modern, zero-config build pack (successor to Nixpacks). It auto-detects your framework, produces optimized container images, and offers better caching than manual Dockerfiles.

---

## Architecture Overview

The deployment consists of **7 separate Coolify resources** within a single project:

| # | Service | Type | Coolify Resource | Build Method | Port |
|:--|:--------|:-----|:-----------------|:-------------|:-----|
| 1 | PostgreSQL 16 | Database | Coolify Built-in Database | Pre-built | 5432 |
| 2 | Redis 7 | Cache/Queue | Coolify Built-in Database | Pre-built | 6379 |
| 3 | MinIO | Object Storage | Docker Image | `minio/minio:latest` | 9000, 9001 |
| 4 | Server | API Backend | Application (Git) | **Railpack** | 5000 |
| 5 | Console | Dashboard | Application (Git) | **Railpack** | 3000 |
| 6 | Web | Landing Page | Application (Git) | **Railpack** | 3000 |
| 7 | AI | Voice Worker | Application (Git) | **Dockerfile** | 5555 |

---

## Prerequisites

- A **Coolify** instance (v4+) running on your VPS
- Your QuickVoice repository accessible via Git (GitHub, GitLab, etc.)
- Domain names configured (e.g., `web.cochindigitalsystem.com` or `api.cochindigitalsystem.com`, `app.cochindigitalsystem.com`, `cochindigitalsystem.com`)

---

## 🛠️ Deployment Steps

### Step 1: Create a Coolify Project

1. Log in to your **Coolify dashboard**.
2. Go to **Projects** → Click **+ Add Project**.
3. Name it `QuickVoice` and select your Environment (e.g., `production`).

---

### Step 2: Deploy Infrastructure Services

#### 2a. PostgreSQL Database

1. In your project, click **+ New Resource** → **Database** → **PostgreSQL**.
2. Set version to **16**.
3. Configure:
   - `POSTGRES_USER`: `quickvoice`
   - `POSTGRES_PASSWORD`: Generate a secure password
   - `POSTGRES_DB`: `quickvoice`
4. Click **Deploy**.
5. **Note the internal hostname** (e.g., `quickvoice-postgresql`) — you'll need this for `DATABASE_URL`.

#### 2b. Redis Cache

1. Click **+ New Resource** → **Database** → **Redis**.
2. Set version to **7**.
3. Enable AOF persistence if desired.
4. Click **Deploy**.
5. **Note the internal hostname** (e.g., `quickvoice-redis`).

#### 2c. MinIO Object Storage

1. Click **+ New Resource** → **Docker Image**.
2. Set image to `minio/minio:latest`.
3. Configure:
   - **Command**: `server /data --console-address ":9001"`
   - **Ports**: Map `9000` and `9001`
   - **Volumes**: Create persistent volume → `/data`
   - **Environment Variables**:
     ```
     MINIO_ROOT_USER=minioadmin
     MINIO_ROOT_PASSWORD=<generate-secure-password>
     ```
4. Click **Deploy**.

---

### Step 3: Deploy the Server (Railpack)

1. Click **+ New Resource** → **Application** → Connect your Git repository.
2. Set **Build Pack** to **Railpack**.
3. Configure:
   - **Base Directory**: `/` (repository root — required for monorepo workspace resolution)
   - **Build Command**:
     ```
     corepack enable && pnpm install --frozen-lockfile && pnpm --filter quickvoice-widget build && cd apps/server && pnpm exec prisma generate && pnpm run build
     ```
   - **Start Command**:
     ```
     cd apps/server && npx prisma migrate deploy && node dist/src/index.js
     ```
   - **Port**: `5000`
   - **Domain**: `web.cochindigitalsystem.com` *(or `api.cochindigitalsystem.com`)*

4. **Environment Variables** (set in Coolify's Environment Variables tab):

   ```env
   # Core
   PORT=5000
   NODE_ENV=production
   DATABASE_URL=postgresql://quickvoice:<POSTGRES_PASSWORD>@<postgres-hostname>:5432/quickvoice
   REDIS_URL=redis://<redis-hostname>:6379
   BETTER_AUTH_SECRET=<openssl rand -base64 32>
   BETTER_AUTH_URL=https://web.cochindigitalsystem.com
   INTERNAL_API_KEY=<openssl rand -hex 24>
   AI_API_URL=http://<ai-hostname>:5555
   CONSOLE_URL=https://app.cochindigitalsystem.com
   LANDING_URL=https://cochindigitalsystem.com

   # LiveKit (Required)
   LIVEKIT_URL=wss://your-livekit-server.livekit.cloud
   LIVEKIT_API_KEY=your_livekit_api_key
   LIVEKIT_API_SECRET=your_livekit_api_secret

   # LiveKit SIP Trunk IDs (Optional)
   LIVEKIT_SIP_INBOUND_TRUNK_ID=
   LIVEKIT_SIP_OUTBOUND_TRUNK_TWILIO_ID=
   LIVEKIT_SIP_OUTBOUND_TRUNK_TELNYX_ID=
   LIVEKIT_SIP_OUTBOUND_TRUNK_VOBIZ_ID=

   # Telephony (at least one required)
   TELNYX_API_KEY=
   TWILIO_ACCOUNT_SID=
   TWILIO_AUTH_TOKEN=
   VOBIZ_AUTH_ID=
   VOBIZ_AUTH_TOKEN=

   # Billing (Optional)
   STRIPE_SECRET_KEY=
   STRIPE_WEBHOOK_SECRET=

   # S3/MinIO Storage
   S3_BUCKET_NAME=quickvoice
   S3_ENDPOINT=http://<minio-hostname>:9000
   S3_FORCE_PATH_STYLE=true
   AWS_ACCESS_KEY_ID=minioadmin
   AWS_SECRET_ACCESS_KEY=<your-minio-password>
   AWS_REGION=us-east-1
   ```

5. Click **Deploy**.

---

### Step 4: Deploy the Console Dashboard (Railpack)

1. Click **+ New Resource** → **Application** → Connect same Git repository.
2. Set **Build Pack** to **Railpack**.
3. Configure:
   - **Base Directory**: `/`
   - **Build Command**:
     ```
     corepack enable && pnpm install --frozen-lockfile && cd apps/console && pnpm run build
     ```
   - **Start Command**:
     ```
     cd apps/console && node .next/standalone/apps/console/server.js
     ```
   - **Port**: `3000`
   - **Domain**: `app.cochindigitalsystem.com`

4. **Environment Variables**:

   ```env
   PORT=3000
   NODE_ENV=production
   NEXT_PUBLIC_APP_NAME=QuickVoice
   NEXT_PUBLIC_SERVER_URL=https://web.cochindigitalsystem.com
   NEXT_PUBLIC_CONSOLE_URL=https://app.cochindigitalsystem.com
   NEXT_PUBLIC_LANDING_URL=https://cochindigitalsystem.com
   NEXT_PUBLIC_API_VERSION=v1
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
   ```

   > **Important**: `NEXT_PUBLIC_*` variables must be available at **build time**. Set them as both Build and Runtime variables in Coolify.

5. Click **Deploy**.

---

### Step 5: Deploy the Marketing Website (Railpack)

1. Click **+ New Resource** → **Application** → Connect same Git repository.
2. Set **Build Pack** to **Railpack**.
3. Configure:
   - **Base Directory**: `/`
   - **Build Command**:
     ```
     corepack enable && pnpm install --frozen-lockfile && cd apps/web && FAST_BUILD=true pnpm run build
     ```
   - **Start Command**:
     ```
     cd apps/web && node .next/standalone/apps/web/server.js
     ```
   - **Port**: `3000`
   - **Domain**: `cochindigitalsystem.com`

4. **Environment Variables**:

   ```env
   PORT=3000
   NODE_ENV=production
   NEXT_PUBLIC_CONSOLE_URL=https://app.cochindigitalsystem.com
   ```

5. Click **Deploy**.

---

### Step 6: Deploy the AI Worker (Dockerfile)

> The AI service uses a custom Dockerfile due to complex Python dependencies (PyTorch, gcc, native extensions, model downloads).

1. Click **+ New Resource** → **Application** → Connect same Git repository.
2. Set **Build Pack** to **Dockerfile**.
3. Configure:
   - **Base Directory**: `apps/ai`
   - **Dockerfile Path**: `Dockerfile`
   - **Port**: `5555`
   - **Build Args**:
     ```
     PREINSTALL_CPU_TORCH=true
     SKIP_MODEL_DOWNLOAD=true
     ```

4. **Environment Variables**:

   ```env
   AI_API_PORT=5555
   INTERNAL_API_KEY=<same key as server>
   SERVER_URL=http://<server-hostname>:5000

   # LiveKit
   LIVEKIT_URL=wss://your-livekit-server.livekit.cloud
   LIVEKIT_API_KEY=your_livekit_api_key
   LIVEKIT_API_SECRET=your_livekit_api_secret

   # STT Providers
   DEEPGRAM_API_KEY=your_deepgram_api_key
   SARVAM_API_KEY=
   OPENAI_API_KEY=

   # TTS Providers
   ELEVENLABS_API_KEY=
   CARTESIA_API_KEY=

   # LLM Providers
   GROQ_API_KEY=
   DEEPSEEK_API_KEY=

   # AWS Bedrock
   AWS_ACCESS_KEY_ID=
   AWS_SECRET_ACCESS_KEY=
   AWS_REGION=us-east-1

   # S3/MinIO
   S3_BUCKET_NAME=quickvoice
   S3_ENDPOINT=http://<minio-hostname>:9000
   S3_FORCE_PATH_STYLE=true
   ```

5. Click **Deploy**.

---

### Step 7: Create MinIO Bucket (One-time)

1. Open `http://YOUR_VPS_IP:9001` (MinIO Web Console).
2. Log in with your MinIO credentials.
3. Click **Buckets** → **Create Bucket**.
4. Enter `quickvoice` as the Bucket Name → **Create**.

---

### Step 8: Networking — Internal Service Discovery

Coolify assigns internal hostnames to each resource. You need to reference these in your environment variables:

| Variable | Points To | Example Internal Hostname |
|:---------|:----------|:--------------------------|
| `DATABASE_URL` | PostgreSQL | `quickvoice-postgresql` |
| `REDIS_URL` | Redis | `quickvoice-redis` |
| `AI_API_URL` | AI Worker | `quickvoice-ai` |
| `SERVER_URL` (in AI) | Server | `quickvoice-server` |
| `S3_ENDPOINT` | MinIO | `quickvoice-minio` |

> **Tip**: Check each resource's **Network** tab in Coolify to find its internal hostname. All resources in the same project share a Docker network.

---

## 🔍 Health & Verification

| Check | URL / Command |
|:------|:-------------|
| Server API | `curl https://web.cochindigitalsystem.com/health` (or `/api/health`) |
| Console Login | Visit `https://app.cochindigitalsystem.com/login` |
| Marketing Site | Visit `https://cochindigitalsystem.com` |
| AI Worker | Check container logs in Coolify dashboard |
| Database | Server health endpoint confirms DB connection |
| MinIO | `http://YOUR_VPS_IP:9001` (MinIO Console) |

---

## ⚠️ Important Notes

### NEXT_PUBLIC Variables Are Build-Time
All `NEXT_PUBLIC_*` environment variables are baked into the Next.js bundle at **build time**. If you change a `NEXT_PUBLIC_*` value, you must **rebuild** the console or web service — a restart alone won't pick up the change.

### Database Migrations Run on Server Startup
The server start command includes `npx prisma migrate deploy` which automatically runs pending migrations before starting the API server.

### Existing Dockerfile Deployment Still Works
The existing `docker-compose.coolify.yml` and individual Dockerfiles are still in the repository and remain fully functional. This Railpack deployment is an alternative approach.

---

## Provider Reference

### 🎙️ Speech-To-Text (STT)
| Provider | Models | Notes |
|:---|:---|:---|
| **Deepgram** *(default)* | Nova-3, Nova-3 Multilingual, Nova-2 | Best for English & multilingual |
| **Sarvam AI** | Saaras v3 | Best for Indian languages |
| **OpenAI** | Whisper-1 | Multilingual, high accuracy |

### 🔊 Text-To-Speech (TTS)
| Provider | Models | Notes |
|:---|:---|:---|
| **Deepgram** *(default)* | Aura-2 | Low-latency English voices |
| **ElevenLabs** | Flash v2.5, Turbo v2.5, Multilingual v2 | Ultra-realistic, multilingual |
| **Sarvam AI** | Bulbul v3 | Indian languages |
| **Cartesia** | Sonic-2, Sonic-2 Multilingual | Low-latency, multilingual |

### 🧠 LLM Brain
| Provider | Models | Notes |
|:---|:---|:---|
| **AWS Bedrock** *(default)* | Claude Haiku 4.5, Claude Sonnet 4.5, Amazon Nova | Best quality |
| **OpenAI** | GPT-4o, GPT-4o-mini, GPT-4.1-mini | Popular, widely compatible |
| **Groq** | Llama 3.3 70B, Llama 3.1 8B, Gemma 2 9B | Ultra-low latency |
| **DeepSeek** | DeepSeek-Chat V3, DeepSeek-Reasoner R1 | Cost-effective |

### 📞 Telephony
| Provider | Number Purchase | SIP Trunk | Notes |
|:---|:---|:---|:---|
| **Telnyx** | ✅ | ✅ via LiveKit | Global coverage |
| **Twilio** | ✅ | ✅ via LiveKit | Global coverage |
| **Vobiz** | ✅ | ✅ via LiveKit | Indian & international DIDs |

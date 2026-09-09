# 🚀 Deploying QuickVoice to Coolify

This guide explains how to deploy the complete **QuickVoice** production stack to [Coolify](https://coolify.io) in under 10 minutes.

---

## Architecture Overview

The Coolify deployment stack consists of 7 services orchestrated via Docker Compose:

1. **`postgres`**: PostgreSQL 16 database with persistent storage and healthchecks.
2. **`redis`**: Redis 7 cache and BullMQ job queue manager.
3. **`minio`**: Self-hosted S3 object storage for audio call recordings and knowledge documents.
4. **`server`**: Core Express/Node.js API backend (authentication, agent management, telephony webhooks, database migrations).
5. **`console`**: Next.js Customer Console (web dashboard for agents, calls, phone numbers, settings).
6. **`web`**: Next.js Marketing landing page.
7. **`ai`**: Python FastAPI & LiveKit Agent runtime worker (STT → LLM → TTS pipeline).

---

## Provider Support Overview

QuickVoice is fully **API-driven** — no local LLM downloads are required.

### 🎙️ Speech-To-Text (STT)
| Provider | Models | Notes |
|:---|:---|:---|
| **Deepgram** *(default)* | Nova-3, Nova-3 Multilingual, Nova-2 | Best for English & multilingual |
| **Sarvam AI** | Saaras v3 | Best for Indian languages (Hindi, Tamil, Telugu, Kannada, Malayalam) |
| **OpenAI** | Whisper-1 | Multilingual, high accuracy |

### 🔊 Text-To-Speech (TTS)
| Provider | Models | Notes |
|:---|:---|:---|
| **Deepgram** *(default)* | Aura-2 | Low-latency English voices |
| **ElevenLabs** | Flash v2.5, Turbo v2.5, Multilingual v2 | Ultra-realistic, multilingual |
| **Sarvam AI** | Bulbul v3 | Indian languages |
| **Cartesia** | Sonic-2, Sonic-2 Multilingual | Low-latency, multilingual |

### 🧠 LLM Brain (all API, no local models)
| Provider | Models | Notes |
|:---|:---|:---|
| **AWS Bedrock** *(default)* | Claude Haiku 4.5, Claude Sonnet 4.5, Amazon Nova Micro/Lite | Best quality |
| **OpenAI** | GPT-4o, GPT-4o-mini, GPT-4.1-mini | Popular, widely compatible |
| **Groq** | Llama 3.3 70B, Llama 3.1 8B, Gemma 2 9B | Ultra-low latency |
| **DeepSeek** | DeepSeek-Chat V3, DeepSeek-Reasoner R1 | Cost-effective, strong reasoning |

### 📞 Telephony (SIP / Phone Numbers)
| Provider | Number Purchase | SIP Trunk | Notes |
|:---|:---|:---|:---|
| **Telnyx** | ✅ | ✅ via LiveKit | Global coverage |
| **Twilio** | ✅ | ✅ via LiveKit | Global coverage |
| **Vobiz** | ✅ | ✅ via LiveKit | Indian & international DIDs |

---

## 🛠️ Deployment Steps

### Step 1: Create a New Project in Coolify
1. Log in to your **Coolify dashboard**.
2. Go to **Projects** > Click **+ Add Project**.
3. Select your Environment (e.g. `production`).

### Step 2: Add a Docker Compose Service
1. Click **+ New Resource** > Select **Docker Compose**.
2. Choose **Source**:
   - **Option A (GitHub Repository — Recommended):** Connect your GitHub account, select the QuickVoice repository, branch `main`, and set **Compose File Location** to `docker-compose.coolify.yml`.
   - **Option B (Raw Compose):** Copy and paste the entire contents of [`docker-compose.coolify.yml`](./docker-compose.coolify.yml).

### Step 3: Configure Environment Variables
In the Coolify resource settings, go to the **Environment Variables** tab and paste the contents from [`.env.coolify.example`](./.env.coolify.example).

Make sure to set the following critical values:

| Variable | Description | Example |
|:---|:---|:---|
| `SERVER_URL` | Public URL for the API backend | `https://api.yourdomain.com` |
| `CONSOLE_URL` | Public URL for the Customer Console | `https://app.yourdomain.com` |
| `LANDING_URL` | Public URL for the Landing Page | `https://yourdomain.com` |
| `POSTGRES_PASSWORD` | Strong password for PostgreSQL | e.g. `MySecr3tDbP@ss!` |
| `BETTER_AUTH_SECRET` | 32+ character random string for session signing | `openssl rand -base64 32` |
| `INTERNAL_API_KEY` | Cluster communication key between Server & AI | `openssl rand -hex 24` |

#### Voice Provider Keys (Required for Live Calling):
- `LIVEKIT_URL`, `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET`
- `DEEPGRAM_API_KEY` — default STT & TTS provider

#### Optional Provider Keys (enable as needed):
- **STT**: `SARVAM_API_KEY` (Indian languages), `OPENAI_API_KEY` (Whisper)
- **TTS**: `ELEVENLABS_API_KEY`, `CARTESIA_API_KEY`
- **LLM**: `OPENAI_API_KEY`, `GROQ_API_KEY`, `DEEPSEEK_API_KEY`
- **AWS Bedrock** (default LLM): `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`

#### Telephony Keys (at least one required for SIP calls & number purchase):
- **Telnyx**: `TELNYX_API_KEY`
- **Twilio**: `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`
- **Vobiz**: `VOBIZ_AUTH_ID`, `VOBIZ_AUTH_TOKEN`

---

## 📞 Vobiz SIP Telephony Setup

Vobiz integrates with QuickVoice via LiveKit SIP trunking. Follow these steps after deployment:

### 1. Get Vobiz Credentials
1. Log in to [vobiz.ai](https://vobiz.ai) and go to **Settings → API Keys**.
2. Copy your **Auth ID** (`MA_xxx...`) and **Auth Token**.
3. Set `VOBIZ_AUTH_ID` and `VOBIZ_AUTH_TOKEN` in your Coolify environment variables.

### 2. Create a Vobiz SIP Trunk
1. In Vobiz dashboard, navigate to **SIP Trunks** → **Create Trunk**.
2. Configure the trunk with your LiveKit SIP server as the destination:
   ```
   SIP URI: <your-livekit-sip-endpoint>.livekit.cloud
   ```
3. Set the **trunk name** (e.g., `quickvoice-inbound`).
4. Note the **Trunk SIP URI** assigned by Vobiz (format: `trunkXXX.vobiz.ai`).

### 3. Register the Trunk in LiveKit
Using the LiveKit CLI or API, create an inbound SIP trunk:
```bash
lk sip inbound create \
  --name "vobiz-inbound" \
  --allowed-numbers "+91*"  # adjust to your DID range
```

### 4. Purchase & Assign Numbers
Numbers purchased via the QuickVoice console (using Vobiz provider) will be:
1. Verified in Vobiz inventory (`GET /v1/Account/{id}/inventory/numbers`)
2. Purchased via Vobiz API (`POST /v1/Account/{id}/numbers/purchase-from-inventory`)
3. Assigned to the SIP trunk automatically

### 5. Vobiz API Reference
- **Base URL**: `https://api.vobiz.ai/api`
- **Auth Headers**: `X-Auth-ID` and `X-Auth-Token`
- **Docs**: https://vobizai.mintlify.app/

---

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

### Step 6: Create MinIO Storage Bucket (One-time, 1 minute)
1. In your browser, open `http://YOUR_VPS_IP:9001` (MinIO Web Console).
2. Log in with `MINIO_ROOT_USER` (default: `minioadmin`) and `MINIO_ROOT_PASSWORD`.
3. Click **Buckets** > **Create Bucket**.
4. Enter `quickvoice` as the Bucket Name and click **Create Bucket**.
5. All call recordings and audio assets will now automatically store directly on your VPS hard drive!

---

## 🔍 Health & Verification
- **Database Migrations**: The `server` container automatically executes `prisma migrate deploy` on startup.
- **Server Healthcheck**: Visit `https://api.yourdomain.com/health` to confirm system readiness.
- **Console Login**: Visit `https://app.yourdomain.com/login` and verify seamless authentication.
- **AI Health**: The `ai` container exposes a status API at port `5555`. Check `http://ai:5555/health` from within the cluster.

---

## ⚠️ Database Migration Note

Adding Vobiz as a telephony provider requires a **Prisma schema migration** to add the `vobiz` value to the `TelephonyProvider` enum. This migration runs **automatically** on first deployment startup via `prisma migrate deploy`.

If you are upgrading an existing deployment, run:
```bash
# Inside the server container
npx prisma migrate deploy
```

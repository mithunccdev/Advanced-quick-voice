import os
import subprocess

html_content = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>QuickVoice - Master Administrator Configuration Guide</title>
<style>
  @page {
    size: A4;
    margin: 18mm 16mm 18mm 16mm;
    @bottom-right {
      content: counter(page);
    }
  }
  
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #1e293b;
    line-height: 1.55;
    font-size: 10pt;
    background-color: #ffffff;
    margin: 0;
    padding: 0;
  }

  /* Cover Page */
  .cover-page {
    page-break-after: always;
    height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 40px 20px 20px 20px;
    box-sizing: border-box;
    border-left: 6px solid #8b5cf6;
  }
  
  .cover-header {
    margin-top: 40px;
  }
  
  .badge {
    display: inline-block;
    padding: 4px 12px;
    font-size: 9pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    border-radius: 4px;
    background-color: #ede9fe;
    color: #6d28d9;
    margin-bottom: 20px;
  }
  
  .cover-title {
    font-size: 26pt;
    font-weight: 800;
    color: #0f172a;
    line-height: 1.15;
    margin: 0 0 12px 0;
  }
  
  .cover-subtitle {
    font-size: 13pt;
    color: #475569;
    font-weight: 400;
    line-height: 1.4;
    margin: 0 0 25px 0;
  }
  
  .meta-box {
    background-color: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 16px 20px;
    margin-top: 30px;
    max-width: 480px;
  }
  
  .meta-row {
    display: flex;
    justify-content: space-between;
    padding: 6px 0;
    font-size: 9pt;
    border-bottom: 1px solid #edf2f7;
  }
  .meta-row:last-child {
    border-bottom: none;
  }
  .meta-label {
    font-weight: 600;
    color: #64748b;
  }
  .meta-value {
    font-weight: 600;
    color: #0f172a;
  }

  .cover-footer {
    font-size: 9pt;
    color: #94a3b8;
    border-top: 1px solid #e2e8f0;
    padding-top: 15px;
  }

  /* Headings */
  h1 {
    color: #0f172a;
    font-size: 15pt;
    font-weight: 800;
    border-bottom: 2px solid #e2e8f0;
    padding-bottom: 5px;
    margin-top: 22px;
    margin-bottom: 10px;
    page-break-after: avoid;
  }

  h2 {
    color: #1e293b;
    font-size: 12pt;
    font-weight: 700;
    margin-top: 16px;
    margin-bottom: 8px;
    page-break-after: avoid;
  }

  h3 {
    color: #334155;
    font-size: 10pt;
    font-weight: 700;
    margin-top: 12px;
    margin-bottom: 5px;
    page-break-after: avoid;
  }

  p {
    margin: 0 0 8px 0;
  }

  ul, ol {
    margin: 0 0 10px 0;
    padding-left: 20px;
  }

  li {
    margin-bottom: 3px;
  }

  /* Tables */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 10px 0 14px 0;
    font-size: 8.5pt;
    page-break-inside: avoid;
  }

  th {
    background-color: #0f172a;
    color: #ffffff;
    text-align: left;
    padding: 6px 8px;
    font-weight: 600;
    border: 1px solid #0f172a;
  }

  td {
    padding: 5px 8px;
    border: 1px solid #cbd5e1;
    vertical-align: top;
  }

  tr:nth-child(even) {
    background-color: #f8fafc;
  }

  /* Callouts */
  .callout {
    border-left: 4px solid #8b5cf6;
    background-color: #f5f3ff;
    padding: 10px 14px;
    margin: 10px 0;
    border-radius: 0 6px 6px 0;
    page-break-inside: avoid;
  }
  .callout.tip {
    border-left-color: #10b981;
    background-color: #f0fdf4;
  }
  .callout.warning {
    border-left-color: #f59e0b;
    background-color: #fffbeb;
  }
  .callout-title {
    font-weight: 700;
    font-size: 9pt;
    margin-bottom: 3px;
    color: #0f172a;
  }

  /* Code Block */
  pre {
    background-color: #0f172a;
    color: #f8fafc;
    padding: 9px 12px;
    border-radius: 6px;
    font-family: "Courier New", Courier, monospace;
    font-size: 8pt;
    line-height: 1.4;
    overflow-x: auto;
    margin: 8px 0 12px 0;
    page-break-inside: avoid;
  }

  code {
    background-color: #f1f5f9;
    padding: 2px 4px;
    border-radius: 4px;
    font-family: "Courier New", Courier, monospace;
    font-size: 8pt;
    color: #0f172a;
  }

  pre code {
    background-color: transparent;
    color: inherit;
    padding: 0;
  }

  .page-break {
    page-break-after: always;
  }

  .step-box {
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 10px 12px;
    margin: 10px 0;
    background-color: #fafafa;
    page-break-inside: avoid;
  }
  .step-num {
    display: inline-block;
    background-color: #8b5cf6;
    color: #ffffff;
    font-weight: 700;
    font-size: 7.5pt;
    padding: 2px 6px;
    border-radius: 3px;
    margin-right: 6px;
  }
  .step-title {
    font-weight: 700;
    color: #0f172a;
  }
</style>
</head>
<body>

<!-- COVER PAGE -->
<div class="cover-page">
  <div class="cover-header">
    <div class="badge">Master Administrator Manual</div>
    <div class="cover-title">QuickVoice Master<br>Admin Configuration Guide</div>
    <div class="cover-subtitle">Complete Administrator Walkthrough for Production Setup, LiveKit Cloud, Deepgram STT/TTS, Inbound/Outbound Webhooks, Agent API Configuration, and System Health</div>
    
    <div class="meta-box">
      <div class="meta-row">
        <span class="meta-label">Product Version:</span>
        <span class="meta-value">QuickVoice Enterprise v2.5</span>
      </div>
      <div class="meta-row">
        <span class="meta-label">Classification:</span>
        <span class="meta-value">System Administration / DevOps</span>
      </div>
      <div class="meta-row">
        <span class="meta-label">Primary Integrations:</span>
        <span class="meta-value">LiveKit Cloud, Deepgram, Twilio/Telnyx, LLMs</span>
      </div>
      <div class="meta-row">
        <span class="meta-label">Author:</span>
        <span class="meta-value">QuickVoice Core Architecture Team</span>
      </div>
      <div class="meta-row">
        <span class="meta-label">Last Updated:</span>
        <span class="meta-value">September 2026</span>
      </div>
    </div>
  </div>

  <div class="cover-footer">
    QuickVoice Autonomous Voice Systems &bull; System Administration &amp; Integration Guide
  </div>
</div>

<!-- SECTION 1 -->
<h1>1. Environment Configuration &amp; Master Secrets</h1>

<h2>1.1 Architectural Overview of Services</h2>
<p>The QuickVoice platform requires synchronized configuration across three distinct service domains:</p>
<ol>
  <li><strong>API Server (<code>apps/server/.env</code>):</strong> Manages authentication, database, billing, webhook routing, and telephony signaling.</li>
  <li><strong>Console Dashboard (<code>apps/console/.env</code>):</strong> Client-side Next.js web application.</li>
  <li><strong>AI Voice Worker (<code>apps/ai/.env</code>):</strong> Python 3.11 service connecting directly to WebRTC media rooms, speech models, and real-time inference.</li>
</ol>

<h2>1.2 Critical Security Secrets (Must Configure First)</h2>
<table>
  <thead>
    <tr>
      <th>Variable Name</th>
      <th>Location</th>
      <th>Requirement &amp; Purpose</th>
      <th>Generation Command</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>SECRET_ENCRYPTION_KEY</code></td>
      <td><code>apps/server/.env</code></td>
      <td><strong>64 Hex Characters (32 Bytes).</strong> Used to encrypt third-party tool credentials, API tokens, and webhook secrets at rest via AES-256-GCM.</td>
      <td><code>openssl rand -hex 32</code></td>
    </tr>
    <tr>
      <td><code>INTERNAL_API_KEY</code></td>
      <td><code>apps/server/.env</code> &amp; <code>apps/ai/.env</code></td>
      <td><strong>High-Entropy Shared Token.</strong> Secures internal inter-service communication between Node.js API and the Python AI worker.</td>
      <td><code>openssl rand -base64 24</code></td>
    </tr>
    <tr>
      <td><code>BETTER_AUTH_SECRET</code></td>
      <td><code>apps/server/.env</code></td>
      <td><strong>32+ Character Secret.</strong> Signs JWT session tokens and user authentication cookies.</td>
      <td><code>openssl rand -base64 32</code></td>
    </tr>
  </tbody>
</table>

<div class="callout warning">
  <div class="callout-title">Critical Production Rule</div>
  <code>INTERNAL_API_KEY</code> must match identically between <code>apps/server/.env</code> and <code>apps/ai/.env</code>. If mismatched, the AI worker will be rejected with HTTP 401 when verifying billing tokens or reporting call metrics.
</div>

<div class="page-break"></div>

<!-- SECTION 2 -->
<h1>2. Connecting LiveKit Cloud API &amp; Telephony</h1>

<h2>2.1 Why LiveKit Cloud?</h2>
<p>LiveKit provides the carrier-grade WebRTC media plane and SIP gateway. While LiveKit can be self-hosted, <strong>LiveKit Cloud</strong> provides a globally distributed edge mesh with zero UDP port-forwarding issues and 5,000 free minutes/month.</p>

<h2>2.2 Step-by-Step LiveKit Cloud Provisioning</h2>

<div class="step-box">
  <span class="step-num">STEP 1</span>
  <span class="step-title">Create a Project in LiveKit Cloud</span>
  <p>Sign up at <strong>https://cloud.livekit.io</strong> $\rightarrow$ Create a new project named <code>quickvoice-prod</code>.</p>
</div>

<div class="step-box">
  <span class="step-num">STEP 2</span>
  <span class="step-title">Generate API Credentials</span>
  <p>In the LiveKit Cloud dashboard, go to <strong>Project Settings</strong> $\rightarrow$ <strong>Keys</strong> $\rightarrow$ Click <strong>Generate Key</strong>.<br>
  Copy the following three values into your <code>apps/server/.env</code> and <code>apps/ai/.env</code>:</p>
  <pre><code>LIVEKIT_URL=wss://quickvoice-prod-xxxx.livekit.cloud
LIVEKIT_API_KEY=APIxxxxxxxxxxxxxx
LIVEKIT_API_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
LIVEKIT_AGENT_NAME=quickvoice-voice-agent</code></pre>
</div>

<div class="step-box">
  <span class="step-num">STEP 3</span>
  <span class="step-title">Create LiveKit SIP Inbound Trunk</span>
  <ol>
    <li>In LiveKit Cloud, navigate to <strong>SIP</strong> $\rightarrow$ <strong>Inbound Trunks</strong> $\rightarrow$ Click <strong>Create Inbound Trunk</strong>.</li>
    <li>Set Name to: <code>quickvoice-inbound</code>.</li>
    <li>Set Allowed Numbers or leave open to accept all incoming carrier calls.</li>
    <li>Copy the resulting Trunk ID (e.g. <code>ST_inbound_xxxxxx</code>) into <code>apps/server/.env</code>:
      <pre><code>LIVEKIT_SIP_INBOUND_TRUNK_ID=ST_inbound_xxxxxx</code></pre>
    </li>
  </ol>
</div>

<div class="step-box">
  <span class="step-num">STEP 4</span>
  <span class="step-title">Create LiveKit SIP Outbound Trunk (Twilio / Telnyx)</span>
  <ol>
    <li>Navigate to <strong>SIP</strong> $\rightarrow$ <strong>Outbound Trunks</strong> $\rightarrow$ Click <strong>Create Outbound Trunk</strong>.</li>
    <li>Address: <code>your-carrier-trunk.pstn.twilio.com</code> (or Telnyx SIP endpoint).</li>
    <li>Auth Username &amp; Password: Set from your Twilio Elastic SIP Trunk credentials.</li>
    <li>Copy the Trunk ID into <code>apps/server/.env</code>:
      <pre><code>LIVEKIT_SIP_OUTBOUND_TRUNK_TWILIO_ID=ST_outbound_twilio_xxxx
LIVEKIT_SIP_OUTBOUND_TRUNK_TELNYX_ID=ST_outbound_telnyx_xxxx</code></pre>
    </li>
  </ol>
</div>

<h2>2.3 LiveKit Dispatch Rule (Connecting Phone to AI Worker)</h2>
<p>In LiveKit Cloud SIP settings, create a <strong>Dispatch Rule</strong>:</p>
<ul>
  <li><strong>Trigger:</strong> Any incoming SIP call on <code>quickvoice-inbound</code>.</li>
  <li><strong>Action:</strong> Create Room with prefix <code>voice-</code> and dispatch the registered agent <code>quickvoice-voice-agent</code>.</li>
</ul>

<div class="page-break"></div>

<!-- SECTION 3 -->
<h1>3. Connecting Deepgram STT &amp; TTS Pipeline</h1>

<h2>3.1 Generating Deepgram API Credentials</h2>
<ol>
  <li>Register at <strong>https://deepgram.com</strong>.</li>
  <li>Navigate to <strong>API Keys</strong> $\rightarrow$ Click <strong>Create Key</strong>. Select permissions: <em>Member</em> or <em>Admin</em>.</li>
  <li>Add the API key to <code>apps/ai/.env</code>:
    <pre><code>DEEPGRAM_API_KEY=dg_sec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</code></pre>
  </li>
</ol>

<h2>3.2 Deepgram Speech-to-Text (STT) Options &amp; Latency Tuning</h2>
<p>In QuickVoice, STT operates via WebSocket streaming using interim chunked results:</p>
<table>
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Config Value</th>
      <th>Recommendation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>model</code></td>
      <td><code>nova-3</code> (Recommended) or <code>nova-2</code></td>
      <td>Nova-3 delivers lowest word error rate (WER) and sub-180ms streaming latency.</td>
    </tr>
    <tr>
      <td><code>language</code></td>
      <td><code>en</code> (or <code>es</code>, <code>fr</code>, <code>de</code>, <code>hi</code>)</td>
      <td>Select primary agent language or pass multi-language tag.</td>
    </tr>
    <tr>
      <td><code>smart_format</code></td>
      <td><code>true</code></td>
      <td>Automatically formats dates, currencies, phone numbers, and punctuation.</td>
    </tr>
    <tr>
      <td><code>interim_results</code></td>
      <td><code>true</code></td>
      <td>Streams interim transcripts to Silero VAD for instant user interruption detection.</td>
    </tr>
    <tr>
      <td><code>endpointing</code></td>
      <td><code>250</code> ms</td>
      <td>Silence duration required before committing the caller turn to the LLM.</td>
    </tr>
  </tbody>
</table>

<h2>3.3 Deepgram Aura Text-to-Speech (TTS) Voice Catalog</h2>
<p>QuickVoice natively supports Deepgram Aura-2 high-speed streaming voices:</p>
<table>
  <thead>
    <tr>
      <th>Voice ID</th>
      <th>Gender</th>
      <th>Persona Tone</th>
      <th>Ideal Use Case</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>aura-2-asteria-en</code></td>
      <td>Female</td>
      <td>Warm, confident, conversational</td>
      <td>Inbound Receptionist &amp; Customer Support</td>
    </tr>
    <tr>
      <td><code>aura-2-hera-en</code></td>
      <td>Female</td>
      <td>Authoritative, professional</td>
      <td>Medical, Legal &amp; Financial Intake</td>
    </tr>
    <tr>
      <td><code>aura-2-zeus-en</code></td>
      <td>Male</td>
      <td>Deep, friendly, trustworthy</td>
      <td>B2B Sales Qualification &amp; Outbound Dialing</td>
    </tr>
    <tr>
      <td><code>aura-2-luna-en</code></td>
      <td>Female</td>
      <td>Gentle, empathetic</td>
      <td>Healthcare Appointment Reminders</td>
    </tr>
  </tbody>
</table>

<div class="callout tip">
  <div class="callout-title">Alternative TTS Providers</div>
  QuickVoice also supports <strong>ElevenLabs</strong> (<code>ELEVENLABS_API_KEY</code>, model: <code>eleven_flash_v2_5</code>) and <strong>Cartesia</strong> for ultra-expressive emotional voices.
</div>

<div class="page-break"></div>

<!-- SECTION 4 -->
<h1>4. Configuring Inbound &amp; Outbound Webhooks</h1>

<h2>4.1 Agent Initiation Webhook (Pre-Call Context Injection)</h2>
<p>Before an inbound or outbound call begins, QuickVoice can query your CRM or database to fetch dynamic variables (caller name, past order history, balance, account tier) to personalize the conversation.</p>

<h3>Configuration in Agent Settings:</h3>
<pre><code>{
  "initiation_webhook": {
    "url": "https://api.yourcompany.com/crm/caller-lookup",
    "method": "POST",
    "headers": {
      "Authorization": "Bearer YOUR_CRM_WEBHOOK_SECRET",
      "Content-Type": "application/json"
    },
    "timeout_secs": 4
  }
}</code></pre>

<h3>Payload Sent to Your Endpoint:</h3>
<pre><code>{
  "event": "call.initiation",
  "callId": "call_987654321",
  "callerNumber": "+14155550199",
  "agentId": "e1687102-91d1-47bb-a7d9-d43e89a55298",
  "direction": "inbound",
  "timestamp": "2026-09-04T06:00:00.000Z"
}</code></pre>

<h3>Expected Return Payload (Injected into Agent Variables):</h3>
<pre><code>{
  "variables": {
    "caller_name": "Alexander Vance",
    "account_tier": "VIP Gold",
    "last_order_status": "Out for delivery"
  }
}</code></pre>
<p>The agent can immediately speak: <em>"Hi Alexander, welcome back to QuickVoice VIP support! Are you calling about your order that is out for delivery today?"</em></p>

<h2>4.2 Post-Call Webhook (CRM Sync, Summary &amp; Analytics)</h2>
<p>Triggered immediately after a call terminates. Sends full conversation metadata, structured data slots, and audio recording URLs.</p>

<h3>Payload Dispatched by QuickVoice:</h3>
<pre><code>{
  "event": "call.completed",
  "callId": "call_987654321",
  "agentId": "e1687102-91d1-47bb-a7d9-d43e89a55298",
  "durationSeconds": 142,
  "status": "COMPLETED",
  "callerNumber": "+14155550199",
  "recordingUrl": "https://s3.amazonaws.com/quickvoice-recordings/call_987654321.mp3",
  "transcript": [
    { "role": "agent", "message": "Hi, thanks for calling! How can I assist you today?" },
    { "role": "caller", "message": "I'd like to book an appointment for tomorrow at 2 PM." },
    { "role": "agent", "message": "You're booked for tomorrow at 2 PM with Dr. Vance!" }
  ],
  "extractedData": {
    "appointment_date": "2026-09-05",
    "appointment_time": "14:00",
    "user_email": "alex@example.com"
  },
  "sentiment": "POSITIVE",
  "escalatedToHuman": false,
  "telephonyCostMicros": 124000
}</code></pre>

<div class="page-break"></div>

<!-- SECTION 5 -->
<h1>5. Creating &amp; Configuring Voice Agents in Console UI &amp; API</h1>

<h2>5.1 Step-by-Step Agent Creation through the Console UI</h2>

<div class="step-box">
  <span class="step-num">STEP 1</span>
  <span class="step-title">Create Agent Entity in Console</span>
  <p>In the main sidebar, navigate to <strong>Agents</strong> (<code>http://localhost:3005/agents</code>) &rarr; Click the <strong>+ Create Agent</strong> button in the top right. Enter a friendly name (e.g., <em>"Apex Dental Receptionist"</em>) and click <strong>Create</strong>.</p>
</div>

<div class="step-box">
  <span class="step-num">STEP 2</span>
  <span class="step-title">Open the "Voice &amp; Models" Configuration Tab</span>
  <p>From the agent overview screen, click the <strong>Voice</strong> tab in the navigation bar. This opens the dedicated model and speech engine configuration panel.</p>
</div>

<h2>5.2 Configuring LLM, STT, and TTS in the Console UI</h2>
<p>QuickVoice provides decoupled dropdown selectors allowing you to mix-and-match any combination of intelligence, transcription, and speech synthesis:</p>

<div class="step-box">
  <span class="step-num">1</span>
  <span class="step-title">Agent Language Selector (<code>agent_language</code>)</span>
  <p>Select the conversational language (e.g., <strong>English (en)</strong>, <strong>Spanish (es)</strong>, <strong>French (fr)</strong>, <strong>German (de)</strong>, <strong>Hindi (hi)</strong>). Changing the language dynamically filters the available STT and TTS models below to only those supporting that locale.</p>
</div>

<div class="step-box">
  <span class="step-num">2</span>
  <span class="step-title">LLM Model Selector (<code>llmModel</code>)</span>
  <p>Select the reasoning engine that generates the conversation turns:</p>
  <ul>
    <li><strong>Claude 3.5 Haiku (Amazon Bedrock / Anthropic):</strong> Recommended default. Delivers sub-200ms first-token latency with superior prompt adherence.</li>
    <li><strong>Claude 3.5 Sonnet:</strong> Used for highly complex reasoning, multi-turn diagnostics, or complex objection handling.</li>
    <li><strong>Amazon Nova Micro / Lite:</strong> Cost-effective options for straightforward deterministic IVR workflows.</li>
    <li><strong>OpenAI GPT-4o-mini:</strong> Ultra-fast general intelligence for support intake and lead qualification.</li>
  </ul>
</div>

<div class="step-box">
  <span class="step-num">3</span>
  <span class="step-title">Speech-to-Text (STT) Model Selector (<code>sttModel</code>)</span>
  <p>Select the real-time transcription engine that listens to the caller:</p>
  <ul>
    <li><strong>Deepgram Nova-3 (<code>deepgram/nova-3</code>):</strong> Lowest word error rate (WER) and streaming latency (&lt;180ms). Recommended for English and Spanish.</li>
    <li><strong>Deepgram Nova-2 (<code>deepgram/nova-2</code>):</strong> Battle-tested streaming STT with multi-lingual support.</li>
    <li><strong>Sarvam Saaras (<code>sarvam/saaras:v3</code>):</strong> Optimized for Indian accents, vernacular dialects, and code-switching (Hinglish).</li>
  </ul>
</div>

<div class="step-box">
  <span class="step-num">4</span>
  <span class="step-title">Text-to-Speech (TTS) Model &amp; Voice Selection (<code>ttsModel</code> &amp; <code>voiceId</code>)</span>
  <p>Choose the synthesis engine and specific human persona voice:</p>
  <ul>
    <li><strong>Deepgram Aura-2 (<code>deepgram/aura-2</code>):</strong> Instant streaming audio. Choose from <em>Asteria</em> (energetic/clear), <em>Apollo</em> (confident), <em>Hera</em> (warm/professional), <em>Zeus</em> (deep baritone), or <em>Luna</em> (gentle).</li>
    <li><strong>ElevenLabs Flash v2.5 (<code>elevenlabs/eleven_flash_v2_5</code>):</strong> Ultra-expressive emotional nuance for high-touch customer VIP lines.</li>
    <li><strong>Rime (<code>rime/rime-arcana</code>):</strong> Studio-grade natural conversational inflection.</li>
  </ul>
</div>

<div class="step-box">
  <span class="step-num">5</span>
  <span class="step-title">Audition Voice with the Interactive Preview Panel</span>
  <p>The right-hand side of the <strong>Voice Tab</strong> displays the <strong>Voice Profile Panel</strong>. Click the <strong>Play Sample Audio</strong> button to audition the voice's pitch, cadence, and tone before saving. You can also view its style tags (e.g., <em>"Clear"</em>, <em>"Confident"</em>, <em>"Energetic"</em>) and recommended use cases.</p>
</div>

<div class="step-box">
  <span class="step-num">6</span>
  <span class="step-title">Click "Save Voice Configuration"</span>
  <p>Click the <strong>Save Voice Configuration</strong> button in the top right. The console dispatches an authenticated <code>PUT /api/v1/agents/{agentId}/configure</code> request, updating the live agent configuration immediately.</p>
</div>

<h2>5.3 How Administrators Add Custom Models to the UI Catalog</h2>
<p>If your organization wants to expose custom fine-tuned LLMs (e.g. self-hosted vLLM or Ollama), new ElevenLabs voice clones, or private STT models inside the Console UI dropdowns:</p>
<ol>
  <li><strong>Catalog File:</strong> Edit <code>apps/console/src/lib/data/voices.ts</code> (or provide a custom JSON file via <code>VOICE_CATALOG_PATH</code> in <code>apps/ai/.env</code>).</li>
  <li><strong>Add New LLM Option:</strong>
    <pre><code>export const LLM_MODELS: ModelOption[] = [
  ...LLM_MODELS,
  {
    id: "openai/gpt-4o-mini",
    label: "OpenAI GPT-4o Mini",
    provider: "OpenAI"
  }
];</code></pre>
  </li>
  <li><strong>Add Custom Voice ID:</strong>
    <pre><code>{
  id: "my-custom-cloned-voice",
  name: "Dr. Sarah Cloned Voice",
  provider: "ElevenLabs",
  gender: "feminine",
  locale: "en-US",
  accent: "American",
  languages: ["en"],
  ttsModels: ["elevenlabs/eleven_flash_v2_5"],
  styles: ["Professional", "Medical"],
  useCases: ["Dental Clinics", "Healthcare"]
}</code></pre>
  </li>
  <li>The new model and voice will automatically populate inside the Console UI dropdowns for all users in the organization!</li>
</ol>

<h2>5.4 Programmatic Agent Creation &amp; Configuration via REST API</h2>
<p>For automated deployments and external integrations, administrators can execute the exact same actions via API:</p>

<h3>Step 1: Create the Agent Entity</h3>
<pre><code>POST /api/v1/agents
Content-Type: application/json
Origin: http://localhost:3005
Cookie: better-auth.session_token=YOUR_SESSION_TOKEN

{
  "name": "Concierge Receptionist",
  "isActive": true
}</code></pre>

<h3>Step 2: Full Agent Configuration (LLM, STT, TTS, Prompts, Webhooks)</h3>
<pre><code>PUT /api/v1/agents/{agentId}/configure
Content-Type: application/json
Origin: http://localhost:3005
Cookie: better-auth.session_token=YOUR_SESSION_TOKEN

{
  "agent_language": "en",
  "firstMessage": "Hi, thanks for calling! How can I help you today?",
  "systemPrompt": "You are a concise concierge voice receptionist. Keep responses under 20 words. Verify details before taking action.",
  "llmModel": "bedrock/us.anthropic.claude-haiku-4-5-20251001-v1:0",
  "sttModel": "deepgram/nova-3",
  "ttsModel": "deepgram/aura-2",
  "voiceId": "aura-2-asteria-en",
  "store_call_audio": true,
  "zero_pii_retention": false,
  "conversation_retention_days": 30,
  "ivr_navigation_enabled": true,
  "timezone": "America/New_York",
  "data_needed": [
    { "id": "email", "type": "string", "name": "Email", "description": "Caller email address" }
  ]
}</code></pre>

<h3>Step 3: Attach an Integration Tool (e.g. Cal.com or SMS):</h3>
<pre><code>POST /api/v1/tools/{toolId}/attach/{agentId}</code></pre>

<h3>Step 4: Assign an Inbound Telephony Number:</h3>
<pre><code>POST /api/v1/phone-numbers/{phoneNumberId}/assign
Content-Type: application/json

{
  "agentId": "{agentId}"
}</code></pre>

<div class="page-break"></div>

<!-- SECTION 6 -->
<h1>6. Verification, Health Checks &amp; Troubleshooting</h1>

<h2>6.1 System Health &amp; Readiness Checks</h2>
<p>Before launching live campaigns, run the following automated diagnostics from your terminal:</p>

<table>
  <thead>
    <tr>
      <th>Diagnostic Check</th>
      <th>Command</th>
      <th>Expected Output</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>API Readiness Check</strong></td>
      <td><code>curl http://localhost:5000/api/v1/system/readiness</code></td>
      <td><code>{"status":"ready","database":true,"redis":true}</code></td>
    </tr>
    <tr>
      <td><strong>Swagger Documentation</strong></td>
      <td><code>curl -I http://localhost:5000/api/v1/docs</code></td>
      <td><code>HTTP/1.1 200 OK</code></td>
    </tr>
    <tr>
      <td><strong>Console Web UI</strong></td>
      <td><code>curl -I http://localhost:3005/login</code></td>
      <td><code>HTTP/1.1 200 OK</code></td>
    </tr>
    <tr>
      <td><strong>AI Worker Port</strong></td>
      <td><code>curl http://localhost:5555/health</code></td>
      <td><code>{"status":"healthy","livekit":true}</code></td>
    </tr>
  </tbody>
</table>

<h2>6.2 Administrator Troubleshooting Matrix</h2>
<table>
  <thead>
    <tr>
      <th>Error / Symptom</th>
      <th>Root Cause</th>
      <th>Remediation Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>MISSING_OR_NULL_ORIGIN</code></td>
      <td>Client API call missing <code>Origin</code> header in Better Auth requests.</td>
      <td>Include <code>Origin: http://localhost:3005</code> in curl requests or configure <code>CORS_ORIGINS</code> in <code>apps/server/.env</code>.</td>
    </tr>
    <tr>
      <td><code>listen EADDRINUSE :3000</code></td>
      <td>Port 3000 occupied by local container (e.g. Open WebUI / Grafana).</td>
      <td>Console has been configured to use <strong>Port 3005</strong> (<code>next dev -p 3005</code>).</td>
    </tr>
    <tr>
      <td><code>LiveKit Room Not Joining</code></td>
      <td>Mismatched <code>LIVEKIT_URL</code> or expired <code>LIVEKIT_API_SECRET</code>.</td>
      <td>Regenerate key in LiveKit Cloud dashboard; update both <code>apps/server/.env</code> and <code>apps/ai/.env</code>.</td>
    </tr>
    <tr>
      <td><code>STT Not Transcribing Audio</code></td>
      <td>Invalid or depleted Deepgram API balance.</td>
      <td>Check Deepgram console credit balance; ensure <code>DEEPGRAM_API_KEY</code> is active.</td>
    </tr>
    <tr>
      <td><code>Negative Balance / Call Blocked</code></td>
      <td>Wallet reservation failed due to empty balance.</td>
      <td>Credit organization wallet via Stripe or seed balance using <code>prisma.billingAccount.update()</code>.</td>
    </tr>
  </tbody>
</table>

<div class="callout tip">
  <div class="callout-title">Need Production Assistance?</div>
  For enterprise support, custom telephony SIP gateway integrations, and managed cloud deployments, consult your repository:
  <strong>https://github.com/mithunccdev/Advanced-quick-voice.git</strong>
</div>

</body>
</html>
"""

html_path = os.path.abspath("admin_guide_doc.html")
pdf_path = os.path.abspath("QuickVoice_Master_Admin_Configuration_Guide.pdf")

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html_content)

chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
cmd = [
    chrome_path,
    "--headless=new",
    "--disable-gpu",
    "--no-pdf-header-footer",
    f"--print-to-pdf={pdf_path}",
    f"file:///{html_path.replace(os.sep, '/')}"
]

res = subprocess.run(cmd, capture_output=True, text=True)
print("Master Admin Guide PDF Generated:", os.path.exists(pdf_path))
if os.path.exists(pdf_path):
    print("Size:", os.path.getsize(pdf_path), "bytes")

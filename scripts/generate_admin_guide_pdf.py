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
    margin: 16mm 14mm 16mm 14mm;
    @bottom-right {
      content: counter(page);
    }
  }
  
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #1e293b;
    line-height: 1.5;
    font-size: 9.5pt;
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
    font-size: 8.5pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    border-radius: 4px;
    background-color: #ede9fe;
    color: #6d28d9;
    margin-bottom: 18px;
  }
  
  .badge-admin {
    background-color: #fef2f2;
    color: #dc2626;
    border: 1px solid #fecaca;
  }
  
  .cover-title {
    font-size: 25pt;
    font-weight: 800;
    color: #0f172a;
    line-height: 1.15;
    margin: 0 0 12px 0;
  }
  
  .cover-subtitle {
    font-size: 12pt;
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
    margin-top: 25px;
    max-width: 500px;
  }
  
  .meta-row {
    display: flex;
    justify-content: space-between;
    padding: 6px 0;
    font-size: 8.5pt;
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
    font-size: 8.5pt;
    color: #94a3b8;
    border-top: 1px solid #e2e8f0;
    padding-top: 15px;
  }

  /* Headings */
  h1 {
    color: #0f172a;
    font-size: 14pt;
    font-weight: 800;
    border-bottom: 2px solid #e2e8f0;
    padding-bottom: 4px;
    margin-top: 20px;
    margin-bottom: 10px;
    page-break-after: avoid;
  }

  h2 {
    color: #1e293b;
    font-size: 11pt;
    font-weight: 700;
    margin-top: 15px;
    margin-bottom: 6px;
    page-break-after: avoid;
  }

  h3 {
    color: #334155;
    font-size: 9.5pt;
    font-weight: 700;
    margin-top: 10px;
    margin-bottom: 4px;
    page-break-after: avoid;
  }

  p {
    margin: 0 0 8px 0;
  }

  ul, ol {
    margin: 0 0 10px 0;
    padding-left: 18px;
  }

  li {
    margin-bottom: 3px;
  }

  /* Tables */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 8px 0 12px 0;
    font-size: 8pt;
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
    padding: 9px 12px;
    margin: 9px 0;
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
  .callout.danger {
    border-left-color: #ef4444;
    background-color: #fef2f2;
  }
  .callout-title {
    font-weight: 700;
    font-size: 8.5pt;
    margin-bottom: 3px;
    color: #0f172a;
  }

  /* Code Block */
  pre {
    background-color: #0f172a;
    color: #f8fafc;
    padding: 8px 11px;
    border-radius: 5px;
    font-family: "Courier New", Courier, monospace;
    font-size: 7.5pt;
    line-height: 1.35;
    overflow-x: auto;
    margin: 6px 0 10px 0;
    page-break-inside: avoid;
  }

  code {
    background-color: #f1f5f9;
    padding: 1px 4px;
    border-radius: 3px;
    font-family: "Courier New", Courier, monospace;
    font-size: 7.5pt;
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
    padding: 9px 11px;
    margin: 8px 0;
    background-color: #fafafa;
    page-break-inside: avoid;
  }
  .step-num {
    display: inline-block;
    background-color: #8b5cf6;
    color: #ffffff;
    font-weight: 700;
    font-size: 7pt;
    padding: 2px 5px;
    border-radius: 3px;
    margin-right: 5px;
  }
  .step-title {
    font-weight: 700;
    color: #0f172a;
  }
  
  .tab-badge {
    display: inline-block;
    font-size: 7.5pt;
    font-weight: 700;
    padding: 2px 7px;
    border-radius: 3px;
    margin-right: 6px;
    text-transform: uppercase;
  }
  .tab-telephony { background: #dbeafe; color: #1e40af; }
  .tab-stt { background: #d1fae5; color: #065f46; }
  .tab-tts { background: #fef3c7; color: #92400e; }
  .tab-llm { background: #f3e8ff; color: #6b21a8; }
</style>
</head>
<body>

<!-- COVER PAGE -->
<div class="cover-page">
  <div class="cover-header">
    <div class="badge">Master Administrator Manual</div>
    <div class="badge badge-admin">Admin Account Only</div>
    <div class="cover-title">QuickVoice Master<br>Admin Configuration Guide</div>
    <div class="cover-subtitle">Comprehensive Enterprise Handbook for Multi-Provider Telephony (Vobiz, Twilio, Telnyx), Vernacular AI (Sarvam, Deepgram), Cloud LLM Matrix (OpenRouter, DeepSeek, OpenAI, Claude 3.7, Gemini), LiveKit WebRTC, and Admin Role Security</div>
    
    <div class="meta-box">
      <div class="meta-row">
        <span class="meta-label">Product Version:</span>
        <span class="meta-value">QuickVoice Enterprise v2.5</span>
      </div>
      <div class="meta-row">
        <span class="meta-label">Access Restriction:</span>
        <span class="meta-value">Admin &amp; Owner Accounts Only</span>
      </div>
      <div class="meta-row">
        <span class="meta-label">Telephony Providers:</span>
        <span class="meta-value">Vobiz SIP (India 140/92), Twilio, Telnyx, LiveKit</span>
      </div>
      <div class="meta-row">
        <span class="meta-label">Speech &amp; Voice Providers:</span>
        <span class="meta-value">Sarvam AI (Saaras/Bulbul), Deepgram, ElevenLabs</span>
      </div>
      <div class="meta-row">
        <span class="meta-label">Cloud LLM Engines:</span>
        <span class="meta-value">OpenRouter, DeepSeek R1/V3, Claude 3.7, GPT-4o, Gemini 2.0</span>
      </div>
      <div class="meta-row">
        <span class="meta-label">Author:</span>
        <span class="meta-value">QuickVoice Core Architecture Team</span>
      </div>
      <div class="meta-row">
        <span class="meta-label">Published:</span>
        <span class="meta-value">September 2026</span>
      </div>
    </div>
  </div>

  <div class="cover-footer">
    QuickVoice Autonomous Voice Systems &bull; Confidential &bull; System Administration &amp; Integration Guide
  </div>
</div>

<!-- SECTION 1 -->
<h1>1. Architecture Overview &amp; Master Secrets</h1>

<h2>1.1 System Components &amp; Environment Topography</h2>
<p>The QuickVoice ecosystem operates across three synchronized execution planes:</p>
<ol>
  <li><strong>API Server (Node.js / Express / Prisma):</strong> Manages multi-tenant authentication, organization hierarchy, role-based access control, billing wallets, SIP routing metadata, and webhook dispatches. Configured via <code>apps/server/.env</code>.</li>
  <li><strong>Console Dashboard (Next.js 14 / Tailwind / Better-Auth):</strong> The web application interface for human administrators and operators. Gated routes protect sensitive credentials. Configured via <code>apps/console/.env</code>.</li>
  <li><strong>Voice Agent Worker (Python 3.11 / LiveKit Agents):</strong> High-performance media daemon maintaining sub-200ms WebRTC pipelines, voice activity detection (VAD), speech-to-text, LLM inference, and voice streaming. Configured via <code>apps/ai/.env</code>.</li>
</ol>

<h2>1.2 Core Security Secrets (Mandatory Step 0)</h2>
<table>
  <thead>
    <tr>
      <th>Environment Variable</th>
      <th>File Target</th>
      <th>Security Specification</th>
      <th>Key Purpose</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>SECRET_ENCRYPTION_KEY</code></td>
      <td><code>apps/server/.env</code></td>
      <td>64 Hex characters (32 bytes random)</td>
      <td>AES-256-GCM encryption of third-party API keys and carrier SIP credentials at rest.</td>
    </tr>
    <tr>
      <td><code>INTERNAL_API_KEY</code></td>
      <td><code>apps/server/.env</code> &amp; <code>apps/ai/.env</code></td>
      <td>High-entropy base64 string (32+ chars)</td>
      <td>Mutual authentication between Node API and Python AI worker; prevents unauthorized call injection.</td>
    </tr>
    <tr>
      <td><code>BETTER_AUTH_SECRET</code></td>
      <td><code>apps/server/.env</code></td>
      <td>High-entropy secret string</td>
      <td>Cryptographic signing of user authentication cookies and session bearer tokens.</td>
    </tr>
    <tr>
      <td><code>LIVEKIT_API_KEY</code> / <code>LIVEKIT_API_SECRET</code></td>
      <td>Both server &amp; worker</td>
      <td>LiveKit Cloud project credentials</td>
      <td>Room creation, WebRTC token issuance, and SIP ingress/egress dispatch control.</td>
    </tr>
  </tbody>
</table>

<div class="callout danger">
  <div class="callout-title">Zero-Tolerance Security Rule: Admin Account Only</div>
  <p>All AI provider keys (OpenAI, Anthropic, DeepSeek, Sarvam AI, Deepgram, ElevenLabs) and Telephony SIP credentials (Vobiz, Twilio, Telnyx) represent critical financial liabilities. In QuickVoice, the <strong>Provider &amp; API Configuration</strong> dashboard (<code>/settings/providers</code>) is cryptographically and logically restricted to <strong>Administrator</strong> and <strong>Owner</strong> roles only. Regular organization members cannot view, alter, or extract these keys.</p>
</div>

<div class="page-break"></div>

<!-- SECTION 2 -->
<h1>2. Dedicated Provider &amp; API Management (Admin Account Only)</h1>

<p>Administrators configure and manage all carrier and model credentials directly in the QuickVoice Console UI under <strong>Settings &rarr; AI &amp; Telephony APIs</strong> (<code>/settings/providers</code>). The dashboard is segregated into four dedicated operational domains:</p>

<h2>2.1 Tab 1: Telephony &amp; Elastic SIP Trunks <span class="tab-badge tab-telephony">Telephony &amp; SIP</span></h2>
<p>QuickVoice supports hybrid carrier integration, enabling concurrent inbound and outbound routing across Vobiz, Twilio, Telnyx, and native LiveKit SIP dispatchers.</p>

<h3>Vobiz Cloud Telephony &amp; Elastic SIP Trunking</h3>
<p><strong>Vobiz</strong> is an AI-first cloud telephony provider specifically tailored for modern real-time voice applications and India regulatory compliance (TRAI 140/92 series). Key technical parameters:</p>
<ul>
  <li><strong>SIP Domain Proxy:</strong> <code>sip.vobiz.ai</code> (Port 5060 UDP/TCP, Port 5061 TLS)</li>
  <li><strong>Authentication Mode:</strong> SIP Digest Authentication (Username + Auth Token) or IP Access Control List (ACL) whitelisting.</li>
  <li><strong>Codec Negotiation:</strong> G.711u (PCMU), G.711a (PCMA), and Opus (48kHz full-band for pristine AI audio).</li>
  <li><strong>Indian DID Number Allocations:</strong>
    <ul>
      <li><strong>140 Series:</strong> Dedicated transactional telemarketing numbers for India financial &amp; enterprise outbound calling.</li>
      <li><strong>92 Series:</strong> Commercial business customer service and verified conversational calling.</li>
      <li><strong>1800 Series:</strong> National toll-free customer support lines.</li>
      <li><strong>Standard E.164:</strong> Full international routing (e.g., <code>+91XXXXXXXXXX</code> for India, <code>+1XXXXXXXXXX</code> for North America).</li>
    </ul>
  </li>
  <li><strong>LiveKit Cloud SIP Inbound Dispatch Setup:</strong>
    <pre><code># In LiveKit Cloud Console -> SIP Inbound Trunks:
Name: Vobiz-India-Inbound
SIP URI: sip:inbound.livekit.cloud
Numbers Accepted: +91140XXXXXXX, +9192XXXXXXXX
Auth: IP Whitelist -> Add Vobiz Signaling IP Blocks
Dispatch Rule: Direct to Agent Room ("quickvoice-inbound-{call_id}")</code></pre>
  </li>
  <li><strong>LiveKit Cloud SIP Outbound Trunk Setup:</strong>
    <pre><code># In LiveKit Cloud Console -> SIP Outbound Trunks:
Name: Vobiz-Outbound-Trunk
Address: sip.vobiz.ai:5060
Transport: TLS (Recommended) or UDP
Credentials: Vobiz Account Username &amp; Auth Token
Caller ID: +91140XXXXXXX (Verified Vobiz DID)</code></pre>
  </li>
</ul>

<h3>Twilio &amp; Telnyx SIP Credentials</h3>
<table>
  <thead>
    <tr>
      <th>Provider</th>
      <th>Required Settings in Console</th>
      <th>Use Case &amp; Geography</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Vobiz</strong></td>
      <td>API Key, Auth Token, SIP Domain (<code>sip.vobiz.ai</code>), Outbound Trunk ID</td>
      <td>India domestic (140/92/1800), Asia-Pacific high-throughput low-latency SIP.</td>
    </tr>
    <tr>
      <td><strong>Twilio</strong></td>
      <td>Account SID, Auth Token, Elastic SIP Trunk SID (<code>TKxxxxxxxx</code>)</td>
      <td>North America &amp; European toll-free, global local number inventory.</td>
    </tr>
    <tr>
      <td><strong>Telnyx</strong></td>
      <td>API v2 Token, SIP Connection ID</td>
      <td>Ultra-low per-minute carrier pricing, multi-region private IP termination.</td>
    </tr>
    <tr>
      <td><strong>LiveKit SIP</strong></td>
      <td>Inbound SIP Trunk ID, Outbound SIP Trunk ID</td>
      <td>Native WebRTC-to-PSTN bridging with automated room dispatching.</td>
    </tr>
  </tbody>
</table>

<div class="page-break"></div>

<h2>2.2 Tab 2: Speech-to-Text (STT) Engines <span class="tab-badge tab-stt">Speech-to-Text</span></h2>
<p>QuickVoice provisions industry-leading streaming STT providers to transcribe customer audio in under 300 milliseconds.</p>

<h3>Sarvam AI — Vernacular Speech Recognition (Saaras v3)</h3>
<ul>
  <li><strong>Model Identifier:</strong> <code>sarvam/saaras:v3</code></li>
  <li><strong>Specialization:</strong> State-of-the-art acoustic modeling for Indian languages with code-mixed vernacular understanding (Hinglish, Tanglish, etc.).</li>
  <li><strong>Supported Languages:</strong> Hindi, Tamil, Telugu, Kannada, Bengali, Marathi, Gujarati, Malayalam, Punjabi, Odia, and Indian English (<code>en-IN</code>).</li>
  <li><strong>Configuration in Console:</strong> Enter <code>Sarvam AI API Key</code> under <strong>Settings &rarr; AI &amp; Telephony APIs &rarr; Speech-to-Text</strong>.</li>
</ul>

<h3>Deepgram Nova-3 &amp; Nova-2</h3>
<ul>
  <li><strong>Model Identifiers:</strong> <code>deepgram/nova-3</code> (Default) and <code>deepgram/nova-2</code></li>
  <li><strong>Performance:</strong> Sub-250ms streaming transcription with smart formatting, automatic numeral conversion, profanity filtering, and keyword boosting.</li>
</ul>

<h2>2.3 Tab 3: Voice Synthesis &amp; TTS Engines <span class="tab-badge tab-tts">Voice &amp; TTS</span></h2>
<p>Deliver life-like, expressive voice responses matching your brand's regional and stylistic persona.</p>

<table>
  <thead>
    <tr>
      <th>TTS Provider</th>
      <th>Engine Model</th>
      <th>Key Personas &amp; Accents</th>
      <th>Latency Profile</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Sarvam AI</strong></td>
      <td><code>sarvam/bulbul:v3</code></td>
      <td><strong>Indian Voices:</strong> <em>Shubh</em> (Professional Male), <em>Meera</em> (Warm Female), <em>Dhruv</em> (Energetic Male), <em>Ananya</em> (Conversational Female), <em>Aditya</em> (Executive Male).</td>
      <td>~280ms streaming TTFB. Native Hindi, Tamil, Telugu, English (IN).</td>
    </tr>
    <tr>
      <td><strong>Deepgram</strong></td>
      <td><code>deepgram/aura-2</code></td>
      <td><strong>English &amp; Global:</strong> <em>Asteria</em> (Energetic), <em>Apollo</em> (Confident), <em>Hera</em> (Warm), <em>Zeus</em> (Deep Baritone), <em>Luna</em> (Gentle).</td>
      <td>~180ms instant streaming.</td>
    </tr>
    <tr>
      <td><strong>ElevenLabs</strong></td>
      <td><code>elevenlabs/eleven_flash_v2_5</code></td>
      <td>Studio-grade emotional expressiveness, custom voice cloning, multi-dialect support.</td>
      <td>~300ms. Premium VIP queues.</td>
    </tr>
    <tr>
      <td><strong>Cartesia</strong></td>
      <td><code>cartesia/sonic</code></td>
      <td>High-speed conversational synthesis with realistic breathing and turn-taking.</td>
      <td>&lt;150ms ultra-low latency.</td>
    </tr>
  </tbody>
</table>

<h2>2.4 Tab 4: Cloud LLM Intelligence Matrix <span class="tab-badge tab-llm">Cloud LLMs</span></h2>
<p>QuickVoice provides unified support for all premier foundation models. Administrators enter API keys once, and all models become instantly selectable across every conversational agent in the organization.</p>

<table>
  <thead>
    <tr>
      <th>Provider Category</th>
      <th>Models Available in QuickVoice</th>
      <th>Best Fit / Recommended Use Case</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>OpenRouter (Aggregator)</strong></td>
      <td><code>openrouter/deepseek/deepseek-r1</code><br><code>openrouter/deepseek/deepseek-chat</code><br><code>openrouter/meta-llama/llama-3.3-70b-instruct</code><br><code>openrouter/qwen/qwen-2.5-72b-instruct</code></td>
      <td>Cost-effective open weights, high rate limits, complex conversational reasoning with DeepSeek R1.</td>
    </tr>
    <tr>
      <td><strong>DeepSeek Direct</strong></td>
      <td><code>deepseek/deepseek-chat</code> (V3)<br><code>deepseek/deepseek-reasoner</code> (R1)</td>
      <td>Direct high-speed API access, enterprise prompt caching, ultra-low token pricing.</td>
    </tr>
    <tr>
      <td><strong>OpenAI</strong></td>
      <td><code>openai/gpt-4o</code><br><code>openai/gpt-4o-mini</code><br><code>openai/o3-mini</code><br><code>openai/o1</code></td>
      <td>High conversational fidelity, complex function calling, multi-step structured data extraction.</td>
    </tr>
    <tr>
      <td><strong>Anthropic Claude</strong></td>
      <td><code>anthropic/claude-3-7-sonnet</code><br><code>anthropic/claude-3-5-sonnet</code><br><code>anthropic/claude-3-5-haiku</code></td>
      <td>Industry benchmark for conversational naturalness, zero-shot nuance, and human empathy.</td>
    </tr>
    <tr>
      <td><strong>Google Gemini</strong></td>
      <td><code>google/gemini-2.0-flash</code><br><code>google/gemini-1.5-flash</code><br><code>google/gemini-1.5-pro</code></td>
      <td>Blazing fast real-time TTFT (&lt;200ms), 1M+ token context windows, audio multimodal integration.</td>
    </tr>
    <tr>
      <td><strong>Amazon Bedrock</strong></td>
      <td><code>bedrock/us.anthropic.claude-3-5-sonnet</code><br><code>bedrock/us.anthropic.claude-haiku-4-5</code></td>
      <td>Enterprise AWS VPC isolation, HIPAA/SOC2 compliance, IAM role-based authentication.</td>
    </tr>
  </tbody>
</table>

<div class="page-break"></div>

<!-- SECTION 3 -->
<h1>3. Connecting LiveKit Cloud &amp; Media Infrastructure</h1>

<h2>3.1 LiveKit Cloud Signaling &amp; Room Orchestration</h2>
<p>LiveKit Cloud powers the real-time WebRTC media mesh connecting callers, carriers, and the QuickVoice AI worker.</p>
<ol>
  <li>Navigate to <a href="https://cloud.livekit.io">https://cloud.livekit.io</a> and create a production project.</li>
  <li>Under <strong>Project Settings &rarr; Keys</strong>, generate an API Key and Secret.</li>
  <li>Insert the credentials into <code>apps/server/.env</code> and <code>apps/ai/.env</code>:
    <pre><code>LIVEKIT_URL=wss://your-project.livekit.cloud
LIVEKIT_API_KEY=APIxxxxxxxxxxxx
LIVEKIT_API_SECRET=secretxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</code></pre>
  </li>
  <li>Deploy the QuickVoice AI worker: <code>python -m apps.ai.main start</code> (or via Docker Compose: <code>docker-compose up -d ai-worker</code>). The worker immediately registers itself as an active participant dispatcher on LiveKit Cloud.</li>
</ol>

<h2>3.2 LiveKit SIP Dispatch Rule Configuration</h2>
<p>When an inbound PSTN call arrives from Vobiz, Twilio, or Telnyx, LiveKit dispatches it into an isolated WebRTC audio room. Configure the SIP dispatch rule via LiveKit CLI or Console:</p>
<pre><code># livekit-cli sip dispatch-rule create rule.json
{
  "name": "QuickVoice-Auto-Agent-Dispatch",
  "rule": {
    "dispatchRuleIndividual": {
      "roomPrefix": "call-"
    }
  },
  "metadata": "{\\"source\\": \\"vobiz_twilio_gateway\\"}"
}</code></pre>

<!-- SECTION 4 -->
<h1>4. Inbound &amp; Outbound Webhook Architecture</h1>

<h2>4.1 Webhook Lifecycle Events</h2>
<p>QuickVoice dispatches cryptographic webhooks to third-party CRMs (HubSpot, Salesforce, Zoho, Zapier) at key lifecycle transitions:</p>
<table>
  <thead>
    <tr>
      <th>Event Name</th>
      <th>Trigger Moment</th>
      <th>Payload Key Attributes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>call.started</code></td>
      <td>SIP INVITE answered; WebRTC room joined.</td>
      <td><code>callId</code>, <code>callerNumber</code>, <code>agentId</code>, <code>direction</code>, <code>timestamp</code></td>
    </tr>
    <tr>
      <td><code>call.transcript.chunk</code></td>
      <td>Real-time streaming speech chunk committed.</td>
      <td><code>callId</code>, <code>speaker</code> (agent/user), <code>text</code>, <code>confidence</code></td>
    </tr>
    <tr>
      <td><code>tool.invoked</code></td>
      <td>LLM triggers external tool (e.g. Cal.com booking).</td>
      <td><code>toolName</code>, <code>inputArguments</code>, <code>executionStatus</code></td>
    </tr>
    <tr>
      <td><code>call.ended</code></td>
      <td>SIP BYE received; room closed.</td>
      <td><code>durationSeconds</code>, <code>disposition</code>, <code>recordingUrl</code></td>
    </tr>
    <tr>
      <td><code>call.analyzed</code></td>
      <td>Post-call AI summary &amp; sentiment completed.</td>
      <td><code>summary</code>, <code>sentiment</code>, <code>extractedData</code>, <code>costUsd</code></td>
    </tr>
  </tbody>
</table>

<h2>4.2 HMAC-SHA256 Signature Verification</h2>
<p>Every webhook request includes an <code>X-QuickVoice-Signature</code> header. Verify signatures in Node.js/Python to prevent forgery:</p>
<pre><code>// Example Node.js Webhook Receiver
const crypto = require("crypto");

function verifyQuickVoiceWebhook(req, secret) {
  const signature = req.headers["x-quickvoice-signature"];
  const hmac = crypto.createHmac("sha256", secret);
  const digest = hmac.update(JSON.stringify(req.body)).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}</code></pre>

<div class="page-break"></div>

<!-- SECTION 5 -->
<h1>5. Step-by-Step Agent Creation &amp; Model Selection via Console UI</h1>

<p>All agent creation, prompt engineering, speech engine configuration, and carrier number binding can be performed entirely within the QuickVoice Console UI by administrators.</p>

<div class="step-box">
  <span class="step-num">1</span>
  <span class="step-title">Log in with Administrator Privileges</span>
  <p>Navigate to <code>http://localhost:3005/login</code> and sign in using your Admin account (e.g., <code>admin@quickvoice.ai</code>). Non-admin accounts will not see provider API tabs or permission matrices.</p>
</div>

<div class="step-box">
  <span class="step-num">2</span>
  <span class="step-title">Update Provider API Keys (Settings &rarr; AI &amp; Telephony APIs)</span>
  <p>Before launching agents, verify your provider credentials under <strong>Settings &rarr; AI &amp; Telephony APIs</strong>:</p>
  <ul>
    <li><strong>Telephony:</strong> Enter your Vobiz API Key, Auth Token, and SIP Domain (<code>sip.vobiz.ai</code>).</li>
    <li><strong>STT:</strong> Enter Sarvam AI API Key (for Indian regional languages) and Deepgram API Key.</li>
    <li><strong>TTS:</strong> Select Sarvam Bulbul voice or Deepgram Aura.</li>
    <li><strong>LLM:</strong> Enter keys for OpenRouter (DeepSeek R1/V3), OpenAI, Anthropic, or Google Gemini.</li>
    <li>Click <strong>Save All Provider APIs</strong>. Settings are securely encrypted with AES-256 and persisted in organization metadata.</li>
  </ul>
</div>

<div class="step-box">
  <span class="step-num">3</span>
  <span class="step-title">Create a New Agent Entity</span>
  <p>In the main navigation, click <strong>Agents</strong> and press the <strong>+ New Agent</strong> button. Enter the agent's display name (e.g., <em>"Support Concierge - India"</em>) and choose a starter template or blank canvas.</p>
</div>

<div class="step-box">
  <span class="step-num">4</span>
  <span class="step-title">Configure Agent Behavior &amp; LLM (Behavior Tab)</span>
  <p>In the Agent Detail view, open the <strong>Behavior</strong> tab:</p>
  <ul>
    <li><strong>Greeting / First Message:</strong> Set the initial spoken greeting (e.g. <em>"Namaste! Thank you for calling QuickVoice support. How may I assist you today?"</em>).</li>
    <li><strong>System Prompt:</strong> Define instructions, rules, boundary conditions, and conversational persona.</li>
    <li><strong>LLM Model Selection:</strong> Choose from the newly expanded catalog: <code>openrouter/deepseek/deepseek-r1</code>, <code>anthropic/claude-3-7-sonnet</code>, <code>openai/gpt-4o</code>, or <code>google/gemini-2.0-flash</code>.</li>
    <li><strong>Temperature:</strong> Adjust between 0.1 (strict procedural adherence) and 0.7 (creative, conversational).</li>
  </ul>
</div>

<div class="step-box">
  <span class="step-num">5</span>
  <span class="step-title">Configure Speech &amp; Regional Persona (Voice Tab)</span>
  <p>Open the <strong>Voice</strong> tab to select STT and TTS models:</p>
  <ul>
    <li><strong>Speech-to-Text:</strong> Choose <code>sarvam/saaras:v3</code> for Hindi/Indian vernacular or <code>deepgram/nova-3</code> for global English/multilingual.</li>
    <li><strong>Voice (TTS) Selection:</strong>
      <ul>
        <li>For Indian regional accents: Select <strong>Sarvam Shubh</strong> (Male) or <strong>Sarvam Meera</strong> (Female).</li>
        <li>For global personas: Select <strong>Deepgram Asteria</strong>, <strong>Hera</strong>, or <strong>ElevenLabs Flash</strong>.</li>
      </ul>
    </li>
    <li><strong>Audition Audio:</strong> Click <strong>Play Sample Audio</strong> in the Voice Profile Panel to test cadence, pitch, and inflection.</li>
  </ul>
</div>

<div class="step-box">
  <span class="step-num">6</span>
  <span class="step-title">Assign Telephony Number (Numbers Tab)</span>
  <p>Navigate to <strong>Phone Numbers</strong> in the console. Select a purchased or imported number (e.g. Vobiz 140/92 DID) and click <strong>Assign Agent</strong>. Inbound calls to this number will immediately spin up the configured agent voice pipeline.</p>
</div>

<div class="page-break"></div>

<!-- SECTION 6 -->
<h1>6. Verification, System Health &amp; Diagnostics</h1>

<h2>6.1 Automated Health Check Suite</h2>
<p>Execute the following diagnostic commands from any authorized administrative workstation:</p>
<table>
  <thead>
    <tr>
      <th>Service Component</th>
      <th>Diagnostic Command</th>
      <th>Expected Response</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>API Server Health</strong></td>
      <td><code>curl http://localhost:5000/api/v1/system/readiness</code></td>
      <td><code>{"status":"ready","database":true,"redis":true}</code></td>
    </tr>
    <tr>
      <td><strong>Console Web Interface</strong></td>
      <td><code>curl -I http://localhost:3005/settings/providers</code></td>
      <td><code>HTTP/1.1 200 OK</code> (or 307 redirect if unauthenticated)</td>
    </tr>
    <tr>
      <td><strong>Swagger API Documentation</strong></td>
      <td><code>curl -I http://localhost:5000/api/v1/docs</code></td>
      <td><code>HTTP/1.1 200 OK</code></td>
    </tr>
    <tr>
      <td><strong>Python Voice Worker</strong></td>
      <td><code>curl http://localhost:5555/health</code></td>
      <td><code>{"status":"healthy","livekit":true,"stt":"ready","tts":"ready"}</code></td>
    </tr>
  </tbody>
</table>

<h2>6.2 Administrator Troubleshooting Matrix</h2>
<table>
  <thead>
    <tr>
      <th>Symptom / Error Code</th>
      <th>Underlying Root Cause</th>
      <th>Mandatory Administrative Remediation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>403 Forbidden on /settings/providers</code></td>
      <td>User account possesses standard <code>member</code> role instead of <code>admin</code> or <code>owner</code>.</td>
      <td>Promote user role via <code>Settings &rarr; Roles</code> or update membership directly in PostgreSQL.</td>
    </tr>
    <tr>
      <td><code>Vobiz SIP 401 Unauthorized</code></td>
      <td>Mismatched SIP Auth Token or IP address not whitelisted in Vobiz Portal.</td>
      <td>Verify credentials in <code>/settings/providers</code>; add LiveKit egress IP to Vobiz ACL.</td>
    </tr>
    <tr>
      <td><code>Sarvam AI 400 Bad Request</code></td>
      <td>Unsupported language code supplied to <code>bulbul:v3</code>.</td>
      <td>Ensure language is set to supported Indian ISO code (<code>hi</code>, <code>ta</code>, <code>te</code>, <code>kn</code>, <code>bn</code>, <code>en-IN</code>).</td>
    </tr>
    <tr>
      <td><code>OpenRouter 402 Payment Required</code></td>
      <td>Depleted credits on OpenRouter account for DeepSeek R1 / V3.</td>
      <td>Top up OpenRouter balance at <a href="https://openrouter.ai/credits">openrouter.ai/credits</a>.</td>
    </tr>
    <tr>
      <td><code>STT Latency Spike (&gt;1000ms)</code></td>
      <td>AI worker container CPU throttling or network jitter to STT endpoints.</td>
      <td>Allocate minimum 2 vCPU per 10 concurrent streams; verify low-latency DNS resolution.</td>
    </tr>
    <tr>
      <td><code>listen EADDRINUSE :3000</code></td>
      <td>Port 3000 occupied by existing container or service.</td>
      <td>QuickVoice Console is pre-configured on <strong>Port 3005</strong> (<code>next dev -p 3005</code>).</td>
    </tr>
  </tbody>
</table>

<div class="callout tip">
  <div class="callout-title">Enterprise Support &amp; Production Repository</div>
  <p>Source code, automated migration scripts, and architecture blueprints are maintained at:</p>
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

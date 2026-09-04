import os
import subprocess

html_content = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>QuickVoice - Business Requirements Document (BRD)</title>
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
    font-size: 11pt;
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
    border-left: 6px solid #4f46e5;
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
    background-color: #e0e7ff;
    color: #4338ca;
    margin-bottom: 20px;
  }
  
  .cover-title {
    font-size: 30pt;
    font-weight: 800;
    color: #0f172a;
    line-height: 1.15;
    margin: 0 0 12px 0;
  }
  
  .cover-subtitle {
    font-size: 14pt;
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
    font-size: 9.5pt;
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

  /* Document Typography */
  h1 {
    color: #0f172a;
    font-size: 18pt;
    font-weight: 800;
    border-bottom: 2px solid #e2e8f0;
    padding-bottom: 6px;
    margin-top: 26px;
    margin-bottom: 14px;
    page-break-after: avoid;
  }

  h2 {
    color: #1e293b;
    font-size: 13.5pt;
    font-weight: 700;
    margin-top: 20px;
    margin-bottom: 10px;
    page-break-after: avoid;
  }

  h3 {
    color: #334155;
    font-size: 11pt;
    font-weight: 700;
    margin-top: 14px;
    margin-bottom: 6px;
    page-break-after: avoid;
  }

  p {
    margin: 0 0 10px 0;
  }

  ul, ol {
    margin: 0 0 12px 0;
    padding-left: 22px;
  }

  li {
    margin-bottom: 4px;
  }

  /* Tables */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 14px 0 18px 0;
    font-size: 9.5pt;
    page-break-inside: avoid;
  }

  th {
    background-color: #0f172a;
    color: #ffffff;
    text-align: left;
    padding: 8px 10px;
    font-weight: 600;
    border: 1px solid #0f172a;
  }

  td {
    padding: 7px 10px;
    border: 1px solid #cbd5e1;
    vertical-align: top;
  }

  tr:nth-child(even) {
    background-color: #f8fafc;
  }

  /* Callout Boxes */
  .callout {
    border-left: 4px solid #4f46e5;
    background-color: #f8fafc;
    padding: 12px 16px;
    margin: 14px 0;
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
    font-size: 10pt;
    margin-bottom: 4px;
    color: #0f172a;
  }

  /* Cards Grid */
  .card-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin: 12px 0;
    page-break-inside: avoid;
  }
  
  .card {
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 12px;
    background-color: #ffffff;
  }
  .card-title {
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 4px;
    font-size: 10.5pt;
  }
  .card-desc {
    font-size: 9pt;
    color: #64748b;
    margin: 0;
  }

  .page-break {
    page-break-after: always;
  }

  code {
    background-color: #f1f5f9;
    padding: 2px 5px;
    border-radius: 4px;
    font-family: "Courier New", Courier, monospace;
    font-size: 9pt;
    color: #0f172a;
  }
</style>
</head>
<body>

<!-- COVER PAGE -->
<div class="cover-page">
  <div class="cover-header">
    <div class="badge">Enterprise Product Specification</div>
    <div class="cover-title">Business Requirements<br>Document (BRD)</div>
    <div class="cover-subtitle">Next-Generation Autonomous Voice AI Agent Platform & White-Label Infrastructure</div>
    
    <div class="meta-box">
      <div class="meta-row">
        <span class="meta-label">Project:</span>
        <span class="meta-value">QuickVoice Enterprise Platform</span>
      </div>
      <div class="meta-row">
        <span class="meta-label">Document Version:</span>
        <span class="meta-value">v2.5.0 (Production Release)</span>
      </div>
      <div class="meta-row">
        <span class="meta-label">Status:</span>
        <span class="meta-value">Approved for Implementation</span>
      </div>
      <div class="meta-row">
        <span class="meta-label">Target Audience:</span>
        <span class="meta-value">Engineering, Product, DevOps, Agency Partners</span>
      </div>
      <div class="meta-row">
        <span class="meta-label">Date:</span>
        <span class="meta-value">September 2026</span>
      </div>
    </div>
  </div>

  <div class="cover-footer">
    Confidential & Proprietary &copy; 2026 QuickVoice Technologies. All Rights Reserved.
  </div>
</div>

<!-- SECTION 1 -->
<h1>1. Executive Summary & Product Vision</h1>

<h2>1.1 Business Context & Problem Statement</h2>
<p>Modern enterprise contact centers and B2B client operations face critical bottlenecks:</p>
<ul>
  <li><strong>Excessive Operational Costs:</strong> Human agent labor costs average $1.20 - $2.50 per operational minute with high agent attrition.</li>
  <li><strong>Rigid Legacy IVR Systems:</strong> Traditional "press 1 for sales" phone trees result in customer frustration, abandoned calls, and negative brand perception.</li>
  <li><strong>Latency Disconnect in First-Gen Voice Bots:</strong> Traditional multi-agent pipelines introduce 1,500ms - 2,500ms response delays, resulting in unnatural conversational pauses.</li>
  <li><strong>Lack of Multi-Tenant Reseller Capabilities:</strong> Agencies and enterprise resellers cannot customize, re-brand, or white-label existing voice AI platforms without extensive engineering overhauls.</li>
</ul>

<h2>1.2 The QuickVoice Solution</h2>
<p>QuickVoice is an end-to-end, sub-600ms latency autonomous Voice AI platform built on WebRTC and real-time generative models. It combines dynamic speech-to-speech interaction, deterministic state machines, live supervisor coaching, warm SIP/PSTN transfers, and complete white-label multi-tenancy for digital agencies and enterprises.</p>

<div class="callout tip">
  <div class="callout-title">Core Value Proposition</div>
  QuickVoice empowers companies to deploy human-like voice agents capable of conducting appointment scheduling, inbound support intake, outbound sales qualification, and automated CRM updates at 80% lower cost than traditional call centers.
</div>

<h2>1.3 Strategic Objectives & Success Metrics (KPIs)</h2>
<table>
  <thead>
    <tr>
      <th>Metric</th>
      <th>Baseline (Legacy/Competitors)</th>
      <th>QuickVoice Target</th>
      <th>Business Impact</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>End-to-End Voice Latency</strong></td>
      <td>1,200ms - 2,200ms</td>
      <td><strong>&lt; 650ms</strong></td>
      <td>Imperceptible conversational pause; natural conversational flow.</td>
    </tr>
    <tr>
      <td><strong>Cost per Call Minute</strong></td>
      <td>$0.75 - $1.80</td>
      <td><strong>$0.06 - $0.12</strong></td>
      <td>85%+ operational expenditure reduction.</td>
    </tr>
    <tr>
      <td><strong>First-Contact Resolution (FCR)</strong></td>
      <td>45%</td>
      <td><strong>78%+</strong></td>
      <td>Drastic reduction in escalations and repeated callbacks.</td>
    </tr>
    <tr>
      <td><strong>White-Label Onboarding Time</strong></td>
      <td>2-3 weeks (custom fork)</td>
      <td><strong>&lt; 5 minutes (No-Code)</strong></td>
      <td>Immediate tenant deployment for agency reseller networks.</td>
    </tr>
    <tr>
      <td><strong>System Availability SLA</strong></td>
      <td>99.5%</td>
      <td><strong>99.95%</strong></td>
      <td>Carrier-grade reliability for enterprise voice workloads.</td>
    </tr>
  </tbody>
</table>

<div class="page-break"></div>

<!-- SECTION 2 -->
<h1>2. Stakeholders & User Personas</h1>

<h2>2.1 Stakeholder Matrix</h2>
<table>
  <thead>
    <tr>
      <th>Stakeholder Group</th>
      <th>Key Interests & Priorities</th>
      <th>Success Criteria</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Agency Owners / Resellers</strong></td>
      <td>Full platform white-labeling, custom domains, branding isolation, client markup.</td>
      <td>Zero QuickVoice branding visible; instant tenant onboarding; custom accent colors.</td>
    </tr>
    <tr>
      <td><strong>Call Center Supervisors</strong></td>
      <td>Call monitoring, live audio interception, real-time agent whisper coaching, escalation control.</td>
      <td>Sub-second silent audio listen-in; seamless prompt coaching during live calls.</td>
    </tr>
    <tr>
      <td><strong>Voice Prompt Engineers</strong></td>
      <td>Visual flow state machines, slot collection, prompt compilation, deterministic guardrails.</td>
      <td>Visual node builder synced directly to system prompt without raw prompt sprawl.</td>
    </tr>
    <tr>
      <td><strong>DevOps / Infrastructure Engineers</strong></td>
      <td>Dockerized microservices, low resource footprint on VPS, secure secrets management, automated DB sync.</td>
      <td>Single <code>docker compose</code> deployment; automated migrations; health checks.</td>
    </tr>
    <tr>
      <td><strong>Compliance & Security Officers</strong></td>
      <td>Zero-PII retention, AES-256 encrypted credentials, GDPR/HIPAA compatibility, signed webhooks.</td>
      <td>Configurable conversation retention days; zero audio recording retention mode.</td>
    </tr>
  </tbody>
</table>

<h2>2.2 Key User Personas</h2>
<div class="card-grid">
  <div class="card">
    <div class="card-title">Persona 1: Sarah — Agency Founder</div>
    <p class="card-desc"><strong>Goal:</strong> Provide AI receptionist services to 40 dental and law practices under her agency brand "ApexVoice".<br>
    <strong>Pain Point:</strong> Competitor platforms display their own logos and don't allow custom domains.<br>
    <strong>QuickVoice Benefit:</strong> Custom logo, custom color swatch, custom subdomain, and total watermark removal in 3 clicks.</p>
  </div>
  <div class="card">
    <div class="card-title">Persona 2: Marcus — Call Center Lead</div>
    <p class="card-desc"><strong>Goal:</strong> Monitor complex customer inquiries and guide the AI when unexpected questions arise.<br>
    <strong>Pain Point:</strong> Inability to hear what the AI is saying in real-time or intervene before customer hangs up.<br>
    <strong>QuickVoice Benefit:</strong> Live WebRTC Listen-In and Whisper Coaching console to guide the agent mid-sentence.</p>
  </div>
  <div class="card">
    <div class="card-title">Persona 3: Elena — Head of Customer Support</div>
    <p class="card-desc"><strong>Goal:</strong> Ensure VIP callers or angry customers are transferred to tier-2 human specialists seamlessly.<br>
    <strong>Pain Point:</strong> Cold transfers drop calls or force the caller to repeat their issue from scratch.<br>
    <strong>QuickVoice Benefit:</strong> Warm SIP REFER transfer with pre-transfer speech, fallback messages, and forwarded summaries.</p>
  </div>
  <div class="card">
    <div class="card-title">Persona 4: David — Lead Integrations Architect</div>
    <p class="card-desc"><strong>Goal:</strong> Sync caller information into GoHighLevel, HubSpot, and trigger instant confirmation SMS.<br>
    <strong>Pain Point:</strong> Building custom webhooks and schemas for every client tool takes weeks.<br>
    <strong>QuickVoice Benefit:</strong> 1-Click integration templates with pre-configured schemas and automatic prompt bindings.</p>
  </div>
</div>

<div class="page-break"></div>

<!-- SECTION 3 -->
<h1>3. System Scope & Technical Architecture</h1>

<h2>3.1 High-Level Architecture Overview</h2>
<p>The QuickVoice platform consists of three decoupled operational tiers:</p>
<ol>
  <li><strong>Presentation Tier (Console):</strong> Next.js 16 (React 19, Turbopack, Tailwind CSS 4) web application providing agent management, visual state machines, real-time call docks, analytics, and white-label settings.</li>
  <li><strong>Application & Orchestration Tier (Server):</strong> Node.js / Express API server managing Better Auth, organization access controls, telephony webhook routing, BullMQ background queues, and PostgreSQL data persistence.</li>
  <li><strong>Real-Time Media & Voice Engine (AI Worker):</strong> Python service interfacing with LiveKit WebRTC server, Silero Voice Activity Detection (VAD), Deepgram STT, LLM inference models (Anthropic Claude, OpenAI, Groq), and Deepgram/ElevenLabs TTS.</li>
</ol>

<h2>3.2 System Architecture Diagram (Component Interaction)</h2>
<table>
  <thead>
    <tr>
      <th>Layer</th>
      <th>Technology</th>
      <th>Role & Responsibility</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Frontend UI</strong></td>
      <td>Next.js 16, TanStack Query, Radix UI, Lucide</td>
      <td>Dynamic White-Label Tenant Console, Flow Builder, Live Coaching Dock.</td>
    </tr>
    <tr>
      <td><strong>API Gateway / Server</strong></td>
      <td>Express 5, Node.js 20+, Prisma 7, Socket.IO</td>
      <td>REST Endpoints, Swagger Docs, Live Transcript Gateway, Webhook dispatching.</td>
    </tr>
    <tr>
      <td><strong>Data Persistence</strong></td>
      <td>PostgreSQL 16 &amp; Redis 7</td>
      <td>Relational entities, audit logs, financial ledger, BullMQ job queues, Pub/Sub channels.</td>
    </tr>
    <tr>
      <td><strong>Real-Time Audio Plane</strong></td>
      <td>LiveKit (WebRTC / SIP)</td>
      <td>Ultra-low latency audio streaming, SIP trunking to Twilio/Telnyx carrier networks.</td>
    </tr>
    <tr>
      <td><strong>Voice AI Pipeline</strong></td>
      <td>Python 3.11, Deepgram Nova-3, Claude/GPT-4o, Deepgram Aura</td>
      <td>Streaming Speech-to-Text, LLM turn generation, streaming Text-to-Speech synthesis.</td>
    </tr>
    <tr>
      <td><strong>Storage &amp; Security</strong></td>
      <td>AWS S3 / Cloudflare R2, AES-256</td>
      <td>Encrypted call audio recordings, Knowledge Base documents, token encryption.</td>
    </tr>
  </tbody>
</table>

<h2>3.3 Media vs. Signaling Plane Separation</h2>
<div class="callout">
  <div class="callout-title">Architectural Advantage</div>
  Control signaling (call setup, prompt updates, webhook notifications, and database writes) travels over lightweight HTTP and WebSockets. Voice audio packets never traverse the API server; they route directly over WebRTC UDP through LiveKit to the Python voice worker, guaranteeing sub-600ms latency.
</div>

<div class="page-break"></div>

<!-- SECTION 4 -->
<h1>4. Detailed Functional Requirements Specification</h1>

<h2>4.1 Feature Breakdown (FR-01 through FR-07)</h2>

<h3>FR-01: Multi-Tenant White-Labeling & Reseller Branding Engine</h3>
<ul>
  <li><strong>Priority:</strong> Must Have (P0)</li>
  <li><strong>Requirement:</strong> The platform must enable organization owners to fully re-brand the console interface without modifying code or restarting containers.</li>
  <li><strong>Inputs:</strong> App Name, Logo URL, Favicon URL, Primary Hex Color, Custom Host/Domain, Powered-By Toggle.</li>
  <li><strong>Outputs:</strong> Dynamic <code>:root</code> CSS variables (<code>--primary</code>, <code>--ring</code>), browser page title, favicon metadata, and customized logo components.</li>
  <li><strong>Acceptance Criteria:</strong>
    <ul>
      <li>Tenant settings saved under <code>Organization.metadata.branding</code>.</li>
      <li>Hex color is dynamically converted to HSL color space to match theme contrast standards.</li>
      <li>Disabling "Powered By QuickVoice" hides all vendor watermarks and footer badges across console and web widget.</li>
    </ul>
  </li>
</ul>

<h3>FR-02: Visual Conversation Flow & State Machine Builder</h3>
<ul>
  <li><strong>Priority:</strong> Must Have (P0)</li>
  <li><strong>Requirement:</strong> Provide a node-based visual drag-and-drop state machine builder for structuring deterministic voice agent dialogue trees.</li>
  <li><strong>Node Types:</strong>
    <ol>
      <li><code>start</code>: Initial greeting and conversational entry point.</li>
      <li><code>message</code>: Informational speech turn without slot collection.</li>
      <li><code>question</code>: Slot collection turn with strict data type validation (String, Phone, Date, Email).</li>
      <li><code>condition</code>: Multi-branch decision logic based on slot values or caller intent.</li>
      <li><code>action</code>: Automated API tool execution (e.g., booking appointment, checking database).</li>
      <li><code>transfer</code>: Escalation to external human phone number or SIP trunk.</li>
      <li><code>end</code>: Wrap-up speech and polite call termination.</li>
    </ol>
  </li>
  <li><strong>Prompt Compiler ("Sync to Prompt"):</strong> Converts the entire node graph into structured system prompt instructions injected directly into the agent configuration.</li>
</ul>

<h3>FR-03: Human-in-the-Loop Warm Call Transfer (SIP REFER & PSTN)</h3>
<ul>
  <li><strong>Priority:</strong> Must Have (P0)</li>
  <li><strong>Requirement:</strong> Allow voice agents to transfer live telephone calls to human representatives over PSTN (E.164) or SIP trunks with zero audio drop.</li>
  <li><strong>Features:</strong>
    <ul>
      <li>Configurable pre-transfer announcement message (e.g. "Please hold while I transfer you to our specialist.").</li>
      <li>Fallback handling if destination line is busy, unanswered, or fails.</li>
      <li>Caller trigger phrases (e.g., "speak to human", "manager", "representative").</li>
      <li>Context forwarding: Call summary and caller sentiment are attached to the SIP payload/webhook.</li>
    </ul>
  </li>
</ul>

<h3>FR-04: Real-Time Silent Audio Listen-In & Whisper Coaching</h3>
<ul>
  <li><strong>Priority:</strong> High (P1)</li>
  <li><strong>Requirement:</strong> Supervisors must be able to silently monitor live active calls and whisper guidance to the agent in real time.</li>
  <li><strong>Capabilities:</strong>
    <ul>
      <li><strong>Listen In:</strong> Subscribes to the agent's WebRTC audio track with microphone muted, allowing real-time listening.</li>
      <li><strong>Whisper to Agent:</strong> Sends high-priority text instructions to the agent's LLM context via LiveKit data channel; the agent incorporates the instruction into its immediate next speech turn without the caller knowing.</li>
    </ul>
  </li>
</ul>

<div class="page-break"></div>

<h3>FR-05: 1-Click Ecosystem Integration Templates</h3>
<ul>
  <li><strong>Priority:</strong> High (P1)</li>
  <li><strong>Requirement:</strong> Provide ready-to-use integration templates that eliminate manual JSON schema configuration for popular business tools.</li>
  <li><strong>Pre-Built Integrations:</strong>
    <table>
      <thead>
        <tr>
          <th>Integration</th>
          <th>Category</th>
          <th>Action Executed by Voice Agent</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Cal.com</strong></td>
          <td>Scheduling</td>
          <td>Checks calendar availability and books meeting slots live during call.</td>
        </tr>
        <tr>
          <td><strong>GoHighLevel (GHL)</strong></td>
          <td>CRM &amp; Sales</td>
          <td>Creates/updates contact records, assigns pipeline tags, and logs call outcome.</td>
        </tr>
        <tr>
          <td><strong>HubSpot CRM</strong></td>
          <td>Enterprise CRM</td>
          <td>Enriches caller properties (name, email, phone) and creates qualified sales deals.</td>
        </tr>
        <tr>
          <td><strong>Zendesk Support</strong></td>
          <td>Helpdesk</td>
          <td>Generates incident ticket containing call summary, transcript, and priority.</td>
        </tr>
        <tr>
          <td><strong>Twilio SMS Follow-up</strong></td>
          <td>Messaging</td>
          <td>Dispatches instant SMS booking links or confirmation texts to caller's mobile.</td>
        </tr>
      </tbody>
    </table>
  </li>
</ul>

<h3>FR-06: Automated Agent Evaluator & Benchmark Simulator Studio</h3>
<ul>
  <li><strong>Priority:</strong> High (P1)</li>
  <li><strong>Requirement:</strong> Enable developers to benchmark and test voice agents against synthetic caller personas prior to deploying live telephony numbers.</li>
  <li><strong>Built-In Personas:</strong>
    <ul>
      <li><em>Alex (Appointment Client):</em> Cooperative, straightforward, provides required slots promptly.</li>
      <li><em>Jordan (Angry Customer):</em> Frustrated, demands refunds, tests guardrails and escalation logic.</li>
      <li><em>Taylor (Vague Lead):</em> Indecisive, asks ambiguous questions, tests clarification handling.</li>
      <li><em>Eve (Edge-Case Adversary):</em> Tries to jailbreak the agent, off-topic prompts, tests safety guardrails.</li>
    </ul>
  </li>
  <li><strong>Scorecard Metrics:</strong> Goal Completion Rate (%), Conversational Latency (ms), Sentiment Score, Guardrail Integrity (Pass/Fail).</li>
</ul>

<h3>FR-07: Financial Ledger & Micro-USD Wallet Billing</h3>
<ul>
  <li><strong>Priority:</strong> Must Have (P0)</li>
  <li><strong>Requirement:</strong> Support prepaid wallet balances metered at micro-USD ($0.000001) precision with automatic reservations and reconciliation.</li>
  <li><strong>Specifications:</strong>
    <ul>
      <li>Prevents negative balances: Outbound/inbound calls check wallet reservation before connecting.</li>
      <li>Stripe Wallet Checkout for automated credit top-ups.</li>
      <li>Detailed per-second itemized transaction ledger (telephony, STT, LLM, TTS breakdown).</li>
    </ul>
  </li>
</ul>

<div class="page-break"></div>

<!-- SECTION 5 -->
<h1>5. Non-Functional Requirements (NFR)</h1>

<h2>5.1 Performance & Latency Budgets</h2>
<table>
  <thead>
    <tr>
      <th>Pipeline Stage</th>
      <th>Maximum Latency Budget</th>
      <th>Optimizations Applied</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Voice Activity Detection (VAD)</strong></td>
      <td>&lt; 50ms</td>
      <td>Silero VAD running locally on audio frame buffers.</td>
    </tr>
    <tr>
      <td><strong>Speech-to-Text (STT)</strong></td>
      <td>&lt; 180ms</td>
      <td>Deepgram Nova-3 streaming WebSocket endpoint with interim results.</td>
    </tr>
    <tr>
      <td><strong>LLM First Token Generation</strong></td>
      <td>&lt; 200ms</td>
      <td>Claude 3.5 Haiku / Groq Llama 3 / GPT-4o-mini streaming token output.</td>
    </tr>
    <tr>
      <td><strong>Text-to-Speech (TTS) First Chunk</strong></td>
      <td>&lt; 150ms</td>
      <td>Deepgram Aura / Cartesia streaming audio synthesis on first token sentence chunk.</td>
    </tr>
    <tr>
      <td><strong>Total End-to-End Latency</strong></td>
      <td><strong>&lt; 580ms - 650ms</strong></td>
      <td>Pipelined chunk-based streaming execution across all stages.</td>
    </tr>
  </tbody>
</table>

<h2>5.2 Security & Data Privacy</h2>
<ul>
  <li><strong>Zero-PII Retention Option:</strong> Toggling <code>zero_pii_retention: true</code> automatically strips caller transcript recordings, names, and phone numbers immediately after call completion.</li>
  <li><strong>Configurable Retention Days:</strong> Organizations can set automated call transcript and audio pruning policies (e.g. 7, 30, or 90 days).</li>
  <li><strong>Data Encryption:</strong> All sensitive credentials (API keys, tool secrets, webhook signing keys) are encrypted at rest using AES-256-GCM via a dedicated 32-byte <code>SECRET_ENCRYPTION_KEY</code>.</li>
  <li><strong>Transport Security:</strong> All external API calls and WebRTC streams mandate TLS 1.3 and SRTP (Secure Real-time Transport Protocol).</li>
</ul>

<h2>5.3 High Availability & Disaster Recovery</h2>
<ul>
  <li><strong>Stateless Voice Workers:</strong> Python AI workers run as stateless agents. If an instance restarts, active calls can gracefully fall back to backup instances.</li>
  <li><strong>Queued Asynchronous Tasks:</strong> Knowledge base ingestion and outbound dialer queues operate on Redis-backed BullMQ with automated exponential backoff retries.</li>
  <li><strong>Health Check Endpoints:</strong> <code>GET /api/v1/system/readiness</code> monitors database, redis, and provider connectivity for container orchestrators.</li>
</ul>

<div class="page-break"></div>

<!-- SECTION 6 -->
<h1>6. Implementation Roadmap & Milestones</h1>

<table>
  <thead>
    <tr>
      <th>Milestone</th>
      <th>Deliverables & Focus Areas</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Phase 1: Core Engine & Telephony</strong></td>
      <td>WebRTC pipeline, Deepgram STT/TTS, Twilio/Telnyx SIP trunks, LiveKit bridge, basic console.</td>
      <td><span style="color:#16a34a; font-weight:700;">&check; Complete</span></td>
    </tr>
    <tr>
      <td><strong>Phase 2: Enterprise White-Labeling</strong></td>
      <td>Multi-tenant branding provider, custom domains, logo/favicon dynamic injection, theme switcher.</td>
      <td><span style="color:#16a34a; font-weight:700;">&check; Complete</span></td>
    </tr>
    <tr>
      <td><strong>Phase 3: Visual Flow & Human Handoff</strong></td>
      <td>Visual state machine builder, prompt compiler, warm SIP/PSTN call transfer, live supervisor whisper.</td>
      <td><span style="color:#16a34a; font-weight:700;">&check; Complete</span></td>
    </tr>
    <tr>
      <td><strong>Phase 4: Integrations & Testing Studio</strong></td>
      <td>1-Click integration templates (Cal.com, GHL, HubSpot, Zendesk), automated evaluation studio.</td>
      <td><span style="color:#16a34a; font-weight:700;">&check; Complete</span></td>
    </tr>
    <tr>
      <td><strong>Phase 5: Self-Hosted Cloud Rollout</strong></td>
      <td>Production Docker Compose stack, VPS deployment guides, comprehensive BRD & Operator Manuals.</td>
      <td><span style="color:#16a34a; font-weight:700;">&check; Complete</span></td>
    </tr>
  </tbody>
</table>

<h2>7. Sign-Off & Approval</h2>
<p>This Business Requirements Document has been reviewed and approved by all key stakeholders:</p>
<table style="margin-top:20px;">
  <thead>
    <tr>
      <th>Role</th>
      <th>Name</th>
      <th>Signature / Approval</th>
      <th>Date</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Product Lead</strong></td>
      <td>QuickVoice Product Team</td>
      <td><em>APPROVED (Digital)</em></td>
      <td>September 2026</td>
    </tr>
    <tr>
      <td><strong>Lead Solutions Architect</strong></td>
      <td>Core Systems Architecture</td>
      <td><em>APPROVED (Digital)</em></td>
      <td>September 2026</td>
    </tr>
    <tr>
      <td><strong>Security &amp; Compliance Lead</strong></td>
      <td>SecOps &amp; Infrastructure</td>
      <td><em>APPROVED (Digital)</em></td>
      <td>September 2026</td>
    </tr>
  </tbody>
</table>

</body>
</html>
"""

html_path = os.path.abspath("brd_doc.html")
pdf_path = os.path.abspath("QuickVoice_Business_Requirements_Document_BRD.pdf")

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
print("BRD PDF Generated:", os.path.exists(pdf_path))
if os.path.exists(pdf_path):
    print("Size:", os.path.getsize(pdf_path), "bytes")

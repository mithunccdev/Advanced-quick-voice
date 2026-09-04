import os
import subprocess

html_content = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>QuickVoice - Complete Usage & Administration Guide</title>
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
    font-size: 10.5pt;
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
    border-left: 6px solid #0ea5e9;
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
    background-color: #e0f2fe;
    color: #0369a1;
    margin-bottom: 20px;
  }
  
  .cover-title {
    font-size: 28pt;
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

  /* Headings */
  h1 {
    color: #0f172a;
    font-size: 16pt;
    font-weight: 800;
    border-bottom: 2px solid #e2e8f0;
    padding-bottom: 5px;
    margin-top: 24px;
    margin-bottom: 12px;
    page-break-after: avoid;
  }

  h2 {
    color: #1e293b;
    font-size: 12.5pt;
    font-weight: 700;
    margin-top: 18px;
    margin-bottom: 8px;
    page-break-after: avoid;
  }

  h3 {
    color: #334155;
    font-size: 10.5pt;
    font-weight: 700;
    margin-top: 12px;
    margin-bottom: 6px;
    page-break-after: avoid;
  }

  p {
    margin: 0 0 9px 0;
  }

  ul, ol {
    margin: 0 0 10px 0;
    padding-left: 20px;
  }

  li {
    margin-bottom: 4px;
  }

  /* Tables */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 12px 0 16px 0;
    font-size: 9pt;
    page-break-inside: avoid;
  }

  th {
    background-color: #0f172a;
    color: #ffffff;
    text-align: left;
    padding: 7px 9px;
    font-weight: 600;
    border: 1px solid #0f172a;
  }

  td {
    padding: 6px 9px;
    border: 1px solid #cbd5e1;
    vertical-align: top;
  }

  tr:nth-child(even) {
    background-color: #f8fafc;
  }

  /* Callouts */
  .callout {
    border-left: 4px solid #0ea5e9;
    background-color: #f0f9ff;
    padding: 10px 14px;
    margin: 12px 0;
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
    font-size: 9.5pt;
    margin-bottom: 3px;
    color: #0f172a;
  }

  /* Code Block */
  pre {
    background-color: #0f172a;
    color: #f8fafc;
    padding: 10px 12px;
    border-radius: 6px;
    font-family: "Courier New", Courier, monospace;
    font-size: 8.5pt;
    line-height: 1.4;
    overflow-x: auto;
    margin: 10px 0;
    page-break-inside: avoid;
  }

  code {
    background-color: #f1f5f9;
    padding: 2px 4px;
    border-radius: 4px;
    font-family: "Courier New", Courier, monospace;
    font-size: 8.5pt;
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
    padding: 10px 14px;
    margin: 10px 0;
    background-color: #fafafa;
    page-break-inside: avoid;
  }
  .step-num {
    display: inline-block;
    background-color: #0ea5e9;
    color: #ffffff;
    font-weight: 700;
    font-size: 8pt;
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
    <div class="badge">Official Operator &amp; Administrator Manual</div>
    <div class="cover-title">QuickVoice Complete<br>Usage &amp; Administration Guide</div>
    <div class="cover-subtitle">Comprehensive Operating Manual for Autonomous Voice AI, White-Label Reselling, Visual Flows, Warm Transfers &amp; Live Coaching</div>
    
    <div class="meta-box">
      <div class="meta-row">
        <span class="meta-label">Product Edition:</span>
        <span class="meta-value">QuickVoice Enterprise v2.5</span>
      </div>
      <div class="meta-row">
        <span class="meta-label">Default Access URL:</span>
        <span class="meta-value">http://localhost:3005</span>
      </div>
      <div class="meta-row">
        <span class="meta-label">Default Admin User:</span>
        <span class="meta-value">admin@quickvoice.com</span>
      </div>
      <div class="meta-row">
        <span class="meta-label">Primary Roles:</span>
        <span class="meta-value">Admin, Agency Owner, Call Center Lead</span>
      </div>
      <div class="meta-row">
        <span class="meta-label">Published:</span>
        <span class="meta-value">September 2026</span>
      </div>
    </div>
  </div>

  <div class="cover-footer">
    QuickVoice Autonomous Voice Systems &bull; Enterprise Documentation Series
  </div>
</div>

<!-- CHAPTER 1 -->
<h1>Chapter 1: Getting Started &amp; Initial Login</h1>

<h2>1.1 Accessing the Application</h2>
<p>QuickVoice runs as a distributed multi-service application with the following local/default network endpoints:</p>
<table>
  <thead>
    <tr>
      <th>Service</th>
      <th>Default URL</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Console Web UI</strong></td>
      <td><code>http://localhost:3005</code></td>
      <td>Primary administrative and agency dashboard.</td>
    </tr>
    <tr>
      <td><strong>API Server</strong></td>
      <td><code>http://localhost:5000</code></td>
      <td>Backend REST API and Socket.IO real-time gateway.</td>
    </tr>
    <tr>
      <td><strong>Interactive API Docs</strong></td>
      <td><code>http://localhost:5000/api/v1/docs</code></td>
      <td>Full Swagger / OpenAPI specification for external integrations.</td>
    </tr>
    <tr>
      <td><strong>PostgreSQL Database</strong></td>
      <td><code>localhost:5432</code></td>
      <td>Relational database (User: <code>quickvoice</code>, DB: <code>quickvoice</code>).</td>
    </tr>
    <tr>
      <td><strong>Redis Cache &amp; Queues</strong></td>
      <td><code>localhost:6379</code></td>
      <td>Pub/Sub audio channels &amp; BullMQ worker queues.</td>
    </tr>
  </tbody>
</table>

<h2>1.2 Administrator Login Credentials</h2>
<p>Your local installation has been seeded with standard administrative credentials:</p>
<div class="callout tip">
  <div class="callout-title">Default Admin Login</div>
  <strong>URL:</strong> <a href="http://localhost:3005/login">http://localhost:3005/login</a><br>
  <strong>Email:</strong> <code>admin@quickvoice.com</code><br>
  <strong>Password:</strong> <code>adminpassword123</code>
</div>

<h2>1.3 Pre-Loaded Demonstration Assets</h2>
<p>When you log in for the first time, your workspace already includes realistic production assets:</p>
<ul>
  <li><strong>3 Voice AI Agents:</strong>
    <ul>
      <li><em>Sales Qualifier:</em> Inbound B2B lead qualification agent.</li>
      <li><em>Support Intake:</em> Collects customer issue summaries, emails, and account IDs.</li>
      <li><em>Appointment Setter:</em> Outbound agent for scheduling and confirming calendar appointments.</li>
    </ul>
  </li>
  <li><strong>2 Provisioned Phone Numbers:</strong> <code>+14155550101</code> (Main line) and <code>+14155550102</code> (Support line).</li>
  <li><strong>3 Knowledge Base Documents:</strong> Pricing FAQ, Product Handbook, and Refund Policy.</li>
  <li><strong>160 Call Logs:</strong> Historical call records, durations, statuses, and searchable transcripts.</li>
</ul>

<div class="page-break"></div>

<!-- CHAPTER 2 -->
<h1>Chapter 2: Agency White-Labeling &amp; Tenant Branding</h1>

<h2>2.1 Overview</h2>
<p>QuickVoice features a built-in White-Labeling Engine designed for marketing agencies, MSPs, and enterprise resellers who wish to offer Voice AI services under their own custom brand name and identity.</p>

<h2>2.2 Step-by-Step Branding Configuration</h2>

<div class="step-box">
  <span class="step-num">STEP 1</span>
  <span class="step-title">Navigate to Branding Settings</span>
  <p>In the main sidebar, click <strong>Settings</strong> $\rightarrow$ <strong>Branding</strong> (or navigate directly to <code>http://localhost:3005/settings/branding</code>).</p>
</div>

<div class="step-box">
  <span class="step-num">STEP 2</span>
  <span class="step-title">Set Your Brand Identity</span>
  <ul>
    <li><strong>Platform / Brand Name:</strong> Enter your agency name (e.g. <em>ApexVoice AI</em>). This dynamically updates the page title and top-left header.</li>
    <li><strong>Custom Logo URL:</strong> Provide an HTTPS link to your company PNG/SVG logo (recommended height: 32px).</li>
    <li><strong>Favicon URL:</strong> Provide a custom <code>.ico</code> or <code>.png</code> favicon link.</li>
  </ul>
</div>

<div class="step-box">
  <span class="step-num">STEP 3</span>
  <span class="step-title">Select Theme Accent Color</span>
  <p>Choose from preset enterprise color swatches (Indigo, Ocean Blue, Emerald Green, Violet, Rose, Amber) or enter a custom Hex Code (e.g., <code>#10b981</code>). The platform automatically calculates the matching HSL color space values and updates all buttons, focus rings, and badges in real-time.</p>
</div>

<div class="step-box">
  <span class="step-num">STEP 4</span>
  <span class="step-title">Remove Vendor Watermarks</span>
  <p>Toggle the <strong>Hide "Powered by QuickVoice" Badges</strong> switch. This strips all vendor attribution from the dashboard, embedded web widgets, and email notifications.</p>
</div>

<div class="step-box">
  <span class="step-num">STEP 5</span>
  <span class="step-title">Click "Save Branding"</span>
  <p>Changes take effect immediately across all sessions without requiring a server reboot.</p>
</div>

<div class="callout">
  <div class="callout-title">Multi-Tenant Isolation</div>
  Branding settings are saved under each organization's metadata. If you operate multiple client workspaces, each organization can have completely separate logos, colors, and support contact emails.
</div>

<div class="page-break"></div>

<!-- CHAPTER 3 -->
<h1>Chapter 3: Creating &amp; Configuring Voice AI Agents</h1>

<h2>3.1 Agent Configuration Parameters</h2>
<table>
  <thead>
    <tr>
      <th>Setting</th>
      <th>Recommended Value</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>LLM Model</strong></td>
      <td><code>Claude 3.5 Haiku</code> or <code>GPT-4o-mini</code></td>
      <td>Fastest first-token generation for natural dialogue turns.</td>
    </tr>
    <tr>
      <td><strong>STT Model</strong></td>
      <td><code>Deepgram Nova-3</code></td>
      <td>Ultra-low latency streaming speech-to-text with interim word tokens.</td>
    </tr>
    <tr>
      <td><strong>TTS Model &amp; Voice</strong></td>
      <td><code>Deepgram Aura-2 (Asteria / Hera)</code></td>
      <td>Realistic human intonation, natural pauses, and conversational cadence.</td>
    </tr>
    <tr>
      <td><strong>First Message</strong></td>
      <td>Custom greeting</td>
      <td>Spoken immediately upon call pickup before the caller speaks.</td>
    </tr>
    <tr>
      <td><strong>Zero PII Retention</strong></td>
      <td><code>true</code> (for healthcare/finance)</td>
      <td>Ensures no call audio or caller identity records are persisted.</td>
    </tr>
  </tbody>
</table>

<h2>3.2 Best Practices for System Prompts</h2>
<p>Voice prompts differ significantly from text chatbot prompts:</p>
<ol>
  <li><strong>Keep Speech Turns Under 25 Words:</strong> In phone conversations, long monologue turns cause callers to disengage or interrupt. Instruct the agent: <em>"Keep each response concise, under 2 sentences, and end with a clarifying question."</em></li>
  <li><strong>Spell Out Numbers &amp; Acronyms:</strong> For phone numbers or dates, instruct: <em>"Read phone numbers digit by digit: 5-5-5, 0-1-0-1."</em></li>
  <li><strong>Acknowledge Interruptions:</strong> The built-in Silero VAD detects user interruptions instantly; ensure the prompt allows natural mid-sentence pauses.</li>
</ol>

<div class="page-break"></div>

<!-- CHAPTER 4 -->
<h1>Chapter 4: Visual Flow &amp; State Machine Builder</h1>

<h2>4.1 Why Visual State Machines Matter</h2>
<p>While generative LLMs are creative, enterprise voice workflows require deterministic execution (e.g. collecting an email, validating date availability, booking a slot, or transferring to human). The <strong>Flow Builder</strong> provides a graphical canvas to enforce exact conversation logic.</p>

<h2>4.2 Step-by-Step Flow Builder Usage</h2>

<div class="step-box">
  <span class="step-num">STEP 1</span>
  <span class="step-title">Access the Flow Builder Canvas</span>
  <p>Go to <strong>Agents</strong> $\rightarrow$ Select an agent $\rightarrow$ Click the <strong>Flow Builder</strong> tab.</p>
</div>

<div class="step-box">
  <span class="step-num">STEP 2</span>
  <span class="step-title">Understanding Node Types</span>
  <table>
    <thead>
      <tr>
        <th>Node Type</th>
        <th>Badge Color</th>
        <th>Purpose &amp; Behavior</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>Start</code></td>
        <td>Emerald</td>
        <td>Initial trigger when call connects; speaks the opening greeting.</td>
      </tr>
      <tr>
        <td><code>Question</code></td>
        <td>Blue</td>
        <td>Collects a specific variable slot (e.g. <code>user_name</code>, <code>booking_time</code>) and validates input.</td>
      </tr>
      <tr>
        <td><code>Condition</code></td>
        <td>Amber</td>
        <td>Branching logic (e.g., if caller wants sales $\rightarrow$ Node A; if support $\rightarrow$ Node B).</td>
      </tr>
      <tr>
        <td><code>Action</code></td>
        <td>Indigo</td>
        <td>Triggers an attached API tool (e.g., check calendar, create CRM lead).</td>
      </tr>
      <tr>
        <td><code>Transfer</code></td>
        <td>Rose</td>
        <td>Initiates warm call transfer to a live human specialist.</td>
      </tr>
      <tr>
        <td><code>End</code></td>
        <td>Slate</td>
        <td>Delivers parting message and politely hangs up the call.</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="step-box">
  <span class="step-num">STEP 3</span>
  <span class="step-title">Click "Sync to Prompt"</span>
  <p>When your state machine is configured, click <strong>Sync to Prompt</strong> in the canvas toolbar. QuickVoice compiles the entire visual graph into formatted instructions and injects them directly into the agent's system prompt.</p>
</div>

<div class="step-box">
  <span class="step-num">STEP 4</span>
  <span class="step-title">Exporting &amp; Backing Up Flows</span>
  <p>Click <strong>Export JSON</strong> to download the complete workflow structure as a portable JSON file that can be duplicated across other agents.</p>
</div>

<div class="page-break"></div>

<!-- CHAPTER 5 -->
<h1>Chapter 5: Warm Call Transfer &amp; Human Escalation</h1>

<h2>5.1 Overview &amp; Transfer Protocols</h2>
<p>When a caller asks for a human supervisor, or when an inquiry exceeds the agent's knowledge boundary, the <strong>Call Transfer Tab</strong> allows seamless warm handoffs.</p>

<h2>5.2 Configuration Steps</h2>
<ol>
  <li>In agent details, click the <strong>Call Transfer</strong> tab.</li>
  <li>Toggle <strong>Enable Live Call Transfer</strong> to active.</li>
  <li>Select <strong>Destination Protocol</strong>:
    <ul>
      <li><strong>Phone Number (PSTN / E.164):</strong> Used to dial standard cell phones or landlines (e.g., <code>+18005550199</code>).</li>
      <li><strong>SIP URI / PBX Trunk:</strong> Used to bridge into enterprise call center software like Genesys, Asterisk, or FreePBX (e.g., <code>sip:support@carrier.pbx.com</code>).</li>
    </ul>
  </li>
  <li>Configure <strong>Pre-Transfer Announcement:</strong> Message spoken to the caller while connecting (e.g., <em>"Please hold one moment while I transfer you to our lead specialist."</em>).</li>
  <li>Configure <strong>Fallback Speech:</strong> Spoken if the human destination fails to answer (e.g., <em>"I apologize, our specialists are currently busy. May I take a message or have them call you back?"</em>).</li>
  <li>Set <strong>Trigger Phrases:</strong> Comma-separated list (e.g., <em>"representative, manager, human agent, supervisor, transfer me"</em>).</li>
  <li>Toggle <strong>Forward Conversation Context:</strong> Attaches the conversation transcript summary to the SIP headers or webhook for the human agent.</li>
</ol>

<div class="page-break"></div>

<!-- CHAPTER 6 -->
<h1>Chapter 6: Live Call Monitoring &amp; Whisper Coaching</h1>

<h2>6.1 The Live Calls Dock</h2>
<p>Whenever active phone calls or web preview sessions are underway, the <strong>Live Calls Dock</strong> appears at the bottom of the console with active status indicators, caller numbers, and live elapsed timers.</p>

<h2>6.2 Silent Audio Listen-In</h2>
<ul>
  <li>Click the <strong>Listen In</strong> button on any active call.</li>
  <li>QuickVoice creates a silent WebRTC audio connection subscribing directly to the room's media stream with your supervisor microphone muted.</li>
  <li>You can hear both the caller and the voice agent in real time with sub-200ms latency.</li>
</ul>

<h2>6.3 Supervisor Whisper Coaching</h2>
<ul>
  <li>In the call card, type instructions into the <strong>Whisper to Agent</strong> text box (e.g., <em>"Offer a 15% discount if they commit today"</em> or <em>"Ask if they prefer morning or afternoon"</em>).</li>
  <li>Press <strong>Send / Enter</strong>.</li>
  <li>The instruction is transmitted over an encrypted data channel directly into the agent's LLM context window.</li>
  <li>The agent immediately incorporates your guidance into its next spoken sentence, completely unbeknownst to the caller.</li>
</ul>

<div class="page-break"></div>

<!-- CHAPTER 7 -->
<h1>Chapter 7: 1-Click Ecosystem Integrations</h1>

<h2>7.1 Installing Pre-Built Integration Templates</h2>
<p>QuickVoice eliminates custom coding for third-party tools via 1-Click Templates:</p>

<div class="step-box">
  <span class="step-num">STEP 1</span>
  <span class="step-title">Open Integration Templates</span>
  <p>In the main navigation, go to <strong>Tools</strong> $\rightarrow$ Click <strong>1-Click Templates</strong>.</p>
</div>

<div class="step-box">
  <span class="step-num">STEP 2</span>
  <span class="step-title">Select Your Tool</span>
  <table>
    <thead>
      <tr>
        <th>Template</th>
        <th>Required Input</th>
        <th>Agent Tool Capability</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Cal.com</strong></td>
        <td>Event Type ID &amp; API Key</td>
        <td>Checks open calendar slots and books appointments live during the call.</td>
      </tr>
      <tr>
        <td><strong>GoHighLevel</strong></td>
        <td>Location API Key / Bearer Token</td>
        <td>Creates contact, updates lead stage, logs call outcome, and applies campaign tags.</td>
      </tr>
      <tr>
        <td><strong>HubSpot CRM</strong></td>
        <td>Private App Access Token</td>
        <td>Creates contact object with verified name, phone, and lead status.</td>
      </tr>
      <tr>
        <td><strong>Zendesk</strong></td>
        <td>Subdomain &amp; API Token</td>
        <td>Generates support tickets with transcript summaries and caller urgency level.</td>
      </tr>
      <tr>
        <td><strong>Twilio SMS</strong></td>
        <td>Twilio Account SID &amp; Auth Token</td>
        <td>Dispatches instant confirmation text message to caller's mobile device.</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="step-box">
  <span class="step-num">STEP 3</span>
  <span class="step-title">Click "Install Tool"</span>
  <p>The tool is registered in your organization catalog and can be attached to any voice agent with a single click.</p>
</div>

<div class="page-break"></div>

<!-- CHAPTER 8 -->
<h1>Chapter 8: Automated Agent Evaluator &amp; Simulator</h1>

<h2>8.1 Pre-Deployment Testing</h2>
<p>Before connecting an AI agent to a live public telephone number, you should test its responses against simulated callers.</p>

<h2>8.2 Running Persona Simulations</h2>
<ol>
  <li>Open your agent $\rightarrow$ Click the <strong>Evaluator &amp; Simulator</strong> tab.</li>
  <li>Select an automated caller persona:
    <ul>
      <li><strong>Alex (Appointment Client):</strong> Tests straightforward slot collection and confirmation.</li>
      <li><strong>Jordan (Angry Customer):</strong> Tests patience, de-escalation, and call transfer triggers.</li>
      <li><strong>Taylor (Vague Inquirer):</strong> Tests clarification questions and conversational steering.</li>
      <li><strong>Eve (Adversarial Tester):</strong> Tests safety guardrails, prompt injection defense, and policy enforcement.</li>
    </ul>
  </li>
  <li>Click <strong>Simulate Persona</strong>. QuickVoice executes a multi-turn automated dialogue and generates an immediate scorecard:
    <ul>
      <li><strong>Goal Completion Score:</strong> Percentage of required data slots captured.</li>
      <li><strong>Conversational Latency:</strong> Average response time in milliseconds.</li>
      <li><strong>Caller Sentiment:</strong> Ending caller satisfaction rating.</li>
      <li><strong>Guardrail Integrity:</strong> Confirms the agent refused inappropriate requests.</li>
    </ul>
  </li>
</ol>

<div class="page-break"></div>

<!-- CHAPTER 9 -->
<h1>Chapter 9: Telephony &amp; Production VPS Deployment</h1>

<h2>9.1 Phone Number Binding</h2>
<ul>
  <li>Navigate to <strong>Phone Numbers</strong> in the console.</li>
  <li>Connect your Twilio Account SID or Telnyx API Key.</li>
  <li>Assign any purchased phone number directly to a Voice AI Agent. Inbound calls to that number will instantly trigger the voice agent with zero configuration.</li>
</ul>

<h2>9.2 Full-Stack VPS Deployment Cheat Sheet</h2>
<p>To deploy the entire production stack on a clean Ubuntu VPS:</p>

<pre><code># 1. Install Docker & Docker Compose
curl -fsSL https://get.docker.com | sh

# 2. Clone your repository
git clone https://github.com/mithunccdev/Advanced-quick-voice.git
cd Advanced-quick-voice

# 3. Configure environment variables
cp apps/server/.env.dev.example apps/server/.env
cp apps/console/.env.example apps/console/.env

# 4. Launch all 5 containers (Postgres, Redis, Server, Console, AI Worker)
docker compose -f docker-compose.full.yml up -d --build

# 5. Seed default administrator account
docker compose -f docker-compose.full.yml exec server tsx prisma/seed-admin.ts
</code></pre>

<h2>9.3 Operational Maintenance &amp; Health Checks</h2>
<ul>
  <li><strong>Check Container Status:</strong> <code>docker compose -f docker-compose.full.yml ps</code></li>
  <li><strong>View Server Logs:</strong> <code>docker compose -f docker-compose.full.yml logs -f server</code></li>
  <li><strong>Database Backup:</strong> <code>docker exec quickvoice-postgres pg_dump -U quickvoice quickvoice > backup.sql</code></li>
  <li><strong>System Health Check:</strong> <code>curl http://localhost:5000/api/v1/system/readiness</code></li>
</ul>

<div class="callout tip">
  <div class="callout-title">Support &amp; Community</div>
  For assistance, updates, and custom feature implementations, visit your official GitHub repository:<br>
  <strong>https://github.com/mithunccdev/Advanced-quick-voice.git</strong>
</div>

</body>
</html>
"""

html_path = os.path.abspath("usage_guide_doc.html")
pdf_path = os.path.abspath("QuickVoice_Complete_Usage_and_Administration_Guide.pdf")

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
print("Usage Guide PDF Generated:", os.path.exists(pdf_path))
if os.path.exists(pdf_path):
    print("Size:", os.path.getsize(pdf_path), "bytes")

CREATE TYPE "McpConnectionStatus" AS ENUM ('PENDING', 'CONNECTED', 'AUTH_REQUIRED', 'INPUT_REQUIRED', 'ERROR', 'DISCONNECTED');

CREATE TYPE "McpCatalogSource" AS ENUM ('SMITHERY', 'CUSTOM');

CREATE TABLE "McpServerCatalogItem" (
    "mcpServerId" TEXT NOT NULL,
    "organizationId" TEXT,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "source" "McpCatalogSource" NOT NULL DEFAULT 'SMITHERY',
    "provider" TEXT NOT NULL DEFAULT 'smithery',
    "mcpUrl" TEXT NOT NULL,
    "smitheryServerKey" TEXT,
    "authType" TEXT NOT NULL DEFAULT 'oauth',
    "categories" JSONB DEFAULT '[]',
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "toolCount" INTEGER NOT NULL DEFAULT 0,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "McpServerCatalogItem_pkey" PRIMARY KEY ("mcpServerId")
);

CREATE TABLE "McpConnection" (
    "mcpConnectionId" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "userId" TEXT,
    "catalogItemId" TEXT,
    "displayName" TEXT NOT NULL,
    "provider" TEXT NOT NULL DEFAULT 'smithery',
    "mcpUrl" TEXT NOT NULL,
    "smitheryNamespace" TEXT NOT NULL,
    "smitheryConnectionId" TEXT NOT NULL,
    "status" "McpConnectionStatus" NOT NULL DEFAULT 'PENDING',
    "setupUrl" TEXT,
    "tools" JSONB DEFAULT '[]',
    "metadata" JSONB,
    "lastSyncedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "McpConnection_pkey" PRIMARY KEY ("mcpConnectionId")
);

CREATE TABLE "AgentMcpConnection" (
    "agentMcpConnectionId" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "agentId" TEXT NOT NULL,
    "mcpConnectionId" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AgentMcpConnection_pkey" PRIMARY KEY ("agentMcpConnectionId")
);

CREATE TABLE "McpToolExecutionLog" (
    "mcpToolExecutionLogId" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "agentId" TEXT,
    "mcpConnectionId" TEXT NOT NULL,
    "toolName" TEXT NOT NULL,
    "callId" TEXT,
    "status" TEXT NOT NULL,
    "latencyMs" INTEGER,
    "argumentsPreview" JSONB,
    "resultPreview" JSONB,
    "error" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "McpToolExecutionLog_pkey" PRIMARY KEY ("mcpToolExecutionLogId")
);

CREATE UNIQUE INDEX "McpServerCatalogItem_organizationId_slug_key" ON "McpServerCatalogItem"("organizationId", "slug");
CREATE INDEX "McpServerCatalogItem_organizationId_idx" ON "McpServerCatalogItem"("organizationId");
CREATE INDEX "McpServerCatalogItem_source_idx" ON "McpServerCatalogItem"("source");
CREATE INDEX "McpServerCatalogItem_verified_idx" ON "McpServerCatalogItem"("verified");

CREATE UNIQUE INDEX "McpConnection_organizationId_smitheryConnectionId_key" ON "McpConnection"("organizationId", "smitheryConnectionId");
CREATE INDEX "McpConnection_organizationId_idx" ON "McpConnection"("organizationId");
CREATE INDEX "McpConnection_userId_idx" ON "McpConnection"("userId");
CREATE INDEX "McpConnection_status_idx" ON "McpConnection"("status");

CREATE UNIQUE INDEX "AgentMcpConnection_agentId_mcpConnectionId_key" ON "AgentMcpConnection"("agentId", "mcpConnectionId");
CREATE INDEX "AgentMcpConnection_organizationId_idx" ON "AgentMcpConnection"("organizationId");
CREATE INDEX "AgentMcpConnection_mcpConnectionId_idx" ON "AgentMcpConnection"("mcpConnectionId");

CREATE INDEX "McpToolExecutionLog_organizationId_idx" ON "McpToolExecutionLog"("organizationId");
CREATE INDEX "McpToolExecutionLog_agentId_idx" ON "McpToolExecutionLog"("agentId");
CREATE INDEX "McpToolExecutionLog_mcpConnectionId_idx" ON "McpToolExecutionLog"("mcpConnectionId");
CREATE INDEX "McpToolExecutionLog_createdAt_idx" ON "McpToolExecutionLog"("createdAt");

ALTER TABLE "McpServerCatalogItem" ADD CONSTRAINT "McpServerCatalogItem_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "McpConnection" ADD CONSTRAINT "McpConnection_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "McpConnection" ADD CONSTRAINT "McpConnection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "McpConnection" ADD CONSTRAINT "McpConnection_catalogItemId_fkey" FOREIGN KEY ("catalogItemId") REFERENCES "McpServerCatalogItem"("mcpServerId") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "AgentMcpConnection" ADD CONSTRAINT "AgentMcpConnection_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AgentMcpConnection" ADD CONSTRAINT "AgentMcpConnection_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("agentId") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AgentMcpConnection" ADD CONSTRAINT "AgentMcpConnection_mcpConnectionId_fkey" FOREIGN KEY ("mcpConnectionId") REFERENCES "McpConnection"("mcpConnectionId") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "McpToolExecutionLog" ADD CONSTRAINT "McpToolExecutionLog_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "McpToolExecutionLog" ADD CONSTRAINT "McpToolExecutionLog_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("agentId") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "McpToolExecutionLog" ADD CONSTRAINT "McpToolExecutionLog_mcpConnectionId_fkey" FOREIGN KEY ("mcpConnectionId") REFERENCES "McpConnection"("mcpConnectionId") ON DELETE CASCADE ON UPDATE CASCADE;

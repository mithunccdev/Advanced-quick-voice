"use client";

import { Loader2, PlugZap } from "lucide-react";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { useAttachMcpConnection, useMcpConnections } from "@/src/hooks/queries/mcp";
import type { AgentMcpConnection } from "@/src/lib/api/types";

export function McpPickerDialog({
  agentId,
  attachedConnections,
  open,
  onOpenChange,
}: {
  agentId: string;
  attachedConnections: AgentMcpConnection[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { data: connections = [], isLoading } = useMcpConnections();
  const attach = useAttachMcpConnection(agentId);
  const attachedIds = new Set(attachedConnections.map((item) => item.mcpConnectionId));
  const available = connections.filter((connection) => !attachedIds.has(connection.mcpConnectionId));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add MCP connection</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading connections...</p>
          ) : !available.length ? (
            <p className="text-sm text-muted-foreground">
              No available MCP connections. Connect one from the MCP marketplace first.
            </p>
          ) : (
            available.map((connection) => (
              <div key={connection.mcpConnectionId} className="flex items-center gap-3 border p-3">
                <div className="flex size-9 shrink-0 items-center justify-center border bg-primary/10 text-primary">
                  <PlugZap className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-medium">{connection.displayName}</p>
                    <Badge variant={connection.status === "CONNECTED" ? "secondary" : "outline"}>
                      {connection.status.replace("_", " ")}
                    </Badge>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {(connection.tools?.length ?? 0)} tools · {connection.mcpUrl}
                  </p>
                </div>
                <Button
                  size="sm"
                  disabled={connection.status !== "CONNECTED" || attach.isPending}
                  onClick={() =>
                    attach.mutate(connection.mcpConnectionId, {
                      onSuccess: () => onOpenChange(false),
                    })
                  }
                >
                  {attach.isPending && attach.variables === connection.mcpConnectionId ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <PlugZap className="size-4" />
                  )}
                  Attach
                </Button>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

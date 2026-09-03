"use client";

import React, { useMemo } from "react";
import { toast } from "sonner";
import { ConversationFlowBuilder } from "@/src/components/agents/flow/ConversationFlowBuilder";
import { ConversationFlow, DEFAULT_SAMPLE_FLOW } from "@/src/components/agents/flow/types";
import { useAgentConfig, useSaveAgentConfig } from "@/src/hooks/queries/agents";
import { Skeleton } from "@/src/components/ui/skeleton";

export function FlowTab({ agentId }: { agentId: string }) {
  const { data: config, isLoading } = useAgentConfig(agentId);
  const save = useSaveAgentConfig(agentId);

  // Extract saved flow from agent variables/metadata if present, else use default sample flow
  const initialFlow = useMemo<ConversationFlow>(() => {
    if (!config?.variables) return DEFAULT_SAMPLE_FLOW;
    try {
      const vars = typeof config.variables === "string" ? JSON.parse(config.variables) : config.variables;
      if (vars?.conversation_flow) {
        return vars.conversation_flow;
      }
    } catch {
      // ignore
    }
    return DEFAULT_SAMPLE_FLOW;
  }, [config?.variables]);

  const handleSaveFlow = async (flow: ConversationFlow) => {
    try {
      let existingVars: Record<string, any> = {};
      if (config?.variables) {
        try {
          existingVars = typeof config.variables === "string" ? JSON.parse(config.variables) : config.variables;
        } catch {
          existingVars = {};
        }
      }

      const updatedVariables = {
        ...existingVars,
        conversation_flow: flow,
      };

      await save.mutateAsync({
        variables: updatedVariables,
      });
      toast.success("Conversation Flow saved successfully!");
    } catch (err: any) {
      toast.error(err?.message || "Failed to save flow.");
    }
  };

  const handleSyncPrompt = async (generatedPromptText: string) => {
    try {
      const currentPrompt = config?.systemPrompt || "";
      let newPrompt = currentPrompt;

      // If instructions section already exists, replace it, otherwise append
      const marker = "### Conversation Flow & State Machine Instructions";
      if (currentPrompt.includes(marker)) {
        const parts = currentPrompt.split(marker);
        newPrompt = `${parts[0].trim()}\n\n${generatedPromptText}`;
      } else {
        newPrompt = `${currentPrompt.trim()}\n\n${generatedPromptText}`;
      }

      await save.mutateAsync({
        systemPrompt: newPrompt,
      });
      toast.success("Agent system prompt updated with the conversation flow state machine!");
    } catch (err: any) {
      toast.error(err?.message || "Failed to sync prompt.");
    }
  };

  if (isLoading) {
    return (
      <div className="border bg-card p-6 space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="border bg-card p-6">
      <ConversationFlowBuilder
        agentId={agentId}
        initialFlow={initialFlow}
        onSaveFlow={handleSaveFlow}
        onSyncPrompt={handleSyncPrompt}
      />
    </div>
  );
}

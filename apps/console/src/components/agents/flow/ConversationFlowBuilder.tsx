"use client";

import React, { useState } from "react";
import {
  Plus,
  Save,
  Trash2,
  PhoneForwarded,
  PhoneOff,
  GitBranch,
  HelpCircle,
  Play,
  Wrench,
  MessageSquare,
  Sparkles,
  Download,
  Upload,
  Check,
  ArrowRight,
  Settings2,
  Info,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card";
import {
  ConversationFlow,
  FlowNode,
  FlowNodeType,
  DEFAULT_SAMPLE_FLOW,
} from "./types";

interface Props {
  agentId: string;
  initialFlow?: ConversationFlow;
  onSaveFlow?: (flow: ConversationFlow) => void;
  onSyncPrompt?: (generatedPromptText: string) => void;
}

const NODE_CONFIG: Record<
  FlowNodeType,
  {
    label: string;
    icon: React.ElementType;
    color: string;
    bg: string;
    border: string;
    textColor: string;
  }
> = {
  start: {
    label: "Start / Greeting",
    icon: Play,
    color: "bg-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    textColor: "text-blue-600 dark:text-blue-400",
  },
  question: {
    label: "Question / Data Collection",
    icon: HelpCircle,
    color: "bg-purple-500",
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
    textColor: "text-purple-600 dark:text-purple-400",
  },
  condition: {
    label: "Condition / Branch",
    icon: GitBranch,
    color: "bg-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    textColor: "text-amber-600 dark:text-amber-400",
  },
  action: {
    label: "Tool / API Action",
    icon: Wrench,
    color: "bg-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    textColor: "text-emerald-600 dark:text-emerald-400",
  },
  transfer: {
    label: "Warm Call Transfer",
    icon: PhoneForwarded,
    color: "bg-rose-500",
    bg: "bg-rose-500/10",
    border: "border-rose-500/30",
    textColor: "text-rose-600 dark:text-rose-400",
  },
  message: {
    label: "Statement / Info",
    icon: MessageSquare,
    color: "bg-indigo-500",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/30",
    textColor: "text-indigo-600 dark:text-indigo-400",
  },
  end: {
    label: "End Call",
    icon: PhoneOff,
    color: "bg-slate-500",
    bg: "bg-slate-500/10",
    border: "border-slate-500/30",
    textColor: "text-slate-600 dark:text-slate-400",
  },
};

export function ConversationFlowBuilder({
  agentId,
  initialFlow = DEFAULT_SAMPLE_FLOW,
  onSaveFlow,
  onSyncPrompt,
}: Props) {
  const [flow, setFlow] = useState<ConversationFlow>(initialFlow);
  const [selectedNode, setSelectedNode] = useState<FlowNode | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newNodeType, setNewNodeType] = useState<FlowNodeType>("question");

  const handleSelectNode = (node: FlowNode) => {
    setSelectedNode({ ...node });
    setIsEditing(true);
  };

  const handleSaveNode = () => {
    if (!selectedNode) return;
    setFlow((prev) => ({
      ...prev,
      nodes: prev.nodes.map((n) => (n.id === selectedNode.id ? selectedNode : n)),
      updatedAt: new Date().toISOString(),
    }));
    setIsEditing(false);
    toast.success("Node configuration updated.");
  };

  const handleDeleteNode = (nodeId: string) => {
    setFlow((prev) => ({
      ...prev,
      nodes: prev.nodes
        .filter((n) => n.id !== nodeId)
        .map((n) => ({
          ...n,
          nextNodes: n.nextNodes?.filter((id) => id !== nodeId) || [],
        })),
      updatedAt: new Date().toISOString(),
    }));
    if (selectedNode?.id === nodeId) {
      setSelectedNode(null);
      setIsEditing(false);
    }
    toast.info("Node removed from flow.");
  };

  const handleAddNode = () => {
    const id = `node_${Date.now()}`;
    const count = flow.nodes.length;
    const newNode: FlowNode = {
      id,
      type: newNodeType,
      title: `Step ${count + 1}: ${NODE_CONFIG[newNodeType].label}`,
      description: "Define step behavior",
      data: {
        message: "",
      },
      position: { x: 100 + (count % 3) * 300, y: 150 + Math.floor(count / 3) * 200 },
      nextNodes: [],
    };

    setFlow((prev) => ({
      ...prev,
      nodes: [...prev.nodes, newNode],
      updatedAt: new Date().toISOString(),
    }));
    setShowAddModal(false);
    setSelectedNode(newNode);
    setIsEditing(true);
    toast.success(`Added new ${NODE_CONFIG[newNodeType].label} step.`);
  };

  const handleConnectNode = (targetNodeId: string) => {
    if (!selectedNode || selectedNode.id === targetNodeId) return;
    const currentNext = selectedNode.nextNodes || [];
    const alreadyConnected = currentNext.includes(targetNodeId);

    const updatedNext = alreadyConnected
      ? currentNext.filter((id) => id !== targetNodeId)
      : [...currentNext, targetNodeId];

    const updatedNode = { ...selectedNode, nextNodes: updatedNext };
    setSelectedNode(updatedNode);
    setFlow((prev) => ({
      ...prev,
      nodes: prev.nodes.map((n) => (n.id === updatedNode.id ? updatedNode : n)),
      updatedAt: new Date().toISOString(),
    }));
  };

  /**
   * Translates the visual node graph into structured system prompt guidelines
   */
  const generatePromptFromFlow = () => {
    let lines = ["### Conversation Flow & State Machine Instructions", ""];
    lines.push("Follow these structured states sequentially during the phone call:");

    flow.nodes.forEach((n, idx) => {
      const cfg = NODE_CONFIG[n.type];
      lines.push(`\n**State ${idx + 1}: [${cfg.label.toUpperCase()}] "${n.title}"**`);
      if (n.data.message) lines.push(`- Goal/Message: "${n.data.message}"`);
      if (n.data.variableName) {
        lines.push(
          `- Collect variable: {{${n.data.variableName}}} (type: ${n.data.expectedType || "text"}). Validation rule: ${n.data.validationRule || "Must be verified"}.`
        );
      }
      if (n.data.conditionField) {
        lines.push(
          `- Branch condition: If ${n.data.conditionField} ${n.data.conditionOperator || "matches"} "${n.data.conditionValue}", proceed to related branches.`
        );
      }
      if (n.data.toolName) {
        lines.push(`- Execute Tool: Call "${n.data.toolName}" before progressing.`);
      }
      if (n.data.transferDestination) {
        lines.push(
          `- Warm Transfer Action: When triggered, dial destination ${n.data.transferDestination} using prompt: "${n.data.transferPrompt}".`
        );
      }
      if (n.data.endSummary) {
        lines.push(`- Termination: Conclude conversation and hang up gracefully.`);
      }

      if (n.nextNodes && n.nextNodes.length > 0) {
        const nextTitles = n.nextNodes
          .map((id) => flow.nodes.find((item) => item.id === id)?.title || id)
          .join(", ");
        lines.push(`- Next valid step(s): ${nextTitles}`);
      }
    });

    return lines.join("\n");
  };

  const handleSyncToPrompt = () => {
    const promptInstructions = generatePromptFromFlow();
    if (onSyncPrompt) {
      onSyncPrompt(promptInstructions);
    }
    navigator.clipboard.writeText(promptInstructions);
    toast.success("Flow converted to prompt logic and copied to clipboard!");
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(flow, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `agent-${agentId}-conversation-flow.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    toast.success("Flow exported as JSON.");
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold tracking-tight">{flow.name}</h2>
            <Badge variant="outline" className="text-xs">
              {flow.nodes.length} Steps
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Design deterministic conversation paths, slot-filling validations, and conditional logic.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowAddModal(true)}
            className="gap-1.5 text-xs"
          >
            <Plus className="size-3.5" /> Add Step
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={handleSyncToPrompt}
            className="gap-1.5 text-xs text-primary border-primary/30"
          >
            <Sparkles className="size-3.5" /> Sync to Prompt
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={handleExportJSON}
            className="gap-1.5 text-xs"
          >
            <Download className="size-3.5" /> Export JSON
          </Button>

          <Button
            size="sm"
            onClick={() => {
              if (onSaveFlow) onSaveFlow(flow);
              toast.success("Conversation flow state saved!");
            }}
            className="gap-1.5 text-xs"
          >
            <Save className="size-3.5" /> Save Flow
          </Button>
        </div>
      </div>

      {/* Visual Canvas */}
      <div className="border rounded-xl bg-muted/20 p-6 min-h-[480px] overflow-x-auto relative">
        <div className="flex flex-wrap items-start gap-8 min-w-[720px]">
          {flow.nodes.map((node, index) => {
            const cfg = NODE_CONFIG[node.type];
            const Icon = cfg.icon;
            const isSelected = selectedNode?.id === node.id;

            return (
              <div
                key={node.id}
                onClick={() => handleSelectNode(node)}
                className={`relative group w-72 rounded-xl border bg-card p-4 shadow-sm transition-all cursor-pointer hover:shadow-md hover:border-primary/50 ${
                  isSelected ? "ring-2 ring-primary border-primary shadow-md" : cfg.border
                }`}
              >
                {/* Step Badge */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${cfg.bg} ${cfg.textColor}`}
                  >
                    <Icon className="size-3" /> {cfg.label}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    #{index + 1}
                  </span>
                </div>

                {/* Node Title */}
                <h4 className="font-semibold text-sm text-foreground truncate">{node.title}</h4>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {node.data.message || node.description || "Click to configure step..."}
                </p>

                {/* Slot or Action details */}
                {node.data.variableName && (
                  <div className="mt-3 p-1.5 bg-muted/50 rounded text-[11px] font-mono flex items-center justify-between text-muted-foreground">
                    <span>Collect:</span>
                    <span className="text-purple-600 dark:text-purple-400 font-semibold">
                      {`{{${node.data.variableName}}}`}
                    </span>
                  </div>
                )}

                {node.data.toolName && (
                  <div className="mt-3 p-1.5 bg-emerald-500/10 rounded text-[11px] font-mono flex items-center justify-between text-emerald-600 dark:text-emerald-400">
                    <span>Tool:</span>
                    <span className="font-semibold truncate">{node.data.toolName}</span>
                  </div>
                )}

                {node.data.transferDestination && (
                  <div className="mt-3 p-1.5 bg-rose-500/10 rounded text-[11px] font-mono flex items-center justify-between text-rose-600 dark:text-rose-400">
                    <span>Transfer:</span>
                    <span className="font-semibold truncate">{node.data.transferDestination}</span>
                  </div>
                )}

                {/* Next Steps Indicator */}
                <div className="mt-4 pt-2.5 border-t flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>Connects to:</span>
                  <span className="font-medium text-foreground">
                    {node.nextNodes && node.nextNodes.length > 0
                      ? `${node.nextNodes.length} step(s)`
                      : "End of branch"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Step Dialog */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Conversation Step</DialogTitle>
            <DialogDescription>
              Choose the type of node to insert into your conversational state machine.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-3 py-4">
            {(Object.keys(NODE_CONFIG) as FlowNodeType[]).map((type) => {
              const cfg = NODE_CONFIG[type];
              const Icon = cfg.icon;
              const isSelected = newNodeType === type;

              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setNewNodeType(type)}
                  className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-all ${
                    isSelected
                      ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                      : "border-border hover:border-primary/40 hover:bg-muted/30"
                  }`}
                >
                  <div className={`p-2 rounded-md ${cfg.bg} ${cfg.textColor}`}>
                    <Icon className="size-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-foreground truncate">{cfg.label}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddNode}>Add to Flow</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Node Edit Drawer / Dialog */}
      {selectedNode && (
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs uppercase">
                  {NODE_CONFIG[selectedNode.type].label}
                </Badge>
              </div>
              <DialogTitle className="mt-1">Edit Step Configuration</DialogTitle>
              <DialogDescription>
                Define the messages, variable extractions, or tools executed during this state.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-3">
              <div className="space-y-1.5">
                <Label htmlFor="stepTitle">Step Title</Label>
                <Input
                  id="stepTitle"
                  value={selectedNode.title}
                  onChange={(e) =>
                    setSelectedNode((p) => (p ? { ...p, title: e.target.value } : null))
                  }
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="stepMessage">Agent Speech / Prompt Guidance</Label>
                <Textarea
                  id="stepMessage"
                  rows={3}
                  placeholder="What the agent says or explains at this step..."
                  value={selectedNode.data.message || ""}
                  onChange={(e) =>
                    setSelectedNode((p) =>
                      p
                        ? {
                            ...p,
                            data: { ...p.data, message: e.target.value },
                          }
                        : null
                    )
                  }
                />
              </div>

              {/* Question / Slot collection specifics */}
              {selectedNode.type === "question" && (
                <div className="space-y-3 p-3 bg-muted/40 rounded-lg border">
                  <div className="space-y-1.5">
                    <Label htmlFor="varName" className="text-xs">
                      Variable Name (Slot to Fill)
                    </Label>
                    <Input
                      id="varName"
                      placeholder="e.g. customer_name, account_id"
                      value={selectedNode.data.variableName || ""}
                      onChange={(e) =>
                        setSelectedNode((p) =>
                          p
                            ? {
                                ...p,
                                data: { ...p.data, variableName: e.target.value },
                              }
                            : null
                        )
                      }
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="varType" className="text-xs">
                      Data Type
                    </Label>
                    <Select
                      value={selectedNode.data.expectedType || "text"}
                      onValueChange={(val: any) =>
                        setSelectedNode((p) =>
                          p
                            ? {
                                ...p,
                                data: { ...p.data, expectedType: val },
                              }
                            : null
                        )
                      }
                    >
                      <SelectTrigger id="varType" className="h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Text / Name</SelectItem>
                        <SelectItem value="number">Number / Digits</SelectItem>
                        <SelectItem value="email">Email Address</SelectItem>
                        <SelectItem value="phone">Phone Number</SelectItem>
                        <SelectItem value="date">Date & Time</SelectItem>
                        <SelectItem value="boolean">Yes / No (Boolean)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Action / Tool specifics */}
              {selectedNode.type === "action" && (
                <div className="space-y-2 p-3 bg-muted/40 rounded-lg border">
                  <Label htmlFor="toolSelect" className="text-xs">
                    Tool to Execute
                  </Label>
                  <Input
                    id="toolSelect"
                    placeholder="e.g. book_appointment, check_balance"
                    value={selectedNode.data.toolName || ""}
                    onChange={(e) =>
                      setSelectedNode((p) =>
                        p ? { ...p, data: { ...p.data, toolName: e.target.value } } : null
                      )
                    }
                  />
                </div>
              )}

              {/* Transfer specifics */}
              {selectedNode.type === "transfer" && (
                <div className="space-y-3 p-3 bg-rose-500/10 rounded-lg border border-rose-500/20">
                  <div className="space-y-1">
                    <Label htmlFor="destNum" className="text-xs">
                      Escalation Phone Number or SIP URI
                    </Label>
                    <Input
                      id="destNum"
                      placeholder="+18005550199 or sip:support@pbx.com"
                      value={selectedNode.data.transferDestination || ""}
                      onChange={(e) =>
                        setSelectedNode((p) =>
                          p
                            ? {
                                ...p,
                                data: { ...p.data, transferDestination: e.target.value },
                              }
                            : null
                        )
                      }
                    />
                  </div>
                </div>
              )}

              {/* Connections */}
              <div className="space-y-2 pt-2 border-t">
                <Label className="text-xs">Connect to Next Step(s):</Label>
                <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
                  {flow.nodes
                    .filter((n) => n.id !== selectedNode.id)
                    .map((other) => {
                      const isConnected = selectedNode.nextNodes?.includes(other.id);
                      return (
                        <button
                          key={other.id}
                          type="button"
                          onClick={() => handleConnectNode(other.id)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs border transition-all ${
                            isConnected
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-background text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          {isConnected && <Check className="size-3" />}
                          {other.title}
                        </button>
                      );
                    })}
                </div>
              </div>
            </div>

            <DialogFooter className="flex items-center justify-between sm:justify-between">
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => handleDeleteNode(selectedNode.id)}
                className="gap-1.5 text-xs"
              >
                <Trash2 className="size-3.5" /> Delete
              </Button>
              <Button type="button" size="sm" onClick={handleSaveNode}>
                Apply Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

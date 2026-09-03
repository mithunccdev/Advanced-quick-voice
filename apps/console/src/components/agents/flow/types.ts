export type FlowNodeType =
  | "start"
  | "message"
  | "question"
  | "condition"
  | "action"
  | "transfer"
  | "end";

export interface FlowNode {
  id: string;
  type: FlowNodeType;
  title: string;
  description?: string;
  data: {
    message?: string;
    variableName?: string;
    expectedType?: "text" | "number" | "email" | "phone" | "date" | "boolean";
    validationRule?: string;
    conditionField?: string;
    conditionOperator?: "equals" | "contains" | "greater_than" | "less_than" | "matches_intent";
    conditionValue?: string;
    toolName?: string;
    toolParams?: Record<string, string>;
    transferDestination?: string;
    transferPrompt?: string;
    endSummary?: boolean;
    hangupReason?: string;
  };
  position: { x: number; y: number };
  nextNodes?: string[]; // IDs of connected following nodes
}

export interface ConversationFlow {
  id: string;
  name: string;
  description?: string;
  nodes: FlowNode[];
  entryNodeId: string;
  updatedAt: string;
}

export const DEFAULT_SAMPLE_FLOW: ConversationFlow = {
  id: "flow_default",
  name: "Support & Appointment Flow",
  description: "Greets caller, collects account details, branches based on intent, and books appointment or transfers to support.",
  entryNodeId: "node_1",
  updatedAt: new Date().toISOString(),
  nodes: [
    {
      id: "node_1",
      type: "start",
      title: "Call Start",
      description: "Welcome the caller and introduce the agent",
      data: {
        message: "Hello! Thanks for calling Apex Support. My name is Alex. How can I help you today?",
      },
      position: { x: 50, y: 150 },
      nextNodes: ["node_2"],
    },
    {
      id: "node_2",
      type: "question",
      title: "Identify Customer",
      description: "Collect caller's full name",
      data: {
        message: "May I please have your full name so I can pull up your file?",
        variableName: "customer_name",
        expectedType: "text",
        validationRule: "Must contain at least first and last name",
      },
      position: { x: 340, y: 150 },
      nextNodes: ["node_3"],
    },
    {
      id: "node_3",
      type: "condition",
      title: "Branch on Intent",
      description: "Evaluate user goal: Appointment vs Support escalation",
      data: {
        conditionField: "user_intent",
        conditionOperator: "matches_intent",
        conditionValue: "Schedule Appointment",
      },
      position: { x: 630, y: 150 },
      nextNodes: ["node_4", "node_5"],
    },
    {
      id: "node_4",
      type: "action",
      title: "Book Appointment",
      description: "Check availability & book slot via Calendar tool",
      data: {
        toolName: "book_calendar_slot",
        toolParams: { name: "{{customer_name}}", service: "Consultation" },
        message: "I found an opening for tomorrow at 2:00 PM. Shall I confirm that for you?",
      },
      position: { x: 920, y: 70 },
      nextNodes: ["node_6"],
    },
    {
      id: "node_5",
      type: "transfer",
      title: "Warm Transfer to Human",
      description: "Escalate to live support specialist",
      data: {
        transferDestination: "+18005550199",
        transferPrompt: "I'm transferring you directly to a senior support specialist. Please hold for just a moment.",
      },
      position: { x: 920, y: 270 },
      nextNodes: [],
    },
    {
      id: "node_6",
      type: "end",
      title: "Conclude & Hang Up",
      description: "Send confirmation SMS and end call",
      data: {
        message: "Your appointment is confirmed! I've sent the details via SMS. Have a wonderful day!",
        endSummary: true,
        hangupReason: "Goal completed successfully",
      },
      position: { x: 1210, y: 70 },
      nextNodes: [],
    },
  ],
};

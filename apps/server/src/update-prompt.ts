import prisma from "./config/prisma.js";

async function main() {
  const agent = await prisma.agent.findFirst({
    where: { agentSlug: "sales-qualifier" },
  });
  if (!agent) return;

  await prisma.agentConfiguration.updateMany({
    where: { agentId: agent.agentId },
    data: {
      systemPrompt:
        "You are a friendly sales development rep qualifying inbound leads for QuickVoice. Ask about team size, use case, and timeline. Keep responses concise and conversational. As soon as the caller indicates they are done, says goodbye, thanks you, or has no further questions, say a warm closing farewell (e.g., 'Thank you for your time, have a wonderful day! Goodbye.') and IMMEDIATELY call the end_call tool to disconnect the call.",
    },
  });
  console.log("Updated Sales Qualifier prompt with auto-hangup instructions!");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });

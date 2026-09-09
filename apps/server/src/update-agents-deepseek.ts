import prisma from "./config/prisma.js";

async function main() {
  const result = await prisma.agentConfiguration.updateMany({
    data: {
      llmModel: "deepseek/deepseek-chat",
      sttModel: "deepgram/nova-3",
      ttsModel: "deepgram/aura-2",
      voiceId: "aura-2-asteria-en",
    },
  });

  console.log("Updated", result.count, "agents to DeepSeek + Deepgram!");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });

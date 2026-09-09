import prisma from "./config/prisma.js";

async function main() {
  const calls = await prisma.callLog.findMany({
    take: 5,
    orderBy: { startTime: "desc" },
    select: {
      callId: true,
      status: true,
      durationSeconds: true,
      callerId: true,
      direction: true,
      startTime: true,
      endTime: true,
      dataExtracted: true,
      transcripts: {
        select: {
          speaker: true,
          messageText: true,
        },
      },
    },
  });
  console.log("Recent Calls in DB:");
  console.log(JSON.stringify(calls, null, 2));
}

main().finally(async () => {
  await prisma.$disconnect();
});

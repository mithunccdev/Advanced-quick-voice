import prisma from "./config/prisma.js";
import { randomUUID } from "node:crypto";

async function main() {
  const number = "+918065356663";
  const org = await prisma.organization.findFirst({
    where: { slug: "quickvoice-admin" },
  });
  const agent = await prisma.agent.findFirst({
    where: { agentSlug: "sales-qualifier" },
  });
  const user = await prisma.user.findUnique({
    where: { email: "admin@quickvoice.ai" },
  });

  if (!org || !agent || !user) {
    console.error("Missing org, agent or user");
    return;
  }

  let existing = await prisma.phoneNumber.findFirst({ where: { number } });
  if (existing) {
    existing = await prisma.phoneNumber.update({
      where: { phId: existing.phId },
      data: {
        agentId: agent.agentId,
        billingStatus: "ACTIVE",
      },
    });
    console.log(
      "Updated existing number:",
      existing.number,
      "assigned to agent:",
      agent.name
    );
  } else {
    existing = await prisma.phoneNumber.create({
      data: {
        phId: randomUUID(),
        number,
        organizationId: org.id,
        userId: user.id,
        agentId: agent.agentId,
        sid: "VOBIZ_DID_918065356663",
        friendlyName: "Vobiz Primary (+918065356663)",
        provider: "VOBIZ",
        billingStatus: "ACTIVE",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    console.log(
      "Created number:",
      existing.number,
      "assigned to agent:",
      agent.name
    );
  }
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });

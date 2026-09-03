import { Prisma } from "../../../prisma/generated/prisma/client.js";
import prisma from "../../config/prisma.js";

const analyticsSelect = {
  callId: true,
  agentId: true,
  startTime: true,
  durationSeconds: true,
  status: true,
  direction: true,
} satisfies Prisma.CallLogSelect;

export const listAnalyticsCalls = async ({
  organizationId,
  from,
  to,
}: {
  organizationId: string;
  from: Date;
  to: Date;
}) => {
  return prisma.callLog.findMany({
    where: {
      organizationId,
      deleted: false,
      startTime: {
        gte: from,
        lt: to,
      },
    },
    select: analyticsSelect,
    orderBy: [{ startTime: "asc" }, { callId: "asc" }],
  });
};

export const listRecentCalls = async (organizationId: string) => {
  return prisma.callLog.findMany({
    where: {
      organizationId,
      deleted: false,
    },
    orderBy: [{ startTime: "desc" }, { callId: "desc" }],
    take: 10,
  });
};

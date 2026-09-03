-- AlterTable
ALTER TABLE "AgentConfiguration" ADD COLUMN     "preemptive_generation" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "timezone" TEXT NOT NULL DEFAULT 'UTC';

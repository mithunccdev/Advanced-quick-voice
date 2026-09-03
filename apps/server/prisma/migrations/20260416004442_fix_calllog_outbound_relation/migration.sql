/*
  Warnings:

  - A unique constraint covering the columns `[callLogId]` on the table `OutboundCall` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "OutboundCall" ADD COLUMN     "callLogId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "OutboundCall_callLogId_key" ON "OutboundCall"("callLogId");

-- AddForeignKey
ALTER TABLE "OutboundCall" ADD CONSTRAINT "OutboundCall_callLogId_fkey" FOREIGN KEY ("callLogId") REFERENCES "CallLog"("callId") ON DELETE SET NULL ON UPDATE CASCADE;

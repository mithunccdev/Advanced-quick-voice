import "dotenv/config";
import bcrypt from "bcryptjs";
import { randomUUID } from "node:crypto";
import prisma from "../src/config/prisma.js";

async function main() {
  const email = "admin@quickvoice.com";
  const password = "adminpassword123";
  const hashedPassword = await bcrypt.hash(password, 10);
  const name = "Admin User";
  const orgName = "Admin Organization";
  const orgSlug = "admin-org";

  console.log(`Checking existing user with email ${email}...`);
  let user = await prisma.user.findUnique({ where: { email } });

  const now = new Date();

  if (!user) {
    const userId = randomUUID();
    user = await prisma.user.create({
      data: {
        id: userId,
        name,
        email,
        emailVerified: true,
        role: "admin",
        createdAt: now,
        updatedAt: now,
      },
    });

    await prisma.account.create({
      data: {
        id: randomUUID(),
        accountId: userId,
        providerId: "credential",
        userId: user.id,
        password: hashedPassword,
        createdAt: now,
        updatedAt: now,
      },
    });
    console.log(`User created with ID: ${user.id}`);
  } else {
    console.log(`User ${email} already exists.`);
    await prisma.account.upsert({
      where: {
        providerId_accountId: {
          providerId: "credential",
          accountId: user.id,
        },
      },
      update: {
        password: hashedPassword,
      },
      create: {
        id: randomUUID(),
        accountId: user.id,
        providerId: "credential",
        userId: user.id,
        password: hashedPassword,
        createdAt: now,
        updatedAt: now,
      },
    });
  }

  // Ensure organization exists
  let org = await prisma.organization.findUnique({ where: { slug: orgSlug } });
  if (!org) {
    const orgId = randomUUID();
    org = await prisma.organization.create({
      data: {
        id: orgId,
        name: orgName,
        slug: orgSlug,
        createdAt: now,
        plan: "enterprise",
      },
    });
    console.log(`Organization created: ${org.name}`);
  }

  // Ensure Member relation exists
  const existingMember = await prisma.member.findUnique({
    where: {
      organizationId_userId: {
        organizationId: org.id,
        userId: user.id,
      },
    },
  });

  if (!existingMember) {
    await prisma.member.create({
      data: {
        id: randomUUID(),
        organizationId: org.id,
        userId: user.id,
        role: "owner",
        createdAt: now,
      },
    });
    console.log(`Member added as owner to ${org.name}`);
  }

  // Ensure BillingAccount exists
  try {
    const { ensureBillingAccount } = await import("../src/modules/billing/wallet-ledger.service.js");
    await ensureBillingAccount(org.id);
  } catch (err) {
    console.warn("Could not ensure billing account:", err);
  }

  console.log("-----------------------------------------");
  console.log("SUCCESS: Default Admin created successfully!");
  console.log(`Email:    ${email}`);
  console.log(`Password: ${password}`);
  console.log("-----------------------------------------");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

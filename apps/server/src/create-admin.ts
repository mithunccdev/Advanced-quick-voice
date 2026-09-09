import prisma from "./config/prisma.js";
import bcrypt from "bcryptjs";
import { randomUUID } from "node:crypto";

async function main() {
  const email = "admin@quickvoice.ai";
  const rawPassword = "Admin@QuickVoice2026!";
  const hashedPassword = await bcrypt.hash(rawPassword, 10);

  let user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    user = await prisma.user.create({
      data: {
        id: randomUUID().replace(/-/g, ""),
        name: "Main Administrator",
        email,
        emailVerified: true,
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    console.log("Created admin user:", user.id);
  } else {
    user = await prisma.user.update({
      where: { email },
      data: { emailVerified: true, role: "admin" },
    });
    console.log("Updated admin user:", user.id);
  }

  const account = await prisma.account.findFirst({
    where: { userId: user.id, providerId: "credential" },
  });

  if (!account) {
    await prisma.account.create({
      data: {
        id: randomUUID().replace(/-/g, ""),
        accountId: user.id,
        providerId: "credential",
        userId: user.id,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    console.log("Created credential account for admin");
  } else {
    await prisma.account.update({
      where: { id: account.id },
      data: { password: hashedPassword },
    });
    console.log("Updated admin password");
  }

  let org = await prisma.organization.findFirst({
    where: { slug: "quickvoice-admin" },
  });
  if (!org) {
    org = await prisma.organization.create({
      data: {
        id: randomUUID().replace(/-/g, ""),
        name: "QuickVoice Main Admin",
        slug: "quickvoice-admin",
        createdAt: new Date(),
      },
    });
    console.log("Created main organization:", org.name);
  }

  const member = await prisma.member.findFirst({
    where: { organizationId: org.id, userId: user.id },
  });
  if (!member) {
    await prisma.member.create({
      data: {
        id: randomUUID().replace(/-/g, ""),
        organizationId: org.id,
        userId: user.id,
        role: "owner",
        createdAt: new Date(),
      },
    });
    console.log("Added admin as owner in organization");
  }

  // Also make mithunaes@gmail.com an owner in this organization as well
  const mithunUser = await prisma.user.findUnique({
    where: { email: "mithunaes@gmail.com" },
  });
  if (mithunUser) {
    const mithunMember = await prisma.member.findFirst({
      where: { organizationId: org.id, userId: mithunUser.id },
    });
    if (!mithunMember) {
      await prisma.member.create({
        data: {
          id: randomUUID().replace(/-/g, ""),
          organizationId: org.id,
          userId: mithunUser.id,
          role: "owner",
          createdAt: new Date(),
        },
      });
      console.log("Added mithunaes@gmail.com as owner in organization");
    }
  }

  console.log("SUCCESS: Main Admin setup complete!");
}

main()
  .catch((err) => {
    console.error("Error creating admin:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });

import prisma from "./prisma";

async function ping() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("Database pinged to prevent pausing");
  } catch (err) {
    console.error("Ping failed:", err);
  } finally {
    await prisma.$disconnect();
  }
}

ping();

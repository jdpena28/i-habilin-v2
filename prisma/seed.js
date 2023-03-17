/* eslint-disable @typescript-eslint/no-var-requires */
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();
const seed = async () => {
  try {
    const start = Date.now();
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash("admin123", salt);
    const appMeta = await prisma.App_Meta.create({
      data: {
        key: "ADMIN_PASSWORD",
        value: hashPass,
      },
    });
    console.log(`App Meta created in ${Date.now() - start}ms`);
    console.log(appMeta);
  } catch (error) {
    console.log(error);
  }
};

prisma.$disconnect();

seed();

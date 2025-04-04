import { PrismaClient as PrismaDBPrimary } from "@prisma/client";
// import { PrismaClient as PrismaDBPrimary } from "../prisma/generated/db1";
// import { PrismaClient as PrismaDBSecondary } from "../prisma/generated/db2";

// const { PrismaClient: PrismaDBPrimary } = require("../prisma/generated/db1/index");
// const { PrismaClient: PrismaDBSecondary } = require("../prisma/generated/db2/index");

// const { PrismaClient: PrismaDBPrimary } = await import("../prisma/generated/db1/index");
// const { PrismaClient: PrismaDBSecondary } = await import("../prisma/generated/db2/index");


const prismaDBPrimary = new PrismaDBPrimary();
// const prismaDBSecondary = new PrismaDBSecondary();



export { prismaDBPrimary};
// module.exports = {
//     prismaDBPrimary,
//     prismaDBSecondary,
// };
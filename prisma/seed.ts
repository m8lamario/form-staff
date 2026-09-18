import { PrismaClient, StaffRole } from "@prisma/client";

const prisma = new PrismaClient();

const sample = [
  {
    firstName: "Giulia",
    lastName: "Ferrari",
    phone: "+39 333 1112233",
    email: "giulia.ferrari@example.com",
    participatedLastYear: true,
    role: StaffRole.FOTOGRAFIA,
  },
  {
    firstName: "Luca",
    lastName: "Bianchi",
    phone: "+39 347 4455667",
    email: "luca.bianchi@example.com",
    participatedLastYear: false,
    role: StaffRole.RACCHETTA_PALLE,
  },
  {
    firstName: "Sara",
    lastName: "Conti",
    phone: "+39 320 9988776",
    email: "sara.conti@example.com",
    participatedLastYear: true,
    role: StaffRole.SOCIAL,
  },
  {
    firstName: "Marco",
    lastName: "Esposito",
    phone: "+39 389 2211443",
    email: "marco.esposito@example.com",
    participatedLastYear: false,
    role: StaffRole.CASSA,
  },
  {
    firstName: "Elena",
    lastName: "Ricci",
    phone: "+39 331 7766554",
    email: "elena.ricci@example.com",
    participatedLastYear: false,
    role: StaffRole.INTERVISTE,
  },
  {
    firstName: "Davide",
    lastName: "Galli",
    phone: "+39 348 1122334",
    email: "davide.galli@example.com",
    participatedLastYear: true,
    role: StaffRole.BUTTA_FUORI,
  },
  {
    firstName: "Chiara",
    lastName: "Moretti",
    phone: "+39 366 5544332",
    email: "chiara.moretti@example.com",
    participatedLastYear: false,
    role: StaffRole.GIORNALE,
  },
  {
    firstName: "Andrea",
    lastName: "Romano",
    phone: "+39 340 7788991",
    email: "andrea.romano@example.com",
    participatedLastYear: true,
    role: StaffRole.RACCHETTA_PALLE,
  },
];

async function main() {
  for (const application of sample) {
    await prisma.staffApplication.upsert({
      where: { email: application.email },
      update: application,
      create: application,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

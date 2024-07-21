const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = bcrypt.hashSync('Tummycouch2', 10);

  const user = await prisma.utilisateur.upsert({
    where: { username: 'anishizi' },
    update: {},
    create: {
      nom: 'anis',
      prenom: 'hizi',
      username: 'anishizi',
      password: hashedPassword,
      role: 'ADMIN',
      permissions: {
        create: [
          { page: '/' },
          { page: '/GestionUtilisateur' },
          { page: '/Comptabilite' },
          { page: '/GestionPaie' },
          { page: '/Plantations' },
          { page: '/Irrigation' },
          { page: '/Automat' },
          { page: '/Message' },
          { page: '/Notification' },
          { page: '/NiveauBassin' },
          { page: '/TacheAFaire' },
          { page: '/Surveillance' },
          { page: '/Meteo' },
        ],
      },
    },
  });

  console.log('Created admin user:', user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

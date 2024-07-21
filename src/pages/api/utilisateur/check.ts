import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { nom, prenom } = req.query;

    try {
      const user = await prisma.utilisateur.findFirst({
        where: {
          nom: String(nom),
          prenom: String(prenom)
        }
      });

      res.status(200).json({ exists: Boolean(user) });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

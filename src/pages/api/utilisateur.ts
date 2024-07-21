import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Création d'un nouvel utilisateur
    const { nom, prenom, username, password, role, permissions } = req.body;

    if (!nom || !prenom || !username || !password || !role || !permissions) {
      return res.status(400).json({ error: 'Tous les champs sont requis.' });
    }

    // Vérifier si l'utilisateur avec le même username existe déjà
    try {
      const existingUser = await prisma.utilisateur.findUnique({
        where: { username }
      });

      if (existingUser) {
        return res.status(400).json({ error: 'Un utilisateur avec ce nom d\'utilisateur existe déjà.' });
      }

      // Hachage du mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);

      // Création de l'utilisateur
      const utilisateur = await prisma.utilisateur.create({
        data: {
          nom,
          prenom,
          username,
          password: hashedPassword,
          role,
          permissions: {
            create: permissions.map((page: string) => ({ page }))
          }
        }
      });

      res.status(201).json(utilisateur);
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur:', error);
      res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
    }
  } else if (req.method === 'GET') {
    // Récupération des détails d'un utilisateur ou de tous les utilisateurs
    const { id } = req.query;

    if (id) {
      try {
        const utilisateur = await prisma.utilisateur.findUnique({
          where: { id: Number(id) },
          include: { permissions: true }
        });

        if (utilisateur) {
          res.status(200).json(utilisateur);
        } else {
          res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur' });
      }
    } else {
      try {
        const utilisateurs = await prisma.utilisateur.findMany({
          include: { permissions: true }
        });
        res.status(200).json(utilisateurs);
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
      }
    }
  } else if (req.method === 'PUT') {
    // Mise à jour d'un utilisateur
    const { id, nom, prenom, username, password, role, permissions } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'L\'ID de l\'utilisateur est requis.' });
    }

    try {
      // Trouver l'utilisateur existant
      const existingUser = await prisma.utilisateur.findUnique({
        where: { id }
      });

      if (!existingUser) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
      }

      // Vérifier les doublons avec les nouvelles informations
      const duplicateUser = await prisma.utilisateur.findFirst({
        where: {
          AND: [
            { username: username },
            { NOT: { id: id } } // Exclure l'utilisateur actuel
          ]
        }
      });

      if (duplicateUser) {
        return res.status(400).json({ error: 'Un utilisateur avec ce nom d\'utilisateur existe déjà.' });
      }

      // Préparer les données de mise à jour
      const updateUserPayload: any = {
        nom,
        prenom,
        username,
        role,
        permissions: {
          deleteMany: {} // Supprimer les permissions existantes
        }
      };

      if (Array.isArray(permissions)) {
        updateUserPayload.permissions.create = permissions.map((page: string) => ({ page }));
      } else {
        updateUserPayload.permissions.create = [];
      }

      if (password) {
        // Hachage du nouveau mot de passe si fourni
        updateUserPayload.password = await bcrypt.hash(password, 10);
      }

      // Mise à jour de l'utilisateur
      const utilisateur = await prisma.utilisateur.update({
        where: { id },
        data: updateUserPayload
      });

      res.status(200).json(utilisateur);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
      res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur' });
    }
  } else if (req.method === 'DELETE') {
    // Suppression d'un utilisateur
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'L\'ID de l\'utilisateur est requis.' });
    }

    try {
      await prisma.permission.deleteMany({
        where: { utilisateurId: id }
      });

      await prisma.utilisateur.delete({
        where: { id }
      });

      res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
      res.status(500).json({ error: `Erreur lors de la suppression de l'utilisateur: ${error.message}` });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
    res.status(405).end(`Méthode ${req.method} non autorisée`);
  }
}

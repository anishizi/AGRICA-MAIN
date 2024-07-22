import NextAuth from 'next-auth';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Missing credentials');
        }

        const user = await prisma.utilisateur.findUnique({
          where: { username: credentials.username },
          include: { permissions: true }, // Include permissions
        });

        if (!user) {
          throw new Error('Nom d\'utilisateur incorrect');
        }

        const passwordValid = bcrypt.compareSync(credentials.password, user.password);

        if (!passwordValid) {
          throw new Error('Mot de passe incorrect');
        }

        const permissions = user.role === 'ADMIN' 
          ? ['/', '/GestionUtilisateur', '/Comptabilite', '/GestionPaie', '/Plantations', '/Irrigation', '/Automat', '/Message', '/Notification', '/NiveauBassin', '/TacheAFaire', '/Surveillance', '/Meteo']
          : user.permissions.map((p) => p.page);

        return {
          id: user.id,
          name: `${user.nom} ${user.prenom}`,
          email: user.username,
          role: user.role,
          permissions,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.permissions = token.permissions;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.permissions = user.permissions;
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);

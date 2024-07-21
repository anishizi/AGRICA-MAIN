import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials?.username || !credentials?.password) {
          console.log('Identifiants manquants');
          return null;
        }
        
        try {
          const user = await prisma.utilisateur.findUnique({
            where: { username: credentials.username },
          });

          if (!user) {
            console.log('Utilisateur non trouvé');
            return null;
          }

          const passwordValid = bcrypt.compareSync(credentials.password, user.password);
          
          if (passwordValid) {
            console.log('Utilisateur authentifié:', user);
            return {
              id: user.id,
              name: `${user.nom} ${user.prenom}`,
              email: user.username,
              role: user.role,
            };
          } else {
            console.log('Mot de passe invalide');
            return null;
          }
        } catch (error) {
          console.error('Erreur lors de la recherche de l\'utilisateur:', error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: true,
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
  },
});

import { prisma } from "@/libs/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { compareSync } from "bcrypt-ts";
import NextAuth from "next-auth/next";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials): Promise<any> => {
        const username = credentials?.username;
        const password = credentials?.password;

        const userFound = await prisma.user.findFirst({
          where: { username },
        });

        if (!userFound || !password)
          throw new Error("El usuario no fue encontrado");

        const matchPassword = await compareSync(password, userFound?.password);

        if (!matchPassword) throw new Error("La contraseña es incorrecta");

        return userFound;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        const { password, createdAt, updatedAt, ...userData } = user;
        token.user = userData;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

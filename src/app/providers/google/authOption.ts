import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: { prompt: "consent" },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token, user }) {
      if (session.user && token.email) {
        session.user.email = token.email as string;
      }
      // console.log({ session, user, token });
      return session;
    },
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/api/auth/setcookie`;
    },
  },
};

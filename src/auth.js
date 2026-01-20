import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Mock user database - in production, use a real database
const users = [
  {
    id: "1",
    email: "user@example.com",
    password: "password123", // Use plain password for demo
    name: "Test User"
  }
];

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Find user in mock database
        const user = users.find(u => u.email === credentials.email);

        if (!user) {
          return null;
        }

        // Plain password comparison (for demo only)
        if (credentials.password !== user.password) {
          return null;
        }

        // Return user object (without password)
        return {
          id: user.id,
          email: user.email,
          name: user.name
        };
      }
    })
  ],
  pages: {
    signIn: "/login"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.email = token.email;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
  session: {
    strategy: "jwt"
  }
});

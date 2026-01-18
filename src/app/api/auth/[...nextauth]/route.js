import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Mock user database
// Using plain comparison for demo - in production use bcryptjs
const users = [
  {
    id: "1",
    email: "user@example.com",
    password: "password123",
    name: "Test User"
  }
];

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log("Authorization attempt for:", credentials?.email);
        
        if (!credentials?.email || !credentials?.password) {
          console.log("Missing credentials");
          return null;
        }

        const user = users.find(u => u.email === credentials.email);

        if (!user) {
          console.log("User not found:", credentials.email);
          return null;
        }

        // Simple password comparison for demo
        if (credentials.password !== user.password) {
          console.log("Invalid password for user:", credentials.email);
          return null;
        }

        console.log("User authenticated successfully:", credentials.email);
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
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key-change-in-production"
});

export const GET = handler;
export const POST = handler;

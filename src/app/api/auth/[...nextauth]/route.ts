import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "demo@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // จำลองการตรวจสอบฐานข้อมูล (Mock Database Check)
        if (credentials?.email === "demo@example.com" && credentials?.password === "password") {
          return { id: "1", name: "คุณนัชชา ใจดี", email: "demo@example.com" };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/login', // เปลี่ยนหน้า Login เริ่มต้นไปที่หน้า /login ที่เราออกแบบเอง
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback_secret_for_local_development_only",
});

export { handler as GET, handler as POST };

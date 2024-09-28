import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { connectDB } from "@/util/database";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        id: { label: "id", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        let db = (await connectDB).db('NextCardZone');
        let user = await db.collection('user_cred').findOne({ id: credentials.id });
        if (!user) {
          console.log('해당 아이디 없음');
          return null;
        }
        const pwcheck = await bcrypt.compare(credentials.password, user.password);
        if (!pwcheck) {
          console.log('비밀번호 틀림');
          return null;
        }
        console.log('로그인 성공:', user.name);
        
        // 역할도 함께 반환합니다.
        return { id: user.id, name: user.name, email: user.email, role: user.role }; // role 추가
      }
    })
  ],
  
  session: {
    strategy: 'jwt',
    maxAge: 10 // 30일
  },
  
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = {
          name: user.name,
          email: user.email,
          role: user.role // 역할 추가
        };
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;  
      return session;
    },
  },

  secret: 'jworg9914#',
  adapter: MongoDBAdapter(connectDB)
};

export default NextAuth(authOptions);
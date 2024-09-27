import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { connectDB } from "@/util/database";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';

export const authOptions = {
  providers: [
   
    CredentialsProvider({
        //1. 로그인페이지 폼 자동생성해주는 코드 
        name: "credentials",
          credentials: {
            id: { label: "id", type: "text" },
            password: { label: "password", type: "password" },
            
        },
  
        //2. 로그인요청시 실행되는코드
        //직접 DB에서 아이디,비번 비교하고 
        //아이디,비번 맞으면 return 결과, 틀리면 return null 해야함
        async authorize(credentials) {
          let db = (await connectDB).db('NextCardZone');
          let user = await db.collection('user_cred').findOne({email : credentials.email})
          if (!user) {
            console.log('해당 이메일은 없음');
            return null
          }
          const pwcheck = await bcrypt.compare(credentials.password, user.password);
          if (!pwcheck) {
            console.log('비번틀림');
            return null
          }
          console.log('로그인 성공:', user.name);
              // user.name을 변수에 저장
        const userName = user.name; // 여기서 변수에 저장
        
        // 필요에 따라 user 객체를 수정하여 반환
        return { id: user._id, name: user.name, email: user.email }; // 또는 단순히 user를 반환할 수 있습니다.
        }
      })
    ],
  
    //3. jwt 써놔야 잘됩니다 + jwt 만료일설정
    session: {
      strategy: 'jwt',
      maxAge: 30 * 24 * 60 * 60 //30일
    },
  
  
    callbacks: {
        // jwt 콜백에 추가된 로그
jwt: async ({ token, user }) => {
    if (user) {
      token.user = {
        id: user.id,
        name: user.name,
        email: user.email
      };
    }
    console.log('JWT Token:', token); // 로그 추가
    return token;
  },
  
  // session 콜백에 추가된 로그
  session: async ({ session, token }) => {
    session.user = token.user;  
    console.log('Session Data:', session); // 로그 추가
    return session;
  },
      },
  
  secret : 'jworg9914#',
  adapter : MongoDBAdapter(connectDB)
};
export default NextAuth(authOptions); 



import { connectDB } from "@/util/database";
import bcrypt from 'bcrypt';

export default async function handler(요청, 응답) {
    if (요청.method == 'POST') {
        let hash = await bcrypt.hash(요청.body.password, 10);
        요청.body.password = hash;

        let db = (await connectDB).db('NextCardZone');
        await db.collection('user_cred').insertOne(요청.body);

        // 가입 성공 후 루트('/')로 리다이렉트
        응답.writeHead(302, { Location: '/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F' }); // 302 상태코드로 리다이렉트
        응답.end(); // 응답 종료
    } else {
        응답.status(405).json({ message: 'Method Not Allowed' });
    }
}
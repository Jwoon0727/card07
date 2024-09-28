import { connectDB } from "@/util/database";
import bcrypt from 'bcrypt';

export default async function handler(요청, 응답) {
    if (요청.method === 'POST') {
        const db = (await connectDB).db('NextCardZone');

        // 중복된 이름 체크
        const existingUser = await db.collection('user_cred').findOne({ name: 요청.body.name });
        if (existingUser) {
            return 응답.status(400).json({ message: '이미 존재하는 이름입니다.' });
        }

        // user_add 컬렉션에서 이름 확인
        const validName = await db.collection('user_add').findOne({ name: 요청.body.name });
        if (!validName) {
            return 응답.status(400).json({ message: '이름이 등록되어 있지 않습니다. 관리자에게 문의하세요.' });
        }

        // 비밀번호 해시화
        const hash = await bcrypt.hash(요청.body.password, 10);
        요청.body.password = hash;

        // 새 유저 추가
        await db.collection('user_cred').insertOne(요청.body);

        // 가입 성공 후 루트('/')로 리다이렉트
        응답.writeHead(302, { Location: '/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F' });
        응답.end();
    } else {
        응답.status(405).json({ message: 'Method Not Allowed' });
    }
}
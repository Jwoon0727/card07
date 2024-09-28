import { connectDB } from "@/util/database";
import bcrypt from 'bcrypt';

export default async function handler(요청, 응답) {
    if (요청.method == 'POST') {
        let db = (await connectDB).db('NextCardZone');

        // 중복된 이름 체크
        let existingUser = await db.collection('user_cred').findOne({ name: 요청.body.name });
        if (existingUser) {
            return 응답.status(400).json({ message: '이미 존재하는 이름입니다.' });
        }

        // 비밀번호 해시화
        let hash = await bcrypt.hash(요청.body.password, 10);
        요청.body.password = hash;

        // 새 유저 추가
        await db.collection('user_cred').insertOne(요청.body);

        // 가입 성공 메시지 전송
        응답.status(200).json({ message: '회원가입에 성공했습니다.' });
    } else {
        응답.status(405).json({ message: 'Method Not Allowed' });
    }
}
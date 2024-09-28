import { connectDB } from "@/util/database";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name } = req.body;

        // DB 연결
        const client = await connectDB;
        const db = client.db("NextCardZone");

        // 사용자 이름 추가
        await db.collection('user_add').insertOne({ name });

        // 성공적으로 추가된 후 응답
        res.status(201).json({ message: '유저 이름이 성공적으로 추가되었습니다.' });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
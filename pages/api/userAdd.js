import { connectDB } from "@/util/database";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name } = req.body;
        const db = (await connectDB).db("NextCardZone");

        // 중복된 이름 체크
        const existingUser = await db.collection('user_add').findOne({ name });
        if (existingUser) {
            return res.status(400).json({ message: '이미 존재하는 이름입니다.' });
        }

        // 유저 이름 추가
        await db.collection('user_add').insertOne({ name });

        // 성공 응답
        res.status(200).json({ message: '유저 이름이 추가되었습니다.' });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
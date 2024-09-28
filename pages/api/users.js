// pages/api/users.js
import { connectDB } from "@/util/database";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const client = await connectDB;
            const db = client.db("NextCardZone");
            const users = await db.collection('user_add').find().toArray();
            res.status(200).json(users); // 유저 목록 반환
        } catch (error) {
            res.status(500).json({ message: '서버 오류' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
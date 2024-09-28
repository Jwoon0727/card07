// pages/api/checkUser.js
import { connectDB } from '@/util/database';
import { getSession } from 'next-auth/react'; 

export default async function handler(req, res) {
    const session = await getSession({ req });
    if (!session) {
        return res.status(401).json({ message: '로그인되지 않았습니다.' });
    }

    const { name } = session.user;

    try {
        const client = await connectDB;
        const db = client.db('NextCardZone');

        const user = await db.collection('user_add').findOne({ name });
        
        if (user) {
            return res.status(200).json({ exists: true });
        } else {
            return res.status(404).json({ exists: false });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
}
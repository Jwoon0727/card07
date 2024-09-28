// pages/api/userDelete/[id].js
import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth/next'; 
import { authOptions } from '@/pages/api/auth/[...nextauth]'; 

export default async function handler(req, res) {
    if (req.method === 'DELETE') {
        const { id } = req.query;

        try {
            const client = await connectDB;
            const db = client.db('NextCardZone');

            const userToDelete = await db.collection('user_add').findOne({ _id: new ObjectId(id) });

            if (!userToDelete) {
                return res.status(404).json({ message: '유저를 찾을 수 없습니다.' });
            }

            const nameToDelete = userToDelete.name;

            await db.collection('user_cred').deleteMany({ name: nameToDelete });
            const result = await db.collection('user_add').deleteOne({ _id: new ObjectId(id) });

            if (result.deletedCount === 1) {
                const session = await getServerSession(req, res, authOptions);
                if (session && session.user.name === nameToDelete) {
                    // 삭제된 유저가 현재 세션의 유저와 일치하는 경우
                    res.status(200).json({ message: '유저와 관련된 정보가 삭제되었습니다. 로그아웃되었습니다.' });
                } else {
                    res.status(200).json({ message: '유저와 관련된 정보가 삭제되었습니다.' });
                }
            } else {
                res.status(404).json({ message: '유저를 찾을 수 없습니다.' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: '서버 오류가 발생했습니다.' });
        }
    } else {
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
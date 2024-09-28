// pages/api/userDelete/[id].js
import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
    if (req.method === 'DELETE') {
        const { id } = req.query;

        const client = await connectDB;
        const db = client.db('NextCardZone');

        const result = await db.collection('user_add').deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 1) {
            res.status(200).json({ message: '유저가 삭제되었습니다.' });
        } else {
            res.status(404).json({ message: '유저를 찾을 수 없습니다.' });
        }
    } else {
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
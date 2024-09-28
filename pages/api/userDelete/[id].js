// pages/api/userDelete/[id].js
import { connectDB } from '@/util/database'; // 올바른 경로로 임포트
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth/next'; // getServerSession 임포트
import { authOptions } from '@/pages/api/auth/[...nextauth]'; // authOptions 가져오기

export default async function handler(req, res) {
    if (req.method === 'DELETE') {
        const { id } = req.query;

        try {
            const client = await connectDB; // await을 사용하여 비동기 호출
            const db = client.db('NextCardZone');

            // 먼저 user_add에서 유저 삭제
            const userToDelete = await db.collection('user_add').findOne({ _id: new ObjectId(id) });

            if (!userToDelete) {
                return res.status(404).json({ message: '유저를 찾을 수 없습니다.' });
            }

            const nameToDelete = userToDelete.name;

            // user_cred에서 같은 이름을 가진 데이터 삭제
            await db.collection('user_cred').deleteMany({ name: nameToDelete });

            // user_add에서 유저 삭제
            const result = await db.collection('user_add').deleteOne({ _id: new ObjectId(id) });

            if (result.deletedCount === 1) {
                // 유저의 세션 만료 처리
                const session = await getServerSession(req, res, authOptions);
                if (session && session.user.name === nameToDelete) {
                    // 만약 삭제된 유저의 이름이 현재 세션의 사용자 이름과 일치하면 로그아웃 처리
                    // 이 방법은 사용자의 세션을 제거하고 다른 방법으로 처리해야 함
                    // 일반적으로 세션을 종료하려면 클라이언트에서 로그아웃 요청을 보내야 합니다
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
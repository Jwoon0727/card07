import { connectDB } from "@/util/database";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const zones = req.body; // 요청 본문에서 구역 데이터를 가져옵니다.

        const db = (await connectDB).db("NextCardZone");

        try {
            // 각 구역 데이터를 데이터베이스에 추가
            for (const zone of zones) {
                const { 구역번호, 지번, 세부정보 } = zone; // 각 구역에서 필요한 필드 추출

                const result = await db.collection('RegisterCard').insertOne({
                    구역번호,
                    지번,
                    세부정보,
                });
            }

            return res.status(200).json({ message: '구역이 성공적으로 등록되었습니다!' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: '구역 등록에 실패했습니다.' });
        }
    } else {
        // POST가 아닌 경우 405 상태 코드 반환
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
}
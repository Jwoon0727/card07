import { connectDB } from "@/util/database";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const zones = req.body; // 요청 본문에서 구역 배열 가져오기

        // 데이터 유효성 검사
        if (!Array.isArray(zones) || zones.length === 0) {
            return res.status(400).json({ message: '구역 데이터가 필요합니다.' });
        }

        const db = (await connectDB).db("NextCardZone");

        try {
            // 구역 문서 여러 개를 컬렉션에 삽입
            const result = await db.collection('RegisterCard').insertMany(zones.map(zone => ({
                구역번호: zone['구역번호'],
                지번: zone['지번'],
                세부정보: zone['세부정보'],
            })));
            return res.status(200).json({ message: '구역이 성공적으로 등록되었습니다!', result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: '구역 등록에 실패했습니다.' });
        }
    } else {
        return res.status(405).json({ message: '허용되지 않는 메서드입니다.' });
    }
}
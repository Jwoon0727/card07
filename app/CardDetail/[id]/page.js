import { connectDB } from "@/util/database";
import ClientNavbar from "@/app/components/ClientNavbar";

export default async function Detail(props) {
  const client = await connectDB;
  const db = client.db("NextCardZone");

  // URL 파라미터에서 구역번호를 가져온 후 숫자로 변환합니다.
  const zoneNumber = parseInt(props.params.id, 10); // 문자열을 숫자로 변환

  console.log("구역번호:", zoneNumber); // 구역번호 확인을 위한 콘솔 로그

  // 구역번호로 해당 데이터를 MongoDB에서 찾기
  const cards = await db.collection('RegisterCard').find({ 구역번호: zoneNumber }).toArray();

  console.log("조회된 카드 수:", cards.length); // 조회된 카드 수 확인

  return (
    <div>
      <ClientNavbar />
      
      {cards.length > 0 ? (
        <>
          <h4>구역번호: {zoneNumber}</h4>
          <h4>지번 및 세부정보 목록:</h4>
          {cards.map((card) => (
            <div key={card._id}>
              <h5>지번: {card.지번}</h5>
              <p>세부정보: {card.세부정보 || '정보 없음'}</p>
            </div>
          ))}
        </>
      ) : (
        <p>해당 구역번호에 대한 데이터가 없습니다.</p>
      )}
    </div>
  );
}
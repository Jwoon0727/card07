import ClientNavbar from './components/ClientNavbar'; // 클라이언트 컴포넌트 임포트
import dynamic from 'next/dynamic';
import { MongoClient } from "mongodb"
import { connectDB } from "@/util/database"

// KakaoMap을 동적으로 불러옵니다 (SSR 비활성화)
const KakaoMap = dynamic(() => import('./map/page'), { ssr: false });

export default async function Home() {

const client = await connectDB;
const db = client.db("NextCardZone")
let result = await db.collection('address').find().toArray();


console.log(result)
  return (
    <div>
      {/* <ClientNavbar /> */}
      {/* Kakao 지도 */}
      <KakaoMap />
    </div>
  );
}



import { connectDB } from "@/util/database";
import Link from "next/link";
import ClientNavbar from "../components/ClientNavbar";

export default async function List() {
  const client = await connectDB;
  const db = client.db("NextCardZone");
  let user = await db.collection('user_cred').find().toArray();

  return (
    <div>
        <ClientNavbar/>
    <div className="list-bg">
      {user.map((a, i) => (
        <div className="list-item" key={i}>
          <Link href={'/userInformation/' + a._id}>
            <h4>{a.name}</h4>
          </Link>
          <p>{user.date ? user.date : '날짜 없음'}</p>
        </div>
      ))}
    </div>
    </div>
  );
}
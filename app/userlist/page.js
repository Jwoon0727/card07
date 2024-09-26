import { connectDB } from "@/util/database";
import Link from "next/link";
import ClientNavbar from "../components/ClientNavbar";

export default async function List() {
  const client = await connectDB;
  const db = client.db("NextCardZone");
  let users = await db.collection('address').find().toArray();

  return (
    <div>
        <ClientNavbar/>
    <div className="list-bg">
      {users.map((user, index) => (
        <div className="list-item" key={index}>
          <Link href={'/detail/' + user._id}>
            <h4>{user.test}</h4>
          </Link>
          <p>{user.date ? user.date : '날짜 없음'}</p>
        </div>
      ))}
    </div>
    </div>
  );
}
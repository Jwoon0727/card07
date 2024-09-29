import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb"
import ClientNavbar from "@/app/components/ClientNavbar";

export default async function Detail(props) {


    const client = await connectDB;
    const db = client.db("NextCardZone")
    let user = await db.collection('address').findOne({_id : new ObjectId(props.params.id)}) //특정 조건 발동 findOne

    return (
      <div>
        <ClientNavbar/>
        
        <h4>{user.test}</h4>
        <h4>df</h4>
        <p>글내용</p>
      </div>
    )
  }

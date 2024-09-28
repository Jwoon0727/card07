import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb"
import ClientNavbar from "@/app/components/ClientNavbar";

export default async function userInformation(props) {


    const client = await connectDB;
    const db = client.db("NextCardZone")
    let user = await db.collection('user_cred').findOne({_id : new ObjectId(props.params.id)}) //특정 조건 발동 findOne

    return (
      <div>
        <ClientNavbar/>
        
        <h4>이름 : {user.name}</h4>
        <h4>아이디 : {user.id}</h4>
        <p>역할 : {user.role}</p>
      </div>
    )
  }

import dbConnect from "@/util/dbConnect";
import User from "@/models/User";


const handler=async(req,res)=>{
    await dbConnect();
    

    const {method}=req;

    if(method==="GET"){
        try {
            const users=await User.find();
            res.status(200).json(users)
        } catch (error) {
            console.log(error);
        }
    }

    if(method==="POST"){
        try {
            const newUsers=await User.create(req.body);
            res.status(200).json(newUsers)
        } catch (error) {
            console.log(error);
        }
    }
}

export default handler;
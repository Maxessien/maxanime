import { connect } from "mongoose"

export const connectMongoDb = async ()=>{
    await connect(process.env.MONGO_URI ?? "")
}
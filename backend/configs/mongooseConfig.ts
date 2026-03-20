import { connect } from "mongoose"

export const connectMongoDb = async ()=>{
    await connect('mongodb://127.0.0.1:27017/test')
}
import express from "express"
import showRoutes from "./routes/showRoutes.js"
import { connectMongoDb } from "./configs/mongooseConfig.js"
import cors from "cors"


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN ?? ""
}))

app.use(express.json())



let isUploading = false
//Boolean to prevent multiple upload writes at the same time
export const uploadState = {
    isUploading: (): boolean=> isUploading,
    setUploadState: (val: boolean): void=>{
        isUploading = val
    }
}

//Connect to mongodb
await connectMongoDb()

//Add routes here
app.use("/shows", showRoutes)


const port = process.env.PORT || 5050
app.listen(Number(port), "0.0.0.0", ()=>console.log("Server running on port", port))
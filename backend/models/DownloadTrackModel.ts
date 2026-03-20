import { model, Schema } from "mongoose";



const downloadTrackSchema = new Schema({
    index: Number,
    stopTime: Date,
    title: String,
})

export const DownloadTrackModel = model("DownloadTrackModel", downloadTrackSchema)
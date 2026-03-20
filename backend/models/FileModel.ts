import { randomUUID } from "crypto";
import { model, Schema } from "mongoose";


const fileSchema = new Schema({
    id: {type: String, default: ()=>randomUUID(), require: true},
    show: {type: String, require: true},
    episodes: [{
        snapshotUrl: String,
        title: String,
        episode: Number,
        releaseDate: Date,
        res: [{ quality: Number, url: String }]
    }]
}, {timestamps: true})

export const FileModel = model("FileModel", fileSchema)
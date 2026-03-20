import { randomUUID } from "crypto";
import { model } from "mongoose";
import { Schema } from "mongoose";

const releasesSchema = new Schema({
  showId: { type: String, required: true },
  releaseId: {
    type: String,
    default: () => randomUUID(),
    required: true,
    unique: true,
  },
  snapshotUrl: String,
  title: String,
  episode: Number,
  releaseDate: Date,
  res: [{ quality: Number, url: String }],
});

releasesSchema.index({showId: 1, episode: 1}, {unique: true})

export const ReleasesModel = model("ReleasesModel", releasesSchema);

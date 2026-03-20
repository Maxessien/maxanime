import { randomUUID } from "crypto";
import { model, Schema } from "mongoose";

const fileSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    show: { type: String, required: true },
    showImage: String,
  },
  { timestamps: true },
);

export const FileModel = model("FileModel", fileSchema);

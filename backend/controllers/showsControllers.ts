import type { Request, Response } from "express";
import { addFilesToCloud } from "../utils/addToCloud.js";
import { FileModel } from "../models/FileModel.js";
import { ReleasesModel } from "../models/ReleasesModel.js";
import { uploadState } from "../index.js";

interface AddNewShowBody {
  titles?: string[];
  range?: [number, number];
}

const escapeRegex = (value: string) => {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

const getShows = async (req: Request, res: Response) => {
  try {
    const query = typeof req.query.q === "string" ? req.query.q.trim() : "";

    const filter = query.length
      ? {
          show: {
            $regex: escapeRegex(query),
            $options: "i",
          },
        }
      : {};

    const shows = await FileModel.find(filter)
      .sort([["show", "asc"]])
      .lean();
    return res.status(200).json(shows);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "No files" });
  }
};


const getSpecificShow = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing id" });
    }

    const show = await FileModel.findOne({ id }).lean();
    const episodes = await ReleasesModel.find({ showId: show?.id ?? "" })
      .sort([["releaseDate", "desc"]])
      .lean();

    if (!show) {
      return res.status(404).json({ message: "No file found" });
    }

    return res.status(200).json({...show, episodes: episodes});
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "No file found" });
  }
};


const addNewShow = async (req: Request, res: Response) => {
  let lockAcquired = false;

  try {
    const { titles, range } = req.body as AddNewShowBody;

    if (
      !Array.isArray(titles) ||
      titles.length === 0 ||
      titles.some(
        (title) => typeof title !== "string" || title.trim().length === 0,
      )
    ) {
      return res
        .status(400)
        .json({ message: "titles must be a non-empty string array" });
    }

    if (
      !Array.isArray(range) ||
      range.length !== 2 ||
      !Number.isInteger(range[0]) ||
      !Number.isInteger(range[1]) ||
      range[0] < 1 ||
      range[1] < range[0]
    ) {
      return res
        .status(400)
        .json({
          message:
            "range must be a tuple [start, end] with valid positive integers",
        });
    }

    if (uploadState.isUploading()) {
      return res
        .status(400)
        .json({ message: "Another upload still in progress" });
    }

    uploadState.setUploadState(true);
    lockAcquired = true;

    addFilesToCloud(titles, range);

    return res
      .status(200)
      .json({
        message: "Operation started",
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to add shows" });
  } finally {
    if (lockAcquired) {
      uploadState.setUploadState(false);
    }
  }
};

export { getShows, getSpecificShow, addNewShow };

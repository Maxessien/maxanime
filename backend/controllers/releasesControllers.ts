import type { Request, Response } from "express";
import { ReleasesModel } from "../models/ReleasesModel.js";

const getLatestReleases = async (req: Request, res: Response) => {
  try {
    const shows = await ReleasesModel.find()
      .sort([["releaseDate", "desc"]])
      .limit(10)
      .lean();
    return res.status(200).json(shows);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "No files" });
  }
};

const getSpecificReleases = async (req: Request, res: Response) => {
  try {
    const shows = await ReleasesModel.findOne({id: req.params.id ?? ""})
      .lean();
    return res.status(200).json(shows);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "No files" });
  }
};


export {getLatestReleases, getSpecificReleases}
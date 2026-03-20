import { randomUUID } from "crypto";
import { stat } from "fs/promises";
import { join } from "path";
import { uploader } from "../configs/cloudinaryConfig.js";
import { FileModel } from "../models/FileModel.js";
import { ReleasesModel } from "../models/ReleasesModel.js";
import {
  convertInfoResObjToArr,
  downloadTorrent,
  ffmpeg,
  getShowsInfo,
} from "./downloadFiles.js";

interface FileEp {
  snapshotUrl: string;
  title?: string;
  episode: number;
  releaseDate: Date | string;
  res: { quality: number; url: string; sizeBytes: number }[];
  showId: string;
  releaseId?: string;
}

interface EpisodeUploadLookup {
  title: string;
  episode: number;
  showId?: string;
}

const isEpisodeUploaded = async ({
  title,
  episode,
  showId,
}: EpisodeUploadLookup): Promise<boolean> => {
  let resolvedShowId = showId;

  if (!resolvedShowId) {
    const existingShow = await FileModel.findOne({
      show: { $regex: `^${title.trim()}$`, $options: "i" },
    })
      .select({ id: 1, _id: 0 })
      .lean();

    resolvedShowId = existingShow?.id ?? undefined;
  }

  if (!resolvedShowId) {
    return false;
  }

  const existingEpisode = await ReleasesModel.exists({
    showId: resolvedShowId,
    episode,
  });

  return Boolean(existingEpisode);
};

const addFilesToCloud = async (titles: string[], range: [number, number]) => {
  try {
    for (const title of titles) {
      const showInfo = await getShowsInfo(title);
      const infoArr = convertInfoResObjToArr(showInfo.episode);
      const alreadyExists = await FileModel.findOne({ show: title }).lean();

      //Use show if already existing
      const newShowId =
        alreadyExists && alreadyExists?.id ? alreadyExists?.id : randomUUID();

      if (!alreadyExists || !alreadyExists.id) {
        await FileModel.create({
          show: title,
          id: newShowId,
          showImage: showInfo.image,
          description: showInfo.description ?? ""
        });
      }

      for (const [index, info] of infoArr
        .slice(range ? range[0] - 1 : 0, range ? range[1] : -1)
        .entries()) {
        const alreadyUploaded = await isEpisodeUploaded({
          title,
          episode: Number(info.episode),
          showId: newShowId,
        });

        if (alreadyUploaded) {
          console.log("Skipping already uploaded episode", {
            title,
            episode: Number(info.episode),
          });
          continue;
        }

        const releaseObj: FileEp = {
          snapshotUrl: "",
          title: info.show,
          episode: Number(info.episode),
          releaseDate: new Date(info.release_date),
          res: [],
          showId: newShowId,
        };
        console.log("Downloading", info.show);
        console.log("At index...", index + 1);

        for (const res of info.downloads) {
          if (Number(res.res) > 761) break;
          const filepath = await downloadTorrent(res.torrent);
          const { size } = await stat(filepath);

          const imgPath: string = await new Promise((resolve, reject) => {
            const uniqueId = randomUUID();
            const outPath = join(process.cwd(), `${uniqueId}.jpg`);
            ffmpeg(filepath)
              .screenshots({ count: 1, timemarks: ["00:02:00"] })
              .on("end", () => resolve(outPath))
              .on("error", reject)
              .output(outPath);
          });

          const fileupload = await uploader.upload(filepath);
          const imgupload = await uploader.upload(imgPath);

          if (!releaseObj.snapshotUrl.trim()) {
            releaseObj.snapshotUrl = imgupload.secure_url;
          }

          releaseObj.res.push({
            quality: Number(res.res),
            url: fileupload.secure_url,
            sizeBytes: size,
          });
        }

        if (releaseObj.res.length === 0) {
          continue;
        }
        await ReleasesModel.create(releaseObj);
      }
    }
  } catch (err) {
    console.error("Failed to add files to cloud", err);
    throw err;
  }
};

export { addFilesToCloud, isEpisodeUploaded };


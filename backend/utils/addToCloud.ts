import { randomUUID } from "crypto";
import { join } from "path";
import { uploader } from "../configs/cloudinaryConfig.js";
import { FileModel } from "../models/FileModel.js";
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
  res: { quality: number; url: string }[];
}

interface FileDb {
  show: string;
  episodes: FileEp[];
}

const addFilesToCloud = async (titles: string[], range?: [number, number]) => {
  try {
    for (const title of titles) {
      const showInfo = await getShowsInfo(title);
      const infoArr = convertInfoResObjToArr(showInfo.episode);

      const fileObj: FileDb = {
        show: title,
        episodes: [],
      };

      for (const [index, info] of infoArr
        .slice(range ? range[0] - 1 : 0, range ? range[1] : -1)
        .entries()) {
        fileObj.show = info.show;

        const episode: FileEp = {
          title: info.show,
          episode: Number(info.episode),
          releaseDate: info.release_date,
          res: [],
          snapshotUrl: "",
        };
        console.log("Downloading", info.show);
        console.log("At index...", index + 1);

        for (const res of info.downloads) {
          if (Number(res.res) > 761) break;
          const filepath = await downloadTorrent(res.torrent);

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

          if (!episode.snapshotUrl.trim()) {
            episode.snapshotUrl = imgupload.secure_url;
          }

          episode.res.push({
            quality: Number(res.res),
            url: fileupload.secure_url,
          });
        }

        if (episode.res.length === 0) {
          continue;
        }

        fileObj.episodes.push(episode);
      }

      if (fileObj.episodes.length > 0) {
        await FileModel.create(fileObj);
      }
    }
  } catch (err) {
    console.error("Failed to add files to cloud", err);
    throw err;
  }
};

export { addFilesToCloud };


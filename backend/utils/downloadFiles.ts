import type {
  ShowInfoAnimeEntry,
  ShowInfoResponse,
} from "../types/SubpleaseApiRes.js";
import { allShowsLink, getShowId, specificShowLink } from "./subplease.js";
import axios from "axios";
import type { UploadApiResponse } from "cloudinary";
import ffmpegPath from "ffmpeg-static";
import ffmpeg from "@ts-ffmpeg/fluent-ffmpeg";
import { existsSync } from "fs";
import path from "path";
import Webtorrent from "webtorrent";
import type { Readable } from "stream";
import { Presets, SingleBar } from "cli-progress";
import parseHtml, { getText } from "tinysoup";
import type { Element } from "./../node_modules/tinysoup/src/types.js";
import type { Document } from "./../node_modules/tinysoup/src/document.js";

function resolveFfmpegBinaryPath(): string | null {
  const candidates = [
    ffmpegPath,
    path.join(
      process.cwd(),
      "node_modules",
      "ffmpeg-static",
      process.platform === "win32" ? "ffmpeg.exe" : "ffmpeg",
    ),
  ];

  for (const candidate of candidates) {
    if (typeof candidate !== "string" || candidate.length === 0) {
      continue;
    }

    const normalizedPath = path.normalize(candidate);
    if (existsSync(normalizedPath)) {
      return normalizedPath;
    }
  }

  return null;
}

const resolvedFfmpegPath = resolveFfmpegBinaryPath();
console.log("resolved", resolvedFfmpegPath);
if (resolvedFfmpegPath) {
  ffmpeg.setFfmpegPath(resolvedFfmpegPath);
}

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const getShowsInfo = async (title: string) => {
  const { showId } = await getShowId(title);
  const info = await axios.get<ShowInfoResponse>(
    specificShowLink(timezone, showId),
  );
  return info.data;
};

const convertInfoResObjToArr = <T>(obj: { [key: string]: T }): T[] => {
  const formattedArr: T[] = [];
  for (let key in obj) {
    if (obj[key]) formattedArr.push(obj[key]);
  }
  return formattedArr;
};

const getAllShows = async () => {
  const allShowsRes = await fetch(allShowsLink);
  const allShowsHtml = await allShowsRes.text();
  const soup: Document = parseHtml(allShowsHtml);
  const titles: string[] = soup
    .findAll({
      name: "a",
      predicate: (el: Element) => el.parent?.classList?.has("all-shows-link"),
    })
    .map((el) => getText(el));
  return titles;
};

const downloadTorrent = async (torrentUrl: string) => {
  const client = new Webtorrent();

  const bar = new SingleBar({}, Presets.shades_classic);

  bar.start(100, 0);

  const torr: Webtorrent.Torrent = await new Promise((resolve, reject) => {
    client.add(torrentUrl, (torrent) => {
      const file = torrent.files?.[0];
      file?.select();
      torrent.on("download", () => {
        bar.update(torrent.progress * 100);
      });
      torrent.on("done", () => {
        bar.stop();
      });
      resolve(torrent);
    });
    client.on("error", (err) => reject(err));
  });

  const file = torr.files?.[0];

  const filePath = path.join(process.cwd(), `/uploads/${file?.name}`);

  const stream = file?.createReadStream();
  await new Promise((resolve, reject) => {
    ffmpeg(stream as Readable)
      .outputOptions("-crf 28")
      .outputOptions("-preset fast")
      .videoCodec("libx265")
      .audioCodec("aac")
      .videoBitrate("200k")
      .format("mp4")
      .audioBitrate("128k")
      .output(filePath)
      .on("error", reject)
      .on("end", resolve);
  });

  return filePath;
};

export { downloadTorrent, getShowsInfo, convertInfoResObjToArr, getAllShows, ffmpeg };

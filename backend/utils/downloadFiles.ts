import ffmpeg from "@ts-ffmpeg/fluent-ffmpeg";
import axios from "axios";
import { Presets, SingleBar } from "cli-progress";
import ffmpegPath from "ffmpeg-static";
import { existsSync } from "fs";
import path from "path";
import type { Readable } from "stream";
import Webtorrent from "webtorrent";
import type {
  ShowInfoResponse
} from "../types/SubpleaseApiRes.js";
import { allShowsLink, baseUrl, getShowId, specificShowLink } from "./subplease.js";
import {parse} from "node-html-parser";
import { deleteFileAtPath } from "./deleteFileAtPath.js";


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
  const { showId, soup } = await getShowId(title);

  if(!showId) throw new Error("Show not found")
  const info = await axios.get<ShowInfoResponse>(
    specificShowLink(timezone, showId),
  );
  const desc = soup.querySelector(".series-syn")
  const img = soup.querySelector(".img-responsive")
  return {...info.data, image: baseUrl + img?.getAttribute("src"), description: desc?.text};
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
  const soup = parse(allShowsHtml);
  const titles: string[] = soup
    .querySelectorAll(".all-shows-link")
    .map((el) => el.text);
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

  const filePath = path.join(process.cwd(), file?.name ?? "video.mp4");

  const stream = file?.createReadStream();
  try {
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
        .on("end", resolve).run();
    });

    return filePath;
  } catch (err) {
    await deleteFileAtPath(filePath);
    throw err;
  } finally {
    bar.stop();
    client.destroy();
  }
};

export { convertInfoResObjToArr, downloadTorrent, ffmpeg, getAllShows, getShowsInfo };


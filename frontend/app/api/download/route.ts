import { uploader } from "@/src/cloudinary";
import { UploadApiResponse } from "cloudinary";
import ffmpegPath from "ffmpeg-static";
import ffmpeg from "fluent-ffmpeg";
import { existsSync } from "fs";
import path from "path";
import { Readable } from "stream";
import Webtorrent from "webtorrent";

export const runtime = "nodejs";

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

export async function GET(req: Request) {
  console.log("Reached");
  const { searchParams } = new URL(req.url);

  const url = searchParams.get("url");

  if (!url) return new Response("Missing URL", { status: 400 });

  console.log(url, "URL");

  const client = new Webtorrent();

  const torr: Webtorrent.Torrent = await new Promise((resolve, reject) => {
    console.log("In promise");
    client.add(url, (torrent) => {
      console.log("In add");
      const file = torrent.files?.[0];
      file.select();
      torrent.on("download", (bytes) => {
        console.log("Just downloaded: " + bytes);
        console.log(
          "Total progress: " + (torrent.progress * 100).toFixed(2) + "%",
        );
        console.log("Download speed: " + torrent.downloadSpeed + " bytes/sec");
      });
      torrent.on("done", () => {
        console.log("Download finished!");
      });
      resolve(torrent);
      console.log("In resolve");
    });
    client.on("error", (err) => reject(err));
  });

  const file = torr.files?.[0];

  const stream = file.createReadStream();
  const command = ffmpeg(stream as Readable)
    .outputOptions("-crf 28")
    .outputOptions("-preset medium")
    .videoCodec("libx265")
    .audioCodec("aac")
    .videoBitrate("200k")
    .format("mp4")
    .audioBitrate("128k");

  const cloudinaryRes: UploadApiResponse = await new Promise(
    (resolve, reject) => {
      const upload = uploader.upload_stream(
        {
          resource_type: "video",
          folder: "maxanime",
          timeout: 120000,
        },
        (err, result) => {
          if (err) {
            console.log("Cloudinary err", err);
            reject(err);
          } else resolve(result);
        },
      );

      command.pipe(upload);
    },
  );

  const res = await fetch(cloudinaryRes.secure_url);

  console.log("Sending res");

  return new Response(res.body, {
    headers: {
      "Content-Type": "video/mp4",
      "Content-Length": cloudinaryRes.bytes.toString(),
      "Content-Disposition": `attachment; filename=${file.name.split(".").slice(0, -1).join(".")}.mp4`,
    },
  });
}

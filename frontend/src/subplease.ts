import parseHtml from "tinysoup"

export const baseUrl = "https://subsplease.org"

export const latestUrl = (timeZone: string)=> baseUrl + `/api/?f=latest&tz=${timeZone}`

export const scheduleUrl = (timeZone: string)=> baseUrl + `/api/?f=schedule&h=true&tz=${timeZone}`

export const searchUrl = (timeZone: string, searchTerm: string)=> baseUrl + `/api/?f=search&tz=${timeZone}&s=${searchTerm}`

export const allShowsLink = baseUrl + `/shows`

export const specificShowHtml = (title: string)=> allShowsLink + `/${title}`

export const specificShowLink = (timeZone: string, showId: string)=> baseUrl + `/api/?f=show&tz=${timeZone}&sid=${showId}` //Show id gitten from sid attribute of html element with show-release-table id

export const getShowId = async(title: string)=>{
    const res = await fetch(specificShowHtml(title))
    const html = await res.text()
    const soup = parseHtml(html)
    return soup.find({predicate: (el)=>el.attributes.get("id") === "show-release-table"})?.attributes.get("sid")
}

// import ffmpegPath from "ffmpeg-static";
// import ffmpeg from "fluent-ffmpeg";
// import { existsSync } from "fs";
// import path from "path";
// import parseHtml from "tinysoup"


// export const runtime = "nodejs";

// function resolveFfmpegBinaryPath(): string | null {
//   const candidates = [
//     ffmpegPath,
//     path.join(
//       process.cwd(),
//       "node_modules",
//       "ffmpeg-static",
//       process.platform === "win32" ? "ffmpeg.exe" : "ffmpeg",
//     ),
//   ];

//   for (const candidate of candidates) {
//     if (typeof candidate !== "string" || candidate.length === 0) {
//       continue;
//     }

//     const normalizedPath = path.normalize(candidate);
//     if (existsSync(normalizedPath)) {
//       return normalizedPath;
//     }
//   }

//   return null;
// }

// const resolvedFfmpegPath = resolveFfmpegBinaryPath();
// console.log("resolved", resolvedFfmpegPath);
// if (resolvedFfmpegPath) {
//   ffmpeg.setFfmpegPath(resolvedFfmpegPath);
// }
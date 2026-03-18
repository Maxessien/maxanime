import { useAnimepaheApi } from "@/app/page";
import Resolutions from "@/src/download-components/Resolutions";
import { parseHtml } from "tinysoup";

const PlayPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ ep: string }>;
}) => {
  const animepaheUrl = `https://animepahe.si/play/${(await params).id}/${(await searchParams).ep}`;
  const res = await fetch(
    `https://api.scraperapi.com/?api_key=${process.env.SCRAPER_API_KEY}&url=${animepaheUrl}&follow_redirect=false&device_type=desktop`,
  );

  const html = await res.text();

  const soup = parseHtml(html);

  const downloadLinks = [];

  const anchorTags = soup.findAll({
    name: "a",
    predicate: (el) => {
      return (
        (el?.classList?.has("dropdown-item") ?? false) &&
        (el?.attributes?.has("href") ?? false) &&
        el.attributes.get("href").trim().startsWith("https://pahe.win")
      );
    },
  });

  for (let el of anchorTags) {
    const res = await fetch(useAnimepaheApi(el.attributes.get("href")));
    const html = await res.text();
    const soup = parseHtml(html);

    soup.findAll({
      name: "form",
      predicate: (el) =>
        el.attributes.has("action") &&
        el.attributes.get("action").trim().startsWith("https://kwik.cx/d"),
    }).forEach((el)=>downloadLinks.push(el))
  }

  const resolutions = soup.findAll({
    name: "button",
    predicate: (element) => {
      return (
        (element?.classList?.has("dropdown-item") ?? false) &&
        (element?.attributes?.has("data-resolution") ?? false)
      );
    },
  });

  console.log(downloadLinks);
  return <Resolutions data={resolutions} downloadEls={downloadLinks} />;
};

export default PlayPage;

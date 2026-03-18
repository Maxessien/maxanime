import { useAnimepaheApi } from "@/app/page";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const api = searchParams.get("url")
    ? useAnimepaheApi(searchParams.get("url"))
    : null;

  if (!api) return new Response("Missing URL", { status: 400 });

  const res = await fetch(api);

  return new Response(res.body, { status: 200 });
}

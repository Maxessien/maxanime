import { useAnimepaheApi } from "@/app/page"


export async function GET(req: Request){
    const {searchParams} = new URL(req.url)
    const query = searchParams.get("q")

    if (!query) return new Response("Mising query", {status: 400})

    const res = await fetch(useAnimepaheApi(`https://animepahe.si/api?m=search&q=${query}`))

    return new Response(res.body, {status: 200})
}
const searchUrl = "https://animepahe.si/api?m=search&q=<query_string>"

const listEpisodesUrl = "https://animepahe.si/api?m=release&id=<session_id>"

const airingAnimes = "https://animepahe.si/api?m=airing&page=<page_number>"

const res = await fetch("https://animepahe.si/api?m=airing")

console.log((await res.text()))
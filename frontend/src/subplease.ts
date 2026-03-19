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
    const showId = soup.find({predicate: (el)=>el.attributes.get("id") === "show-release-table"})?.attributes.get("sid")
    return {showId, soup}
}

import {parse} from "node-html-parser"

export const baseUrl = "https://subsplease.org"

export const latestUrl = (timeZone: string)=> baseUrl + `/api/?f=latest&tz=${encodeURIComponent(timeZone)}`

export const scheduleUrl = (timeZone: string)=> baseUrl + `/api/?f=schedule&h=true&tz=${encodeURIComponent(timeZone)}`

export const searchUrl = (timeZone: string, searchTerm: string)=> baseUrl + `/api/?f=search&tz=${encodeURIComponent(timeZone)}&s=${encodeURIComponent(searchTerm)}`

export const allShowsLink = baseUrl + `/shows`

export const specificShowHtml = (title: string)=> allShowsLink + `/${encodeURIComponent(title)}`

export const specificShowLink = (timeZone: string, showId: string)=> baseUrl + `/api/?f=show&tz=${encodeURIComponent(timeZone)}&sid=${showId}` //Show id gitten from sid attribute of html element with show-release-table id

export const getShowId = async(title: string)=>{
    const res = await fetch(specificShowHtml(title))
    const html = await res.text()
    const soup = parse(html)
    const showId = soup.querySelector("#show-release-table")?.getAttribute("sid")
    return {showId, soup}
}

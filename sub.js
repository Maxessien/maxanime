const baseUrl = "https://subsplease.org"

const latestUrl = baseUrl + "/api/?f=latest&tz=<timezone>"

const searchUrl = baseUrl + "/api/?f=search&tz=<timezone>&s=<search_term>"

const allShowsLink = baseUrl + "/shows"

const specificShowHtml = allShowsLink + "/<title>"

const specificShowLink = baseUrl + "/api/?f=show&tz=<timezone>&sid=<show_id>" //Show id gitten from sid attribute of html element with show-release-table id

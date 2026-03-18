import {parseHtml} from "tinysoup"


const res = await fetch('https://api.scraperapi.com/?api_key=0f78a36ac0946dd4bfb0ac82c562cd23&url=https%3A%2F%2Fanimepahe.si%2Fplay%2Fd5b6a6bf-0e97-7456-3953-214faf36726c%2Ffc1606a51e528bda3028dff362d4e9b181a886a4bac9d20bc3c9fd8e19d3013f&follow_redirect=false&device_type=desktop')


const html = await res.text()

const soup = parseHtml(html)

for (let el of soup.findAll({name: "button", predicate: (element)=>element.classList.has("dropdown-item")})) console.log(el.attributes)
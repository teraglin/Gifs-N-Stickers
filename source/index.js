import { apiKey } from './keys.js'

const baseUrl = "https://api.giphy.com/v1/"
const gifSearch = "gifs/search"
const stickerSearch = "stickers/search"



async function getGif(query) {

    let data = null

    try {
        let response = await fetch(`${baseUrl}${gifSearch}?q=${query}&${apiKey}`)
        data = await response.json()
        console.log(data)
    }

    catch (error) {
        console.log(error.message)
    }

    finally {
        console.log("hello gif")
    }
}

function getSticker(query) {
    let data = null

    try {
        let response = await fetch(`${baseUrl}${stickerSearch}?q=${query}&${apiKey}`)
        data = await response.json()
        console.log(data)
    }

    catch (error) {
        console.log(error.message)
    }

    finally {
        console.log("hello sticker")
    }
}

getGif("cheeseburger")
getSticker("cheeseburger")
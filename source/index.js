import { apiKey } from './keys.js'

const baseUrl = "https://api.giphy.com/v1/"
const gifSearch = "gifs/search"
const stickerSearch = "stickers/search"

//--------- ACTIVE BUTTONS

//Get container element for nav buttons
const navButtons = document.getElementById('nav-buttons')

// Get all buttons with class="btn" inside the container
const btns = navButtons.getElementsByClassName('btn')
console.log(btns)


// loop through all the buttons and add the active class to the current/clicked button
for (let i=0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
        let current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
        console.log(current)
    });
}

//-----------

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

async function getSticker(query) {
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
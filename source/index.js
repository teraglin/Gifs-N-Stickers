import { apiKey } from './keys.js'

const baseUrl = "https://api.giphy.com/v1/"
const gifSearch = "gifs/search"
const stickerSearch = "stickers/search"

const searchButton = document.getElementById("search-btn")
const searchInput = document.getElementById("search-input")

//--------- ACTIVE BUTTONS

//Get container element for nav buttons
const navButtons = document.getElementById('nav-buttons')

// Get all buttons with class="btn" inside the container
const btns = navButtons.getElementsByClassName('btn')

let current = null
let currentText = null


// loop through all the buttons and add the active class to the current/clicked button
for (let i=0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    let current = document.getElementsByClassName("active")
    current[0].className = current[0].className.replace(" active", "")
    this.className += " active"
    currentText = current[0].textContent
    
    if (currentText === 'GIF') {
      searchButton.textContent = "Search GIFs"
    } else {
      searchButton.textContent = "Search Stickers"
    }

  })
}


//-----------

async function getGif() {
    const inputText = searchInput.value
    let data = null

    try {
        let response = await fetch(`${baseUrl}${gifSearch}?q=${inputText}&${apiKey}`)
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

async function getSticker() {
    const inputText = searchInput.value
    let data = null

    try {
        let response = await fetch(`${baseUrl}${stickerSearch}?q=${inputText}&${apiKey}`)
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

searchButton.addEventListener('click', () => {
  if (currentText === 'GIF') {
    getGif()
  } else if (currentText === 'STICKER') {
    getSticker()
  }
  console.log(currentText)
})

// getGif("cheeseburger")
// getSticker("cheeseburger")
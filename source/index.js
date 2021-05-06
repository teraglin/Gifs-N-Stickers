import { apiKey } from './keys.js'

const baseUrl = "https://api.giphy.com/v1/"
const gifSearch = "gifs/search"
const stickerSearch = "stickers/search"

const searchInput = document.getElementById("search-input")
const searchButton = document.getElementById("search-btn")
const gifsContainer = document.querySelector(".gifs-container")

//--------- ACTIVE BUTTONS

// Get container element for nav buttons
const navButtons = document.getElementById('nav-buttons')

// Get all buttons with class="btn" inside the container
const btns = navButtons.getElementsByClassName('btn')

let current = null
let currentText = null

// loop through all the buttons and add the active class to the current/clicked button
for (let i=0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    let current = document.getElementsByClassName("active")
    searchInput.style.visibility = "visible"
    searchButton.style.visibility = "visible"

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
  clearExisting()

  const inputText = searchInput.value
  let data = null

  try {
    let response = await fetch(`${baseUrl}${gifSearch}?q=${inputText}&${apiKey}`)
    data = await response.json()

    for (let i = 0; i < 10; i++) {
      createNewGif(data.data[i].images.original.url)
    }
  } catch (error) {
    console.log(error.message)
  }
}

async function getSticker() {
  clearExisting()

  const inputText = searchInput.value
  let data = null

  try {
    let response = await fetch(`${baseUrl}${stickerSearch}?q=${inputText}&${apiKey}`)
    data = await response.json()

    for (let i = 0; i < 10; i++) {
      createNewGif(data.data[i].images.original.url)
    }

  } catch (error) {
    console.log(error.message)
  }
}

function clearExisting(params) {
  const gifElement = document.getElementsByClassName("gif-element")

  for (let i = 0; i < gifsContainer.children.length; i++) {
    if (gifsContainer.children.length > 0) {
      gifsContainer.removeChild(gifElement[i])
    }
  }
}

function createNewGif(url) {
  const gifElement = document.createElement("img")
  gifElement.src = url
  gifElement.classList.add("gif-element")
  gifsContainer.appendChild(gifElement)
}

searchButton.addEventListener('click', () => {
  if (currentText === 'GIF') {
    getGif()
  } else if (currentText === 'STICKER') {
    getSticker()
  }
})
import { apiKey } from './keys.js'

const baseUrl = "https://api.giphy.com/v1/"
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
    
    changeSearchButtonText()
  })
}


//-----------

function changeSearchButtonText() {
  if (currentText === 'GIF') {
    searchButton.textContent = "Search GIFs"
  } else {
    searchButton.textContent = "Search Stickers"
  }
}


function createNewGif(url) {
  const gifElement = document.createElement("img")
  gifElement.src = url
  gifElement.classList.add("gif-element")
  gifsContainer.appendChild(gifElement)
}


function clearExisting() {
  const gifElement = document.getElementsByClassName("gif-element")

  // loop through the gifs container div and check how many children (<img>) are present
  for (let i = 0; i < gifsContainer.children.length; i++) {
    if (gifsContainer.children.length > 0) {
      gifsContainer.removeChild(gifElement[i])
    }
  }
}


async function search(searchEndpoint) {
  clearExisting()

  const inputText = searchInput.value
  let jsonData = null

  try {
    let response = await fetch(`${baseUrl + searchEndpoint}?q=${inputText + apiKey}`)
    jsonData = await response.json()

    for (let i = 0; i < 10; i++) {
      createNewGif(jsonData.data[i].images.original.url)
    }

  } catch (error) {
    console.log(error.message)
  }
}


searchButton.addEventListener('click', () => {
  if (currentText === 'GIF') {
    const gifSearch = "gifs/search" 
    search(gifSearch)
  } else if (currentText === 'STICKER') {
    const stickerSearch = "stickers/search"
    search(stickerSearch)
  }
})
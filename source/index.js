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


let currentText = null

// loop through all the buttons and add the active class to the current/clicked button
for (let i=0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    let current = document.getElementsByClassName("active")

    // if there is no cative class
    if (current.length > 0) {
      current[0].className = current[0].className.replace(" active", "")
    }

    //add the active class to the current/clicked button
    this.className += " active"

    // save active button name into currentText
    currentText = current[0].textContent

    // Search bar visibility
    searchInput.style.visibility = "visible"
    searchButton.style.visibility = "visible"

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
  // loop through the gifs container div and check how many children (<img>) are present
  for (let item of gifsContainer.children) {
    if (gifsContainer.children.length > 0) {
      gifsContainer.removeChild(item)
    }
  }
}


async function search(searchEndpoint) {
  clearExisting()

  const query = searchInput.value
  let jsonData = null

  try {
    let response = await fetch(`${baseUrl + searchEndpoint}?q=${query + apiKey}`)
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
    search(gifSearch)
  } else if (currentText === 'STICKER') {
    search(stickerSearch)
  }
})
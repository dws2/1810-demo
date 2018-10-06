const nav = document.querySelector('nav')
const navButton = document.querySelector('.nav-toggle')
const form = document.querySelector('form')
const searchTerm = document.querySelector('#search')
const resultsContainer = document.querySelector('.results')

function tvdb(endpoint, qs) {
  const API_KEY = "46c64811ca11b88e58f1e1b6ff979099"
  const base_url = "https://api.themoviedb.org/3"

  let url = `${base_url}${endpoint}?api_key=${API_KEY}`
  if (qs) url = `${url}&${qs}`

  return fetch(url).then(res=>res.json())
}


class Modal {
  constructor() {
    this.container = document.querySelector('.modal-overlay')
    this.contentBlock = this.container.querySelector('p')
    window.addEventListener('keyup', this.escapeCheck.bind(this))
  }

  toggle() {
    this.container.classList.toggle('open')
  }

  escapeCheck(e) {
    if (e.keyCode === 27) {
      this.close()
    }
  }

  renderModalContent(html) {
    console.log('inside renderModalContent')
    this.contentBlock.innerHTML = html
  }

  open(cb) {
    this.toggle()
    cb(this.renderModalContent.bind(this))
  }

  close() {
    this.toggle()
  }
}


const modal = new Modal()

navButton.addEventListener('click', () => {
  nav.classList.toggle('nav-open')
})


form.addEventListener('submit', e => {
  e.preventDefault()
  getData(searchTerm.value)
})

function getData(query) {

  const endpoint = "/search/movie"

  tvdb(endpoint, `query=${query}`)
    .then( ({ results }) => {
      renderData(results)
    })
}

function renderData(data){
  let html = ""
  data.forEach(({title, poster_path, overview, id}) => {
    html += `
    <li data-id="${id}">
      <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title} Movie Poster">
      <div>
        <h3>${title}</h3>
        <p>${overview}</p>
      </div>
    </li>`
  })
  resultsContainer.innerHTML = html
  setUpResultClicks()
}

function setUpResultClicks() {
  let resultsItems = document.querySelectorAll('.results li')
  
  resultsItems.forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault()

      tvdb(`/movie/${e.currentTarget.dataset.id}`)
        .then(data => {
          modal.open((render) => {
            const html = `
            <p>${data.original_title} / ${data.release_date} / ${data.vote_average}</p>
            `
            render(html)
            
          })
        })
    })
  })
}


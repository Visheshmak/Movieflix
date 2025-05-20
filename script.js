const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')
const loader = document.getElementById('loader')
const themeToggle = document.getElementById('themeToggle')

// Get initial movies
getMovies(API_URL)

async function getMovies(url) {
    loader.classList.remove('hidden') // Show loader
    const res = await fetch(url)
    const data = await res.json()
    loader.classList.add('hidden') // Hide loader

    showMovies(data.results)
}

function showMovies(movies) {
    main.innerHTML = ''

    if (movies.length === 0) {
        main.innerHTML = '<h2>No movies found 😕</h2>'
        return
    }

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="stars">${getStars(vote_average)}</div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
                <br/>
                <button onclick="watchTrailer('${title}')">▶ Watch Trailer</button>
            </div>
        `
        main.appendChild(movieEl)
    })
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

function getStars(vote) {
    const fullStars = Math.round(vote / 2)
    return '★'.repeat(fullStars) + '☆'.repeat(5 - fullStars)
}

function watchTrailer(title) {
    const query = encodeURIComponent(`${title} trailer`)
    window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank')
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if (searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)
        search.value = ''
    } else {
        window.location.reload()
    }
})

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme')
})

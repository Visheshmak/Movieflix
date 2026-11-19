const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${TMDB_API_KEY}&page=1`
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=`
const NO_POSTER = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="500" height="750"><rect width="100%" height="100%" fill="%23222"/><text x="50%" y="50%" fill="%23aaa" font-size="36" text-anchor="middle" font-family="sans-serif">No poster</text></svg>')

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')
const loader = document.getElementById('loader')
const themeToggle = document.getElementById('themeToggle')

// Get initial movies
getMovies(API_URL)

async function getMovies(url) {
    loader.classList.remove('hidden')
    try {
        const res = await fetch(url)
        if (!res.ok) throw new Error(`TMDB request failed: ${res.status}`)
        const data = await res.json()
        showMovies(data.results || [])
    } catch (err) {
        console.error(err)
        main.innerHTML = '<h2>Could not load movies. Please try again later.</h2>'
    } finally {
        loader.classList.add('hidden')
    }
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
            <img src="${poster_path ? IMG_PATH + poster_path : NO_POSTER}" alt="">
            <div class="movie-info">
                <h3></h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="stars">${getStars(vote_average)}</div>
            <div class="overview">
                <h3>Overview</h3>
                <p></p>
                <button type="button">▶ Watch Trailer</button>
            </div>
        `
        movieEl.querySelector('img').alt = title
        movieEl.querySelector('.movie-info h3').textContent = title
        movieEl.querySelector('.overview p').textContent = overview
        movieEl.querySelector('.overview button').addEventListener('click', () => watchTrailer(title))
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
        getMovies(SEARCH_API + encodeURIComponent(searchTerm))
        search.value = ''
    } else {
        window.location.reload()
    }
})

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme')
})

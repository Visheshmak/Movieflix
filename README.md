# MovieFlix

A responsive movie discovery app built with **vanilla JavaScript, HTML, and CSS** on top of [The Movie Database (TMDB) API](https://developer.themoviedb.org/).

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)

## Features

- Browse currently popular movies (TMDB `discover` endpoint)
- Search the full TMDB catalogue
- Colour-coded ratings with a star display
- Hover overlay with the plot overview and a "Watch Trailer" link (YouTube search)
- Light/dark theme toggle, loading indicator, error and empty states
- Fallback image for movies without a poster

## Run locally

No build step or dependencies are needed:

```bash
git clone https://github.com/Visheshmak/Movieflix.git
cd Movieflix
python -m http.server 8000     # or open index.html directly
```

Open http://localhost:8000.

To use your own TMDB key, set `TMDB_API_KEY` in `config.js`. TMDB v3 keys are designed for client-side apps.

## Project structure

```text
index.html   page layout
config.js    TMDB API key
script.js    data fetching, rendering, search, theme toggle
style.css    layout, cards, animations, dark theme
```

## Implementation notes

- `fetch` + `async/await` with error handling, and the loader is always cleared in `finally`
- Search terms are URL-encoded
- Movie titles and overviews are inserted with `textContent` instead of HTML strings, so text from the API can't inject markup

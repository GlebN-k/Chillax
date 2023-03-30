// import { useSelector } from "react-redux"

// const movieId = useSelector(state => state.movieId.value)

const key = 'acf837ccca44b10855aa8ef467ec0211'

// const movieId = '671'

const requests = {
    requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`,
    requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`,
    requestUpcoming:`https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`,
    requestLatest: `https://api.themoviedb.org/3/trending/all/day?api_key=${key}&language=en-US&page=1`,
    // requestSimilar: `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${key}&language=en-US&page=1`
    // requestFullVideo: `https://api.themoviedb.org/3/search/tv?api_key=${key}&language=en-US&page=1`,
    // requestChosen:
}

// const youtubeAPIKey = "AIzaSyAEVReaKn6pBMMI_oZ4q8XgV8qFregtAI4"

export default requests
// `https://api.themoviedb.org/3/movie/upcoming?api_key=acf837ccca44b10855aa8ef467ec0211&language=en-US&page=1`
// `https://api.themoviedb.org/3/movie/popular?api_key=acf837ccca44b10855aa8ef467ec0211&language=en-US&page=1`
// `https://api.themoviedb.org/3/movie/top_rated?api_key=acf837ccca44b10855aa8ef467ec0211&language=en-US&page=1`
// `https://api.themoviedb.org/3/trending/all/day?api_key=acf837ccca44b10855aa8ef467ec0211&language=en-US&page=1`
export const key = 'acf837ccca44b10855aa8ef467ec0211'

const requests = {
    requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`,
    requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`,
    requestUpcoming:`https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`,
    requestLatest: `https://api.themoviedb.org/3/trending/all/day?api_key=${key}&language=en-US&page=1`,
}

export default requests
